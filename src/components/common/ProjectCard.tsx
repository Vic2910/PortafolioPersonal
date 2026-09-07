import type { Project } from '../../types'

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
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            Destacado
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDesc}
        </p>

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
