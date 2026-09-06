# Arquitectura — PortafolioVRAS

> **Propósito:** Este directorio contiene la documentación técnica de la arquitectura del portafolio. Define las decisiones de diseño, estructura de componentes, patrones arquitectónicos y estándares de seguridad que gobiernan el sistema.

---

## Resumen Ejecutivo

PortafolioVRAS es una aplicación **Full Stack** que demuestra capacidades técnicas en desarrollo de software. El sistema sigue una arquitectura **SPA + Serverless API** con las siguientes tecnologías principales:

| Capa | Tecnología | Propósito |
|:-----|:-----------|:----------|
| **Frontend** | React + Vite | Interfaz de usuario reactiva |
| **Backend** | Vercel Functions | API serverless |
| **Base de datos** | Supabase (PostgreSQL) | Persistencia de datos |
| **Auth** | Supabase Auth | Autenticación y autorización |
| **Hosting** | Vercel | Despliegue y CDN global |

---

## Estructura del Directorio

```
07-arquitectura/
├── 00-README-indice.md              # Este archivo
├── 01-arquitectura-general.md       # Visión general del sistema
├── 02-arquitectura-frontend.md      # React, Vite, Tailwind, routing
├── 03-arquitectura-backend.md       # Vercel Functions, API routes
├── 04-arquitectura-datos.md         # Supabase schema, modelos, RLS
├── 05-arquitectura-seguridad.md     # OWASP, cabeceras, auth, honeypot
├── 06-arquitectura-despliegue.md    # CI/CD, Vercel, dominio
└── 07-admin-panel.md                # Panel de administración CRUD
```

---

## Índice de Documentos

| ID | Documento | Contenido Principal | Prioridad |
|:---|:----------|:--------------------|:----------|
| ARQ-01 | [Arquitectura General](01-arquitectura-general.md) | Patrón arquitectónico, principios, diagrama de contexto | Alta |
| ARQ-02 | [Arquitectura Frontend](02-arquitectura-frontend.md) | Componentes, routing, estado, estilos | Alta |
| ARQ-03 | [Arquitectura Backend](03-arquitectura-backend.md) | Serverless functions, API routes, validación | Alta |
| ARQ-04 | [Arquitectura de Datos](04-arquitectura-datos.md) | Schema Supabase, modelos, relaciones | Alta |
| ARQ-05 | [Arquitectura de Seguridad](05-arquitectura-seguridad.md) | OWASP, cabeceras HTTP, autenticación | Alta |
| ARQ-06 | [Arquitectura de Despliegue](06-arquitectura-despliegue.md) | CI/CD, variables de entorno, dominio | Media |
| ARQ-07 | [Admin Panel](07-admin-panel.md) | CRUD visual, auth, gestión de contenido | Media |

---

## Diagrama de Arquitectura (Alto Nivel)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          INTERNET                                    │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK (CDN)                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                  FRONTEND (React + Vite)                       │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │ │
│  │  │  Hero   │  │Projects │  │  Skills │  │ Contact │         │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘         │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │ HTTPS
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL FUNCTIONS (Serverless)                     │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │  /contact │  │ /projects │  │  /admin   │  │ /analytics│      │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘      │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │ API Calls
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SUPABASE (BaaS)                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │ PostgreSQL│  │   Auth    │  │  Storage  │  │ Realtime  │      │
│  │ Database  │  │  (JWT)    │  │ (Images)  │  │ (Live)    │      │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Decisiones Arquitectónicas Clave (ADR)

| ID | Decisión | Alternativas Consideradas | Justificación |
|:---|:---------|:--------------------------|:--------------|
| ADR-01 | React + Vite (no Next.js) | Next.js, Angular, Vue | Control total, sin SSR innecesario, experiência del usuario |
| ADR-02 | Vercel Functions (no Express) | Express, Fastify, Hono | Serverless, sin gestión de servidores, escalado automático |
| ADR-03 | Supabase (no Firebase) | Firebase, MongoDB Atlas, PlanetScale | PostgreSQL real, APIs automáticas, tier gratuito generoso |
| ADR-04 | Monorepo (no separado) | Repos separados | Deploy atómico, CI/CD simplificado |
| ADR-05 | TypeScript completo | JavaScript puro | Type safety, mejor DX, menos bugs |

---

## Stack Tecnológico Completo

### Frontend
- **Framework:** React 18+ con TypeScript
- **Build Tool:** Vite 5+
- **Routing:** React Router v6
- **Estilos:** Tailwind CSS 3+
- **State Management:** React Context + Custom Hooks
- **HTTP Client:** Fetch API nativo

### Backend
- **Runtime:** Node.js 20+ (Vercel Functions)
- **Language:** TypeScript
- **Validación:** Zod
- **Rate Limiting:** Custom implementation

### Base de Datos
- **Proveedor:** Supabase
- **Database:** PostgreSQL 15+
- **Auth:** Supabase Auth (JWT)
- **Storage:** Supabase Storage
- **API:** Auto-generada (PostgREST)

### Infraestructura
- **Hosting:** Vercel (Edge Network)
- **CI/CD:** GitHub + Vercel Integration
- **Dominio:** Personalizado (.dev o .com)
- **SSL:** Incluido (Vercel)

---

## Requisitos No Funcionales

| Requisito | Métrica | Herramienta de Medición |
|:----------|:--------|:-------------------------|
| **Rendimiento** | LCP < 2.5s, INP < 200ms, CLS < 0.1 | Lighthouse, Core Web Vitals |
| **Accesibilidad** | WCAG 2.2 AA nivel A | axe-core, Lighthouse |
| **Seguridad** | OWASP Top 10 compliance | securityheaders.com, npm audit |
| **SEO** | Meta tags, sitemap, robots.txt | Google Search Console |
| **Disponibilidad** | 99.9% uptime | Vercel Status |

---

## Referencias

| Documento | Ubicación | Propósito |
|:----------|:----------|:----------|
| Historias de Usuario | `02-historias-usuario/` | Requisitos funcionales |
| Reglas de Negocio | `03-reglas-negocio/` | Restricciones del dominio |
| Marco Normativo | `01-marco-normativo/` | Estándares a cumplir |
| Insumos Brutos | `00-insumos-brutos/` | Información del proyecto |

---

## Próximos Pasos

1. ✅ Completar documentación de arquitectura
2. ⬜ Implementar estructura del proyecto React
3. ⬜ Configurar Supabase y crear schema
4. ⬜ Desarrollar funciones serverless
5. ⬜ Implementar admin panel
6. ⬜ Configurar CI/CD y despliegue

---

**Última actualización:** *2026-09-06*
**Próxima revisión:** *2026-09-13*
**Responsable:** *Victor Rafael Arévalo Sierra*
