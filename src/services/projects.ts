import { supabase } from '../config/supabase'
import type { Project } from '../types'

interface SupabaseProject {
  id: string
  name: string
  slug: string
  description: string
  short_desc: string
  technologies: string[]
  image_url: string
  repo_url: string | null
  demo_url: string | null
  featured: boolean
  order_index: number
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*')
    .order('order_index', { ascending: true }).abortSignal(AbortSignal.timeout(15000))
  if (error) throw error
  if (!data) throw new Error('No se pudo obtener la información de proyectos')
  return (data as SupabaseProject[]).map((row) => ({
    id: row.id, name: row.name, slug: row.slug, description: row.description,
    shortDesc: row.short_desc, technologies: row.technologies, imageUrl: row.image_url,
    repoUrl: row.repo_url ?? undefined, demoUrl: row.demo_url ?? undefined,
    featured: row.featured, orderIndex: row.order_index,
  }))
}
