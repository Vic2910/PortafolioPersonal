import { useState, useEffect } from 'react'
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

function mapProject(row: SupabaseProject): Project {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    shortDesc: row.short_desc,
    technologies: row.technologies,
    imageUrl: row.image_url,
    repoUrl: row.repo_url ?? undefined,
    demoUrl: row.demo_url ?? undefined,
    featured: row.featured,
    orderIndex: row.order_index,
  }
}

interface UseProjectsResult {
  projects: Project[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchProjects() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (fetchError) throw fetchError

      setProjects((data as SupabaseProject[]).map(mapProject))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar proyectos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}
