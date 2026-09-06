# ARQ-06: Arquitectura de Despliegue

> **Propósito:** Definir la estrategia de despliegue, CI/CD, configuración de Vercel, variables de entorno, dominio personalizado y monitoreo.

---

## 1. Visión General del Despliegue

PortafolioVRAS se despliega en **Vercel** utilizando su integración nativa con GitHub para CI/CD automático. Cada push a la rama `main` despliega automáticamente a producción.

### 1.1 Flujo de Despliegue

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DESARROLLADOR                                 │
│                                                                      │
│  git push origin main                                               │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         GITHUB                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │  Push detectado en rama main                                   ││
│  │  Trigger: Vercel GitHub Integration                            ││
│  └────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────┬───────────────────────────────────┘
                                  │ Webhook
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         VERCEL                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │  BUILD PHASE                                                    ││
│  │  1. Instalar dependencias (npm install)                        ││
│  │  2. Ejecutar tests (npm test)                                  ││
│  │  3. Build de producción (vite build)                           ││
│  │  4. Compilar serverless functions                              ││
│  └────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │  DEPLOY PHASE                                                   ││
│  │  1. Subir assets a CDN global                                  ││
│  │  2. Deploy serverless functions                                ││
│  │  3. Configurar routing                                         ││
│  │  4. Invalidar cache                                            ││
│  └────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK (CDN GLOBAL)                  │
│                                                                      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │   USA     │  │  Europa   │  │  Asia     │  │ Latam     │      │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘      │
│                                                                      │
│  https://portafolio-vras.vercel.app                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Configuración de CI/CD

### 2.1 Pipeline de Integración Continua

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

### 2.2 Scripts de Package.json

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

## 3. Configuración de Vercel

### 3.1 vercel.json Completo

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

### 3.2 Configuración de Framework

Vercel detecta automáticamente Vite y configura:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 4. Variables de Entorno

### 4.1 Tabla de Variables

| Variable | Tipo | Ubicación | Descripción |
|:---------|:-----|:----------|:------------|
| `SUPABASE_URL` | Secret | Server | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | Secret | Server | Anon key de Supabase |
| `SUPABASE_SERVICE_KEY` | Secret | Server | Service key (admin) |
| `VITE_SUPABASE_URL` | Public | Client | URL para el frontend |
| `VITE_SUPABASE_ANON_KEY` | Public | Client | Anon key para el frontend |
| `CONTACT_EMAIL` | Secret | Server | Email de notificación |

### 4.2 Configuración en Vercel Dashboard

1. Ir a **Project Settings** → **Environment Variables**
2. Agregar cada variable con su valor
3. Seleccionar los ambientes: Production, Preview, Development
4. **Nunca** commitear valores de variables

### 4.3 Acceso a Variables en Código

```typescript
// Frontend (React)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Backend (Vercel Functions)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
```

---

## 5. Dominio Personalizado

### 5.1 Opciones de Dominio

| Dominio | Costo | Recomendación |
|:--------|:------|:--------------|
| `victorarevalo.dev` | ~$12/año | ✅ Recomendado (profesional) |
| `victorarevalo.com` | ~$12/año | ✅ Alternativa |
| `portafolio-vras.vercel.app` | Gratis | ✅ Para desarrollo |

### 5.2 Configuración en Vercel

1. **Comprar dominio** en proveedor (Namecheap, Google Domains, etc.)
2. **Agregar dominio** en Vercel Dashboard → Settings → Domains
3. **Configurar DNS** en el proveedor:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **SSL automático** se configura con Vercel

### 5.3 Redirects

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/:path((?!admin).*)",
      "has": [{ "type": "host", "value": "www.victorarevalo.dev" }],
      "destination": "https://victorarevalo.dev/:path",
      "permanent": true
    }
  ]
}
```

---

## 6. Ambientes

### 6.1 Tabla de Ambientes

| Ambiente | URL | Uso |
|:---------|:----|:----|
| **Production** | `victorarevalo.dev` | Sitio en vivo |
| **Preview** | `portafolio-vras-abc123.vercel.app` | PRs y ramas |
| **Development** | `localhost:5173` | Desarrollo local |

### 6.2 Configuración por Ambiente

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

## 7. Monitoreo y Observabilidad

### 7.1 Vercel Analytics

| Métrica | Descripción | Umbral |
|:--------|:------------|:-------|
| **Visitors** | Visitantes únicos | Tracking |
| **Page Views** | Vistas de página | Tracking |
| **Avg. Load Time** | Tiempo promedio de carga | < 2s |
| **Core Web Vitals** | LCP, INP, CLS | Ver tabla abajo |

### 7.2 Core Web Vitals

| Métrica | Objetivo | Estado |
|:--------|:---------|:-------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ⬜ |
| **INP** (Interaction to Next Paint) | < 200ms | ⬜ |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⬜ |

### 7.3 Speed Insights

Vercel Speed Insights recolecta métricas reales de usuarios:
- Habilitar en Dashboard → Settings → Speed Insights
- Ver métricas en Dashboard → Analytics

### 7.4 Logs

```typescript
// api/utils/logger.ts
export const logger = {
  info: (msg: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message: msg,
      data,
      timestamp: new Date().toISOString(),
    }))
  },
  error: (msg: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message: msg,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    }))
  },
}
```

---

## 8. Performance Optimization

### 8.1 Cache Strategy

| Recurso | TTL | Strategy |
|:--------|:----|:---------|
| **HTML** | 0 (no cache) | Always fresh |
| **JS/CSS** | 1 year | Immutable (fingerprinted) |
| **Images** | 1 year | Immutable |
| **API responses** | 5 min | stale-while-revalidate |

### 8.2 Headers de Cache

```json
// Para assets estáticos
{
  "Cache-Control": "public, max-age=31536000, immutable"
}

// Para API
{
  "Cache-Control": "public, max-age=300, stale-while-revalidate"
}
```

### 8.3 Optimización de Bundle

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
```

---

## 9. Despliegue de Serverless Functions

### 9.1 Estructura

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

### 9.2 Limites del Free Tier

| Recurso | Límite Free | Límite Pro |
|:--------|:------------|:-----------|
| **Invocations** | 100K/mes | 1M/mes |
| **Duration** | 10s | 60s |
| **Memory** | 1024MB | 3008MB |
| **Bundle Size** | 50MB | 50MB |

### 9.3 Cold Starts

Los cold starts son el tiempo que tarda una función en iniciarse la primera vez:
- **Promedio:** 200-500ms
- **Mitigación:** Mantener funciones pequeñas, usar Edge Runtime

---

## 10. Rollback y Recuperación

### 10.1 Rollback en Vercel

1. Ir a **Deployments** en Dashboard
2. Seleccionar el deploy anterior funcional
3. Click **"..."** → **"Promote to Production"**
4. El sitio se revierte en segundos

### 10.2 Recuperación de Errores

| Escenario | Acción |
|:----------|:-------|
| Build falla | Revisar logs, corregir errores |
| Deploy falla | Verificar variables de entorno |
| Runtime error | Revisar serverless function logs |
| Database error | Verificar conexión Supabase |

---

## 11. Checklist de Despliegue

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
