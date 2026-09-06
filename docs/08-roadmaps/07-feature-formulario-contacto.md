# Feature: Formulario de Contacto

> **ID:** F-07 | **Prioridad:** Alta | **Dependencias:** F-01 | **Historia:** HU-05

---

## 1. Objetivo

Implementar un formulario de contacto funcional que permita a los visitantes enviar mensajes al desarrollador, con validación, estados de carga y retroalimentación visual.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-01: Setup Proyecto |
| **Backend** | Supabase (tabla messages) |
| **Validación** | Zod (opcional) |

---

## 3. Prerrequisitos

- [ ] F-01 completado
- [ ] Supabase configurado
- [ ] Tabla `messages` creada en Supabase
- [ ] Política RLS para inserción pública

---

## 4. Implementación

### Paso 1: Crear Hook para Formulario

**Crear src/hooks/useContactForm.ts:**
```typescript
import { useState } from 'react'
import { supabase } from '@/config/supabase'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
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
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      ])

      if (error) throw error

      setFormState({
        status: 'success',
        message: '¡Mensaje enviado correctamente! Te responderé pronto.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
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
```

### Paso 2: Crear Componente de Formulario

**Crear src/components/common/ContactForm.tsx:**
```typescript
import { useContactForm } from '@/hooks/useContactForm'

export function ContactForm() {
  const { formData, formState, handleChange, handleSubmit } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="Tu nombre"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="tu@email.com"
          required
        />
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="Asunto del mensaje"
        />
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                     transition-colors resize-none"
          placeholder="Escribe tu mensaje aquí..."
          required
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={formState.status === 'submitting'}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
          formState.status === 'submitting'
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {formState.status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar Mensaje'
        )}
      </button>

      {/* Mensaje de estado */}
      {formState.message && (
        <div
          className={`p-4 rounded-lg ${
            formState.status === 'success'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {formState.message}
        </div>
      )}
    </form>
  )
}
```

### Paso 3: Crear Sección de Contacto

**Crear src/components/sections/Contact.tsx:**
```typescript
import { ContactForm } from '@/components/common/ContactForm'

export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contacto
            </h2>
            <p className="text-gray-400">
              ¿Tienes un proyecto en mente? ¡Hablemos!
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-gray-800 p-8 rounded-xl">
            <ContactForm />
          </div>

          {/* Info adicional */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>También puedes encontrarme en:</p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="https://github.com/Vic2910"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:victorarevalosierra@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Paso 4: Integrar en App.tsx

**Actualizar src/App.tsx:**
```typescript
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </div>
  )
}

export default App
```

### Paso 5: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement contact form with Supabase integration"
git push origin main
```

---

## 5. Verificación

- [ ] Formulario se muestra correctamente
- [ ] Validación funciona (campos requeridos, email)
- [ ] Envío a Supabase funciona
- [ ] Mensaje de éxito se muestra
- [ ] Mensaje de error se muestra
- [ ] Loading state funciona
- [ ] Formulario se resetea tras envío exitoso
- [ ] Responsive en móvil y desktop

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Mensaje no se envía | RLS bloquea inserción | Verificar política RLS |
| Error de red | Supabase caído | Verificar conexión |
| Validación no funciona | Handler faltante | Verificar handleChange |
| Formulario no resetea | Estado no actualizado | Verificar setFormData |

---

## 7. Recursos

- [Supabase Insert](https://supabase.com/docs/reference/javascript/insert)
- [React Forms](https://react.dev/reference/react-dom/components/input)
- [Form Validation Best Practices](https://www.w3.org/WAI/tutorials/forms/validation/)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*