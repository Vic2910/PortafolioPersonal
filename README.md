# PortafolioVRAS

Portafolio profesional de desarrollo de software de **Victor Rafael Arévalo Sierra**. Aplicación web Full Stack construida bajo la metodología de **Desarrollo Dirigido por Especificaciones (SDD)**.

---

## Descripción

PortafolioVRAS es una plataforma que permite a visitantes y reclutadores técnicos explorar proyectos, descargar el CV y contactar al desarrollador. Incluye un panel de administración para gestionar contenido de forma autónoma.

### Características principales

- **Hero Section** — Identidad profesional y accesos directos
- **Proyectos destacados** — 3-5 casos de estudio con arquitectura, trade-offs y métricas
- **Habilidades técnicas** — Stack tecnológico categorizado por dominio
- **Sobre mí** — Biografía profesional
- **Formulario de contacto** — Con honeypot anti-spam y validación server-side
- **Descarga de CV** — Formato ATS-optimizado
- **Panel de administración** — CRUD de proyectos, gestión de imágenes, métricas

---

## Stack tecnológico

| Capa | Tecnología |
|:---|:---|
| Frontend | React 18+ / TypeScript / Vite 5+ / Tailwind CSS 3+ |
| Enrutamiento | React Router v6 |
| Backend | Vercel Functions (Node.js 20+) |
| Validación | Zod |
| Base de datos | Supabase (PostgreSQL 15+) |
| Autenticación | Supabase Auth (JWT) |
| Hosting | Vercel (Edge Network) |
| CI/CD | GitHub + Vercel |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 20+ LTS
- npm 10+
- [Git](https://git-scm.com/)
- Cuenta en [GitHub](https://github.com/)
- Cuenta en [Supabase](https://supabase.com/)
- Cuenta en [Vercel](https://vercel.com/)

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Vic2910/PortafolioPersonal.git
cd PortafolioPersonal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Comandos disponibles

| Comando | Descripción |
|:---|:---|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Compilar para producción (tsc + vite build) |
| `npm run lint` | Análisis estático con ESLint |
| `npm run typecheck` | Verificación de tipos (tsc --noEmit) |
| `npm test` | Ejecutar pruebas (Vitest) |

---

## Estructura del proyecto

```
PortafolioVRAS/
├── docs/                          # Documentación SDD
│   ├── 00-insumos-brutos/         # Fuentes e investigaciones
│   ├── 01-marco-normativo/        # OWASP, ISO, WCAG, Conventional Commits
│   ├── 02-historias-usuario/      # Historias de usuario
│   ├── 03-reglas-negocio/         # Reglas de negocio
│   ├── 04-agentes-negocio/        # Actores del sistema
│   ├── 05-skills/                 # Inventario de habilidades
│   ├── 06-infraestructura/        # Esquemas de infraestructura
│   ├── 07-arquitectura/           # Decisiones arquitectónicas (ADR)
│   ├── 08-roadmaps/               # Hojas de ruta de features
│   ├── 09-runbooks/               # Procedimientos operativos
│   └── 10-bitacora/               # Bitácora de desarrollo
├── src/                           # Código fuente
├── public/                        # Archivos estáticos
├── CONTRIBUTING.md                # Guía de contribución
└── README.md
```

---

## Metodología de desarrollo

Este proyecto sigue **Spec-Driven Development (SDD)**:

1. **Especificar** — Definir requisitos en `docs/`
2. **Referenciar** — Identificar estándares normativos aplicables
3. **Implementar** — Desarrollar en `src/` siguiendo convenciones
4. **Validar** — Verificar contra checklist pre-despliegue
5. **Documentar** — Actualizar docs si cambia arquitectura o reglas

---

## Estándares y normativas

| Categoría | Estándar |
|:---|:---|
| Seguridad | OWASP Top 10:2025, OWASP ASVS 5.0.0 |
| Calidad | ISO/IEC 25010:2023, ISO/IEC 27001 |
| Accesibilidad | WCAG 2.2 AA, Core Web Vitals |
| Ingeniería | Conventional Commits 1.0.0, Semantic Versioning 2.0.0 |
| Legal (El Salvador) | Ley de Protección de Datos Personales, Ley de Ciberseguridad |

Índice completo: [`docs/01-marco-normativo/00-README-indice.md`](docs/01-marco-normativo/00-README-indice.md)

---

## Contribuir

Consultar la guía completa en [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

## Contacto

| Canal | Enlace |
|:---|:---|
| GitHub | [github.com/Vic2910](https://github.com/Vic2910) |
| Email | victorarevalosierra@gmail.com |
| LinkedIn | [LinkedIn](https://linkedin.com/) |
