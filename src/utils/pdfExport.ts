/**
 * High-Speed 5-Page A4 PDF Brochure Generator for Trek & Stay
 * Generates the official 5-page Dodham Yatra & Adventure Brochure instantly
 */
import { jsPDF } from 'jspdf';
import { TRIP_META, PACKAGES, ITINERARY_DAYS, INCLUSIONS, EXCLUSIONS, PICKUP_POINTS } from '../data/tripData';

export async function exportBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Generating official 5-page Dodham PDF brochure...');

  try {
    // Generate the pristine, high-resolution 5-page PDF directly using jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    // Helper color palette
    const emeraldColor: [number, number, number] = [5, 150, 105]; // #059669
    const amberColor: [number, number, number] = [217, 119, 6];   // #d97706
    const darkSlate: [number, number, number] = [15, 23, 42];     // #0f172a
    const lightSlate: [number, number, number] = [241, 245, 249]; // #f1f5f9
    const grayText: [number, number, number] = [71, 85, 105];     // #475569

    const addPageHeader = (pageNum: number, title: string) => {
      // Top Bar
      doc.setFillColor(...darkSlate);
      doc.rect(0, 0, pageWidth, 18, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('TREK & STAY EXPEDITIONS', margin, 11);

      doc.setTextColor(...amberColor);
      doc.setFontSize(8.5);
      doc.text('DODHAM YATRA & ADVENTURE BROCHURE 2026', pageWidth - margin, 11, { align: 'right' });

      // Page Title Bar below top bar
      doc.setFillColor(...lightSlate);
      doc.roundedRect(margin, 22, contentWidth, 10, 2, 2, 'F');

      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(title, margin + 4, 28.5);

      doc.setTextColor(...emeraldColor);
      doc.text(`2nd - 8th October 2026 (7D/6N)`, pageWidth - margin - 4, 28.5, { align: 'right' });
    };

    const addPageFooter = (pageNum: number) => {
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('Trek & Stay • +91 99029 37730 • info@trekandstay.com • www.trekandstay.com', margin, pageHeight - 7);
      doc.setFont('helvetica', 'bold');
      doc.text(`Page ${pageNum} of 5`, pageWidth - margin, pageHeight - 7, { align: 'right' });
    };

    /* =========================================================================
       PAGE 1: COVER & EXPEDITION OVERVIEW
    ========================================================================= */
    onProgress?.('Building Page 1: Cover & Sacred Overview...');
    
    // Top Hero Header
    doc.setFillColor(...darkSlate);
    doc.rect(0, 0, pageWidth, 68, 'F');

    doc.setTextColor(...emeraldColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OFFICIAL EXPEDITION BROCHURE', margin, 18);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('DODHAM YATRA & ADVENTURE', margin, 30);

    doc.setTextColor(...amberColor);
    doc.setFontSize(14);
    doc.text('Kedarnath • Badrinath • Rishikesh Rafting • Haridwar Aarti', margin, 40);

    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Departure Dates: October 02 - October 08, 2026 (7 Days / 6 Nights)', margin, 50);
    doc.text('Hubs: Delhi (Train 3A) • Bangalore (Flight Support) • Haridwar / Rishikesh Pickup', margin, 56);

    // Group Offer Ribbon
    doc.setFillColor(...amberColor);
    doc.roundedRect(margin, 74, contentWidth, 14, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('FLAGSHIP GROUP OFFER: BOOK 6 SEATS  GET 1 FREE SLOT (SAVE 17,500)', pageWidth / 2, 83, { align: 'center' });

    // Key Expedition Highlights Box
    doc.setFillColor(...lightSlate);
    doc.roundedRect(margin, 94, contentWidth, 90, 3, 3, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, 94, contentWidth, 90, 3, 3, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Key Expedition Highlights', margin + 6, 105);

    const highlights = [
      {
        title: 'Shri Kedarnath Dham (11,755 ft)',
        desc: 'Sacred 12 Jyotirlinga shrine nestled amidst the Garhwal Himalayas. Includes Sonprayag basecamp stays, Gaurikund trek coordination, and divine evening aarti.'
      },
      {
        title: 'Shri Badrinath Dham (10,279 ft) & Mana First Village',
        desc: 'Char Dham shrine dedicated to Lord Vishnu. Includes holy dip in Tapt Kund natural hot springs, Mana Village, Vyas Gufa, and Saraswati River Origin (Bheem Pul).'
      },
      {
        title: '16 KM Shivpuri River Rafting on Holy Ganga',
        desc: 'High-adrenaline white water rafting navigating Grade III rapids (Roller Coaster, Golf Course, Clubhouse) with cliff jumping and certified river guides.'
      },
      {
        title: 'Haridwar Ganga Aarti & Devprayag Sangam',
        desc: 'Witness the iconic evening Har Ki Pauri Ganga Aarti and the holy confluence of Alaknanda & Bhagirathi rivers at Devprayag.'
      }
    ];

    let yPos = 114;
    highlights.forEach((h) => {
      doc.setFillColor(...emeraldColor);
      doc.circle(margin + 8, yPos - 1, 1.5, 'F');

      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(h.title, margin + 13, yPos);

      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitDesc = doc.splitTextToSize(h.desc, contentWidth - 22);
      doc.text(splitDesc, margin + 13, yPos + 4.5);
      yPos += 18;
    });

    // Package Pricing Overview Box
    doc.setFillColor(254, 243, 199); // amber-100
    doc.roundedRect(margin, 190, contentWidth, 48, 3, 3, 'F');
    doc.setDrawColor(...amberColor);
    doc.roundedRect(margin, 190, contentWidth, 48, 3, 3, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('All-Inclusive Package Options', margin + 6, 200);

    // Delhi Card Inside
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 6, 205, (contentWidth - 16) / 2, 26, 2, 2, 'F');
    doc.setTextColor(...grayText);
    doc.setFontSize(7.5);
    doc.text('DELHI TRANSIT PACKAGE', margin + 10, 212);
    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Rs. 17,500 / person', margin + 10, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('Includes Delhi <-> Haridwar 3A AC Train + Mountains Transit', margin + 10, 226);

    // Bangalore Card Inside
    const blrX = margin + 10 + (contentWidth - 16) / 2;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(blrX, 205, (contentWidth - 16) / 2, 26, 2, 2, 'F');
    doc.setTextColor(...grayText);
    doc.setFontSize(7.5);
    doc.text('BANGALORE FLIGHT PACKAGE', blrX + 4, 212);
    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Rs. 34,000 / person', blrX + 4, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('Includes Flight Tickets + Delhi Train + Full Ground Package', blrX + 4, 226);

    // Bottom Booking Note
    doc.setFillColor(...darkSlate);
    doc.roundedRect(margin, 244, contentWidth, 36, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Reserve Your Slot with Rs. 5,000 Token Advance', margin + 8, 254);

    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Official UPI ID: 9902937730@ybl • Direct WhatsApp Desk: +91 99029 37730', margin + 8, 262);
    doc.text('Limited to 25 pilgrims & adventurers per batch to maintain safety and high-touch hospitality.', margin + 8, 268);
    doc.text('100% Verified Shrine Registrations, Deluxe Hotels & Basecamp Accommodations Included.', margin + 8, 274);

    addPageFooter(1);

    /* =========================================================================
       PAGE 2: DETAILED ITINERARY PART 1 (DAYS 0 - 3)
    ========================================================================= */
    onProgress?.('Building Page 2: Itinerary Days 0 to 3...');
    doc.addPage('a4', 'portrait');
    addPageHeader(2, 'DETAILED ITINERARY • PART 1 (DAYS 0 – 3)');

    let itY = 38;
    const daysPart1 = ITINERARY_DAYS.slice(0, 4);

    daysPart1.forEach((d) => {
      doc.setFillColor(...lightSlate);
      doc.roundedRect(margin, itY, contentWidth, 54, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, itY, contentWidth, 54, 2, 2, 'D');

      // Day Badge
      doc.setFillColor(...amberColor);
      doc.roundedRect(margin + 4, itY + 4, 18, 7, 1.5, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`DAY ${d.dayNumber}`, margin + 13, itY + 9, { align: 'center' });

      // Title & Date
      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(d.dayTitle, margin + 26, itY + 9);

      doc.setTextColor(...emeraldColor);
      doc.setFontSize(8);
      doc.text(d.date, pageWidth - margin - 6, itY + 9, { align: 'right' });

      // Route
      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.text(`Route: ${d.route}`, margin + 6, itY + 16);

      // Points
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...darkSlate);

      let bulletY = itY + 22;
      d.description.forEach((desc) => {
        doc.setFillColor(...amberColor);
        doc.circle(margin + 7, bulletY - 0.8, 0.8, 'F');
        const lines = doc.splitTextToSize(desc, contentWidth - 18);
        doc.text(lines, margin + 11, bulletY);
        bulletY += lines.length * 3.8 + 1;
      });

      // Bottom Meta Bar
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin + 4, itY + 44, contentWidth - 8, 7, 1, 1, 'F');
      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`Meals: ${d.mealsIncluded}   |   Stay: ${d.stayLocation} (${d.stayType})   |   Altitude: ${d.altitude || 'Transit'}`, margin + 8, itY + 49);

      itY += 58;
    });

    addPageFooter(2);

    /* =========================================================================
       PAGE 3: DETAILED ITINERARY PART 2 (DAYS 4 - 7)
    ========================================================================= */
    onProgress?.('Building Page 3: Itinerary Days 4 to 7...');
    doc.addPage('a4', 'portrait');
    addPageHeader(3, 'DETAILED ITINERARY • PART 2 (DAYS 4 – 7)');

    let it2Y = 38;
    const daysPart2 = ITINERARY_DAYS.slice(4);

    daysPart2.forEach((d) => {
      doc.setFillColor(...lightSlate);
      doc.roundedRect(margin, it2Y, contentWidth, 54, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, it2Y, contentWidth, 54, 2, 2, 'D');

      // Day Badge
      doc.setFillColor(...emeraldColor);
      doc.roundedRect(margin + 4, it2Y + 4, 18, 7, 1.5, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`DAY ${d.dayNumber}`, margin + 13, it2Y + 9, { align: 'center' });

      // Title & Date
      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(d.dayTitle, margin + 26, it2Y + 9);

      doc.setTextColor(...amberColor);
      doc.setFontSize(8);
      doc.text(d.date, pageWidth - margin - 6, it2Y + 9, { align: 'right' });

      // Route
      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.text(`Route: ${d.route}`, margin + 6, it2Y + 16);

      // Points
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...darkSlate);

      let bulletY = it2Y + 22;
      d.description.forEach((desc) => {
        doc.setFillColor(...emeraldColor);
        doc.circle(margin + 7, bulletY - 0.8, 0.8, 'F');
        const lines = doc.splitTextToSize(desc, contentWidth - 18);
        doc.text(lines, margin + 11, bulletY);
        bulletY += lines.length * 3.8 + 1;
      });

      // Bottom Meta Bar
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin + 4, it2Y + 44, contentWidth - 8, 7, 1, 1, 'F');
      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`Meals: ${d.mealsIncluded}   |   Stay: ${d.stayLocation} (${d.stayType})   |   Altitude: ${d.altitude || 'Transit'}`, margin + 8, it2Y + 49);

      it2Y += 58;
    });

    addPageFooter(3);

    /* =========================================================================
       PAGE 4: INCLUSIONS, EXCLUSIONS & PACKING CHECKLIST
    ========================================================================= */
    onProgress?.('Building Page 4: Inclusions & Packing Checklist...');
    doc.addPage('a4', 'portrait');
    addPageHeader(4, 'INCLUSIONS, EXCLUSIONS & PACKING GUIDE');

    // Inclusions Box (Left Column)
    const colWidth = (contentWidth - 6) / 2;
    doc.setFillColor(...lightSlate);
    doc.roundedRect(margin, 38, colWidth, 112, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, 38, colWidth, 112, 2, 2, 'D');

    doc.setTextColor(...emeraldColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('What is Included in Package', margin + 5, 46);

    let incY = 53;
    INCLUSIONS.forEach((item) => {
      doc.setFillColor(...emeraldColor);
      doc.circle(margin + 7, incY - 1, 1, 'F');
      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const lines = doc.splitTextToSize(item, colWidth - 16);
      doc.text(lines, margin + 11, incY);
      incY += lines.length * 3.6 + 3.5;
    });

    // Exclusions Box (Right Column)
    const rightColX = margin + colWidth + 6;
    doc.setFillColor(...lightSlate);
    doc.roundedRect(rightColX, 38, colWidth, 112, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(rightColX, 38, colWidth, 112, 2, 2, 'D');

    doc.setTextColor(...amberColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('What is Not Included', rightColX + 5, 46);

    let excY = 53;
    EXCLUSIONS.forEach((item) => {
      doc.setFillColor(...amberColor);
      doc.circle(rightColX + 7, excY - 1, 1, 'F');
      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const lines = doc.splitTextToSize(item, colWidth - 16);
      doc.text(lines, rightColX + 11, excY);
      excY += lines.length * 3.6 + 4;
    });

    // Packing Checklist Box (Bottom)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 156, contentWidth, 118, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, 156, contentWidth, 118, 2, 2, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Recommended High-Altitude Packing Checklist', margin + 6, 165);

    const packingCategories = [
      {
        cat: 'Layered Clothing & Thermals',
        items: '2x Heavy Merino Wool thermal inners, 1x Fleece jacket, 1x Windproof Down feather jacket (-5 deg C), 3x Quick-dry trekking t-shirts & pants, Woolen cap & balaclava, Waterproof gloves.'
      },
      {
        cat: 'Footwear & Trek Essentials',
        items: 'Sturdy high-ankle trekking shoes with deep lugs, 4x Woolen / cotton socks, Trekking pole, 10L-20L Daypack with rain cover, High-grade rain poncho, Sunglasses (UV 400).'
      },
      {
        cat: 'Medical & Personal Hygiene',
        items: 'Personal medications, Diamox (acute mountain sickness), ORS/Electral sachets, Pain relief spray, Band-aids, Lip balm SPF 30+, Sunscreen lotion SPF 50+, Wet wipes, Hand sanitizer.'
      },
      {
        cat: 'Electronics & Documentation',
        items: '20,000 mAh Power bank (extreme cold drains phone batteries quickly), Headlamp/Torch, Original Aadhaar Card / Passport, 2x Passport size photos, Shrine registration pass printout.'
      }
    ];

    let packY = 174;
    packingCategories.forEach((pc) => {
      doc.setFillColor(...emeraldColor);
      doc.roundedRect(margin + 5, packY - 3, 3, 16, 1, 1, 'F');

      doc.setTextColor(...darkSlate);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(pc.cat, margin + 11, packY + 1);

      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const lines = doc.splitTextToSize(pc.items, contentWidth - 20);
      doc.text(lines, margin + 11, packY + 6);
      packY += 24;
    });

    addPageFooter(4);

    /* =========================================================================
       PAGE 5: PRICING, BANK & OFFICIAL UPI PAYMENT DETAILS
    ========================================================================= */
    onProgress?.('Building Page 5: Pricing & UPI Payment Details...');
    doc.addPage('a4', 'portrait');
    addPageHeader(5, 'PRICING, BANKING & OFFICIAL UPI PAYMENT');

    // Pricing Table Box
    doc.setFillColor(...lightSlate);
    doc.roundedRect(margin, 38, contentWidth, 68, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, 38, contentWidth, 68, 2, 2, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Transparent Package Pricing & Inclusions', margin + 6, 47);

    // Package 1 Line
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 6, 52, contentWidth - 12, 22, 1.5, 1.5, 'F');
    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Delhi Transit Package: Rs. 17,500 / person', margin + 10, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text('Includes: Delhi <-> Haridwar 3A AC Sleeper Train, Private Mountain Tempo Traveler, 6 Nights Stays,', margin + 10, 66);
    doc.text('All Meals as per plan, 16 KM Ganga Rafting, Shrine Permits & Certified Expedition Captains.', margin + 10, 70);

    // Package 2 Line
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 6, 78, contentWidth - 12, 22, 1.5, 1.5, 'F');
    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Bangalore Flight Package: Rs. 34,000 / person', margin + 10, 86);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text('Includes: Bangalore <-> Delhi Return Flights, Delhi <-> Haridwar 3A AC Train, Mountain Stays,', margin + 10, 92);
    doc.text('Meals, 16 KM Rafting, Airport Transfers, Permits and 24/7 Ground Support.', margin + 10, 96);

    // Payment Box
    doc.setFillColor(254, 243, 199); // amber-100
    doc.roundedRect(margin, 112, contentWidth, 80, 2, 2, 'F');
    doc.setDrawColor(...amberColor);
    doc.roundedRect(margin, 112, contentWidth, 80, 2, 2, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Official Banking & UPI Reservation Details', margin + 6, 122);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkSlate);
    doc.text('Reserve your seat with a token advance of Rs. 5,000 per person. Remaining balance payable 7 days prior.', margin + 6, 128);

    // UPI Details Block
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 6, 134, contentWidth - 12, 52, 2, 2, 'F');

    doc.setTextColor(...emeraldColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Official UPI ID: 9902937730@ybl', margin + 12, 145);

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Beneficiary Name: Trek & Stay Ventures (Manpreet Singh)', margin + 12, 153);
    doc.text('Primary Booking Desk (WhatsApp / Call): +91 99029 37730', margin + 12, 161);
    doc.text('Official Support Email: info@trekandstay.com / bookings@trekandstay.com', margin + 12, 169);
    doc.text('Official Website: https://trekandstay.com', margin + 12, 177);

    // Terms & Cancellation Policy
    doc.setFillColor(...lightSlate);
    doc.roundedRect(margin, 198, contentWidth, 76, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, 198, contentWidth, 76, 2, 2, 'D');

    doc.setTextColor(...darkSlate);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Terms & Cancellation Policy', margin + 6, 207);

    const terms = [
      '30+ Days Prior: 90% refund of advance token or 100% batch reschedule credit.',
      '15 - 29 Days Prior: 50% refund or 100% slot transfer to any scheduled 2026 batch.',
      'Under 14 Days Prior: Advance token is non-refundable but transferable to a nominated friend/family.',
      'Force Majeure: In case of landslides/weather roadblocks, itinerary adjustments are made for traveler safety.',
      'Medical Fitness: Pilgrims must ensure basic cardiovascular fitness for the 16 KM Kedarnath trek.'
    ];

    let termY = 214;
    terms.forEach((t) => {
      doc.setFillColor(...emeraldColor);
      doc.circle(margin + 8, termY - 0.8, 0.8, 'F');
      doc.setTextColor(...grayText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const lines = doc.splitTextToSize(t, contentWidth - 18);
      doc.text(lines, margin + 12, termY);
      termY += lines.length * 3.6 + 2.5;
    });

    addPageFooter(5);

    // Save and download the PDF file
    onProgress?.('Downloading 5-page PDF brochure...');
    doc.save('TrekAndStay-Dodham-Yatra-Adventure-Brochure.pdf');
    onProgress?.('Download complete!');
  } catch (err) {
    console.error('Error creating PDF:', err);
    onProgress?.('Opening print view...');
    openPrintOptimizedWindow();
  }
}

export function openPrintOptimizedWindow(): void {
  try {
    window.print();
  } catch (e) {
    console.error('Print window error:', e);
  }
}
