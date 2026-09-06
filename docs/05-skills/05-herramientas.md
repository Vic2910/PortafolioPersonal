# Herramientas de Desarrollo

## Resumen

| Categoría | Herramienta Principal | Nivel |
|:----------|:----------------------|:------|
| IDE | VS Code | ⭐⭐⭐ |
| Terminal | PowerShell / CMD | ⭐⭐ |
| API Testing | Postman | ⭐⭐ |
| Documentación API | Swagger/OpenAPI | ⭐⭐ |
| Diseño | Figma (básico) | ⭐ |
| Diagramas | Draw.io / Mermaid | ⭐⭐ |

---

## Visual Studio Code

### Nivel de Dominio: ⭐⭐⭐ Avanzado

### Funcionalidades que Domina

| Categoría | Funcionalidad | Nivel |
|:----------|:--------------|:------|
| **Edición** | Multi-cursor, snippets | ⭐⭐⭐ |
| **Navegación** | Go to definition, find references | ⭐⭐⭐ |
| **Debugging** | Breakpoints, variables, call stack | ⭐⭐⭐ |
| **Git** | Sidebar de source control | ⭐⭐⭐ |
| **Extensions** | Instalación y configuración | ⭐⭐⭐ |
| **Terminal** | Terminal integrada | ⭐⭐⭐ |
| **Settings** | settings.json, keybindings | ⭐⭐ |

### Extensiones Instaladas

| Extensión | Propósito |
|:----------|:----------|
| ESLint | Linting JavaScript/TypeScript |
| Prettier | Formateo de código |
| Tailwind CSS IntelliSense | Autocompletado Tailwind |
| Auto Rename Tag | Renombrar tags HTML |
| Path Intellisense | Autocompletado de rutas |
| GitLens | Información de Git |
| Thunder Client | Testing de APIs (alternativa a Postman) |

### Atajos de Teclado que Usa

| Atajo | Acción |
|:------|:-------|
| `Ctrl + P` | Abrir archivo rápido |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + `` ` `` | Terminal integrada |
| `Ctrl + D` | Seleccionar siguiente coincidencia |
| `Alt + ↑/↓` | Mover línea |
| `Ctrl + /` | Comentar línea |
| `Ctrl + Shift + K` | Eliminar línea |

### Configuración Recomendada

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.tabSize": 2,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true
}
```

---

## Terminal / CLI

### Nivel de Dominio: ⭐⭐ Intermedio

### Shell que Usa

| Shell | Sistema | Nivel |
|:------|:--------|:------|
| PowerShell 5.1 | Windows | ⭐⭐ |
| CMD | Windows | ⭐⭐ |
| Git Bash | Windows | ⭐⭐ |

### Comandos que Domina

| Categoría | Comandos |
|:----------|:---------|
| **Navegación** | cd, dir, ls, pwd |
| **Archivos** | mkdir, touch, cat, type |
| **Git** | git status, add, commit, push |
| **Node** | npm install, run, build |
| **Package managers** | npm, yarn |

### Scripts de Ejemplo

```powershell
# Iniciar proyecto
npm run dev

# Build de producción
npm run build

# Deploy a Vercel
git push origin main

# Verificar estado de Git
git status
git log --oneline -5
```

---

## Postman / API Testing

### Nivel de Dominio: ⭐⭐ Intermedio

### Funcionalidades que Conoce

| Funcionalidad | Descripción | Nivel |
|:--------------|:------------|:------|
| GET requests | Obtener datos | ⭐⭐⭐ |
| POST requests | Crear datos | ⭐⭐⭐ |
| PUT requests | Actualizar datos | ⭐⭐⭐ |
| DELETE requests | Eliminar datos | ⭐⭐⭐ |
| Headers | Configurar headers | ⭐⭐⭐ |
| Body JSON | Enviar datos JSON | ⭐⭐⭐ |
| Environment variables | Variables por entorno | ⭐⭐ |
| Collections | Organizar requests | ⭐⭐ |

### Ejemplo de Request

```json
// POST /api/projects
{
  "name": "Mi Proyecto",
  "description": "Descripción del proyecto",
  "technologies": ["React", "Node.js"],
  "status": "active"
}

// Headers
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

### Alternativas que Conoce

| Herramienta | Uso | Experiencia |
|:------------|:----|:------------|
| Thunder Client (VS Code) | Testing rápido | ⭐⭐ |
| curl | Testing por línea de comandos | ⭐ |
| Swagger UI | Testing de APIs documentadas | ⭐⭐ |

---

## Swagger / OpenAPI

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| OpenAPI spec | Definición de APIs | ⭐⭐ |
| Swagger UI | Interfaz visual | ⭐⭐⭐ |
| Swagger Editor | Edición de specs | ⭐⭐ |
| Code generation | Generar clientes | ⭐ |

### Ejemplo de Spec

```yaml
openapi: 3.0.0
info:
  title: Portfolio API
  version: 1.0.0
paths:
  /api/projects:
    get:
      summary: List all projects
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Project'
    post:
      summary: Create a project
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProjectInput'
      responses:
        '201':
          description: Created
```

---

## Figma (Diseño)

### Nivel de Dominio: ⭐ Básico

### Conocimientos

| Funcionalidad | Descripción | Nivel |
|:--------------|:------------|:------|
| Visualización | Ver diseños existentes | ⭐⭐ |
| Inspect | Obtener valores CSS | ⭐⭐ |
| Comentar | Dejar feedback | ⭐⭐ |
| Componentes | Entender componentes | ⭐ |
| Auto Layout | Layouts responsivos | ⭐ |

### Notas
- Principalmente consume diseños, no los crea
- Usa Figma para entender la UI
- Extrae valores de color, spacing, typography

---

## Draw.io / Diagramas

### Nivel de Dominio: ⭐⭐ Intermedio

### Tipos de Diagramas que Crea

| Tipo | Uso | Nivel |
|:-----|:----|:------|
| Flowcharts | Flujos de proceso | ⭐⭐⭐ |
| Sequence diagrams | Interacciones | ⭐⭐ |
| ER diagrams | Modelado de datos | ⭐⭐ |
| Architecture diagrams | Arquitectura de software | ⭐⭐ |
| Wireframes | Bocetos de UI | ⭐⭐ |

### Diagrama de Ejemplo (Mermaid)

```mermaid
graph TD
    A[Usuario] -->|HTTP Request| B[Frontend React]
    B -->|API Call| C[Backend Vercel Functions]
    C -->|Query| D[Supabase PostgreSQL]
    D -->|Response| C
    C -->|JSON| B
    B -->|Render| A
```

---

## Otras Herramientas

### Navegadores Web

| Nivel | Herramienta | Uso |
|:------|:------------|:----|
| ⭐⭐⭐ | Chrome DevTools | Debugging, Performance |
| ⭐⭐ | Firefox DevTools | Inspector, Console |
| ⭐⭐ | Edge | Testing cross-browser |

### Herramientas de Imagen

| Herramienta | Uso | Nivel |
|:------------|:----|:------|
| Paint.NET | Edición básica | ⭐⭐ |
| Canva | Thumbnails, assets | ⭐⭐ |
| TinyPNG | Compresión de imágenes | ⭐⭐ |

### Herramientas de Comunicación

| Herramienta | Uso | Nivel |
|:------------|:----|:------|
| Slack | Comunicación equipo | ⭐⭐ |
| Discord | Comunidades dev | ⭐⭐ |
| Zoom | Reuniones | ⭐⭐ |

---

## Configuración del Desarrollador

### Estructura de Proyecto Recomendada

```
mi-proyecto/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── assets/
├── public/
├── tests/
├── docs/
├── .eslintrc.js
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Scripts npm Comunes

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  }
}
```

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
