/**
 * High-fidelity print and PDF export helper for Dodham Itinerary Brochure
 */
export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Preparing print-ready A4 brochure...');
  
  // Give browser a moment to render any lazy elements
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    // Check if jspdf & html-to-image are dynamically available
    const htmlToImage = await import('html-to-image').catch(() => null);
    const jsPdfModule = await import('jspdf').catch(() => null);

    if (htmlToImage && jsPdfModule) {
      const pageIds = ['pdf-page-1', 'pdf-page-2', 'pdf-page-3', 'pdf-page-4', 'pdf-page-5'];
      const elements = pageIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length > 0) {
        const PDF_PAGE_WIDTH_MM = 210;
        const jsPDF = jsPdfModule.default || jsPdfModule.jsPDF;
        let pdf: any = null;

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          onProgress?.(`Rendering Page ${i + 1} of ${elements.length}...`);

          const imgData = await htmlToImage.toJpeg(el, {
            quality: 0.95,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            filter: (node: any) => !(node instanceof HTMLElement && node.classList?.contains('no-print')),
          });

          const img = new Image();
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = imgData;
          });

          const naturalWidth = img.naturalWidth || 794;
          const naturalHeight = img.naturalHeight || 1123;
          const calculatedHeightMm = (naturalHeight * PDF_PAGE_WIDTH_MM) / naturalWidth;

          if (!pdf) {
            pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: [PDF_PAGE_WIDTH_MM, calculatedHeightMm],
              compress: true,
            });
          } else {
            pdf.addPage([PDF_PAGE_WIDTH_MM, calculatedHeightMm], 'portrait');
          }

          pdf.addImage(imgData, 'JPEG', 0, 0, PDF_PAGE_WIDTH_MM, calculatedHeightMm, undefined, 'FAST');
        }

        if (pdf) {
          onProgress?.('Saving PDF...');
          pdf.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
          return;
        }
      }
    }
  } catch (err) {
    console.warn('Dynamic canvas PDF export fallback to browser print:', err);
  }

  // Native high-fidelity browser print dialog fallback
  onProgress?.('Opening print window...');
  openPrintOptimizedWindow();
}

export function openPrintOptimizedWindow(): void {
  try {
    window.print();
  } catch (e) {
    console.error('Print window error:', e);
  }
}
