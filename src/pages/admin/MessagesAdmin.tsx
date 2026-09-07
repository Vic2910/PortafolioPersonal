import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  read: boolean
}

export function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }

  async function markAsRead(id: string) {
    await supabase.from('messages').update({ read: true }).eq('id', id)
    fetchMessages()
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, read: true })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este mensaje? Esta acción no se puede deshacer.')) return
    await supabase.from('messages').delete().eq('id', id)
    fetchMessages()
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-SV', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function formatDateShort(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Ayer'
    } else if (diffDays < 7) {
      return date.toLocaleDateString('es-SV', { weekday: 'long' })
    }
    return date.toLocaleDateString('es-SV', { month: 'short', day: 'numeric' })
  }

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read
    if (filter === 'read') return msg.read
    return true
  })

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" role="status">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        <span className="sr-only">Cargando mensajes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Mensajes</h1>
        <p className="text-gray-400 mt-1">
          {unreadCount > 0 ? `${unreadCount} mensaje${unreadCount > 1 ? 's' : ''} sin leer` : 'No hay mensajes nuevos'}
        </p>
      </header>

      {/* Filters */}
      <div className="flex gap-2" role="group" aria-label="Filtros de mensajes">
        {[
          { value: 'all' as const, label: 'Todos', count: messages.length },
          { value: 'unread' as const, label: 'Sin leer', count: unreadCount },
          { value: 'read' as const, label: 'Leídos', count: messages.length - unreadCount },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
            <Badge variant={filter === f.value ? 'info' : 'default'} size="sm">
              {f.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card padding="none" className="overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-medium text-white">Bandeja de entrada</h2>
            </div>
            <ul className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto" role="list">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <li key={msg.id}>
                    <button
                      onClick={() => {
                        setSelectedMessage(msg)
                        if (!msg.read) markAsRead(msg.id)
                      }}
                      className={`w-full text-left p-4 hover:bg-gray-750 transition-colors
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500
                        ${selectedMessage?.id === msg.id ? 'bg-gray-750 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}
                      aria-current={selectedMessage?.id === msg.id ? 'true' : undefined}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 pt-0.5">
                          {!msg.read ? (
                            <span className="block w-2.5 h-2.5 bg-blue-500 rounded-full" aria-label="No leído" />
                          ) : (
                            <span className="block w-2.5 h-2.5 bg-transparent" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm truncate ${!msg.read ? 'font-semibold text-white' : 'text-gray-300'}`}>
                              {msg.name}
                            </p>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatDateShort(msg.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 truncate mt-0.5">
                            {msg.subject || 'Sin asunto'}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-8 text-center text-gray-500">
                  No hay mensajes {filter !== 'all' ? `en "${filter === 'unread' ? 'sin leer' : 'leídos'}"` : ''}
                </li>
              )}
            </ul>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white">
                      {selectedMessage.subject || 'Sin asunto'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {selectedMessage.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{selectedMessage.name}</p>
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Tu mensaje'}`}>
                      <Button variant="primary" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Responder
                      </Button>
                    </a>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </Button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Estado:</span>
                  <Badge variant={selectedMessage.read ? 'success' : 'info'}>
                    {selectedMessage.read ? 'Leído' : 'No leído'}
                  </Badge>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center py-16">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">Selecciona un mensaje</h3>
              <p className="text-gray-400 text-center">
                Elige un mensaje de la lista para ver su contenido
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
