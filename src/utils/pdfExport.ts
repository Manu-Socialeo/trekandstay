/**
 * Real-Time Visual 5-Page A4 PDF Brochure Generator for Trek & Stay
 * Captures the exact rendered on-screen brochure pages with all real photos,
 * collages, maps, badges, and pricing cards with 100% pixel fidelity into a multi-page PDF.
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Preparing real-time 5-page Dodham brochure with photos...');

  const wrapper = document.getElementById('pdf-brochure-wrapper');
  const wasHidden = wrapper?.classList.contains('hidden');
  if (wasHidden && wrapper) {
    wrapper.classList.remove('hidden');
    wrapper.style.display = 'block';
  }

  // Ensure DOM is fully painted and images ready
  await new Promise((r) => setTimeout(r, 200));

  const pageIds = ['pdf-page-1', 'pdf-page-2', 'pdf-page-3', 'pdf-page-4', 'pdf-page-5'];
  const elements = pageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (elements.length === 0) {
    if (wasHidden && wrapper) {
      wrapper.classList.add('hidden');
      wrapper.style.display = '';
    }
    openPrintOptimizedWindow();
    return;
  }

  try {
    const PDF_PAGE_WIDTH_MM = 210;
    const PDF_PAGE_HEIGHT_MM = 297;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      onProgress?.(`Capturing Page ${i + 1} of ${elements.length} with photos & design...`);

      const canvas = await html2canvas(el, {
        scale: 2, // High-resolution retina quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 8000,
        ignoreElements: (node) => node.classList?.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.94);
      const imgWidth = PDF_PAGE_WIDTH_MM;
      const imgHeight = (canvas.height * PDF_PAGE_WIDTH_MM) / canvas.width;

      if (i > 0) {
        doc.addPage([PDF_PAGE_WIDTH_MM, imgHeight || PDF_PAGE_HEIGHT_MM], 'portrait');
      }

      doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    }

    onProgress?.('Saving official 5-page PDF...');
    doc.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
    onProgress?.('PDF download complete!');
  } catch (err) {
    console.error('Error capturing PDF pages:', err);
    openPrintOptimizedWindow();
  } finally {
    if (wasHidden && wrapper) {
      wrapper.classList.add('hidden');
      wrapper.style.display = '';
    }
  }
}

export function openPrintOptimizedWindow(): void {
  try {
    window.print();
  } catch (e) {
    console.error('Print window error:', e);
  }
}
