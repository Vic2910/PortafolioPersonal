# Runbook: Creación de Componentes

> **ID:** RB-04 | **Audiencia:** Desarrolladores | **Frecuencia:** Según necesidad

---

## 1. Propósito

Crear nuevos componentes React siguiendo los estándares del proyecto.

---

## 2. Estructura de Componentes

```
src/components/
├── common/          # Componentes genéricos (Button, Card, Input)
├── sections/        # Secciones del portafolio (Hero, Projects)
└── layout/          # Header, Footer, Navigation
```

---

## 3. Procedimiento

### Crear Componente Común

**1. Crear archivo:**
```powershell
New-Item -ItemType File -Path "src\components\common\Button.tsx"
```

**2. Escribir componente:**
```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
        variant === 'primary'
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-800 hover:bg-gray-700 text-white'
      }`}
    >
      {children}
    </button>
  )
}
```

**3. Exportar en index (opcional):**
```typescript
// src/components/common/index.ts
export { Button } from './Button'
```

### Crear Sección

**1. Crear archivo:**
```powershell
New-Item -ItemType File -Path "src\components\sections\NuevaSeccion.tsx"
```

**2. Escribir sección:**
```typescript
export function NuevaSeccion() {
  return (
    <section id="nueva-seccion" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Título de la Sección
        </h2>
        {/* Contenido */}
      </div>
    </section>
  )
}
```

**3. Integrar en App.tsx:**
```typescript
import { NuevaSeccion } from './components/sections/NuevaSeccion'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* ... otras secciones */}
      <NuevaSeccion />
    </div>
  )
}
```

---

## 4. Convenciones

- **Nombre:** PascalCase (`Button`, `HeroSection`)
- **Archivo:** PascalCase (`Button.tsx`)
- **Interface:** `ComponentNameProps`
- **Export:** Named export (`export function Button`)
- **Estilos:** Tailwind CSS classes

---

## 5. Verificación

- [ ] Componente creado
- [ ] Props definidas
- [ ] Export configurado
- [ ] Integrado en App
- [ ] Funciona en navegador

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*