import { useRef, useState } from 'react'
import { heroData } from '../../config/hero'
import { Button } from './Button'

export function DownloadCvButton() {
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
      await downloadCv()
      setStatus('CV generado. Descarga iniciada.')
    } catch {
      setError(true)
      setStatus('No se pudo descargar el CV. Comprueba tu conexión y vuelve a intentarlo.')
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  return (
    <div>
      <Button type="button" variant="secondary" size="lg" onClick={download}
        isLoading={loading} aria-busy={loading}>
        <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
        </svg>
        {heroData.cta.secondary.text}
      </Button>
      <p role="status" aria-live="polite" className={`mt-2 text-sm ${error ? 'text-red-300' : 'text-gray-300'}`}>
        {status}
      </p>
    </div>
  )
}
