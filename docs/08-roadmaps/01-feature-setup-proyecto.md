# Feature: Setup Proyecto

> **ID:** F-01 | **Prioridad:** Alta | **Dependencias:** Ninguna

---

## 1. Objetivo

Inicializar la estructura base del proyecto PortafolioVRAS con React + Vite + TypeScript + Tailwind CSS, configurando todas las herramientas de desarrollo y la estructura de carpetas.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Runtime** | Node.js 20+ LTS |
| **Package Manager** | npm 10+ |
| **IDE** | VS Code |
| **Control de versiones** | Git + GitHub |

---

## 3. Prerrequisitos

- [ ] Node.js 20+ instalado (`node --version`)
- [ ] npm 10+ instalado (`npm --version`)
- [ ] Git instalado (`git --version`)
- [ ] VS Code instalado
- [ ] Cuenta en GitHub
- [ ] Cuenta en Vercel (para deploy posterior)
- [ ] Cuenta en Supabase (para base de datos posterior)

---

## 4. Implementación

### Paso 1: Crear Repositorio en GitHub

1. Ir a https://github.com/new
2. Configurar:
   - **Nombre:** `PortafolioPersonal`
   - **Descripción:** "Portafolio profesional - Victor Rafael Arévalo Sierra"
   - **Visibilidad:** Público
   - **Inicializar:** Sin README (lo crearemos localmente)
3. Click en **"Create repository"**

### Paso 2: Clonar Repositorio

**Comando:**
```bash
cd C:\Users\Lenovo\Desktop
git clone https://github.com/Vic2910/portafolio-vras.git
cd portafolio-vras
```

**Verificar:**
```bash
pwd
# Resultado esperado: C:\Users\Lenovo\Desktop\portafolio-vras
```

### Paso 3: Crear Proyecto con Vite

**Comando:**
```bash
npm create vite@latest . -- --template react-ts
```

**Seleccionar opciones:**
```
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC
```

**Resultado esperado:**
Se genera la estructura base del proyecto:
```
portafolio-vras/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Paso 4: Instalar Dependencias Base

**Comando:**
```bash
npm install
```

### Paso 5: Configurar Tailwind CSS

**Instalar Tailwind:**
```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Configurar vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Configurar src/index.css:**
```css
@import "tailwindcss";
```

**Eliminar archivos innecesarios:**
```bash
Remove-Item -Path "src\assets\react.svg" -Force
Remove-Item -Path "public\vite.svg" -Force
```

### Paso 6: Configurar ESLint y Prettier

**Instalar extensiones:**
```bash
npm install -D eslint @eslint/js typescript-eslint
npm install -D prettier eslint-config-prettier
```

**Crear .eslintrc.cjs:**
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'typescript-eslint/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
}
```

**Crear .prettierrc:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### Paso 7: Configurar VS Code

**Crear carpeta .vscode:**
```bash
New-Item -ItemType Directory -Path ".vscode"
```

**Crear .vscode/extensions.json:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

**Crear .vscode/settings.json:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.emmetCompletions": true
}
```

### Paso 8: Configurar Scripts en package.json

**Actualizar scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit"
  }
}
```

### Paso 9: Crear Estructura de Carpetas

**Comando:**
```bash
# Crear estructura principal
New-Item -ItemType Directory -Path "src\components\common" -Force
New-Item -ItemType Directory -Path "src\components\sections" -Force
New-Item -ItemType Directory -Path "src\components\layout" -Force
New-Item -ItemType Directory -Path "src\pages" -Force
New-Item -ItemType Directory -Path "src\hooks" -Force
New-Item -ItemType Directory -Path "src\utils" -Force
New-Item -ItemType Directory -Path "src\config" -Force
New-Item -ItemType Directory -Path "src\types" -Force
New-Item -ItemType Directory -Path "src\styles" -Force
New-Item -ItemType Directory -Path "public\images" -Force
```

**Estructura resultante:**
```
src/
├── components/
│   ├── common/          # Botones, Inputs, Cards genéricos
│   ├── sections/        # Hero, Projects, Skills, etc.
│   └── layout/          # Header, Footer, Navigation
├── pages/               # Páginas/rutas
├── hooks/               # Custom hooks
├── utils/               # Funciones auxiliares
├── config/              # Configuración (environment, etc.)
├── types/               # Definiciones TypeScript
├── styles/              # Estilos globales
└── App.tsx
```

### Paso 10: Crear Archivos Base

**Crear src/config/environment.ts:**
```typescript
export const config = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}
```

**Crear src/types/index.ts:**
```typescript
export interface Project {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  technologies: string[]
  imageUrl: string
  repoUrl?: string
  demoUrl?: string
  featured: boolean
  orderIndex: number
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  read: boolean
}
```

**Crear .env.example:**
```bash
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# Contact
CONTACT_EMAIL=victorarevalosierra@gmail.com
```

**Crear .gitignore:**
```gitignore
# Dependencies
node_modules/

# Build
dist/
dist-ssr/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/*
!.vscode/extensions.json

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
```

### Paso 11: Limpiar App.tsx

**Reemplazar src/App.tsx:**
```typescript
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-10">
        PortafolioVRAS
      </h1>
      <p className="text-center text-gray-600">
        Victor Rafael Arévalo Sierra - Full Stack Developer
      </p>
    </div>
  )
}

export default App
```

### Paso 12: Commit Inicial

**Comandos:**
```bash
git add .
git commit -m "feat: initial project setup with React + Vite + TypeScript + Tailwind"
git push origin main
```

---

## 5. Verificación

- [ ] `npm run dev` inicia el servidor de desarrollo
- [ ] `npm run build` compila sin errores
- [ ] `npm run lint` no muestra errores
- [ ] `npm run typecheck` no muestra errores de tipos
- [ ] La app se muestra en `http://localhost:5173`
- [ ] Tailwind CSS funciona (aplicar clases de prueba)
- [ ] Git tiene el commit inicial

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| `npm create vite` falla | Node.js desactualizado | Actualizar a Node.js 20+ |
| Tailwind no funciona | Falta configuración | Verificar vite.config.ts y index.css |
| Errores de TypeScript | Configuración incompleta | Verificar tsconfig.json |
| ESLint no funciona | Falta configuración | Verificar .eslintrc.cjs |

---

## 7. Recursos

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*