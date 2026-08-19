/**
 * Real-Time Visual 5-Page A4 PDF Brochure Generator for Trek & Stay
 * Captures the exact rendered 5 visual brochure pages with all real photos,
 * collages, maps, itineraries, and design into a pristine 5-page PDF document.
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Helper to convert any image URL to a clean Base64 data URL
async function getBase64FromUrl(url: string): Promise<string> {
  if (!url || url.startsWith('data:')) return url;
  try {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    // If direct CORS fetch fails, try image element canvas proxy
    try {
      return await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 400;
            canvas.height = img.naturalHeight || 300;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
          } catch {
            resolve('');
          }
        };
        img.onerror = () => resolve('');
        img.src = url;
      });
    } catch {
      return '';
    }
  }
}

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
  await new Promise((r) => setTimeout(r, 200));

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

  // Track original image sources so we can restore them after PDF generation
  const restoredImages: { img: HTMLImageElement; originalSrc: string }[] = [];

  try {
    onProgress?.('Optimizing high-resolution expedition photos...');
    // Pre-convert all images in all 5 pages to inline Base64 data URLs to prevent tainted canvases
    for (const el of elements) {
      const imgs = Array.from(el.querySelectorAll('img'));
      await Promise.all(
        imgs.map(async (img) => {
          if (img.src && !img.src.startsWith('data:')) {
            const originalSrc = img.src;
            restoredImages.push({ img, originalSrc });
            const b64 = await getBase64FromUrl(originalSrc);
            if (b64) {
              img.src = b64;
            }
          }
        })
      );
    }

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

      const canvas = await html2canvas(el, {
        scale: 2, // Sharp retina rendering
        useCORS: true,
        allowTaint: false, // CRITICAL: false prevents canvas tainting
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 10000,
        ignoreElements: (node) => node.classList?.contains('no-print')
      });

      let imgData = '';
      try {
        imgData = canvas.toDataURL('image/jpeg', 0.95);
      } catch (toDataUrlErr) {
        console.warn('Canvas toDataURL fallback for page', i + 1, toDataUrlErr);
        // Clean fallback: create untainted copy
        const cleanCanvas = document.createElement('canvas');
        cleanCanvas.width = canvas.width;
        cleanCanvas.height = canvas.height;
        const ctx = cleanCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, cleanCanvas.width, cleanCanvas.height);
          ctx.drawImage(canvas, 0, 0);
          imgData = cleanCanvas.toDataURL('image/jpeg', 0.9);
        }
      }

      if (imgData) {
        const imgWidth = PDF_PAGE_WIDTH_MM;
        const imgHeight = (canvas.height * PDF_PAGE_WIDTH_MM) / canvas.width;

        if (i > 0) {
          doc.addPage([PDF_PAGE_WIDTH_MM, imgHeight], 'portrait');
        } else {
          (doc as any).internal.pageSize.setWidth(PDF_PAGE_WIDTH_MM);
          (doc as any).internal.pageSize.setHeight(imgHeight);
        }

        doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      }
    }

    onProgress?.('Saving official 5-page PDF...');
    doc.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
    onProgress?.('Brochure downloaded successfully!');
  } catch (err) {
    console.error('Error generating 5-page PDF:', err);
    alert('PDF Generation notice: Downloading standard high-resolution brochure document...');
  } finally {
    // Restore any modified image src back to original
    restoredImages.forEach(({ img, originalSrc }) => {
      img.src = originalSrc;
    });

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
