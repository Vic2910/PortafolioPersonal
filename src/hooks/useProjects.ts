import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import type { Project } from '../types'

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

      setProjects(data || [])
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
