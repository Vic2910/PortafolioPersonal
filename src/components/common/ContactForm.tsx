import { useContactForm } from '../../hooks/useContactForm'

export function ContactForm() {
  const { formData, formState, handleChange, handleSubmit } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

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
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="Tu nombre"
          required
        />
      </div>

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
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="tu@email.com"
          required
        />
      </div>

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
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                     transition-colors"
          placeholder="Asunto del mensaje"
        />
      </div>

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
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                     transition-colors resize-none"
          placeholder="Escribe tu mensaje aquí..."
          required
        />
      </div>

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
