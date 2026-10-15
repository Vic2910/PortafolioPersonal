import type { jsPDF } from 'jspdf'

export async function savePdf(pdf: jsPDF, filename: string) {
  await pdf.save(filename, { returnPromise: true })
}
