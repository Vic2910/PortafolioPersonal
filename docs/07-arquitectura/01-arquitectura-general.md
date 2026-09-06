# ARQ-01: Arquitectura General

> **Propósito:** Definir la visión general del sistema, patrón arquitectónico adoptado, principios de diseño y restricciones que gobiernan la arquitectura de PortafolioVRAS.

---

## 1. Visión General del Sistema

PortafolioVRAS es una aplicación web **Full Stack** que funciona como portafolio profesional. El sistema permite a los visitantes explorar proyectos, descargar el CV y contactar al desarrollador, mientras que el administrador puede gestionar todo el contenido a través de un panel de control seguro.

### 1.1 Actores del Sistema

| Actor | Rol | Interacciones Principales |
|:------|:----|:--------------------------|
| **Visitante** | Usuario anónimo | Explorar proyectos, ver habilidades, contactar |
| **Reclutador** | Visitante especializado | Evaluar perfil, descargar CV, contactar |
| **Desarrollador (Admin)** | Administrador | Gestionar proyectos, configuración, ver métricas |
| **Sistema** | Automatizado | Recibir contactos, registrar visitas, servir contenido |

### 1.2 Alcance del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORTAFOLIO VRAS                               │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  ÁREA PÚBLICA                               ││
│  │  • Hero Section (identidad profesional)                     ││
│  │  • Proyectos destacados (3-5 casos de estudio)              ││
│  │  • Habilidades técnicas (stack tecnológico)                 ││
│  │  • Sobre mí (biografía profesional)                         ││
│  │  • Formulario de contacto                                   ││
│  │  • Descarga de CV                                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  ÁREA PRIVADA (Admin)                        ││
│  │  • Login seguro (Supabase Auth)                             ││
│  │  • CRUD de proyectos                                        ││
│  │  • Gestión de imágenes                                      ││
│  │  • Ver mensajes de contacto                                 ││
│  │  • Configuración del sitio                                  ││
│  │  • Métricas de visitas                                      ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Patrón Arquitectónico

### 2.1 Arquitectura Seleccionada: SPA + Serverless API

**Justificación:**
- Separación clara entre presentación y lógica de negocio
- Escalado automático sin gestión de servidores
- Costo mínimo (tier gratuito de Vercel y Supabase)
- Rendimiento óptimo (CDN global + edge functions)

### 2.2 Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                      │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React + Vite + Tailwind CSS                          │  │
│  │                                                       │  │
│  │  • Componentes UI (botones, cards, forms)             │  │
│  │  • Páginas (Home, Projects, About, Contact)           │  │
│  │  • Routing (React Router v6)                          │  │
│  │  • State Management (Context + Hooks)                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTPS (Fetch API)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE API (Backend)                      │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Vercel Functions (Node.js + TypeScript)              │  │
│  │                                                       │  │
│  │  • Validación de entrada (Zod)                        │  │
│  │  • Lógica de negocio                                  │  │
│  │  • Rate Limiting                                      │  │
│  │  • Honeypot verification                              │  │
│  │  • Respuestas estandarizadas                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │ API Calls (Supabase Client)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                             │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Supabase (PostgreSQL + Auth + Storage)               │  │
│  │                                                       │  │
│  │  • PostgreSQL Database (projects, messages, config)   │  │
│  │  • Row Level Security (RLS) policies                  │  │
│  │  • Authentication (JWT + email/password)              │  │
│  │  • Storage (imágenes de proyectos, CV)                │  │
│  │  • Auto-generated REST API (PostgREST)                │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Diagrama de Componentes

```
                    ┌─────────────────────────────┐
                    │      Aplicación React         │
                    │                              │
                    │  ┌────────┐  ┌────────┐     │
                    │  │  App   │  │ Router │     │
                    │  └───┬────┘  └───┬────┘     │
                    │      │           │          │
                    │  ┌───▼───────────▼───┐      │
                    │  │    Layout         │      │
                    │  │  ┌─────────────┐  │      │
                    │  │  │   Header    │  │      │
                    │  │  ├─────────────┤  │      │
                    │  │  │   Outlet    │  │      │
                    │  │  │  (pages)    │  │      │
                    │  │  ├─────────────┤  │      │
                    │  │  │   Footer    │  │      │
                    │  │  └─────────────┘  │      │
                    │  └───────────────────┘      │
                    │                              │
                    │  ┌────────────────────────┐  │
                    │  │      Services           │  │
                    │  │  ┌──────────────────┐  │  │
                    │  │  │  SupabaseClient  │  │  │
                    │  │  ├──────────────────┤  │  │
                    │  │  │  API Client      │  │  │
                    │  │  └──────────────────┘  │  │
                    │  └────────────────────────┘  │
                    └──────────────┬───────────────┘
                                   │
                    ┌──────────────▼───────────────┐
                    │    Vercel Functions (API)      │
                    │                               │
                    │  ┌───────┐ ┌───────┐ ┌─────┐│
                    │  │contact│ │projects│ │admin││
                    │  └───┬───┘ └───┬───┘ └──┬──┘│
                    │      │         │        │    │
                    └──────┼─────────┼────────┼───┘
                           │         │        │
                    ┌──────▼─────────▼────────▼───┐
                    │         Supabase              │
                    │  ┌──────┐ ┌──────┐ ┌──────┐ │
                    │  │ DB   │ │ Auth │ │Files │ │
                    │  └──────┘ └──────┘ └──────┘ │
                    └─────────────────────────────┘
```

---

## 3. Principios de Arquitectura

### 3.1 Principios Fundamentales

| ID | Principio | Descripción | Aplicación |
|:---|:----------|:------------|:-----------|
| P-01 | **Separación de Capas** | Cada capa tiene una responsabilidad única | UI ≠ Business Logic ≠ Data Access |
| P-02 | **Seguridad por Defecto** | Todo está restringido a menos que se permita explícitamente | RLS en Supabase, validación en API |
| P-03 | **Rendimiento Primero** | Las decisiones optimizan para velocidad | Lazy loading, CDN, cache |
| P-04 | **Experiencia de Usuario** | La usabilidad es tan importante como la funcionalidad | Accesibilidad WCAG, responsive |
| P-05 | **Mantenibilidad** | El código debe ser fácil de entender y modificar | TypeScript, estructura clara |
| P-06 | **Escalabilidad Horizontal** | El sistema crece sin cambios arquitectónicos | Serverless, database relacional |

### 3.2 Patrones de Diseño Utilizados

| Patrón | Aplicación | Beneficio |
|:-------|:-----------|:----------|
| **Component-based UI** | React components | Reusabilidad, mantenibilidad |
| **Service Layer** | Supabase client, API client | Abstracción de comunicación |
| **Repository Pattern** | Data access through Supabase | Desacoplamiento de BD |
| **HOC / Custom Hooks** | Lógica reutilizable | Separación de concerns |
| **Middleware Pattern** | Vercel Functions | Validación, auth, rate limiting |

---

## 4. Supuestos y Restricciones

### 4.1 Supuestos

| # | Supuesto | Impacto si es falso |
|:--|:---------|:---------------------|
| S-01 | El sitio es principalmente informativo (no transaccional) | Requeriría backend más complejo |
| S-02 | El tráfico será bajo (< 1000 visitas/mes) | No necesita caching agresivo |
| S-03 | No hay contenido dinámico complejo (sin blog) | Simplifica la arquitectura |
| S-04 | Un solo desarrollador mantiene el sistema | Arquitectura no necesita documentación extensiva |
| S-05 | El presupuesto es mínimo | Usa tier gratuito de servicios |

### 4.2 Restricciones

| # | Restricción | Mitigación |
|:--|:------------|:-----------|
| R-01 | Presupuesto mínimo (~$12/año) | Vercel Free + Supabase Free |
| R-02 | Sin experiencia profesional real | Documentar proyectos académicos como reales |
| R-03 | Tiempo limitado de desarrollo | MVP primero, iterar después |
| R-04 | Solo dominio .dev o .com personalizado | Compra anual (~$12) |

---

## 5. Flujos Principales del Sistema

### 5.1 Flujo: Visitante Explora Proyectos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Visitante  │     │   React     │     │  Supabase   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  GET /projects    │                   │
       │──────────────────>│                   │
       │                   │  SELECT * FROM    │
       │                   │  projects WHERE   │
       │                   │  published=true   │
       │                   │──────────────────>│
       │                   │                   │
       │                   │     Projects      │
       │                   │<──────────────────│
       │                   │                   │
       │    Render HTML    │                   │
       │<──────────────────│                   │
       │                   │                   │
│  Proyectos visibles     │                   │
```

### 5.2 Flujo: Envío de Formulario de Contacto

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Visitante  │     │   React     │     │Vercel Func. │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  Llena formulario │                   │
       │──────────────────>│                   │
       │                   │                   │
       │                   │  POST /api/contact│
       │                   │──────────────────>│
       │                   │                   │
       │                   │    Validación:    │
       │                   │    - Honeypot     │
       │                   │    - Rate limit   │
       │                   │    - Zod schema   │
       │                   │                   │
       │                   │   Supabase Insert │
       │                   │──────────────────>│
       │                   │                   │
       │                   │   Success/Error   │
       │                   │<──────────────────│
       │                   │                   │
       │   Mensaje éxito   │                   │
       │<──────────────────│                   │
       │                   │                   │
```

### 5.3 Flujo: Admin Gestiona Proyectos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │     │   React     │     │  Supabase   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  Login (email+pwd)│                   │
       │──────────────────>│                   │
       │                   │  Auth Sign In     │
       │                   │──────────────────>│
       │                   │                   │
       │                   │   JWT Token       │
       │                   │<──────────────────│
       │                   │                   │
       │   Admin Panel     │                   │
       │<──────────────────│                   │
       │                   │                   │
       │  Crear proyecto   │                   │
       │──────────────────>│                   │
       │                   │  POST /api/admin  │
       │                   │  /projects (JWT)  │
       │                   │──────────────────>│
       │                   │                   │
       │                   │  RLS: Verify JWT  │
       │                   │  INSERT project   │
       │                   │──────────────────>│
       │                   │                   │
       │                   │   Success         │
       │                   │<──────────────────│
       │                   │                   │
       │  Proyecto creado  │                   │
       │<──────────────────│                   │
       │                   │                   │
```

---

## 6. Decisiones Arquitectónicas Clave (ADR)

### ADR-01: React + Vite sobre Next.js

**Estado:** Aprobado

**Contexto:** Se necesita un framework moderno para el frontend del portafolio.

**Decisión:** Usar React con Vite en lugar de Next.js.

**Consecuencias:**
- ✅ Control total sobre la configuración
- ✅ Build más rápido
- ✅ Sin dependencia de SSR innecesaria
- ❌ Sin SEO automático (requiere meta tags manuales)
- ❌ Sin generación estática automática

**Justificación:** El portafolio es una SPA donde el SEO básico se maneja con meta tags y el rendimiento es crítico.

---

### ADR-02: Vercel Functions sobre Express

**Estado:** Aprobado

**Contexto:** Se necesita backend para formulario de contacto y CRUD.

**Decisión:** Usar Vercel Functions en lugar de Express en servidor dedicado.

**Consecuencias:**
- ✅ Sin gestión de servidores
- ✅ Escalado automático
- ✅ Tier gratuito generoso
- ❌ Cold starts posibles
- ❌ Limitaciones de ejecución (10s free tier)

**Justificación:** Para un portafolio con tráfico bajo, las limitaciones son aceptables y la simplicidad es invaluable.

---

### ADR-03: Supabase sobre Firebase

**Estado:** Aprobado

**Contexto:** Se necesita base de datos, autenticación y almacenamiento.

**Decisión:** Usar Supabase en lugar de Firebase.

**Consecuencias:**
- ✅ PostgreSQL real (no NoSQL propietario)
- ✅ APIs REST auto-generadas
- ✅ Row Level Security nativo
- ❌ Curva de aprendizaje mayor
- ❌ Menos documentación que Firebase

**Justificación:** La arquitectura relacional es más adecuada para el dominio y RLS ofrece seguridad robusta.

---

### ADR-04: Monorepo sobre Repos Separados

**Estado:** Aprobado

**Contexto:** Frontend y backend se despliegan juntos en Vercel.

**Decisión:** Mantener frontend y backend en el mismo repositorio.

**Consecuencias:**
- ✅ Deploy atómico
- ✅ CI/CD simplificado
- ✅ Código compartido (types)
- ❌ Repositorio más grande
- ❌ Builds pueden ser más lentos

**Justificación:** Para un portafolio personal, la simplicidad del monorepo supera las desventajas.

---

### ADR-05: TypeScript Completo

**Estado:** Aprobado

**Contexto:** Se necesita consistencia y seguridad de tipos.

**Decisión:** Usar TypeScript en frontend, backend y configuraciones.

**Consecuencias:**
- ✅ Type safety en todo el stack
- ✅ Mejor experiencia de desarrollo
- ✅ Menos bugs en runtime
- ❌ Curva de aprendizaje
- ❌ Build más lento

**Justificación:** TypeScript es estándar de la industria y demuestra buenas prácticas profesionales.

---

## 7. Tecnologías y Versiones

| Tecnología | Versión | Propósito | Licencia |
|:-----------|:--------|:----------|:---------|
| React | 18+ | UI Library | MIT |
| Vite | 5+ | Build Tool | MIT |
| TypeScript | 5+ | Type Safety | Apache-2.0 |
| Tailwind CSS | 3+ | Utility-first CSS | MIT |
| React Router | 6+ | Client-side routing | MIT |
| Vercel Functions | - | Serverless backend | Propietaria |
| Supabase JS | 2+ | Database client | MIT |
| Zod | 3+ | Schema validation | MIT |
| PostgreSQL | 15+ | Database | PostgreSQL License |

---

## 8. Referencias

| Referencia | Enlace | Uso |
|:-----------|:-------|:----|
| React Documentation | https://react.dev | Framework frontend |
| Vite Documentation | https://vitejs.dev | Build tool |
| Vercel Functions | https://vercel.com/docs/functions | Serverless backend |
| Supabase Documentation | https://supabase.com/docs | BaaS platform |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ | Seguridad |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Accesibilidad |
| Core Web Vitals | https://web.dev/vitals/ | Rendimiento |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
