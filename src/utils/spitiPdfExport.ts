/**
 * Pixel-Perfect, High-Fidelity 5-Page A4 PDF Brochure Generator for Winter Spiti Expedition
 * Generates the official 5-page PDF brochure matching Trek & Stay's brand standards:
 * - Cover page with winter Himalayan highlights & pricing
 * - Detailed 8-day day-by-day itinerary with routes & altitudes
 * - High-altitude winter safety, AMS protocols & accommodation details
 * - Mandatory packing checklist & gear guide
 * - Transparent terms & conditions, UPI payment QR and direct WhatsApp booking
 */
import { jsPDF } from 'jspdf';
import {
  SPITI_TRIP_META,
  SPITI_ITINERARY_DAYS,
  SPITI_INCLUSIONS,
  SPITI_EXCLUSIONS,
  SPITI_ACCOMMODATIONS,
  SPITI_PACKING_ITEMS,
  SPITI_TERMS_AND_CONDITIONS
} from '../data/spitiTripData';
import { getQRCodeDataURL } from './qrCode';

export async function exportSpitiBrochureToPdf(
  onProgress?: (step: string) => void
): Promise<void> {
  onProgress?.('Generating Page 1 of 5: Winter Spiti Cover & Overview...');
  await new Promise((r) => setTimeout(r, 40));

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pw = 210;
    const ph = 297;
    const m = 10;
    const cw = pw - m * 2; // 190mm

    // Color Palette: Deep Slate, Ice Cyan, Amber, Emerald, Light Gray
    const cDark: [number, number, number] = [15, 23, 42];        // #0f172a
    const cCardBg: [number, number, number] = [250, 250, 249];   // #fafaf9
    const cBorder: [number, number, number] = [229, 231, 235];   // #e5e7eb
    const cTextMain: [number, number, number] = [28, 25, 23];    // #1c1917
    const cTextMuted: [number, number, number] = [100, 116, 139];// #64748b
    const cEmerald: [number, number, number] = [5, 150, 105];    // #059669
    const cEmeraldBg: [number, number, number] = [236, 253, 245];// #ecfdf5
    const cCyan: [number, number, number] = [8, 145, 178];       // #0891b2
    const cCyanBg: [number, number, number] = [236, 254, 255];   // #ecfeff
    const cAmber: [number, number, number] = [217, 119, 6];      // #d97706
    const cAmberBg: [number, number, number] = [254, 243, 199];  // #fef3c7

    // Standard Page Header
    const drawHeader = (title: string, badgeText: string, badgeColor: [number, number, number]) => {
      doc.setFillColor(...cCyan);
      doc.circle(m + 2, 8, 1.5, 'F');

      doc.setTextColor(...cTextMain);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(title, m + 6, 9.5);

      doc.setFontSize(7.5);
      doc.setTextColor(...badgeColor);
      doc.setFont('helvetica', 'bold');
      doc.text(badgeText.toUpperCase(), pw - m, 9.5, { align: 'right' });

      doc.setDrawColor(...cBorder);
      doc.setLineWidth(0.3);
      doc.line(m, 12, pw - m, 12);
    };

    // Standard Page Footer
    const drawFooter = (pageNum: number) => {
      doc.setDrawColor(...cBorder);
      doc.setLineWidth(0.3);
      doc.line(m, ph - 9, pw - m, ph - 9);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...cTextMuted);
      doc.text('TREK & STAY INDIA • WINTER SPITI EXPEDITION OFFICIAL BROCHURE', m, ph - 5.5);

      doc.text(
        `WhatsApp: +91 99029 37730 | trekandstay.com | Page ${pageNum} of 5`,
        pw - m,
        ph - 5.5,
        { align: 'right' }
      );
    };

    // =========================================================================
    // PAGE 1: COVER & EXPEDITION OVERVIEW
    // =========================================================================
    doc.setFillColor(...cDark);
    doc.rect(0, 0, pw, ph, 'F');

    // Brand Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('TREK & STAY', pw / 2, 18, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('OFFICIAL HIMALAYAN WINTER EXPEDITION DOSSIER • 2026-2027', pw / 2, 23, { align: 'center' });

    // Decorative Pill
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(pw / 2 - 40, 27, 80, 7, 2, 2, 'F');
    doc.setTextColor(34, 211, 238);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('❄️ SUB-ZERO HIMALAYAN EXPEDITION SPECIAL', pw / 2, 31.8, { align: 'center' });

    // Main Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text('WINTER SPITI EXPEDITION', pw / 2, 45, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(56, 189, 248);
    doc.text('8 DAYS / 7 NIGHTS • CHANDIGARH TO CHANDIGARH', pw / 2, 52, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    const coverSub = 'Narkanda • Sangla • Chitkul • Kalpa • Nako • Tabo • Gue Mummy • Dhankar • Kaza • Key • Chicham • Langza • Hikkim';
    doc.text(coverSub, pw / 2, 57, { align: 'center' });

    // Hero Overview Box
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(m, 63, cw, 42, 3, 3, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.4);
    doc.roundedRect(m, 63, cw, 42, 3, 3, 'S');

    doc.setTextColor(34, 211, 238);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('EXPERIENCE THE MAGICAL WHITE DESERT OF THE HIMALAYAS', m + 6, 70);

    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const overviewP1 = 'Spiti in winter is a mesmerizing realm untouched by tourist crowds. Witness ancient 1,000-year-old monasteries draped in deep snow, frozen multi-tiered blue waterfalls, the 500-year-old naturally preserved Gue Mummy, dramatic canyon gorges carved by ice, and Asia\'s highest suspension bridge at Chicham (13,596 ft).';
    const overviewP2 = 'Travel safely in dedicated mountain vehicles handled by seasoned snow-route pilots. Experience genuine Spitian warmth with traditional Bukhari wood-stove heated homestays, piping hot local meals, and visit the World\'s Highest Post Office in Hikkim (14,567 ft).';
    doc.text(doc.splitTextToSize(overviewP1, cw - 12), m + 6, 76);
    doc.text(doc.splitTextToSize(overviewP2, cw - 12), m + 6, 88);

    // 4 Key Stats Bento Cards
    const statW = (cw - 6) / 4;
    const stats = [
      { label: 'PACKAGE PRICE', val: '₹23,000', sub: 'Per Person All-Inclusive' },
      { label: 'GROUP DISCOUNT', val: '₹1,000 OFF', sub: 'For Groups of 9+ Trekkers' },
      { label: 'HIGHEST POINT', val: '14,567 FT', sub: 'Hikkim / Langza Village' },
      { label: 'DURATION', val: '8D / 7N', sub: 'Includes Buffer Cushion' }
    ];

    stats.forEach((s, idx) => {
      const sx = m + idx * (statW + 2);
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(sx, 110, statW, 24, 2, 2, 'F');
      doc.setDrawColor(56, 189, 248);
      doc.setLineWidth(0.3);
      doc.roundedRect(sx, 110, statW, 24, 2, 2, 'S');

      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.text(s.label, sx + statW / 2, 116, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(s.val, sx + statW / 2, 123, { align: 'center' });

      doc.setTextColor(56, 189, 248);
      doc.setFontSize(6);
      doc.text(s.sub, sx + statW / 2, 129, { align: 'center' });
    });

    // 6 Confirmed Departure Batches Section
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(m, 139, cw, 58, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SCHEDULED DEPARTURE BATCHES (2026 – 2027)', m + 6, 147);

    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Fixed small-group departures (Max 12-14 guests per batch for safety & comfort).', m + 6, 151.5);

    const bColW = (cw - 8) / 3;
    const batchList = [
      { d: 'Nov 07 – Nov 14, 2026', tag: 'Early Winter / First Snow' },
      { d: 'Dec 25 – Jan 01, 2027', tag: 'Christmas & New Year' },
      { d: 'Jan 23 – Jan 30, 2027', tag: 'Peak Winter / White Spiti' },
      { d: 'Mar 06 – Mar 13, 2027', tag: 'Spring Snow / Blue Skies' },
      { d: 'Apr 10 – Apr 17, 2027', tag: 'Spring Thaw / Open Water' },
      { d: 'May 15 – May 22, 2027', tag: 'Summer Transition Circuit' }
    ];

    batchList.forEach((b, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const bx = m + 4 + col * (bColW + 2);
      const by = 155 + row * 18;

      doc.setFillColor(15, 23, 42);
      doc.roundedRect(bx, by, bColW, 15, 2, 2, 'F');
      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.2);
      doc.roundedRect(bx, by, bColW, 15, 2, 2, 'S');

      doc.setTextColor(248, 250, 252);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(b.d, bx + 4, by + 6);

      doc.setTextColor(34, 211, 238);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(b.tag, bx + 4, by + 11);
    });

    // 8 Route Flow Highlights
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(m, 202, cw, 60, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('EXPEDITION ROUTE CORRIDOR & TOP EXPERIENCES', m + 6, 210);

    const highlights = [
      '• Shimla Ridge & Jakhu Temple — Colonial charm in the Himalayan foothills.',
      '• Sutlej River Gorges & Kinnaur Rock Cut Road — Engineering marvel cliff tunnels.',
      '• Baspa Valley & Chitkul (11,320 ft) — Last inhabited village near the Indo-Tibetan border.',
      '• Kalpa Sunrise & Kinner Kailash (20,000 ft) — Sacred Shivling peak turning amber at dawn.',
      '• Khab Sangam & Ka Loops — Confluence of Spiti & Sutlej rivers under vertical walls.',
      '• 1000-Year Tabo Monastery & 500-Year Gue Mummy — World heritage art & Buddhist history.',
      '• Chicham Bridge (13,596 ft) & Key Monastery — Asia\'s highest suspension bridge & iconic cliff gompa.',
      '• World\'s Highest Post Office in Hikkim (14,567 ft) & Langza Giant Buddha Statue.'
    ];

    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    let hy = 217;
    highlights.forEach((h) => {
      doc.text(h, m + 6, hy);
      hy += 5.5;
    });

    // Official Booking Footer Bar
    doc.setFillColor(14, 165, 233);
    doc.roundedRect(m, 267, cw, 18, 2, 2, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('RESERVE YOUR WINTER SPITI SLOT WITH TREK & STAY', m + 6, 274);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Official WhatsApp Desk: +91 99029 37730 | Direct UPI: ganapathibhat5@ybl | Portal: trekandstay.com', m + 6, 280);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text('₹23,000 ALL-INCLUSIVE', pw - m - 6, 277, { align: 'right' });

    drawFooter(1);

    // =========================================================================
    // PAGE 2: ITINERARY PART 1 (DAYS 1 TO 4)
    // =========================================================================
    onProgress?.('Generating Page 2 of 5: Days 1 to 4 Detailed Itinerary...');
    await new Promise((r) => setTimeout(r, 40));
    doc.addPage();

    drawHeader('DETAILED ITINERARY • PART 1 (DAYS 1 – 4)', 'Chandigarh to Kaza via Kinnaur', cCyan);

    let curY = 16;
    const p1Days = SPITI_ITINERARY_DAYS.slice(0, 4);

    p1Days.forEach((day) => {
      doc.setFillColor(...cCardBg);
      doc.roundedRect(m, curY, cw, 64, 2, 2, 'F');
      doc.setDrawColor(...cBorder);
      doc.setLineWidth(0.3);
      doc.roundedRect(m, curY, cw, 64, 2, 2, 'S');

      // Day Pill
      doc.setFillColor(...cCyan);
      doc.roundedRect(m + 4, curY + 4, 18, 6, 1.5, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`DAY ${day.dayNumber}`, m + 13, curY + 8.2, { align: 'center' });

      // Title & Route
      doc.setTextColor(...cTextMain);
      doc.setFontSize(9.5);
      doc.text(day.dayTitle, m + 26, curY + 8.5);

      doc.setTextColor(...cCyan);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`Altitude: ${day.altitude || 'N/A'} • Distance: ${day.distance || 'N/A'}`, pw - m - 4, curY + 8.5, { align: 'right' });

      doc.setTextColor(...cTextMuted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(`Route: ${day.route}`, m + 4, curY + 14);

      // Bullet points
      doc.setTextColor(...cTextMain);
      doc.setFontSize(7.2);
      let by = curY + 19;
      day.description.slice(0, 5).forEach((desc) => {
        const lines = doc.splitTextToSize(`• ${desc}`, cw - 8);
        doc.text(lines, m + 4, by);
        by += lines.length * 3.6;
      });

      // Highlights & Stay bar
      doc.setFillColor(...cCyanBg);
      doc.roundedRect(m + 3, curY + 54, cw - 6, 7.5, 1.5, 1.5, 'F');
      doc.setTextColor(...cCyan);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.text(`STAY: ${day.stayLocation} (${day.stayType}) • MEALS: ${day.mealsIncluded}`, m + 6, curY + 59);

      curY += 68;
    });

    drawFooter(2);

    // =========================================================================
    // PAGE 3: ITINERARY PART 2 (DAYS 5 TO 8)
    // =========================================================================
    onProgress?.('Generating Page 3 of 5: Days 5 to 8 Itinerary & Buffer Day...');
    await new Promise((r) => setTimeout(r, 40));
    doc.addPage();

    drawHeader('DETAILED ITINERARY • PART 2 (DAYS 5 – 8)', 'Highest Villages, Descents & Buffer', cCyan);

    curY = 16;
    const p2Days = SPITI_ITINERARY_DAYS.slice(4, 8);

    p2Days.forEach((day) => {
      doc.setFillColor(...cCardBg);
      doc.roundedRect(m, curY, cw, 64, 2, 2, 'F');
      doc.setDrawColor(...cBorder);
      doc.setLineWidth(0.3);
      doc.roundedRect(m, curY, cw, 64, 2, 2, 'S');

      // Day Pill
      const pillColor = day.dayNumber === 8 ? cAmber : cCyan;
      doc.setFillColor(...pillColor);
      doc.roundedRect(m + 4, curY + 4, 18, 6, 1.5, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`DAY ${day.dayNumber}`, m + 13, curY + 8.2, { align: 'center' });

      // Title & Route
      doc.setTextColor(...cTextMain);
      doc.setFontSize(9.5);
      doc.text(day.dayTitle, m + 26, curY + 8.5);

      doc.setTextColor(...pillColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`Altitude: ${day.altitude || 'N/A'} • Distance: ${day.distance || 'N/A'}`, pw - m - 4, curY + 8.5, { align: 'right' });

      doc.setTextColor(...cTextMuted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(`Route: ${day.route}`, m + 4, curY + 14);

      // Bullet points
      doc.setTextColor(...cTextMain);
      doc.setFontSize(7.2);
      let by = curY + 19;
      day.description.slice(0, 5).forEach((desc) => {
        const lines = doc.splitTextToSize(`• ${desc}`, cw - 8);
        doc.text(lines, m + 4, by);
        by += lines.length * 3.6;
      });

      // Highlights & Stay bar
      const barBg = day.dayNumber === 8 ? cAmberBg : cCyanBg;
      doc.setFillColor(...barBg);
      doc.roundedRect(m + 3, curY + 54, cw - 6, 7.5, 1.5, 1.5, 'F');
      doc.setTextColor(...pillColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.text(`STAY: ${day.stayLocation} • MEALS: ${day.mealsIncluded}`, m + 6, curY + 59);

      curY += 68;
    });

    drawFooter(3);

    // =========================================================================
    // PAGE 4: INCLUSIONS, EXCLUSIONS & ACCOMMODATION / SAFETY
    // =========================================================================
    onProgress?.('Generating Page 4 of 5: Inclusions, Safety & Stays...');
    await new Promise((r) => setTimeout(r, 40));
    doc.addPage();

    drawHeader('EXPEDITION INCLUSIONS, EXCLUSIONS & WINTER SAFETY', 'Transparency & Standards', cCyan);

    // Inclusions & Exclusions Two-Column Box
    const colW = (cw - 6) / 2;

    // Inclusions
    doc.setFillColor(...cEmeraldBg);
    doc.roundedRect(m, 16, colW, 88, 2, 2, 'F');
    doc.setDrawColor(...cEmerald);
    doc.setLineWidth(0.4);
    doc.roundedRect(m, 16, colW, 88, 2, 2, 'S');

    doc.setTextColor(...cEmerald);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('✅ 100% INCLUDED IN PACKAGE', m + 5, 23);

    doc.setTextColor(...cTextMain);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    let incY = 28;
    SPITI_INCLUSIONS.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, colW - 10);
      doc.text(lines, m + 5, incY);
      incY += lines.length * 3.6 + 1.5;
    });

    // Exclusions
    const exX = m + colW + 6;
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(exX, 16, colW, 88, 2, 2, 'F');
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.4);
    doc.roundedRect(exX, 16, colW, 88, 2, 2, 'S');

    doc.setTextColor(220, 38, 38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('❌ NOT INCLUDED / EXTRA CHARGES', exX + 5, 23);

    doc.setTextColor(...cTextMain);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    let excY = 28;
    SPITI_EXCLUSIONS.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, colW - 10);
      doc.text(lines, exX + 5, excY);
      excY += lines.length * 3.6 + 1.5;
    });

    // High-Altitude Acclimatization & Safety Protocol Banner
    doc.setFillColor(...cCardBg);
    doc.roundedRect(m, 108, cw, 58, 2, 2, 'F');
    doc.setDrawColor(...cCyan);
    doc.setLineWidth(0.4);
    doc.roundedRect(m, 108, cw, 58, 2, 2, 'S');

    doc.setTextColor(...cCyan);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('🏔️ HIGH-ALTITUDE ACCLIMATIZATION & MEDICAL SAFETY PROTOCOL', m + 6, 115);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...cTextMain);
    doc.setFontSize(7.2);
    const safetyNotes = [
      '• High-Altitude Geography: Kaza is at 12,500 ft; Hikkim & Langza exceed 14,500 ft. Atmospheric oxygen is ~40% lower than sea level.',
      '• Medical Consultation: Participants with heart conditions, chronic asthma, or severe hypertension must consult a physician prior to booking.',
      '• Hydration & Nutrition: Drink 3 to 4 litres of lukewarm water daily. Avoid alcohol, smoking, and overexertion upon entering Spiti.',
      '• AMS Warning Signs: Never ignore headaches, nausea, dizziness, vomiting, or shortness of breath at rest. Report immediately to trip leads.',
      '• Medical Kit & Emergency Oximeter: Our vehicles carry pulse-oximeters, medical first-aid kits, and portable emergency oxygen assistance.',
      '• Evacuation Protocol: Kaza has a Community Health Centre (CHC). In severe medical emergencies, immediate road descent is organized.'
    ];

    let safeY = 122;
    safetyNotes.forEach((sn) => {
      doc.text(sn, m + 6, safeY);
      safeY += 5.5;
    });

    // Curated Accommodations & Bukhari Heating
    doc.setFillColor(...cDark);
    doc.roundedRect(m, 170, cw, 108, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('CURATED WINTER ACCOMMODATIONS & ALPINE LIVING REALITIES', m + 6, 178);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Handpicked hotels and traditional Spitian homestays offering true mountain warmth.', m + 6, 183);

    const aColW = (cw - 6) / 2;
    SPITI_ACCOMMODATIONS.forEach((acc, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const ax = m + 4 + col * (aColW + 2);
      const ay = 188 + row * 41;

      doc.setFillColor(30, 41, 59);
      doc.roundedRect(ax, ay, aColW, 37, 2, 2, 'F');

      doc.setTextColor(34, 211, 238);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(acc.name, ax + 4, ay + 6);

      doc.setTextColor(203, 213, 225);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(`Location: ${acc.location} | Type: ${acc.type}`, ax + 4, ay + 11);

      const dLines = doc.splitTextToSize(acc.description, aColW - 8);
      doc.text(dLines, ax + 4, ay + 16);

      doc.setTextColor(251, 191, 36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.2);
      doc.text(`Features: ${acc.features.join(' • ')}`, ax + 4, ay + 32);
    });

    drawFooter(4);

    // =========================================================================
    // PAGE 5: PACKING CHECKLIST, TERMS & UPI / WHATSAPP BOOKING
    // =========================================================================
    onProgress?.('Generating Page 5 of 5: Packing Checklist, Terms & Payment...');
    await new Promise((r) => setTimeout(r, 40));
    doc.addPage();

    drawHeader('MANDATORY GEAR, TERMS & VERIFIED BOOKING', 'Final Preparation Dossier', cCyan);

    // Packing Checklist (Top Box)
    doc.setFillColor(...cCardBg);
    doc.roundedRect(m, 16, cw, 68, 2, 2, 'F');
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(m, 16, cw, 68, 2, 2, 'S');

    doc.setTextColor(...cCyan);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('🎒 MANDATORY WINTER PACKING CHECKLIST (-15°C SURVIVAL GEAR)', m + 6, 23);

    doc.setTextColor(...cTextMuted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.text('Rule of Thumb: Dress in multiple breathable warm layers rather than one heavy jacket.', m + 6, 27);

    // 12 Key Checkbox Items
    const packItems = [
      'Down feather insulated jacket (-15°C rated)',
      'Merino wool thermal innerwear (2-3 pairs)',
      'Waterproof lugged sole winter boots',
      'Windproof ski trousers / shell pants',
      'Woollen socks (4-5 pairs) + liners',
      'Polarized UV-400 sunglasses (Anti-glare)',
      'Waterproof insulated gloves (2 pairs)',
      'Balaclava / Woollen beanie & neck gaiter',
      '20,000 mAh Power bank (cold battery drain)',
      '1 Litre vacuum flask for hot water',
      'Valid Government Photo ID (Original+3 Xerox)',
      'Hard Cash (₹5,000–₹8,000, ATMs non-functional)'
    ];

    packItems.forEach((item, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const px = m + 6 + col * 63;
      const py = 33 + row * 8.5;

      doc.setDrawColor(...cCyan);
      doc.rect(px, py - 2.8, 3.2, 3.2, 'S');

      doc.setTextColor(...cTextMain);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(item, px + 5, py);
    });

    // Terms & Conditions Summary Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(m, 88, cw, 86, 2, 2, 'F');
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(m, 88, cw, 86, 2, 2, 'S');

    doc.setTextColor(...cTextMain);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('📌 OFFICIAL EXPEDITION TERMS & OPERATIONAL CONDITIONS', m + 6, 95);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    let termY = 100;
    SPITI_TERMS_AND_CONDITIONS.slice(0, 11).forEach((term, idx) => {
      const tLines = doc.splitTextToSize(`${idx + 1}. ${term}`, cw - 12);
      doc.text(tLines, m + 6, termY);
      termY += tLines.length * 3.2 + 1;
    });

    // Payment Box & QR Code
    const payY = 178;
    doc.setFillColor(...cDark);
    doc.roundedRect(m, payY, cw, 105, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CONFIRM YOUR WINTER SPITI SLOT • INSTANT UPI QR CODE', m + 8, payY + 9);

    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Scan using Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.', m + 8, payY + 14);

    // Embed Dynamic QR Code
    try {
      const qrDataUrl = await getQRCodeDataURL('delhi', 5000); // Token deposit of ₹5,000 to lock slot
      doc.addImage(qrDataUrl, 'PNG', m + 8, payY + 20, 48, 48);
    } catch {
      doc.setFillColor(255, 255, 255);
      doc.rect(m + 8, payY + 20, 48, 48, 'F');
    }

    // Payment Details Box on Right
    const pDetailX = m + 62;
    doc.setTextColor(34, 211, 238);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('VERIFIED BANK ACCOUNT & UPI RECIPIENT', pDetailX, payY + 24);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(`Official UPI ID: ${SPITI_TRIP_META.officialUpiId}`, pDetailX, payY + 31);
    doc.text(`Account Holder: ${SPITI_TRIP_META.officialUpiPayee}`, pDetailX, payY + 36);
    doc.text(`Bank Name: ${SPITI_TRIP_META.officialBank}`, pDetailX, payY + 41);
    doc.text('Advance Registration Token: ₹5,000 per person (Locks seat)', pDetailX, payY + 46);
    doc.text('Total Package Fee: ₹23,000 (Balance payable 10 days before departure)', pDetailX, payY + 51);
    doc.text('Group Offer: ₹1,000 OFF per person for bookings of 9 or more', pDetailX, payY + 56);

    // Action Confirmation Notice
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(pDetailX, payY + 61, cw - 66, 18, 2, 2, 'F');

    doc.setTextColor(251, 191, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('⚠️ PAYMENT CONFIRMATION VIA WHATSAPP', pDetailX + 4, payY + 67);

    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.text('After transferring the token, send the 12-digit UTR reference number or screenshot to our official WhatsApp desk: +91 99029 37730 for immediate seat confirmation and PDF tax receipt.', pDetailX + 4, payY + 72, { maxWidth: cw - 74 });

    // Host Footer inside box
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.text('Trek & Stay Headquarters: Kodachadri Foothills Road, Kollur, Udupi District, Karnataka 576220', m + 8, payY + 98);

    drawFooter(5);

    // Save and Download
    const fileName = `Trek_and_Stay_Winter_Spiti_Expedition_Brochure_${Date.now()}.pdf`;
    doc.save(fileName);

    onProgress?.('PDF downloaded successfully!');
  } catch (err) {
    console.error('Spiti PDF Generation error:', err);
    throw err;
  }
}
