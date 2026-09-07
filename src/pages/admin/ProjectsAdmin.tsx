import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../config/supabase'
import { useImageUpload } from '../../hooks/useImageUpload'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Textarea } from '../../components/common/Textarea'
import { Card, CardHeader, CardTitle } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'
import type { Project } from '../../types'

const ITEMS_PER_PAGE = 5

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { uploadState, uploadImage, reset: resetUpload } = useImageUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    
    if (error) {
      console.error('Error fetching projects:', error)
    }
    
    setProjects(data || [])
    setLoading(false)
  }

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'El slug es requerido'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'El slug solo puede contener minúsculas, números y guiones'
    }
    if (!formData.shortDesc.trim()) {
      newErrors.shortDesc = 'La descripción corta es requerida'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida'
    }
    if (!formData.technologies.trim()) {
      newErrors.technologies = 'Las tecnologías son requeridas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
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
    setErrors({})
    setServerError(null)
    resetUpload()
    setEditingProject(null)
    setIsFormOpen(false)
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
    setIsFormOpen(true)
    resetUpload()
    setServerError(null)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage(file)
    if (url) {
      setFormData({ ...formData, imageUrl: url })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validate()) return

    setSaving(true)
    setServerError(null)

    const projectData = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      short_desc: formData.shortDesc.trim(),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      image_url: formData.imageUrl,
      repo_url: formData.repoUrl.trim() || null,
      demo_url: formData.demoUrl.trim() || null,
      featured: formData.featured,
    }

    try {
      if (editingProject?.id) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])
        
        if (error) throw error
      }

      resetForm()
      await fetchProjects()
    } catch (err) {
      console.error('Error saving project:', err)
      setServerError(
        err instanceof Error 
          ? `Error al guardar: ${err.message}` 
          : 'Error al guardar el proyecto. Intenta de nuevo.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar el proyecto "${name}"? Esta acción no se puede deshacer.`)) return
    
    const { error } = await supabase.from('projects').delete().eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      alert('Error al eliminar el proyecto')
      return
    }
    
    await fetchProjects()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" role="status">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        <span className="sr-only">Cargando proyectos...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Proyectos</h1>
          <p className="text-gray-400 mt-1">{projects.length} proyecto{projects.length !== 1 ? 's' : ''} en total</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => { resetForm(); setIsFormOpen(true) }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Proyecto
          </Button>
        )}
      </header>

      {/* Server Error */}
      {serverError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg" role="alert">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-400">{serverError}</p>
          </div>
        </div>
      )}

      {/* Formulario */}
      {isFormOpen && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingProject?.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cerrar
              </Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre del proyecto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mi Proyecto"
                error={errors.name}
                required
              />
              <Input
                label="Slug (URL amigable)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                placeholder="mi-proyecto"
                hint="Se usará en la URL. Solo minúsculas, números y guiones"
                error={errors.slug}
                required
              />
            </div>

            <Input
              label="Descripción corta"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              placeholder="Una breve descripción del proyecto"
              error={errors.shortDesc}
              required
            />

            <Textarea
              label="Descripción completa"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe el proyecto en detalle: objetivos, tecnologías utilizadas, resultados..."
              rows={4}
              error={errors.description}
              required
            />

            <Input
              label="Tecnologías"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, TypeScript, Node.js"
              hint="Separadas por coma"
              error={errors.technologies}
              required
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Imagen del proyecto
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors
                  ${uploadState.status === 'uploading' 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadState.status === 'uploading'}
                  aria-label="Seleccionar imagen del proyecto"
                />
                
                {uploadState.status === 'uploading' ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
                    <p className="text-sm text-gray-400">Subiendo imagen...</p>
                  </div>
                ) : formData.imageUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview del proyecto"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-400">Haz clic para cambiar la imagen</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-400">
                      <span className="text-blue-400 font-medium">Haz clic para subir</span> o arrastra una imagen
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                  </div>
                )}
              </div>
              {uploadState.error && (
                <p className="text-sm text-red-400" role="alert">{uploadState.error}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="URL del repositorio"
                value={formData.repoUrl}
                onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                placeholder="https://github.com/usuario/proyecto"
                hint="Opcional"
              />
              <Input
                label="URL de demo"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://mi-proyecto.vercel.app"
                hint="Opcional"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 
                  focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
                Marcar como proyecto destacado
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
              <Button
                type="submit"
                isLoading={saving}
                disabled={uploadState.status === 'uploading'}
              >
                {editingProject?.id ? 'Guardar Cambios' : 'Crear Proyecto'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Lista de proyectos */}
      <section aria-label="Lista de proyectos">
        {projects.length > 0 ? (
          <>
            <div className="grid gap-4">
              {paginatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 
                    hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={`Captura de ${project.name}`}
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{project.name}</h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.shortDesc}</p>
                        </div>
                        {project.featured && (
                          <Badge variant="warning">Destacado</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.technologies.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </Button>
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="ghost">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Código
                            </Button>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="ghost">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Demo
                            </Button>
                          </a>
                        )}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(project.id, project.name)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Paginación">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </nav>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, projects.length)} de {projects.length} proyectos
            </p>
          </>
        ) : (
          <Card className="text-center py-12">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No hay proyectos</h3>
            <p className="text-gray-400 mb-4">Comienza agregando tu primer proyecto al portafolio</p>
            <Button onClick={() => { resetForm(); setIsFormOpen(true) }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Primer Proyecto
            </Button>
          </Card>
        )}
      </section>
    </div>
  )
}
