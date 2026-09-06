# Feature: Explorar Proyectos

> **ID:** F-03 | **Prioridad:** Alta | **Dependencias:** F-01 | **Historia:** HU-02

---

## 1. Objetivo

Implementar la sección de proyectos que muestra una cuadrícula de tarjetas con los proyectos del portafolio, permitiendo filtrar por categoría y hacer click para ver detalles.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-01: Setup Proyecto |
| **Base de datos** | Supabase (tabla projects) |
| **Componentes** | Card, Badge, Filter |

---

## 3. Prerrequisitos

- [ ] F-01 completado
- [ ] Supabase configurado y tabla `projects` creada
- [ ] Datos de proyectos en la base de datos
- [ ] Definir diseño de tarjetas

---

## 4. Implementación

### Paso 1: Crear Hook para Proyectos

**Crear src/hooks/useProjects.ts:**
```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/config/supabase'
import type { Project } from '@/types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching projects')
    } finally {
      setLoading(false)
    }
  }

  return { projects, loading, error, refetch: fetchProjects }
}
```

### Paso 2: Crear Componente ProjectCard

**Crear src/components/common/ProjectCard.tsx:**
```typescript
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer 
                 hover:transform hover:scale-105 transition-all duration-300
                 border border-gray-700 hover:border-blue-500"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Imagen */}
      <div className="aspect-video bg-gray-700 relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-4xl">📁</span>
          </div>
        )}
        
        {/* Badge de destacado */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            Destacado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDesc}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
```

### Paso 3: Crear Componente de Filtros

**Crear src/components/common/FilterTabs.tsx:**
```typescript
interface FilterTabsProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export function FilterTabs({ categories, activeCategory, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          activeCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
```

### Paso 4: Crear Sección de Proyectos

**Crear src/components/sections/Projects.tsx:**
```typescript
import { useState } from 'react'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/common/ProjectCard'
import { FilterTabs } from '@/components/common/FilterTabs'

export function Projects() {
  const { projects, loading, error } = useProjects()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Extraer categorías únicas de tecnologías
  const categories = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort()

  // Filtrar proyectos
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) =>
          p.technologies.includes(activeCategory)
        )

  if (loading) {
    return (
      <section id="proyectos" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="proyectos" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error al cargar proyectos: {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="proyectos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mis Proyectos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en
            desarrollo full stack.
          </p>
        </div>

        {/* Filtros */}
        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No hay proyectos en esta categoría.
          </div>
        )}
      </div>
    </section>
  )
}
```

### Paso 5: Integrar en App.tsx

**Actualizar src/App.tsx:**
```typescript
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Projects />
    </div>
  )
}

export default App
```

### Paso 6: Datos de Ejemplo (Opcional)

**Crear src/data/projects.ts:**
```typescript
export const sampleProjects = [
  {
    id: '1',
    name: 'Nexo-Ferretero',
    slug: 'nexo-ferretero',
    description: 'Dashboard de ventas para e-commerce con métricas en tiempo real.',
    shortDesc: 'Dashboard de ventas con métricas en tiempo real.',
    technologies: ['ASP.NET', 'Razor', 'SQL Server'],
    imageUrl: '/images/projects/nexo-ferretero.jpg',
    repoUrl: '#',
    featured: true,
    orderIndex: 1,
  },
  {
    id: '2',
    name: 'E-commerce Spring',
    slug: 'ecommerce-spring',
    description: 'Plataforma de comercio electrónico completa.',
    shortDesc: 'Plataforma e-commerce con Spring Boot y Angular.',
    technologies: ['Spring Boot', 'Angular', 'MySQL'],
    imageUrl: '/images/projects/ecommerce-spring.jpg',
    repoUrl: '#',
    featured: true,
    orderIndex: 2,
  },
  {
    id: '3',
    name: 'API Documentada',
    slug: 'api-documentada',
    description: 'API REST con documentación Swagger completa.',
    shortDesc: 'API REST con documentación Swagger.',
    technologies: ['Next.js', 'TypeScript', 'Swagger'],
    imageUrl: '/images/projects/api-doc.jpg',
    repoUrl: '#',
    featured: false,
    orderIndex: 3,
  },
]
```

### Paso 7: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement projects section with filtering and cards"
git push origin main
```

---

## 5. Verificación

- [ ] Proyectos se cargan desde Supabase
- [ ] Tarjetas se muestran en cuadrícula
- [ ] Filtros funcionan correctamente
- [ ] Hover effects funcionan
- [ ] Responsive en móvil y desktop
- [ ] Loading state se muestra
- [ ] Error state se maneja

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Proyectos no cargan | Conexión Supabase | Verificar URL y keys |
| Filtros no funcionan | Estado no actualizado | Verificar useState |
| Imágenes no se ven | Ruta incorrecta | Verificar imageUrl |
| Grid no es responsive | Clases faltantes | Verificar grid-cols |

---

## 7. Recursos

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [React useState Hook](https://react.dev/reference/react/useState)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*