/**
 * Real-Time Visual 5-Page A4 PDF Brochure Generator for Trek & Stay
 * Captures the exact rendered 5 visual brochure pages with all real photos,
 * collages, maps, itineraries, and design into a 5-page PDF document.
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Preparing official 5-page Dodham brochure with photos...');

  const wrapper = document.getElementById('pdf-brochure-wrapper');
  const wasHidden = wrapper?.classList.contains('hidden');
  if (wasHidden && wrapper) {
    wrapper.classList.remove('hidden');
    wrapper.style.display = 'block';
  }

  // Ensure DOM is painted
  await new Promise((r) => setTimeout(r, 250));

  const pageIds = ['pdf-page-1', 'pdf-page-2', 'pdf-page-3', 'pdf-page-4', 'pdf-page-5'];
  const elements = pageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (elements.length === 0) {
    console.error('Brochure page elements not found in DOM');
    if (wasHidden && wrapper) {
      wrapper.classList.add('hidden');
      wrapper.style.display = '';
    }
    return;
  }

  try {
    const PDF_PAGE_WIDTH_MM = 210;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      onProgress?.(`Capturing Page ${i + 1} of ${elements.length} with full images & design...`);

      // Ensure all images within this page are set with crossOrigin
      const imgs = el.querySelectorAll('img');
      imgs.forEach((img) => {
        if (!img.crossOrigin) {
          img.crossOrigin = 'anonymous';
        }
      });

      const canvas = await html2canvas(el, {
        scale: 2, // High definition 2x retina rendering
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 10000,
        ignoreElements: (node) => node.classList?.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = PDF_PAGE_WIDTH_MM;
      const imgHeight = (canvas.height * PDF_PAGE_WIDTH_MM) / canvas.width;

      if (i > 0) {
        doc.addPage([PDF_PAGE_WIDTH_MM, imgHeight], 'portrait');
      } else {
        // Set first page dimensions
        (doc as any).internal.pageSize.setWidth(PDF_PAGE_WIDTH_MM);
        (doc as any).internal.pageSize.setHeight(imgHeight);
      }

      doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    }

    onProgress?.('Saving official 5-page PDF...');
    doc.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
    onProgress?.('Download complete!');
  } catch (err) {
    console.error('Error generating 5-page PDF:', err);
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
    console.error('Print error:', e);
  }
}
