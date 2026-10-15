import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DownloadCvButton } from '../DownloadCvButton'
import { downloadCv } from '../../../services/cv'

vi.mock('../../../services/cv', () => ({ downloadCv: vi.fn() }))
beforeEach(() => vi.resetAllMocks())

describe('Descargar CV', () => {
  it('descarga y anuncia el resultado', async () => {
    vi.mocked(downloadCv).mockResolvedValue(undefined)
    render(<DownloadCvButton />)
    fireEvent.click(screen.getByRole('button', { name: 'Descargar CV' }))
    await waitFor(() => expect(downloadCv).toHaveBeenCalledOnce())
    expect(await screen.findByText('CV generado. Descarga iniciada.')).toBeInTheDocument()
  })

  it('bloquea descargas repetidas durante la generación', async () => {
    let finish!: () => void
    vi.mocked(downloadCv).mockImplementation(() => new Promise<void>((resolve) => { finish = resolve }))
    render(<DownloadCvButton />)
    const button = screen.getByRole('button', { name: 'Descargar CV' })
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button).toBeDisabled()
    await waitFor(() => expect(downloadCv).toHaveBeenCalledOnce())
    finish()
    await waitFor(() => expect(button).toBeEnabled())
  })

  it('muestra errores de generación y permite reintentar', async () => {
    vi.mocked(downloadCv).mockRejectedValueOnce(new Error('Fallo PDF')).mockResolvedValueOnce(undefined)
    render(<DownloadCvButton />)
    const button = screen.getByRole('button', { name: 'Descargar CV' })
    fireEvent.click(button)
    expect(await screen.findByText(/No se pudo descargar el CV/)).toBeInTheDocument()
    expect(button).toBeEnabled()
    fireEvent.click(button)
    expect(await screen.findByText('CV generado. Descarga iniciada.')).toBeInTheDocument()
  })
})
