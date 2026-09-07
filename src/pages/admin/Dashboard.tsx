import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase'

export function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [projects, messages, unread] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
      ])

      setStats({
        projects: projects.count || 0,
        messages: messages.count || 0,
        unreadMessages: unread.count || 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Proyectos</h3>
          <p className="text-4xl font-bold text-white">{stats.projects}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Mensajes Totales</h3>
          <p className="text-4xl font-bold text-white">{stats.messages}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Mensajes No Leídos</h3>
          <p className="text-4xl font-bold text-yellow-400">{stats.unreadMessages}</p>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Acciones Rápidas</h3>
        <div className="flex gap-4">
          <a
            href="/admin/projects"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Gestionar Proyectos
          </a>
          <a
            href="/admin/messages"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Ver Mensajes
          </a>
        </div>
      </div>
    </div>
  )
}
