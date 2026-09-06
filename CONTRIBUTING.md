# Contribuir en PortafolioVRAS

Guía operativa para el desarrollo y mantenimiento de **PortafolioVRAS**, un portafolio de desarrollador de software construido bajo la metodología de **Desarrollo Dirigido por Especificaciones (Spec-Driven Development, SDD)** con el asistente **OpenCode**.

Este documento establece las convenciones, estándares y flujos de trabajo que todo cambio debe cumplir antes de ser considerado completo.

---

## 1. Arquitectura del proyecto

```
PortafolioVRAS/
├── CONTRIBUTING.md
├── README.md
├── docs/
│   ├── 00-insumos-brutos/          # Documentos fuente y investigaciones
│   ├── 01-marco-normativo/         # Estándares y normas de referencia
│   ├── 02-historias-usuario/       # Historias de usuario del portafolio
│   ├── 03-reglas-negocio/          # Reglas de negocio del dominio
│   ├── 04-agentes-negocio/         # Agentes y actores del sistema
│   ├── 05-skills/                  # Habilidades y competencias técnicas
│   ├── 06-infraestructura/         # Esquemas de infraestructura
│   ├── 07-arquitectura/            # Decisiones arquitectónicas
│   ├── 08-roadmaps/                # Hojas de ruta
│   ├── 09-runbooks/                # Procedimientos operativos
│   └── 10-bitacora/                # Bitácora de desarrollo
└── src/
    └── [proyectos-del-portafolio]/ # Casos de estudio y código fuente
```

| Carpeta | Propósito |
|:---|:---|
| `docs/00-insumos-brutos/` | Investigaciones, documentos fuente y borradores que alimentan el marco normativo. |
| `docs/01-marco-normativo/` | Estándares oficiales (OWASP, ISO, WCAG, Conventional Commits, etc.) que rigen cada aspecto del proyecto. OpenCode los consume como reglas de validación. |
| `docs/02-historias-usuario/` a `10-bitacora/` | Documentación organizada por dominio: requisitos, reglas, infraestructura, arquitectura, roadmaps, runbooks y bitácora. |
| `src/` | Código fuente de los proyectos y casos de estudio del portafolio. |

---

## 2. Flujo de trabajo SDD

El desarrollo sigue un ciclo de especificación documentada:

1. **Especificar** — Definir el requisito o decisión técnica en un archivo dentro de `docs/` (historia de usuario, regla de negocio, decisión arquitectónica).
2. **Referenciar marco normativo** — Identificar qué normas de `docs/01-marco-normativo/` aplican al cambio (calidad, seguridad, accesibilidad, etc.).
3. **Implementar** — Desarrollar la funcionalidad en `src/` siguiendo las convenciones de código y las restricciones del marco normativo.
4. **Validar** — Ejecutar la checklist pre-despliegue (sección 11) contra el cambio realizado.
5. **Documentar** — Actualizar la documentación relevante si el cambio afecta la arquitectura, las reglas de negocio o los roadmaps.

### Regla para OpenCode

Toda tarea asignada a OpenCode debe incluir una referencia explícita al (o los) archivo(s) de `docs/01-marco-normativo/` contra el cual se validará el resultado. Ejemplo:

> "Implementar formulario de contacto validando contra `docs/01-marco-normativo/01-owasp-top-10-2025.md` y `docs/01-marco-normativo/03-cabeceras-seguridad-http.md`."

---

## 3. Convenciones de código

### 3.1 Estructura y modularidad

- Separar rutas, controladores, servicios y utilidades en módulos independientes.
- Evitar monolitos: cada funcionalidad con responsabilidad clara.
- Código autoexplicativo; los comentarios solo cuando la intención no sea obvia (por ejemplo, justificación de un trade-off).

### 3.2 HTML semántico

- Usar etiquetas `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` en lugar de `<div>` genéricos.
- Incluir enlace de salto de navegación (`skip to content`) al inicio del DOM.
- Soporte completo de navegación por teclado con `:focus-visible`.

### 3.3 Diseño visual

- **Bento Grid** mediante CSS Grid con `gap` de 16px a 24px.
- **Paleta cromática:** proporción 60-30-10 (neutro base — estructura — acento funcional).
- **Tipografía:** máximo 2 familias (sans-serif para texto + monoespaciada para código/metadatos).
- **Mobile-first:** todas las layouts deben ser adaptativas con zonas de pulsación táctil ≥ 24px.

### 3.4 Linters y formato

- Configurar ESLint y Prettier (u equivalentes) según el stack tecnológico confirmado.
- Ejecutar análisis estático antes de cada commit.

---

## 4. Commits y versionado

### 4.1 Conventional Commits (obligatorio)

Todo mensaje de commit debe seguir el formato:

```
<tipo>[ámbito]: <descripción>
```

| Tipo | Uso |
|:---|:---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `docs` | Cambios exclusivamente de documentación |
| `style` | Formato que no afecta el significado del código |
| `refactor` | Reestructuración sin cambio de comportamiento |
| `perf` | Mejora de rendimiento |
| `test` | Adición o corrección de pruebas |
| `build` | Cambios en sistema de compilación o dependencias |
| `ci` | Cambios en configuración de integración continua |
| `chore` | Mantenimiento general que no modifica código fuente ni pruebas |

**Reglas:**

- Modo imperativo, tiempo presente, minúsculas, sin punto final.
- Ámbito opcional entre paréntesis: `feat(formulario-contacto): agrega validación de correo`.
- Un commit = un cambio lógico atómico.
- Breaking changes: `feat!:` o pie `BREAKING CHANGE:`.

Referencia completa: [`docs/01-marco-normativo/01-conventional-commits.md`](docs/01-marco-normativo/01-conventional-commits.md)

### 4.2 Semantic Versioning

Cuando un proyecto del portafolio se publique como paquete o release etiquetado:

```
MAYOR.MENOR.PARCHE
```

- **MAYOR:** cambios incompatibles con la API pública.
- **MENOR:** funcionalidad nueva retrocompatible.
- **PARCHE:** correcciones retrocompatibles.

Referencia completa: [`docs/01-marco-normativo/02-semantic-versioning.md`](docs/01-marco-normativo/02-semantic-versioning.md)

---

## 5. Estrategia de ramas Git

> **Nota:** La estrategia de ramas aún no está definida. Este sección se actualizará cuando se confirme.

Opciones consideradas:

| Estrategia | Cuándo usarla |
|:---|:---|
| **Trunk-based (main)** | Desarrollo iterativo rápido, commits atómicos directos en `main`. Ideal para proyecto personal con asistencia de IA. |
| **Feature branches** | Cuando se necesiten cambios experimentales paralelos o revisiones antes de integrar. |

---

## 6. Accesibilidad — WCAG 2.2 AA

Todo cambio de interfaz debe cumplir los siguientes criterios:

| Requisito | Nivel | Implementación |
|:---|:---|:---|
| Navegación por teclado completa | A | Todos los elementos interactivos accesibles via `Tab`, `Enter` y `Space`. |
| Enfoque visible | AA | Estilos explícitos en `:focus-visible`. |
| Contraste mínimo 4.5:1 (texto) | AA | Verificar con herramientas de contraste en ambas paletas (claro y oscuro). |
| Contraste mínimo 3:1 (UI componentes) | AA | Bordes, iconos y elementos interactivos. |
| Texto alternativo en imágenes | A | Atributo `alt` contextual; `aria-hidden="true"` en elementos decorativos. |
| Tamaño de objetivo táctil ≥ 24px | AA | Botones y enlaces con dimensiones suficientes o espaciado compensatorio. |
| Skip to content | A | Enlace oculto al inicio del DOM que sitúa el foco en `<main>`. |

Referencia completa: [`docs/01-marco-normativo/01-wcag-2.2-aa.md`](docs/01-marco-normativo/01-wcag-2.2-aa.md)

---

## 7. Rendimiento — Core Web Vitals

| Métrica | Umbral | Técnica |
|:---|:---|:---|
| **LCP** (Largest Contentful Paint) | < 2.5 s | Fuentes locales con `preload`, imágenes en AVIF/WebP, `srcset` adaptativo. |
| **INP** (Interaction to Next Paint) | < 200 ms | Hilo principal sin tareas bloqueantes, scripts analíticos delegados a `requestIdleCallback` o web workers. |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Dimensiones explícitas (`width`, `height` o `aspect-ratio`) en todas las imágenes y contenedores. |

**Arquitectura de renderizado recomendada:** SSG (Static Site Generation) con hidratación selectiva o arquitectura de islas. Alojamiento en CDN perimetral con soporte HTTP/3.

Referencia completa: [`docs/01-marco-normativo/02-core-web-vitals.md`](docs/01-marco-normativo/02-core-web-vitals.md)

---

## 8. Seguridad

### 8.1 Cabeceras HTTP obligatorias

| Cabecera | Directiva recomendada |
|:---|:---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'nonce-...'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

### 8.2 Formulario de contacto

- **Honeypot** (campo oculto con CSS) en lugar de CAPTCHA.
- **Validación server-side** con esquemas tipados (Zod o equivalente).
- **Rate limiting** por IP en la función de envío.
- **Variables de entorno** para credenciales de servicios de correo (nunca en el repositorio).
- Función de envío en entorno serverless (no expuesta al cliente).

Referencia completa: [`docs/01-marco-normativo/01-owasp-top-10-2025.md`](docs/01-marco-normativo/01-owasp-top-10-2025.md)

---

## 9. Documentación de proyectos

Cada caso de estudio en `src/` debe seguir esta estructura narrativa:

| Sección | Contenido |
|:---|:---|
| **Resumen ejecutivo** | Función del sistema, rol individual (liderazgo, arquitectura, refactorización), enlaces a producción y repositorio. |
| **Arquitectura y trade-offs** | Diagrama de capas, justificación de tecnologías seleccionadas frente a alternativas. |
| **Resolución de desafíos** | Fragmentos de código que ilustren patrones de diseño o algoritmos clave. |
| **Impacto y métricas** | Datos cuantificables: latencia, tasa de error, usuarios, rendimiento. |

### Requisitos del README de cada proyecto

- Resumen del proyecto.
- Diagrama conceptual de arquitectura.
- Instrucciones reproducibles para ejecución local.
- Archivo `.env.example` con las variables de entorno requeridas.

---

## 10. Checklist pre-despliegue

Antes de considerar completo cualquier cambio, verificar:

- [ ] **Commits:** Mensajes conformes a Conventional Commits, atómicos y descriptivos.
- [ ] **HTML:** Etiquetas semánticas, skip-to-content incluido.
- [ ] **Accesibilidad:** Navegación por teclado funcional, contraste verificado, `alt` en imágenes, `:focus-visible` implementado.
- [ ] **Rendimiento:** LCP < 2.5s, INP < 200ms, CLS < 0.1 (medir con Lighthouse o similar).
- [ ] **Seguridad:** Cabeceras HTTP configuradas, honeypot activo en formulario, sin credenciales en el repositorio.
- [ ] **Código:** Linters ejecutados sin errores, código modular y autoexplicativo.
- [ ] **Documentación:** README del proyecto actualizado, `.env.example` incluido si aplica.
- [ ] **Marco normativo:** Cambio validado contra la(s) norma(s) aplicable(s) de `docs/01-marco-normativo/`.

---

## 11. Stack tecnológico

> **Estado: Por definir.**
>
> El stack tecnológico se confirmará una vez completada la documentación de contexto en `docs/`. Las opciones evaluadas incluyen frameworks de renderizado estático (Astro, Next.js, SvelteKit), herramientas de análisis estático (ESLint, Prettier), validación (Zod), y despliegue en CDN (Cloudflare Pages, Vercel, Netlify).

---

## 12. Referencias al marco normativo

Todos los estándares que rigen este proyecto están documentados en [`docs/01-marco-normativo/`](docs/01-marco-normativo/):

| Categoría | Archivo | Estándar |
|:---|:---|:---|
| **Leyes** | `01-ley-proteccion-datos-personales.md` | Ley para la Protección de Datos Personales (El Salvador) |
| | `02-ley-ciberseguridad-seguridad-informacion.md` | Ley de Ciberseguridad y Seguridad de la Información |
| | `03-ley-especial-delitos-informaticos.md` | Ley Especial contra los Delitos Informáticos |
| | `04-ley-firma-electronica.md` | Ley de Firma Electrónica |
| | `05-ley-propiedad-intelectual.md` | Ley de Propiedad Intelectual |
| **Seguridad** | `01-owasp-top-10-2025.md` | OWASP Top 10:2025 |
| | `02-owasp-asvs.md` | OWASP ASVS 5.0.0 |
| | `03-cabeceras-seguridad-http.md` | Cabeceras de Seguridad HTTP |
| **Calidad** | `01-iso-iec-25010-calidad-software.md` | ISO/IEC 25010:2023 |
| | `02-iso-iec-27001-seguridad-informacion.md` | ISO/IEC 27001 |
| | `03-iso-9241-usabilidad-ux.md` | ISO 9241-11 / 9241-210 |
| **Accesibilidad** | `01-wcag-2.2-aa.md` | WCAG 2.2 AA (W3C) |
| | `02-core-web-vitals.md` | Core Web Vitals (Google) |
| **Ingeniería** | `01-conventional-commits.md` | Conventional Commits 1.0.0 |
| | `02-semantic-versioning.md` | Semantic Versioning 2.0.0 |

Índice completo: [`docs/01-marco-normativo/00-README-indice.md`](docs/01-marco-normativo/00-README-indice.md)
