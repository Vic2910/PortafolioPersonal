import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../config/supabase'
import { StatCard } from '../../components/common/StatCard'
import { Card, CardHeader, CardTitle } from '../../components/common/Card'
import { Button } from '../../components/common/Button'

export function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  })
  const [recentMessages, setRecentMessages] = useState<Array<{
    id: string
    name: string
    subject: string
    created_at: string
    read: boolean
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [projects, messages, unread, recent] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
        supabase.from('messages').select('id, name, subject, created_at, read').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        projects: projects.count || 0,
        messages: messages.count || 0,
        unreadMessages: unread.count || 0,
      })
      setRecentMessages(recent.data || [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" role="status">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        <span className="sr-only">Cargando estadísticas...</span>
      </div>
    )
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-SV', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Resumen de tu portafolio</p>
      </header>

      {/* Bento Grid - Stats */}
      <section aria-label="Estadísticas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Proyectos"
            value={stats.projects}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <StatCard
            label="Mensajes Totales"
            value={stats.messages}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          <StatCard
            label="Mensajes Sin Leer"
            value={stats.unreadMessages}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Bento Grid - Content */}
      <section aria-label="Contenido reciente">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/admin/projects">
                <Button variant="primary" className="w-full justify-start">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Proyecto
                </Button>
              </Link>
              <Link to="/admin/messages">
                <Button variant="secondary" className="w-full justify-start">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Ver Mensajes
                </Button>
              </Link>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver Portafolio
                </Button>
              </a>
            </div>
          </Card>

          {/* Mensajes Recientes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mensajes Recientes</CardTitle>
              <Link
                to="/admin/messages"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                Ver todos →
              </Link>
            </CardHeader>
            {recentMessages.length > 0 ? (
              <ul className="space-y-3" role="list">
                {recentMessages.map((msg) => (
                  <li key={msg.id}>
                    <Link
                      to="/admin/messages"
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {!msg.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-label="No leído" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                          <p className="text-xs text-gray-400 truncate">{msg.subject || 'Sin asunto'}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-3">{formatDate(msg.created_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay mensajes recientes</p>
            )}
          </Card>
        </div>
      </section>
    </div>
  )
}
