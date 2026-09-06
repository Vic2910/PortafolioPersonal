# Variables de Entorno

> **Propósito:** Documentar todas las variables de entorno utilizadas, su ubicación, valores y políticas de seguridad.

---

## 1. Resumen

| Categoría | Cantidad | Ambiente |
|:----------|:---------|:---------|
| **Supabase** | 3 | Server + Client |
| **Vercel** | 2 | Server |
| **Contacto** | 1 | Server |
| **Total** | 6 | |

---

## 2. Tabla de Variables

### 2.1 Variables de Supabase

| Variable | Tipo | Ubicación | Descripción |
|:---------|:-----|:----------|:------------|
| `SUPABASE_URL` | Secret | Server | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | Secret | Server | Anon key de Supabase |
| `SUPABASE_SERVICE_KEY` | Secret | Server | Service key (admin) |
| `VITE_SUPABASE_URL` | Public | Client | URL para el frontend |
| `VITE_SUPABASE_ANON_KEY` | Public | Client | Anon key para el frontend |

### 2.2 Variables de Vercel

| Variable | Tipo | Ubicación | Descripción |
|:---------|:-----|:----------|:------------|
| `VERCEL_URL` | Auto | Server | URL del deployment (automática) |
| `VERCEL_ENV` | Auto | Server | Ambiente (production/preview) |

### 2.3 Variables de Contacto

| Variable | Tipo | Ubicación | Descripción |
|:---------|:-----|:----------|:------------|
| `CONTACT_EMAIL` | Secret | Server | Email de notificación |

---

## 3. Valores (Referencia)

### 3.1 Supabase

```bash
# ⚠️ NUNCA commitear estos valores
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.2 Frontend

```bash
# Variables públicas (accesibles en el cliente)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.3 Contacto

```bash
CONTACT_EMAIL=victorarevalosierra@gmail.com
```

---

## 4. Configuración por Ambiente

### 4.1 Desarrollo Local

```bash
# .env.local (NO commitear)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4.2 Vercel Dashboard

1. Ir a **Project Settings** → **Environment Variables**
2. Agregar cada variable
3. Seleccionar ambientes: Production, Preview, Development
4. **Nunca** commitear valores

### 4.3 GitHub Actions

```yaml
# .github/workflows/ci.yml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

---

## 5. Acceso en Código

### 5.1 Frontend (React/Vite)

```typescript
// src/config/environment.ts
export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
```

### 5.2 Serverless Functions (Vercel)

```typescript
// api/config.ts
export const config = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  contactEmail: process.env.CONTACT_EMAIL,
}
```

### 5.3 Ejemplo de Uso

```typescript
// api/contact.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export default async function handler(req, res) {
  // Usar supabase para insertar mensaje
}
```

---

## 6. Seguridad

### 6.1 Reglas de Seguridad

| Regla | Descripción |
|:------|:------------|
| **Nunca commitear secrets** | Usar .gitignore, .env.local |
| **Usar service key en server** | Nunca exponer en frontend |
| **Rotar keys periódicamente** | Cada 6 meses |
| **Usar least privilege** | Permisos mínimos necesarios |

### 6.2 .gitignore

```gitignore
# Variables de entorno
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 6.3 Rotación de Keys

```bash
# 1. Ir a Supabase Dashboard → Settings → API
# 2. Regenerate anon key
# 3. Regenerate service key
# 4. Actualizar en Vercel Dashboard
# 5. Actualizar en .env.local (local)
```

---

## 7. Troubleshooting

### 7.1 Problemas Comunes

| Problema | Causa | Solución |
|:---------|:------|:---------|
| **Variable no definida** | Falta en Vercel Dashboard | Agregar en Settings |
| **Value undefined** | Nombre incorrecto | Verificar spelling |
| **CORS error** | URL incorrecta | Verificar VITE_SUPABASE_URL |
| **Auth error** | Key incorrecta | Verificar keys |

### 7.2 Debug

```typescript
// Verificar variables (temporal)
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'definida' : 'no definida')
```

---

## 8. Checklist

### Configuración
- [ ] Variables definidas en Vercel Dashboard
- [ ] Variables en .env.local (local)
- [ ] .gitignore configurado
- [ ] GitHub Secrets configurados

### Seguridad
- [ ] Secrets nunca commiteados
- [ ] Service key solo en server
- [ ] Keys rotadas periódicamente
- [ ] Permisos mínimos configurados

### Verificación
- [ ] Frontend puede acceder a variables públicas
- [ ] Server functions acceden a secrets
- [ ] No hay errores de undefined
- [ ] Conexión a Supabase funciona

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*