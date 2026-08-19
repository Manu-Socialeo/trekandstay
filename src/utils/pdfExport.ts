/**
 * High-fidelity print and PDF export helper for Dodham Itinerary Brochure
 */

// Helper to dynamically load external script from CDN if needed
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Preparing print-ready A4 brochure...');
  
  // Give browser a moment to render any lazy elements
  await new Promise(resolve => setTimeout(resolve, 300));

  const pageIds = ['pdf-page-1', 'pdf-page-2', 'pdf-page-3', 'pdf-page-4', 'pdf-page-5'];
  const elements = pageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (elements.length === 0) {
    onProgress?.('Opening print view...');
    openPrintOptimizedWindow();
    return;
  }

  try {
    // 1. Try bundled dynamic import first
    let htmlToImage: any = null;
    let jsPdfModule: any = null;

    try {
      htmlToImage = await import('html-to-image').catch(() => null);
      jsPdfModule = await import('jspdf').catch(() => null);
    } catch {
      // Ignore module import error and proceed to CDN fallback
    }

    // 2. If bundled import succeeded with html-to-image and jsPdf
    if (htmlToImage && jsPdfModule) {
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

    // 3. CDN Fallback with html2canvas and jspdf UMD
    onProgress?.('Loading high-definition PDF generator...');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

    const win = window as any;
    if (win.html2canvas && win.jspdf?.jsPDF) {
      const { jsPDF } = win.jspdf;
      const PDF_PAGE_WIDTH_MM = 210;
      let pdf: any = null;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        onProgress?.(`Rendering Page ${i + 1} of ${elements.length}...`);

        const canvas = await win.html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          ignoreElements: (node: HTMLElement) => node.classList?.contains('no-print'),
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const calculatedHeightMm = (canvas.height * PDF_PAGE_WIDTH_MM) / canvas.width;

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
        onProgress?.('Downloading Dodham Brochure PDF...');
        pdf.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
        return;
      }
    }
  } catch (err) {
    console.warn('Dynamic canvas PDF export fallback to browser print:', err);
  }

  // 4. Native high-fidelity browser print dialog fallback
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
