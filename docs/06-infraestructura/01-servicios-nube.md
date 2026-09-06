# Servicios en la Nube

> **Propósito:** Documentar todos los servicios cloud utilizados en el portafolio, incluyendo configuración, límites y costos.

---

## 1. Vercel (Hosting + Serverless)

### 1.1 Información General

| Campo | Valor |
|:------|:------|
| **Proveedor** | Vercel |
| **Tipo** | Hosting + Serverless Functions + CDN |
| **Plan** | Free Tier |
| **URL Dashboard** | https://vercel.com/dashboard |

### 1.2 Características Utilizadas

| Característica | Estado | Descripción |
|:---------------|:-------|:------------|
| **Static Site Hosting** | ✅ | Alojamiento de archivos estáticos (React) |
| **Serverless Functions** | ✅ | API routes en `/api/` |
| **CDN Global** | ✅ | Distribución via Edge Network |
| **Automatic SSL** | ✅ | Certificado SSL automático |
| **GitHub Integration** | ✅ | Deploy automático en push a `main` |
| **Preview Deployments** | ✅ | Deploy automático en PRs |
| **Analytics** | ✅ | Métricas de visitantes y performance |
| **Speed Insights** | ✅ | Core Web Vitals reales |

### 1.3 Límites del Free Tier

| Recurso | Límite | Uso Actual |
|:--------|:-------|:-----------|
| **Build Time** | 6000 min/mes | ~100 min/mes |
| **Bandwidth** | 100 GB/mes | ~5 GB/mes |
| **Serverless Executions** | 100K/mes | ~1K/mes |
| **Serverless Duration** | 10s/invocation | <1s promedio |
| **Projects** | ∞ | 1 |
| **Custom Domains** | 50 | 1 |
| **Preview Deployments** | ∞ | ∞ |

### 1.4 Configuración del Proyecto

```json
{
  "name": "portafolio-vras",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### 1.5 Regions

| Región | Código | Propósito |
|:-------|:-------|:----------|
| **US East** | `iad1` | Región principal |

---

## 2. Supabase (Backend as a Service)

### 2.1 Información General

| Campo | Valor |
|:------|:------|
| **Proveedor** | Supabase |
| **Tipo** | BaaS (Database + Auth + Storage + Edge Functions) |
| **Plan** | Free Tier |
| **URL Dashboard** | https://supabase.com/dashboard |

### 2.2 Características Utilizadas

| Característica | Estado | Descripción |
|:---------------|:-------|:------------|
| **PostgreSQL Database** | ✅ | Base de datos relacional |
| **Authentication** | ✅ | Auth de usuarios |
| **Row Level Security** | ✅ | Seguridad a nivel de filas |
| **Realtime** | ⬜ | No utilizado actualmente |
| **Edge Functions** | ✜ | No utilizado actualmente |
| **Storage** | ⬜ | No utilizado actualmente |
| **Vector (AI)** | ⬜ | No utilizado actualmente |

### 2.3 Límites del Free Tier

| Recurso | Límite | Uso Actual |
|:--------|:-------|:-----------|
| **Database Size** | 500 MB | ~10 MB |
| **Bandwidth** | 5 GB/mes | ~1 GB/mes |
| **Auth Users** | 50,000 | ~10 |
| **Storage** | 1 GB | ~100 MB |
| **Edge Function Invocations** | 500K/mes | ~100 |
| **Realtime Connections** | 200 | ~5 |

### 2.4 Datos de Conexión

```typescript
// Frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Backend (Serverless Functions)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
```

### 2.5 Tablas Principales

| Tabla | Propósito |
|:------|:----------|
| `projects` | Proyectos del portafolio |
| `messages` | Mensajes del formulario de contacto |
| `admin_users` | Usuarios administradores |

---

## 3. GitHub (Control de Versiones)

### 3.1 Información General

| Campo | Valor |
|:------|:------|
| **Proveedor** | GitHub |
| **Tipo** | Control de versiones + CI/CD |
| **Plan** | Free |
| **URL Dashboard** | https://github.com/Vic2910 |

### 3.2 Características Utilizadas

| Característica | Estado | Descripción |
|:---------------|:-------|:------------|
| **Repositories** | ✅ | Almacenamiento de código |
| **Branches** | ✅ | `main` y `develop` |
| **Pull Requests** | ✅ | Code review |
| **GitHub Actions** | ✅ | CI/CD pipeline |
| **Issues** | ✅ | Tracking de tareas |
| **GitHub Pages** | ⬜ | No utilizado (usa Vercel) |

### 3.3 Estructura de Ramas

```
main (producción)
├── develop (desarrollo)
├── feature/*
├── fix/*
└── hotfix/*
```

### 3.4 GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:coverage
      - run: npm run build
```

---

## 4. Comparativa de Servicios

| Criterio | Vercel | Supabase | GitHub |
|:---------|:-------|:---------|:-------|
| **Costo** | Free | Free | Free |
| **Escalabilidad** | Automática | Automática | Manual |
| **Facilidad de uso** | Alta | Alta | Media |
| **Documentación** | Excelente | Buena | Excelente |
| **Comunidad** | Grande | Grande | Grande |
| **Soporte** | Community | Community | Community |

---

## 5. Arquitectura de Servicios

```
                    ┌─────────────────┐
                    │     USUARIO     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     DOMINIO     │
                    │ victorarevalo.dev│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      VERCEL     │
                    │  ┌───────────┐  │
                    │  │   CDN     │  │
                    │  └─────┬─────┘  │
                    │        │        │
                    │  ┌─────▼─────┐  │
                    │  │  Server   │  │
                    │  │ Functions │  │
                    │  └─────┬─────┘  │
                    └────────┼────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    SUPABASE     │
                    │  ┌───────────┐  │
                    │  │ PostgreSQL│  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │   Auth    │  │
                    │  └───────────┘  │
                    └─────────────────┘
```

---

## 6. Backup y Recuperación

### 6.1 Backup de Código

| Tipo | Frecuencia | Almacenamiento |
|:-----|:-----------|:---------------|
| **Git** | En cada commit | GitHub |
| **Tags** | En cada release | GitHub |

### 6.2 Backup de Base de Datos

| Tipo | Frecuencia | Almacenamiento |
|:-----|:-----------|:---------------|
| **Supabase Auto-backup** | Diario | Supabase (7 días en Free) |
| **Exportación manual** | Semanal | Local (opcional) |

### 6.3 Plan de Recuperación

| Escenario | Acción | Tiempo estimado |
|:----------|:-------|:----------------|
| **Código perdido** | Clonar desde GitHub | Inmediato |
| **BD corrupta** | Restaurar desde Supabase backup | 5-15 min |
| **Dominio caído** | Verificar DNS, contactar proveedor | 1-24 horas |
| **Vercel caído** | Esperar, usar backup en Netlify | Variable |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*