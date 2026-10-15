import { useId, useRef, useState } from 'react'
import { heroData } from '../../config/hero'
import { Button } from './Button'
import { MissingCvTranslationError, type CvLanguage } from '../../services/cvLanguage'

export function DownloadCvButton() {
  const languageId = useId()
  const [language, setLanguage] = useState<CvLanguage>('es')
  const busy = useRef(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)

  async function download() {
    if (busy.current) return
    busy.current = true
    setLoading(true)
    setError(false)
    setStatus('Generando CV…')
    try {
      const { downloadCv } = await import('../../services/cv')
      await downloadCv(language)
      setStatus('CV generado. Descarga iniciada.')
    } catch (err) {
      setError(true)
      setStatus(err instanceof MissingCvTranslationError ? err.message : 'No se pudo descargar el CV. Comprueba tu conexión y vuelve a intentarlo.')
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full sm:w-auto">
      <div className="flex items-center justify-center gap-2">
      <label htmlFor={languageId} className="sr-only">Idioma del CV</label>
      <select id={languageId} value={language} disabled={loading}
        onChange={(event) => { setLanguage(event.target.value as CvLanguage); setStatus(''); setError(false) }}
        className="h-12 w-24 shrink-0 rounded-lg border border-gray-500 bg-gray-800 px-2 text-base text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50">
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <Button type="button" variant="secondary" size="lg" onClick={download}
        className="h-12 w-44 shrink-0 whitespace-nowrap text-base" isLoading={loading} aria-busy={loading}>
        {!loading && <svg aria-hidden="true" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
        </svg>}
        {heroData.cta.secondary.text}
      </Button>
      </div>
      <p role="status" aria-live="polite" className={`absolute top-full left-0 mt-2 w-full text-center text-sm ${error ? 'text-red-300' : 'text-gray-300'}`}>
        {status}
      </p>
    </div>
  )
}
