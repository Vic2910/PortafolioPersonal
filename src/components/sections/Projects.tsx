import { useState } from 'react'
import { sampleProjects } from '../../data/projects'
import { ProjectCard } from '../common/ProjectCard'
import { FilterTabs } from '../common/FilterTabs'

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = Array.from(
    new Set(sampleProjects.flatMap((p) => p.technologies))
  ).sort()

  const filteredProjects =
    activeCategory === 'all'
      ? sampleProjects
      : sampleProjects.filter((p) =>
          p.technologies.includes(activeCategory)
        )

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

        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

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
            No hay proyectos en esta categoría.
          </div>
        )}
      </div>
    </section>
  )
}
