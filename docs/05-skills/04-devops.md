# Habilidades DevOps / Infraestructura

## Resumen

| Herramienta | Nivel | Uso Principal |
|:------------|:------|:--------------|
| Git | Intermedio | Control de versiones |
| GitHub | Intermedio | Repositorios, CI/CD |
| Docker | Básico | Contenedores |
| Vercel | Intermedio | Hosting frontend |
| Supabase | Intermedio | Backend as a Service |

---

## Git

### Nivel de Dominio: ⭐⭐ Intermedio

### Comandos que Domina

| Categoría | Comandos | Nivel |
|:----------|:---------|:------|
| Básico | init, add, commit, status | ⭐⭐⭐ |
| Ramas | branch, checkout, merge | ⭐⭐⭐ |
| Remotos | remote, push, pull, fetch | ⭐⭐⭐ |
| Avanzado | rebase, cherry-pick, stash | ⭐⭐ |
| Debugging | bisect, blame, log | ⭐⭐ |
| Configuración | config, alias, hooks | ⭐⭐ |

### Ejemplos de Uso

```bash
# Flujo de trabajo básico
git init
git add .
git commit -m "feat: add hero section"
git push origin main

# Crear y cambiar a rama feature
git checkout -b feature/projects-section
git add .
git commit -m "feat: add project cards component"
git push origin feature/projects-section

# Merge con main
git checkout main
git pull origin main
git merge feature/projects-section

# Ver historial
git log --oneline --graph --all
```

### Git Flow que Implementa

```
main (producción)
  │
  ├── develop (desarrollo)
  │     │
  │     ├── feature/hero-section
  │     ├── feature/projects
  │     └── feature/contact-form
  │
  └── release/v1.0 (opcional)
```

### Áreas de Mejora
- Interactive rebase
- Git hooks personalizados
- Git submodules
- Conventional commits estrictos

---

## GitHub

### Nivel de Dominio: ⭐⭐ Intermedio

### Funcionalidades que Conoce

| Funcionalidad | Descripción | Nivel |
|:--------------|:------------|:------|
| Repositories | Crear, configurar | ⭐⭐⭐ |
| Pull Requests | Crear, revisar | ⭐⭐⭐ |
| Issues | Crear, etiquetar | ⭐⭐⭐ |
| GitHub Actions | CI/CD básico | ⭐⭐ |
| GitHub Pages | Hosting estático | ⭐⭐ |
| Dependabot | Actualización dependencias | ⭐ |
| GitHub Projects | Gestión de tareas | ⭐⭐ |

### Configuración de Repositorio

```markdown
# README.md típico

## 🚀 Proyecto
Nombre del proyecto

## ✨ Características
- Feature 1
- Feature 2

## 🛠️ Tecnologías
- React
- TypeScript
- Tailwind CSS

## 📦 Instalación
```bash
npm install
npm run dev
```

## 🚀 Despliegue
```bash
npm run build
```

## 📝 License
MIT
```

### GitHub Actions que ha Usado

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

### Áreas de Mejora
- GitHub Actions más complejos
- Container registry
- GitHub Codespaces
- Security scanning

---

## Docker

### Nivel de Dominio: ⭐ Básico

### Conocimientos

| Comando/Concepto | Descripción | Nivel |
|:-----------------|:------------|:------|
| docker build | Construir imagen | ⭐ |
| docker run | Ejecutar contenedor | ⭐ |
| docker-compose | Multi-contenedor | ⭐ |
| Dockerfile | Definir imagen | ⭐ |
| Volumes | Persistencia de datos | ⭐ |
| Networks | Networking entre contenedores | ⭐ |

### Ejemplo de Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Ejemplo de docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://...

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Áreas de Mejora
- Docker multi-stage builds
- Docker security best practices
- Kubernetes básico
- Container orchestration

---

## Vercel

### Nivel de Dominio: ⭐⭐ Intermedio

### Funcionalidades que Conoce

| Funcionalidad | Descripción | Nivel |
|:--------------|:------------|:------|
| Deploy automático | Push a deploy | ⭐⭐⭐ |
| Preview deployments | PR previews | ⭐⭐⭐ |
| Environment variables | Variables de entorno | ⭐⭐⭐ |
| Custom domains | Dominios personalizados | ⭐⭐ |
| Analytics | Métricas de uso | ⭐⭐ |
| Speed Insights | Core Web Vitals | ⭐⭐ |

### Configuración de Proyecto

```json
{
  "version": 2,
  "builds": [
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
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Variables de Entorno en Vercel

```bash
# Configuración del proyecto
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Áreas de Mejora
- Edge Functions
- Vercel KV (Redis)
- Vercel Postgres
- ISR (Incremental Static Regeneration)

---

## Supabase

### Nivel de Dominio: ⭐⭐ Intermedio

### Funcionalidades que Conoce

| Funcionalidad | Descripción | Nivel |
|:--------------|:------------|:------|
| Database | PostgreSQL managed | ⭐⭐⭐ |
| Auth | Autenticación JWT | ⭐⭐ |
| Storage | Almacenamiento archivos | ⭐⭐ |
| Realtime | Actualizaciones en vivo | ⭐ |
| Edge Functions | Serverless functions | ⭐ |
| Row Level Security | Seguridad a nivel fila | ⭐ |

### Configuración del Cliente

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Ejemplo de Query

```javascript
// Obtener proyectos
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false })

// Insertar mensaje de contacto
const { data, error } = await supabase
  .from('contact_messages')
  .insert([
    { name: 'John', email: 'john@example.com', message: 'Hello' }
  ])
```

### Áreas de Mejora
- Row Level Security avanzado
- Edge Functions con Deno
- Realtime subscriptions
- Storage buckets optimizados

---

## CI/CD

### Pipeline que Implementa

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐│
│  │  PUSH   │───▶│  BUILD  │───▶│  TEST   │───▶│ DEPLOY  ││
│  │  code   │    │         │    │         │    │         ││
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘│
│                                                               │
│  GitHub          Vercel         Vercel         Vercel        │
│                  (build)        (test)         (deploy)      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Herramientas CI/CD

| Herramienta | Uso | Nivel |
|:------------|:----|:------|
| GitHub Actions | Pipeline CI | ⭐⭐ |
| Vercel | Deploy automático | ⭐⭐⭐ |
| ESLint | Linting | ⭐⭐ |
| Prettier | Formateo | ⭐⭐ |

### Áreas de Mejora
- Testing automatizado en pipeline
- Deploy con approvals
- Rollback automático
- Monitoring post-deploy

---

## Monitoreo y Métricas

### Herramientas que Conoce

| Herramienta | Uso | Nivel |
|:------------|:----|:------|
| Vercel Analytics | Métricas de uso | ⭐⭐ |
| Vercel Speed Insights | Core Web Vitals | ⭐⭐ |
| Lighthouse | Auditoría rendimiento | ⭐⭐ |
| Console.log | Debugging | ⭐⭐⭐ |

### Métricas que Monitorea

| Métrica | Herramienta | Objetivo |
|:--------|:------------|:---------|
| LCP | Lighthouse/Speed Insights | < 2.5s |
| INP | Lighthouse/Speed Insights | < 200ms |
| CLS | Lighthouse/Speed Insights | < 0.1 |
| Uptime | Vercel Status | 99.9% |

### Áreas de Mejora
- Sentry para errores
- Structured logging
- APM (Application Performance Monitoring)
- Alertas automáticas

---

## Seguridad Infraestructura

### Prácticas Implementadas

- [x] Variables de entorno en Vercel (no en código)
- [x] HTTPS habilitado (Vercel SSL)
- [x] CORS configurado
- [x] Rate limiting básico

### Prácticas Pendientes

- [ ] Content Security Policy (CSP)
- [ ] Helmet.js para headers
- [ ] Dependabot alerts
- [ ] Secret scanning

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
