import { useState } from 'react'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../common/ProjectCard'
import { FilterTabs } from '../common/FilterTabs'

export function Projects() {
  const { projects, loading, error } = useProjects()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort()

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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mis Proyectos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Una selección de proyectos que demuestran mis habilidades en
              desarrollo full stack.
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" role="status">
              <span className="sr-only">Cargando proyectos...</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="proyectos" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mis Proyectos
            </h2>
            <p className="text-red-400">Error al cargar proyectos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="proyectos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mis Proyectos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en
            desarrollo full stack.
          </p>
        </div>

        {projects.length > 0 && (
          <FilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {}}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            {projects.length === 0
              ? 'Aún no hay proyectos disponibles.'
              : 'No hay proyectos en esta categoría.'}
          </div>
        )}
      </div>
    </section>
  )
}
