import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase'

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
    if (!confirm('¿Eliminar este mensaje?')) return
    await supabase.from('messages').delete().eq('id', id)
    fetchMessages()
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-SV', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
      <h2 className="text-2xl font-bold mb-6">Mensajes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <span className="text-gray-400 text-sm">
              {messages.filter(m => !m.read).length} no leídos / {messages.length} total
            </span>
          </div>
          <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg)
                  if (!msg.read) markAsRead(msg.id)
                }}
                className={`w-full text-left p-4 hover:bg-gray-750 transition-colors ${
                  selectedMessage?.id === msg.id ? 'bg-gray-750' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!msg.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                  <span className={`font-medium ${!msg.read ? 'text-white' : 'text-gray-300'}`}>
                    {msg.name}
                  </span>
                </div>
                <div className="text-sm text-gray-400 truncate">{msg.subject || 'Sin asunto'}</div>
                <div className="text-xs text-gray-500 mt-1">{formatDate(msg.created_at)}</div>
              </button>
            ))}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No hay mensajes.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedMessage.subject || 'Sin asunto'}
                  </h3>
                  <div className="text-gray-400 text-sm">
                    De: {selectedMessage.name} ({selectedMessage.email})
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {formatDate(selectedMessage.created_at)}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Eliminar
                </button>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-gray-300">
                {selectedMessage.message}
              </div>
              <div className="mt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Tu mensaje'}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-block"
                >
                  Responder por Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center text-gray-500">
              Selecciona un mensaje para verlo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
