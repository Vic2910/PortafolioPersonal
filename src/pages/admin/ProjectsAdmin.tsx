import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase'
import type { Project } from '../../types'

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDesc: '',
    technologies: '',
    imageUrl: '',
    repoUrl: '',
    demoUrl: '',
    featured: false,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    setProjects(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
  }

  function handleEdit(project: Project) {
    setEditingProject(project)
    setFormData({
      name: project.name,
      slug: project.slug,
      description: project.description,
      shortDesc: project.shortDesc,
      technologies: project.technologies.join(', '),
      imageUrl: project.imageUrl,
      repoUrl: project.repoUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured,
    })
  }

  function handleCancel() {
    setEditingProject(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      shortDesc: '',
      technologies: '',
      imageUrl: '',
      repoUrl: '',
      demoUrl: '',
      featured: false,
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const projectData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      shortDesc: formData.shortDesc,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
      repoUrl: formData.repoUrl || null,
      demoUrl: formData.demoUrl || null,
      featured: formData.featured,
    }

    if (editingProject) {
      await supabase.from('projects').update(projectData).eq('id', editingProject.id)
    } else {
      await supabase.from('projects').insert([projectData])
    }

    handleCancel()
    fetchProjects()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Proyectos</h2>
        {!editingProject && (
          <button
            onClick={() => setEditingProject({} as Project)}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Nuevo Proyecto
          </button>
        )}
      </div>

      {editingProject && (
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">
            {editingProject.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Descripción Corta *</label>
              <input
                type="text"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Descripción Completa *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tecnologías (separadas por coma) *</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, TypeScript, Node.js"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL Imagen</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL Repositorio</label>
                <input
                  type="text"
                  value={formData.repoUrl}
                  onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-400">Proyecto destacado</label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {editingProject.id ? 'Guardar Cambios' : 'Crear Proyecto'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Tecnologías</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Destacado</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{project.name}</div>
                  <div className="text-sm text-gray-400">{project.shortDesc}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-xs">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {project.featured ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 mr-3 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hay proyectos. ¡Crea uno nuevo!
          </div>
        )}
      </div>
    </div>
  )
}
