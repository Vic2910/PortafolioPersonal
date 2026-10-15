import { expect, test } from '@playwright/test'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

test('descarga real, datos recientes y recuperación ante errores', async ({ page }, testInfo) => {
  let title = 'Proyecto vigente'
  let fail = false
  let requests = 0
  await page.route('https://cv-test.supabase.co/rest/v1/projects*', async (route) => {
    requests++
    await route.fulfill({ status: fail ? 503 : 200, contentType: 'application/json', body: JSON.stringify(fail
      ? { message: 'Servicio no disponible' }
      : [{ id: '1', name: title, slug: 'prueba', description: 'Sistema de gestión de inventarios con operaciones CRUD completas, reportes y exportación a Excel.', short_desc: 'Prueba',
        technologies: ['TypeScript'], image_url: '', repo_url: null, demo_url: null, featured: true, order_index: 1 }]) })
  })
  await page.goto('/')
  const buttons = page.getByRole('button', { name: 'Descargar CV' })
  await expect(buttons).toHaveCount(2)
  await expect(page.getByText(title, { exact: true })).toBeVisible()
  const projectButton = page.getByRole('link', { name: 'Ver Proyectos' })
  const initialProjectBox = await projectButton.boundingBox()
  const initialCvBox = await buttons.first().boundingBox()

  async function download(index: number) {
    const event = page.waitForEvent('download')
    await buttons.nth(index).focus()
    await page.keyboard.press('Enter')
    const file = await event
    expect(file.suggestedFilename()).toMatch(/^CV-.*\.pdf$/)
    const path = testInfo.outputPath(file.suggestedFilename())
    await file.saveAs(path)
    const bytes = await readFile(path)
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
    expect(bytes.length).toBeLessThan(1_000_000)
    const pdf = await getDocument({ data: new Uint8Array(bytes), standardFontDataUrl: `${process.cwd()}/node_modules/pdfjs-dist/standard_fonts/` }).promise
    const texts: string[] = []
    for (let n = 1; n <= pdf.numPages; n++) {
      const pdfPage = await pdf.getPage(n)
      texts.push((await pdfPage.getTextContent()).items.map((item) => 'str' in item ? item.str : '').join(' '))
      // Render every page for visual QA, using PDF.js's native Node canvas factory.
      const viewport = pdfPage.getViewport({ scale: 1.5 })
      const canvas = pdf.canvasFactory.create(viewport.width, viewport.height)
      await pdfPage.render({ canvas: canvas.canvas, canvasContext: canvas.context, viewport }).promise
      await mkdir('tmp/pdfs', { recursive: true })
      await writeFile(`tmp/pdfs/cv-${index}-${n}.png`, canvas.canvas.toBuffer('image/png'))
    }
    await pdf.cleanup()
    return texts.join(' ')
  }

  const before = requests
  expect(await download(0)).toContain('Proyecto vigente')
  expect(await projectButton.boundingBox()).toEqual(initialProjectBox)
  expect(await buttons.first().boundingBox()).toEqual(initialCvBox)
  expect(initialCvBox?.height).toBe(48)
  expect(initialProjectBox?.height).toBe(48)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.locator('section').first().screenshot({ path: `tmp/pdfs/buttons-${testInfo.project.name}.png` })
  expect(requests).toBeGreaterThan(before)
  title = 'Proyecto actualizado'
  expect(await download(1)).toContain(title)
  await page.getByRole('combobox', { name: 'Idioma del CV' }).first().selectOption('en')
  const english = await download(0)
  expect(english).toContain('Professional profile')
  expect(english).toContain('Inventory management system')
  expect(english).not.toContain('Sistema de gestión')
  await page.getByRole('combobox', { name: 'Idioma del CV' }).first().selectOption('es')
  fail = true
  await buttons.first().click()
  await expect(page.getByRole('status').filter({ hasText: 'No se pudo descargar el CV' })).toBeVisible({ timeout: 20000 })
  fail = false
  expect(await download(0)).toContain(title)
})
