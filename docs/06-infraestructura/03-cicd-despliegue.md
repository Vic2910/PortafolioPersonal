# CI/CD y Despliegue

> **Propósito:** Documentar el pipeline de integración continua, despliegue continuo y configuración de automatizaciones.

---

## 1. Resumen del Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE CI/CD                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DESARROLLADOR                                              │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────┐                                           │
│  │ git push    │                                           │
│  └──────┬──────┘                                           │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │   GITHUB    │───▶│   ACTIONS   │───▶│    VERCEL   │    │
│  │             │    │             │    │             │    │
│  │ • Push      │    │ • Lint      │    │ • Build     │    │
│  │ • PR        │    │ • TypeCheck │    │ • Deploy    │    │
│  │ • Merge     │    │ • Test      │    │ • CDN       │    │
│  └─────────────┘    │ • Build     │    └─────────────┘    │
│                     └─────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. GitHub Actions (CI)

### 2.1 Configuración del Workflow

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
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

### 2.2 Etapas del Pipeline

| Etapa | Comando | Descripción | Tiempo Estimado |
|:------|:--------|:------------|:----------------|
| **Checkout** | `actions/checkout@v4` | Descargar código | 10s |
| **Setup** | `actions/setup-node@v4` | Configurar Node.js | 15s |
| **Install** | `npm ci` | Instalar dependencias | 30s |
| **Lint** | `npm run lint` | Verificar código | 10s |
| **TypeCheck** | `npm run typecheck` | Verificar tipos | 15s |
| **Test** | `npm run test:coverage` | Ejecutar tests | 20s |
| **Build** | `npm run build` | Compilar proyecto | 30s |
| **Total** | | | **~2 min** |

### 2.3 Scripts de Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## 3. Vercel (CD)

### 3.1 Flujo de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOY                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. BUILD PHASE                                             │
│     ├── npm install                                         │
│     ├── npm test                                            │
│     ├── vite build                                          │
│     └── Compilar serverless functions                       │
│                                                              │
│  2. DEPLOY PHASE                                            │
│     ├── Subir assets a CDN global                           │
│     ├── Deploy serverless functions                         │
│     ├── Configurar routing                                  │
│     └── Invalidar cache                                     │
│                                                              │
│  3. POST-DEPLOY                                             │
│     ├── Verificar SSL                                       │
│     ├── Verificar dominio                                   │
│     └── Enviar notificación                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 vercel.json Completo

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "name": "portafolio-vras",
  "framework": "vite",
  
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  
  "builds": [
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ],
  
  "env": {
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_KEY": "@supabase-service-key",
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  },
  
  "regions": ["iad1"],
  
  "crons": []
}
```

---

## 4. Tipos de Deploy

### 4.1 Deploy Automático

| Evento | Rama | Ambiente | Acción |
|:-------|:-----|:---------|:-------|
| **Push** | `main` | Production | Deploy automático |
| **Push** | `develop` | Preview | Deploy automático |
| **PR** | Cualquiera | Preview | Deploy automático |
| **Merge** | `main` | Production | Deploy automático |

### 4.2 Deploy Manual

```bash
# Deploy a producción
vercel --prod

# Deploy a preview
vercel

# Deploy con alias
vercel --alias portafolio-vras.vercel.app
```

---

## 5. Ambientes

### 5.1 Tabla de Ambientes

| Ambiente | URL | Uso | Variables |
|:---------|:----|:----|:----------|
| **Production** | `victorarevalo.dev` | Sitio en vivo | Production |
| **Preview** | `portafolio-vras-abc123.vercel.app` | PRs y ramas | Preview |
| **Development** | `localhost:5173` | Desarrollo local | Development |

### 5.2 Configuración por Ambiente

```typescript
// src/config/environment.ts
export const config = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
}
```

---

## 6. Serverless Functions

### 6.1 Estructura

```
api/
├── contact.ts          → POST /api/contact
├── health.ts           → GET /api/health
├── projects/
│   ├── index.ts        → GET /api/projects
│   └── [id].ts         → GET /api/projects/[id]
└── admin/
    └── projects/
        ├── index.ts    → GET/POST /api/admin/projects
        └── [id].ts     → GET/PUT/DELETE /api/admin/projects/[id]
```

### 6.2 Límites

| Recurso | Límite Free | Límite Pro |
|:--------|:------------|:-----------|
| **Invocations** | 100K/mes | 1M/mes |
| **Duration** | 10s | 60s |
| **Memory** | 1024MB | 3008MB |
| **Bundle Size** | 50MB | 50MB |

### 6.3 Cold Starts

| Promedio | Mitigación |
|:---------|:-----------|
| 200-500ms | Mantener funciones pequeñas |

---

## 7. Rollback

### 7.1 Proceso de Rollback

1. Ir a **Deployments** en Vercel Dashboard
2. Seleccionar el deploy anterior funcional
3. Click **"..."** → **"Promote to Production"**
4. El sitio se revierte en segundos

### 7.2 Escenarios de Recuperación

| Escenario | Acción | Tiempo |
|:----------|:-------|:-------|
| **Build falla** | Revisar logs, corregir errores | 5-10 min |
| **Deploy falla** | Verificar variables de entorno | 5 min |
| **Runtime error** | Revisar serverless function logs | 10 min |
| **Database error** | Verificar conexión Supabase | 5 min |

---

## 8. Checklist de Despliegue

### Pre-Despliegue
- [ ] Código en rama `main`
- [ ] Tests pasando
- [ ] Linting sin errores
- [ ] Build exitoso localmente
- [ ] Variables de entorno configuradas

### Despliegue
- [ ] Push a `main` exitoso
- [ ] Build en Vercel exitoso
- [ ] Deploy completado
- [ ] SSL funcionando
- [ ] Dominio resolviendo

### Post-Despliegue
- [ ] Homepage carga correctamente
- [ ] Todas las rutas funcionan
- [ ] API endpoints responden
- [ ] Formulario de contacto funciona
- [ ] Admin panel accesible
- [ ] Core Web Vitals óptimos

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*