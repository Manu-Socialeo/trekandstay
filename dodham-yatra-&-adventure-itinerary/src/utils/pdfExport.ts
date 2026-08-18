import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

// 1x1 transparent PNG fallback placeholder
const TRANSPARENT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  const pageIds = ['pdf-page-1', 'pdf-page-2', 'pdf-page-3', 'pdf-page-4', 'pdf-page-5'];
  const elements = pageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (elements.length === 0) {
    throw new Error('Brochure pages not found in document');
  }

  onProgress?.('Initializing high-resolution PDF rendering...');

  // Standard A4 width is 210mm
  const PDF_PAGE_WIDTH_MM = 210;

  // We will initialize the PDF with the first page dimensions dynamically
  let pdf: jsPDF | null = null;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    onProgress?.(`Rendering Page ${i + 1} of ${elements.length}...`);

    let imgData = '';

    try {
      // Render at 2x high resolution for crisp, razor-sharp text and images
      imgData = await toJpeg(el, {
        quality: 0.98,
        pixelRatio: 2.2,
        backgroundColor: '#ffffff',
        skipFonts: true,
        fontEmbedCSS: '',
        imagePlaceholder: TRANSPARENT_PLACEHOLDER,
        filter: (node) => !(node instanceof HTMLElement && node.classList?.contains('no-print')),
      });
    } catch (pageErr) {
      console.warn(`Page ${i + 1} soft warning:`, pageErr);
      try {
        imgData = await toJpeg(el, {
          quality: 0.90,
          pixelRatio: 1.8,
          backgroundColor: '#ffffff',
          skipFonts: true,
          fontEmbedCSS: '',
          imagePlaceholder: TRANSPARENT_PLACEHOLDER,
          filter: (node) => !(node instanceof HTMLElement && node.classList?.contains('no-print')),
        });
      } catch (retryErr) {
        console.warn(`Page ${i + 1} retry warning:`, retryErr);
      }
    }

    if (!imgData) continue;

    // Create a temporary image to read exact natural pixel aspect ratio
    const img = new Image();
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = imgData;
    });

    const naturalWidth = img.naturalWidth || 794;
    const naturalHeight = img.naturalHeight || 1123;
    
    // Calculate the exact proportional height in mm so there is ZERO vertical or horizontal distortion
    const calculatedHeightMm = (naturalHeight * PDF_PAGE_WIDTH_MM) / naturalWidth;

    if (!pdf) {
      // First page creates the document with exact proportional dimensions
      pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [PDF_PAGE_WIDTH_MM, calculatedHeightMm],
        compress: true,
      });
    } else {
      // Subsequent pages match their exact natural height proportionally
      pdf.addPage([PDF_PAGE_WIDTH_MM, calculatedHeightMm], 'portrait');
    }

    // Embed the image with 100% natural aspect ratio matching the page canvas
    pdf.addImage(imgData, 'JPEG', 0, 0, PDF_PAGE_WIDTH_MM, calculatedHeightMm, undefined, 'FAST');
  }

  if (!pdf) {
    throw new Error('PDF document could not be compiled');
  }

  onProgress?.('Finalizing and downloading brochure...');

  const fileName = 'TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf';

  try {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 4000);
  } catch {
    pdf.save(fileName);
  }
}

export function openPrintOptimizedWindow(): void {
  try {
    window.print();
  } catch {
    const printWindow = window.open(window.location.href, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }
}
