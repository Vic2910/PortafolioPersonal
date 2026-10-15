import { jsPDF } from 'jspdf'
import { heroData } from '../config/hero'
import { aboutData } from '../data/about'
import { skills } from '../data/skills'
import { getProjects } from './projects'
import { savePdf } from './savePdf'
import type { Project } from '../types'

// References to the portfolio sources, never a second set of CV content.
export function getCvContent(projects: Project[]) {
  return { profile: heroData, about: aboutData, skills, projects }
}

export function createCvPdf(content: ReturnType<typeof getCvContent>) {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
  const margin = 48
  const width = pdf.internal.pageSize.getWidth() - margin * 2
  const bottom = pdf.internal.pageSize.getHeight() - 48
  let y = margin
  pdf.setProperties({ title: `CV - ${content.profile.name}`, author: content.profile.name })
  pdf.setLanguage('es-SV')

  function space(height: number) {
    if (y + height > bottom) { pdf.addPage(); y = margin }
  }

  function text(value: string, size = 10.5, bold = false) {
    if (!value.trim()) return
    pdf.setFont('helvetica', bold ? 'bold' : 'normal')
    pdf.setFontSize(size)
    pdf.setTextColor(25, 30, 38)
    const lines = pdf.splitTextToSize(value, width) as string[]
    for (const line of lines) {
      space(size * 1.4)
      pdf.text(line, margin, y + size)
      y += size * 1.4
    }
    y += 4
  }

  function section(title: string) {
    space(64)
    y += 10
    text(title, 12, true)
    pdf.setDrawColor(160)
    pdf.line(margin, y, margin + width, y)
    y += 9
  }

  function link(label: string, value?: string) {
    if (!value || !/^https?:\/\//i.test(value)) return
    text(`${label}: ${value}`, 9)
  }

  text(content.profile.name, 22, true)
  text(content.profile.title, 13)
  text([content.profile.location, content.profile.social.email].filter(Boolean).join(' | '))
  link('GitHub', content.profile.social.github)
  link('LinkedIn', content.profile.social.linkedin)
  if (content.about.bio.trim()) { section('Perfil profesional'); text(content.about.bio) }

  if (content.about.education.length) {
    section('Formación académica')
    for (const item of content.about.education) {
      space(64)
      text(item.title, 11, true)
      text([item.institution, item.period].filter(Boolean).join(' | '))
      text(item.description)
    }
  }

  if (content.skills.length) {
    section('Competencias técnicas')
    const categories = { frontend: 'Frontend', backend: 'Backend', tools: 'Herramientas' } as const
    for (const [category, label] of Object.entries(categories)) {
      const names = content.skills.filter((skill) => skill.category === category).map((skill) => skill.name)
      if (names.length) text(`${label}: ${names.join(', ')}`)
    }
  }

  if (content.projects.length) {
    section('Proyectos')
    for (const project of content.projects) {
      space(75)
      text(project.name, 11, true)
      text(project.description)
      if (project.technologies.length) text(`Tecnologías: ${project.technologies.join(', ')}`, 9)
      link('Repositorio', project.repoUrl)
      link('Demo', project.demoUrl)
      y += 4
    }
  }
  const pages = pdf.getNumberOfPages()
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(85)
    pdf.text(`${page} / ${pages}`, margin + width, bottom + 22, { align: 'right' })
  }
  return pdf
}

export async function downloadCv() {
  const projects = await getProjects()
  const content = getCvContent(projects)
  const pdf = createCvPdf(content)
  const name = content.profile.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'Perfil'
  await savePdf(pdf, `CV-${name}.pdf`)
}
