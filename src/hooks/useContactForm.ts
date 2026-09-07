import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (): boolean => {
    if (formData.website) {
      return true
    }

    if (!formData.name.trim()) {
      setFormState({ status: 'error', message: 'El nombre es requerido' })
      return false
    }
    if (!formData.email.trim()) {
      setFormState({ status: 'error', message: 'El email es requerido' })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormState({ status: 'error', message: 'Email inválido' })
      return false
    }
    if (!formData.message.trim()) {
      setFormState({ status: 'error', message: 'El mensaje es requerido' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    setFormState({ status: 'submitting', message: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormState({
        status: 'success',
        message: '¡Mensaje enviado correctamente! Te responderé pronto.',
      })
      setFormData({ name: '', email: '', subject: '', message: '', website: '' })
    } catch {
      setFormState({
        status: 'error',
        message: 'Error al enviar el mensaje. Intenta de nuevo.',
      })
    }
  }

  return {
    formData,
    formState,
    handleChange,
    handleSubmit,
  }
}
