/**
 * High-Fidelity 5-Page A4 PDF Brochure Generator for Trek & Stay
 * Captures the exact rendered 5 visual brochure pages with all real photos,
 * collages, maps, itineraries, checklists, QR codes, and embeds interactive clickable links!
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

  // Ensure DOM layout is rendered
  await new Promise((r) => setTimeout(r, 150));

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
      onProgress?.(`Capturing Page ${i + 1} of ${elements.length} with full images & active buttons...`);

      // High-definition 2x retina render
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 5000,
        ignoreElements: (node) => node.classList?.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const imgWidth = PDF_PAGE_WIDTH_MM;
      const imgHeight = (canvas.height * PDF_PAGE_WIDTH_MM) / canvas.width;

      if (i > 0) {
        doc.addPage([PDF_PAGE_WIDTH_MM, imgHeight], 'portrait');
      } else {
        (doc as any).internal.pageSize.setWidth(PDF_PAGE_WIDTH_MM);
        (doc as any).internal.pageSize.setHeight(imgHeight);
      }

      doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

      // Add interactive clickable links over rendered elements
      const elRect = el.getBoundingClientRect();
      const scaleX = PDF_PAGE_WIDTH_MM / elRect.width;
      const scaleY = imgHeight / elRect.height;

      const anchorLinks = el.querySelectorAll('a[href]');
      anchorLinks.forEach((a) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !a.classList.contains('no-print')) {
          const aRect = a.getBoundingClientRect();
          const x = (aRect.left - elRect.left) * scaleX;
          const y = (aRect.top - elRect.top) * scaleY;
          const w = aRect.width * scaleX;
          const h = aRect.height * scaleY;
          if (w > 0 && h > 0 && y >= 0 && y <= imgHeight) {
            doc.link(x, y, w, h, { url: href });
          }
        }
      });

      // Special interactive links for buttons
      if (i === 0) {
        // Page 1: Map link
        const mapLinks = el.querySelectorAll('a[href*="maps"]');
        mapLinks.forEach((m) => {
          const mRect = m.getBoundingClientRect();
          const x = (mRect.left - elRect.left) * scaleX;
          const y = (mRect.top - elRect.top) * scaleY;
          const w = mRect.width * scaleX;
          const h = mRect.height * scaleY;
          doc.link(x, y, w, h, { url: 'https://maps.app.goo.gl/uGLFMEgJYDw5wEyR8' });
        });
      } else if (i === 3) {
        // Page 4: All 7 Google Maps buttons
        const hubButtons = el.querySelectorAll('a[href*="maps.google.com"]');
        hubButtons.forEach((btn) => {
          const btnHref = btn.getAttribute('href');
          if (btnHref) {
            const bRect = btn.getBoundingClientRect();
            const x = (bRect.left - elRect.left) * scaleX;
            const y = (bRect.top - elRect.top) * scaleY;
            const w = bRect.width * scaleX;
            const h = bRect.height * scaleY;
            doc.link(x, y, w, h, { url: btnHref });
          }
        });
      } else if (i === 4) {
        // Page 5: UPI, Phone, WhatsApp, Website, Email
        const upiLinks = el.querySelectorAll('button, a');
        upiLinks.forEach((item) => {
          const text = item.textContent || '';
          const iRect = item.getBoundingClientRect();
          const x = (iRect.left - elRect.left) * scaleX;
          const y = (iRect.top - elRect.top) * scaleY;
          const w = iRect.width * scaleX;
          const h = iRect.height * scaleY;

          if (text.includes('UPI') || text.includes('ganapathibhat5@ybl')) {
            doc.link(x, y, w, h, { url: 'upi://pay?pa=ganapathibhat5@ybl&pn=Ganapathi%20Bhat&am=5000&cu=INR&tn=TrekAndStay-Dodham-Advance' });
          } else if (text.includes('99029 37730') || text.includes('Helpline') || text.includes('WHATSAPP')) {
            doc.link(x, y, w, h, { url: 'https://wa.me/919902937730?text=Hi%20Trek%20%26%20Stay%2C%20I%20want%20to%20book%20the%20Dodham%20Yatra%20Special.' });
          } else if (text.includes('trekandstay.vercel.app') || text.includes('OFFICIAL PORTAL')) {
            doc.link(x, y, w, h, { url: 'https://trekandstay.vercel.app' });
          } else if (text.includes('info@trekandstay.com') || text.includes('INQUIRIES')) {
            doc.link(x, y, w, h, { url: 'mailto:info@trekandstay.com' });
          }
        });
      }
    }

    onProgress?.('Saving official 5-page PDF with active buttons...');
    doc.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
    onProgress?.('Brochure downloaded successfully!');
  } catch (err) {
    console.error('Error generating 5-page PDF:', err);
    throw err;
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
