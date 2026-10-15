// @vitest-environment node
/// <reference types="node" />
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import type { jsPDF } from 'jspdf'
import { fileURLToPath } from 'node:url'
import { createCvPdf, downloadCv, getCvContent } from './cv'
import { getProjects } from './projects'
import { savePdf } from './savePdf'
import { heroData } from '../config/hero'
import { aboutData } from '../data/about'
import { skills } from '../data/skills'
import type { Project } from '../types'

vi.mock('./projects', () => ({ getProjects: vi.fn() }))
vi.mock('./savePdf', () => ({ savePdf: vi.fn() }))
const standardFontDataUrl = fileURLToPath(new URL('../../node_modules/pdfjs-dist/standard_fonts/', import.meta.url)).replace(/\\/g, '/')
const project: Project = {
  id: '1', name: 'Proyecto actual', slug: 'actual', description: 'Descripción del proyecto con información actualizada.',
  shortDesc: 'Proyecto', technologies: ['TypeScript'], imageUrl: '', featured: true, orderIndex: 1,
  repoUrl: '#',
}

async function readPdf(pdf: jsPDF) {
  const document = await getDocument({ data: new Uint8Array(pdf.output('arraybuffer')), standardFontDataUrl }).promise
  const texts: string[] = []
  for (let page = 1; page <= document.numPages; page++) {
    const content = await (await document.getPage(page)).getTextContent()
    texts.push(content.items.map((item) => 'str' in item ? item.str : '').join(' '))
  }
  await document.cleanup()
  return texts
}

afterEach(() => vi.restoreAllMocks())

describe('CV PDF', () => {
  it('genera un PDF válido, con datos reales, acentos y sin enlaces provisionales', async () => {
    const pdf = createCvPdf(getCvContent([project]))
    const text = (await readPdf(pdf)).join(' ')
    expect(text).toContain(heroData.name)
    expect(text).toContain(aboutData.education[0].institution)
    expect(text).toContain('Proyecto actual')
    expect(text).toContain('TypeScript')
    expect(text).not.toContain('LinkedIn: #')
    expect(text).not.toContain('Repositorio: #')
    expect(pdf.output('arraybuffer').byteLength).toBeLessThan(1_000_000)
  })

  it('refleja cambios en todas las fuentes sin mantener una copia del CV', async () => {
    const original = { name: heroData.name, bio: aboutData.bio, skill: skills[0].name, education: aboutData.education[0].title }
    try {
      createCvPdf(getCvContent([project]))
      heroData.name = 'Nombre actualizado'
      aboutData.bio = 'Perfil actualizado'
      skills[0].name = 'Competencia actualizada'
      aboutData.education[0].title = 'Formación actualizada'
      const text = (await readPdf(createCvPdf(getCvContent([{ ...project, name: 'Proyecto nuevo' }])))).join(' ')
      for (const value of ['Nombre actualizado', 'Perfil actualizado', 'Competencia actualizada', 'Formación actualizada', 'Proyecto nuevo']) {
        expect(text).toContain(value)
      }
    } finally {
      heroData.name = original.name; aboutData.bio = original.bio
      skills[0].name = original.skill; aboutData.education[0].title = original.education
    }
  })

  it('pagina contenido largo sin perder texto ni exceder los márgenes', async () => {
    const pdf = createCvPdf(getCvContent([{ ...project, description: `${'Texto extenso de proyecto. '.repeat(600)}FIN DEL PROYECTO` }]))
    const pages = await readPdf(pdf)
    expect(pages.length).toBeGreaterThan(2)
    expect(pages.join(' ')).toContain('FIN DEL PROYECTO')
    const document = await getDocument({ data: new Uint8Array(pdf.output('arraybuffer')), standardFontDataUrl }).promise
    for (let n = 1; n <= document.numPages; n++) {
      const page = await document.getPage(n)
      for (const item of (await page.getTextContent()).items) {
        if ('str' in item && item.str.trim()) {
          expect(item.transform[4]).toBeGreaterThanOrEqual(47)
          expect(item.transform[4] + item.width).toBeLessThanOrEqual(550)
          expect(item.transform[5]).toBeGreaterThanOrEqual(25)
        }
      }
    }
    await document.cleanup()
  })

  it('omite secciones vacías', async () => {
    const content = getCvContent([])
    const text = (await readPdf(createCvPdf({ ...content, skills: [], about: { ...content.about, bio: '', education: [] } }))).join(' ')
    for (const label of ['Proyectos', 'Competencias técnicas', 'Formación académica', 'Perfil profesional']) expect(text).not.toContain(label)
  })

  it('consulta nuevamente y descarga el PDF en cada solicitud', async () => {
    vi.mocked(getProjects).mockResolvedValueOnce([project]).mockResolvedValueOnce([{ ...project, name: 'Actualización remota' }])
    const downloaded: jsPDF[] = []
    vi.mocked(savePdf).mockImplementation(async (pdf) => { downloaded.push(pdf) })
    await downloadCv()
    await downloadCv()
    expect(getProjects).toHaveBeenCalledTimes(2)
    expect((await readPdf(downloaded[1])).join(' ')).toContain('Actualización remota')
  })

  it('no descarga un documento incompleto si falla la consulta', async () => {
    vi.mocked(getProjects).mockRejectedValueOnce(new Error('Red no disponible'))
    const save = vi.mocked(savePdf)
    save.mockClear()
    await expect(downloadCv()).rejects.toThrow('Red no disponible')
    expect(save).not.toHaveBeenCalled()
  })
})
