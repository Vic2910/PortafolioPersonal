# Feature: Caso de Estudio

> **ID:** F-04 | **Prioridad:** Alta | **Dependencias:** F-03 | **Historia:** HU-03

---

## 1. Objetivo

Implementar la vista detallada de un proyecto (caso de estudio) que muestra información completa: descripción, tecnologías, arquitectura, decisiones técnicas, gallery de imágenes y enlaces.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-03: Explorar Proyectos |
| **Librería** | React Router v6 |
| **Componentes** | Image Gallery, Tabs |

---

## 3. Prerrequisitos

- [ ] F-03 completado
- [ ] React Router configurado
- [ ] Datos detallados de proyectos disponibles
- [ ] Imágenes de proyectos preparadas

---

## 4. Implementación

### Paso 1: Configurar React Router

**Instalar React Router:**
```bash
npm install react-router-dom
```

**Crear src/App.tsx con rutas:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { ProjectDetail } from './pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900">
            <Hero />
            <Projects />
          </div>
        } />
        <Route path="/proyecto/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### Paso 2: Crear Página de Detalle

**Crear src/pages/ProjectDetail.tsx:**
```typescript
import { useParams, Link } from 'react-router-dom'
import { useProjects } from '@/hooks/useProjects'
import { ProjectGallery } from '@/components/common/ProjectGallery'
import { TechStack } from '@/components/common/TechStack'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { projects, loading } = useProjects()

  const project = projects.find((p) => p.slug === slug)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl mb-4">Proyecto no encontrado</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header con botón volver */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Volver a proyectos
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Título y metadata */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
            <div className="flex flex-wrap gap-4 text-gray-400">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Demo en vivo →
                </a>
              )}
            </div>
          </div>

          {/* Gallery */}
          <ProjectGallery images={[]} projectId={project.id} />

          {/* Contenido del caso de estudio */}
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Descripción */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </section>

              {/* Problema y Solución */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Problema y Solución</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-red-400 mb-3">
                      🎯 Problema
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Necesidad de visualizar métricas de ventas en tiempo real
                      para la toma de decisiones en tiendas online.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      ✅ Solución
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Dashboard interactivo con gráficas dinámicas, filtros por
                      fecha y exportación de reportes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Funcionalidades */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Funcionalidades</h2>
                <ul className="space-y-2">
                  {['Dashboard con gráficas de ventas', 'Filtros por fecha y categoría', 'Exportación de reportes', 'Autenticación de usuarios', 'API REST para datos'].map(
                    (func) => (
                      <li key={func} className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400">✓</span>
                        {func}
                      </li>
                    )
                  )}
                </ul>
              </section>

              {/* Arquitectura */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Arquitectura</h2>
                <div className="bg-gray-800 p-6 rounded-xl">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│              FRONTEND                   │
│  React + TypeScript + Tailwind CSS     │
└─────────────────┬───────────────────────┘
                  │ API Calls
                  ▼
┌─────────────────────────────────────────┐
│              BACKEND                    │
│  ASP.NET Core + C#                      │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           BASE DE DATOS                 │
│  SQL Server                             │
└─────────────────────────────────────────┘`}
                  </pre>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Tech Stack */}
              <TechStack technologies={project.technologies} />

              {/* Rol */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4">Mi Rol</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Diseño de arquitectura</li>
                  <li>• Desarrollo de backend</li>
                  <li>• Integración de base de datos</li>
                  <li>• Despliegue y configuración</li>
                </ul>
              </div>

              {/* Timeline */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4">Timeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Duración:</span>
                    <span className="text-white">2 meses</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Estado:</span>
                    <span className="text-green-400">Completado</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tipo:</span>
                    <span className="text-white">Académico</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
```

### Paso 3: Crear Componentes Auxiliares

**Crear src/components/common/ProjectGallery.tsx:**
```typescript
import { useState } from 'react'

interface ProjectGalleryProps {
  images: string[]
  projectId: string
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 text-xl">📷 Imágenes del proyecto próximamente</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
        <img
          src={images[selectedImage]}
          alt="Project screenshot"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 ${
                selectedImage === index
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Crear src/components/common/TechStack.tsx:**
```typescript
interface TechStackProps {
  technologies: string[]
}

const techColors: Record<string, string> = {
  'React': 'bg-blue-500/20 text-blue-400',
  'TypeScript': 'bg-blue-600/20 text-blue-300',
  'ASP.NET': 'bg-purple-500/20 text-purple-400',
  'Spring Boot': 'bg-green-500/20 text-green-400',
  'SQL Server': 'bg-red-500/20 text-red-400',
  'MySQL': 'bg-orange-500/20 text-orange-400',
  'MongoDB': 'bg-green-600/20 text-green-300',
}

export function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className={`px-3 py-1 rounded-full text-sm ${
              techColors[tech] || 'bg-gray-700 text-gray-300'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
```

### Paso 4: Actualizar ProjectCard para Navegación

**Actualizar src/components/common/ProjectCard.tsx:**
```typescript
import { useNavigate } from 'react-router-dom'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <article
      className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer 
                 hover:transform hover:scale-105 transition-all duration-300
                 border border-gray-700 hover:border-blue-500"
      onClick={() => navigate(`/proyecto/${project.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/proyecto/${project.slug}`)}
    >
      {/* ... resto del componente sin cambios */}
    </article>
  )
}
```

### Paso 5: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement project detail page with case study layout"
git push origin main
```

---

## 5. Verificación

- [ ] Click en proyecto navega a `/proyecto/:slug`
- [ ] Detalle del proyecto se muestra correctamente
- [ ] Gallery funciona (si hay imágenes)
- [ ] Tech stack se muestra con colores
- [ ] Botón volver funciona
- [ ] Responsive en móvil y desktop
- [ ] 404 se muestra si slug no existe

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Página no carga | Ruta mal configurada | Verificar React Router |
| Proyecto no encontrado | Slug incorrecto | Verificar datos en Supabase |
| Imágenes no se ven | Rutas incorrectas | Verificar imageUrl |
| Navegación no funciona | Link sin handler | Verificar onClick |

---

## 7. Recursos

- [React Router Documentation](https://reactrouter.com/en/main)
- [Dynamic Routes](https://reactrouter.com/en/main/start/concepts#dynamic-route-segments)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*