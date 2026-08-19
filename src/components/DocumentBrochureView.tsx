import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Mountain,
  Users,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Globe,
  Printer,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  Gift,
  Compass,
  Tent,
  Waves,
  Zap,
  Navigation,
  Sun,
  Moon,
  ArrowUpRight,
  ShieldCheck,
  Package,
  FileText,
  CreditCard,
  QrCode,
  X,
  Share2,
  Download,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import {
  TRIP_META,
  PACKAGES,
  GROUP_OFFERS,
  INCLUSIONS,
  EXCLUSIONS,
  PICKUP_POINTS,
  ITINERARY_DAYS,
  ACCOMMODATIONS,
  PACKING_ITEMS,
  TERMS_AND_CONDITIONS
} from '../data/tripData';
import { getQRCodeDataURL } from '../utils/qrCode';
import { exportBrochureToPdf, openPrintOptimizedWindow } from '../utils/pdfExport';

interface DocumentBrochureViewProps {
  onNavigateHome?: () => void;
  onOpenGlobalBooking?: (destination?: string, price?: string) => void;
  onOpenGlobalPayment?: () => void;
  hideTopBar?: boolean;
}

export const DocumentBrochureView: React.FC<DocumentBrochureViewProps> = ({
  onNavigateHome,
  onOpenGlobalBooking,
  onOpenGlobalPayment,
  hideTopBar = false
}) => {
  // Theme & UI states
  const [docTheme, setDocTheme] = useState<'light' | 'dark'>('light');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [checkedPackingItems, setCheckedPackingItems] = useState<Record<string, boolean>>({});

  // PDF Export Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');

  // Static pre-generated QR codes
  const [delhiQrUrl, setDelhiQrUrl] = useState('');
  const [blrQrUrl, setBlrQrUrl] = useState('');
  const [tokenQrUrl, setTokenQrUrl] = useState('');

  // Interactive Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<'bangalore' | 'delhi'>('bangalore');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [includeRafting, setIncludeRafting] = useState<boolean>(false);
  const [includeBungee, setIncludeBungee] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<'token' | 'full'>('token');

  // Contact details
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerCity, setTravelerCity] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [bookingRefId, setBookingRefId] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Dynamic QR in modal
  const [dynamicQrUrl, setDynamicQrUrl] = useState('');

  // Generate standard QRs on mount using zero-dependency pure TS helper
  useEffect(() => {
    const delhiUrl = getQRCodeDataURL(
      `upi://pay?pa=${TRIP_META.upiId}&pn=${encodeURIComponent(
        TRIP_META.upiPayeeName
      )}&am=17500&cu=INR&tn=TrekAndStay-Dodham-Delhi`,
      240
    );
    setDelhiQrUrl(delhiUrl);

    const blrUrl = getQRCodeDataURL(
      `upi://pay?pa=${TRIP_META.upiId}&pn=${encodeURIComponent(
        TRIP_META.upiPayeeName
      )}&am=34000&cu=INR&tn=TrekAndStay-Dodham-BLR`,
      240
    );
    setBlrQrUrl(blrUrl);

    const tokenUrl = getQRCodeDataURL(
      `upi://pay?pa=${TRIP_META.upiId}&pn=${encodeURIComponent(
        TRIP_META.upiPayeeName
      )}&am=5000&cu=INR&tn=TrekAndStay-Dodham-Token`,
      240
    );
    setTokenQrUrl(tokenUrl);
  }, []);

  // Pricing calculations
  const selectedPackage = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[0];
  const basePricePerPerson = selectedPackage.pricePerPerson;
  const RAFTING_PRICE = 1200;
  const BUNGEE_PRICE = 3700;

  let discountAmount = 0;
  let discountLabel = '';
  let effectiveBaseTotal = 0;

  if (travelersCount >= 9) {
    discountAmount = basePricePerPerson;
    discountLabel = `🎁 1 Free Slot Applied (Saved ₹${discountAmount.toLocaleString('en-IN')})`;
    effectiveBaseTotal = (travelersCount - 1) * basePricePerPerson;
  } else if (travelersCount >= 5) {
    discountAmount = travelersCount * 1000;
    discountLabel = `🔥 Group Discount: ₹1,000 OFF × ${travelersCount} pax (Saved ₹${discountAmount.toLocaleString('en-IN')})`;
    effectiveBaseTotal = travelersCount * (basePricePerPerson - 1000);
  } else {
    effectiveBaseTotal = travelersCount * basePricePerPerson;
  }

  const addOnsTotal =
    (includeRafting ? RAFTING_PRICE * travelersCount : 0) +
    (includeBungee ? BUNGEE_PRICE * travelersCount : 0);

  const grandTotal = effectiveBaseTotal + addOnsTotal;
  const tokenAdvanceTotal = travelersCount * TRIP_META.tokenAdvanceAmount;
  const payableAmount = paymentType === 'token' ? tokenAdvanceTotal : grandTotal;

  const upiString = `upi://pay?pa=${TRIP_META.upiId}&pn=${encodeURIComponent(
    TRIP_META.upiPayeeName
  )}&am=${payableAmount}&cu=INR&tn=${encodeURIComponent(
    `TrekAndStay-${selectedPackage.name.substring(0, 15)}-${travelersCount}pax`
  )}`;

  // Update dynamic modal QR
  useEffect(() => {
    if (isBookingModalOpen && upiString) {
      const qrData = getQRCodeDataURL(upiString, 260);
      setDynamicQrUrl(qrData);
    }
  }, [isBookingModalOpen, upiString, payableAmount]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(TRIP_META.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePrint = () => {
    openPrintOptimizedWindow();
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfProgressText('Initializing 5-page A4 layout...');
    try {
      await exportBrochureToPdf((step) => {
        setPdfProgressText(step);
      });
      setPdfProgressText('Brochure PDF downloaded successfully!');
      setTimeout(() => {
        setIsGeneratingPdf(false);
      }, 1800);
    } catch {
      setPdfProgressText('Opening Print / Save as PDF view...');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        openPrintOptimizedWindow();
      }, 1000);
    }
  };

  const openBookingModalForPackage = (pkgId: 'bangalore' | 'delhi') => {
    setSelectedPackageId(pkgId);
    setIsBookingModalOpen(true);
    setBookingConfirmed(false);
  };

  const scrollToPage = (pageId: string) => {
    const el = document.getElementById(pageId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const togglePackingItem = (id: string) => {
    setCheckedPackingItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const whatsappMessage = encodeURIComponent(
    `*New Trek & Stay Booking Enquiry*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📍 *Package:* Dodham Yatra + Adventure Special\n` +
    `📅 *Dates:* ${TRIP_META.dates} (7 Days • 6 Nights)\n` +
    `👥 *Travelers:* ${travelersCount} Person(s)\n` +
    `💰 *Package:* ${selectedPackage.name}\n` +
    `🌊 *Rafting Add-on:* ${includeRafting ? 'Yes' : 'No'}\n` +
    `🪂 *Bungee Add-on:* ${includeBungee ? 'Yes' : 'No'}\n` +
    `💵 *Payable Amount:* ₹${payableAmount.toLocaleString('en-IN')}\n` +
    `👤 *Lead Traveler:* ${travelerName || 'Yatri'}\n` +
    `📱 *Phone:* ${travelerPhone || 'Not provided'}\n` +
    (utrNumber ? `🔖 *UTR:* ${utrNumber}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `_I want to book my Dodham Yatra & Adventure slot with Trek & Stay._`
  );

  const handleConfirmVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName || !travelerPhone) {
      alert('Please enter your name and phone number to create your reservation.');
      return;
    }
    const ref = 'TS-DY-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className={`min-h-screen transition-colors ${docTheme === 'light' ? 'bg-stone-200/90 text-stone-900' : 'bg-stone-950 text-stone-100'}`}>
      
      {/* =========================================================================
          TOP DOCUMENT VIEWER TOOLBAR (Fixed Header - Hidden on Print)
      ========================================================================= */}
      {!hideTopBar && (
        <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md no-print pt-14 lg:pt-16">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            {/* Logo & Document Title */}
            <div className="flex items-center gap-2.5">
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  title="Back to Home"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </button>
              )}
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                <Mountain className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-serif-brand">
                  <span>TREK & STAY</span>
                  <span className="text-stone-500">|</span>
                  <span className="text-amber-400 font-sans font-semibold text-[11px]">Upcoming Itinerary</span>
                </div>
                <div className="text-[10px] text-stone-400">
                  Kedarnath • Badrinath • Rishikesh (2nd–8th Oct)
                </div>
              </div>
            </div>

            {/* Quick Page Jump Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs text-stone-300">
              <button
                onClick={() => scrollToPage('pdf-page-1')}
                className="px-2.5 py-1 rounded hover:bg-stone-800 hover:text-amber-400 transition"
              >
                1. Overview
              </button>
              <span className="text-stone-600">•</span>
              <button
                onClick={() => scrollToPage('pdf-page-2')}
                className="px-2.5 py-1 rounded hover:bg-stone-800 hover:text-amber-400 transition"
              >
                2. Days 0-3
              </button>
              <span className="text-stone-600">•</span>
              <button
                onClick={() => scrollToPage('pdf-page-3')}
                className="px-2.5 py-1 rounded hover:bg-stone-800 hover:text-amber-400 transition"
              >
                3. Days 4-7
              </button>
              <span className="text-stone-600">•</span>
              <button
                onClick={() => scrollToPage('pdf-page-4')}
                className="px-2.5 py-1 rounded hover:bg-stone-800 hover:text-amber-400 transition"
              >
                4. Inclusions & Stays
              </button>
              <span className="text-stone-600">•</span>
              <button
                onClick={() => scrollToPage('pdf-page-5')}
                className="px-2.5 py-1 rounded hover:bg-stone-800 hover:text-amber-400 transition font-semibold text-amber-300"
              >
                5. Pricing & UPI Pay
              </button>
            </nav>

            {/* Action Tools */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Theme Toggle */}
              <button
                onClick={() => setDocTheme(docTheme === 'light' ? 'dark' : 'light')}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
                title="Toggle Light / Dark reading mode"
              >
                {docTheme === 'light' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Download / Save as PDF Button */}
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition transform active:scale-95 cursor-pointer"
                title="Download full 5-page A4 PDF brochure"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download PDF'}</span>
              </button>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="hidden sm:flex px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold items-center gap-1.5 transition cursor-pointer"
                title="Print document"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              {/* Instant Book / Pay Button */}
              <button
                onClick={() => openBookingModalForPackage('bangalore')}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Book & Pay QR</span>
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${TRIP_META.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition"
                title="WhatsApp Enquiry"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          MAIN DOCUMENT BODY: 5 FULL-SIZED EXPEDITION PAGES (A4 PROPORTIONAL)
      ========================================================================= */}
      <main className="mx-auto px-2 sm:px-4 py-6 space-y-8 w-full max-w-[800px] transition-all duration-300 print:p-0 print:m-0 print:max-w-full print:space-y-0">

        {/* -----------------------------------------------------------------------
            PAGE 1: COVER, HERO COLLAGE & OVERVIEW
        ----------------------------------------------------------------------- */}
        <article
          id="pdf-page-1"
          className={`rounded-2xl shadow-xl overflow-hidden border transition-colors print:shadow-none print:border-none print:rounded-none print-avoid-break w-full ${
            docTheme === 'light' ? 'bg-white border-stone-300 text-stone-900' : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          {/* Top Brand Banner Header */}
          <div className="bg-stone-950 text-stone-100 p-6 sm:p-8 text-center border-b border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                TREK & STAY EXPEDITIONS
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-[11px] text-stone-300 tracking-wider">
                Welcome to the Wilderness
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-brand text-white tracking-tight leading-tight">
              🕉️ DODHAM YATRA + ADVENTURE SPECIAL 🏔️
            </h1>
            
            <p className="text-xs sm:text-sm font-bold text-amber-400 mt-2 uppercase tracking-wide">
              Kedarnath • Badrinath • Rishikesh • Rafting • Bungee Jump
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-semibold px-3 py-1 rounded-full border border-amber-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>2nd – 8th October | 7 Days • 6 Nights</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 font-semibold px-3 py-1 rounded-full border border-emerald-700/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified Mountain Captains</span>
              </span>
            </div>
          </div>

          {/* 4-Photo Visual Collage (Real Matching Expedition Photos) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-stone-950">
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
                alt="Kedarnath Temple with snow-capped Himalayas"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 block">Jyotirlinga Shrine</span>
                  <span className="text-xs font-bold text-white font-heading">Kedarnath (11,755 ft)</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80"
                alt="Badrinath Temple vibrant facade"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 block">Lord Vishnu Abode</span>
                  <span className="text-xs font-bold text-white font-heading">Badrinath Dham</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80"
                alt="Ganga White Water River Rafting in Rishikesh"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-cyan-400 block">16 km Rapids Thrill</span>
                  <span className="text-xs font-bold text-white font-heading">Rishikesh River Rafting</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
                alt="India's Highest Bungee Jump at Mohan Chatti"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 block">Mohan Chatti Rishikesh</span>
                  <span className="text-xs font-bold text-white font-heading">India's Highest Bungee</span>
                </div>
              </div>
            </div>
          </div>

          {/* About This Experience & Stats Row */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className={`text-lg sm:text-xl font-bold font-serif-brand tracking-wide uppercase ${
                  docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  About This Experience
                </h2>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                docTheme === 'light' ? 'text-stone-700' : 'text-stone-300'
              }`}>
                The <strong>Dodham Yatra + Adventure Special</strong> is a holy yet exhilarating Himalayan expedition curated by <strong>Trek & Stay</strong>. This journey harmoniously unites sacred spiritual devotion at <strong>Kedarnath Dham (11,755 ft)</strong> and <strong>Badrinath Dham (10,279 ft)</strong> with adrenaline adventures in Rishikesh. Travel comfortably in push-back mountain tempo travelers, trek along the Mandakini river, conquer the roaring rapids of Ganga, experience alpine tent camping under starry skies, and visit Mana (the First Village of India).
              </p>

              {/* 8 Highlights Grid */}
              <div className="mt-4">
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  docTheme === 'light' ? 'text-amber-800' : 'text-amber-400'
                }`}>
                  Expedition Highlights:
                </h3>
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium ${
                  docTheme === 'light' ? 'text-stone-800' : 'text-stone-300'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Kedarnath Darshan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Badrinath Prayers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Rishikesh Rafting (16km)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>India's Highest Bungee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>16 km Scenic Trek</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Alpine Tent Camping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Mana First Village</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Dedicated Buffer Day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Metadata Badges matching Yoga PDF */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border text-center ${
              docTheme === 'light' ? 'bg-stone-50 border-stone-200' : 'bg-stone-800/70 border-stone-700'
            }`}>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Duration</div>
                <div className={`text-sm font-extrabold mt-0.5 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                  7 Days • 6 Nights
                </div>
                <div className="text-[10px] text-stone-400">2nd – 8th October</div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Location</div>
                <div className={`text-sm font-extrabold mt-0.5 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                  Uttarakhand, India
                </div>
                <a
                  href="https://maps.google.com/?q=Kedarnath+Temple"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold underline inline-flex items-center gap-0.5 mt-0.5"
                >
                  <Navigation className="w-2.5 h-2.5" />
                  <span>View Map Directions</span>
                </a>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Min. Age</div>
                <div className={`text-sm font-extrabold mt-0.5 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                  12+ Years
                </div>
                <div className="text-[10px] text-stone-400">18+ for Extreme Bungee</div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Difficulty Level</div>
                <div className={`text-sm font-extrabold mt-0.5 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                  Moderate to High
                </div>
                <div className="text-[10px] text-stone-400">16 km Mountain Trek</div>
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="px-6 py-3 bg-stone-950 text-stone-400 text-[10px] flex items-center justify-between border-t border-stone-800">
            <span>Trek & Stay Expeditions • Dodham Yatra Brochure</span>
            <span className="font-mono-num font-bold text-stone-300">Page 1 of 5</span>
          </div>
        </article>

        {/* -----------------------------------------------------------------------
            PAGE 2: DETAILED EXPEDITION ITINERARY (PART 1: DAYS 0 – 3)
        ----------------------------------------------------------------------- */}
        <article
          id="pdf-page-2"
          className={`rounded-2xl shadow-xl overflow-hidden border transition-colors print:shadow-none print:border-none print:rounded-none print-avoid-break ${
            docTheme === 'light' ? 'bg-white border-stone-300 text-stone-900' : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Section Header */}
            <div className="border-b pb-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className={`text-lg sm:text-xl font-bold font-serif-brand uppercase ${
                  docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  DETAILED ITINERARY • PART 1 (DAYS 0 – 3)
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Transit, Sonprayag & Kedarnath Dham
              </span>
            </div>

            {/* Route Flow Bar */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              docTheme === 'light' ? 'bg-stone-50 border-stone-200' : 'bg-stone-800/60 border-stone-700'
            }`}>
              <span className="font-bold text-emerald-600 block mb-1 uppercase tracking-wider text-[10px]">
                Part 1 Route Flow:
              </span>
              <div className="font-semibold text-stone-700 dark:text-stone-200 flex flex-wrap items-center gap-1.5">
                <span>✈️ Bangalore (BLR) / Delhi</span>
                <span className="text-amber-500">➔</span>
                <span>🚆 Haridwar Jn</span>
                <span className="text-amber-500">➔</span>
                <span>Devprayag Sangam</span>
                <span className="text-amber-500">➔</span>
                <span>Sonprayag Base</span>
                <span className="text-amber-500">➔</span>
                <span className="text-amber-600 font-bold">🚩 Shri Kedarnath Jyotirlinga (11,755 ft)</span>
                <span className="text-amber-500">➔</span>
                <span>Gaurikund</span>
              </div>
            </div>

            {/* Days 0 to 3 Breakdown */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              {ITINERARY_DAYS.slice(0, 4).map((day) => (
                <div
                  key={day.dayNumber}
                  className={`p-3.5 sm:p-4 rounded-xl border transition ${
                    docTheme === 'light'
                      ? 'bg-stone-50/90 border-stone-200 shadow-sm'
                      : 'bg-stone-850 border-stone-700/80 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between border-b pb-2 border-stone-200 dark:border-stone-700 gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                            {day.dayNumber}
                          </span>
                          <span className={`font-bold text-xs sm:text-sm font-heading truncate ${
                            docTheme === 'light' ? 'text-stone-900' : 'text-white'
                          }`}>
                            {day.dayTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                            {day.date}
                          </span>
                          <a
                            href={day.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="no-print inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded font-semibold transition"
                          >
                            <MapPin className="w-2.5 h-2.5" />
                            <span>Map</span>
                          </a>
                        </div>
                      </div>

                      <div className="text-[11px] text-stone-500 font-medium italic">
                        📍 {day.route}
                      </div>

                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300 leading-snug">
                        {day.description.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {day.image && (
                      <div className="sm:w-44 md:w-48 shrink-0 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-900 relative shadow-sm h-28 sm:h-auto">
                        <img
                          src={day.image}
                          alt={day.imageCaption || day.dayTitle}
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2">
                          <span className="text-[10px] font-medium text-stone-200 line-clamp-2 leading-tight">
                            {day.imageCaption}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/80 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    <span>🍽️ <strong>Meals:</strong> {day.mealsIncluded}</span>
                    <span>🏨 <strong>Stay:</strong> {day.stayLocation} ({day.stayType})</span>
                    {day.altitude && <span>🏔️ <strong>Altitude:</strong> {day.altitude}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Footer */}
          <div className="px-6 py-3 bg-stone-950 text-stone-400 text-[10px] flex items-center justify-between border-t border-stone-800">
            <span>Trek & Stay Expeditions • Dodham Yatra Brochure</span>
            <span className="font-mono-num font-bold text-stone-300">Page 2 of 5</span>
          </div>
        </article>

        {/* -----------------------------------------------------------------------
            PAGE 3: DETAILED EXPEDITION ITINERARY (PART 2: DAYS 4 – 7)
        ----------------------------------------------------------------------- */}
        <article
          id="pdf-page-3"
          className={`rounded-2xl shadow-xl overflow-hidden border transition-colors print:shadow-none print:border-none print:rounded-none print-avoid-break ${
            docTheme === 'light' ? 'bg-white border-stone-300 text-stone-900' : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Section Header */}
            <div className="border-b pb-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className={`text-lg sm:text-xl font-bold font-serif-brand uppercase ${
                  docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  DETAILED ITINERARY • PART 2 (DAYS 4 – 7)
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Badrinath, Mana Village, Mohan Chatti & Return
              </span>
            </div>

            {/* Route Flow Bar */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              docTheme === 'light' ? 'bg-stone-50 border-stone-200' : 'bg-stone-800/60 border-stone-700'
            }`}>
              <span className="font-bold text-emerald-600 block mb-1 uppercase tracking-wider text-[10px]">
                Part 2 Route Flow:
              </span>
              <div className="font-semibold text-stone-700 dark:text-stone-200 flex flex-wrap items-center gap-1.5">
                <span>Gaurikund</span>
                <span className="text-amber-500">➔</span>
                <span>Chopta ("Mini Switzerland")</span>
                <span className="text-amber-500">➔</span>
                <span className="text-amber-600 font-bold">🚩 Shri Badrinath Dham (10,279 ft)</span>
                <span className="text-amber-500">➔</span>
                <span>Mana (First Village of India)</span>
                <span className="text-amber-500">➔</span>
                <span>Mohan Chatti (83m Bungee)</span>
                <span className="text-amber-500">➔</span>
                <span>🌊 Rishikesh Rafting</span>
                <span className="text-amber-500">➔</span>
                <span>Safe Arrival Home</span>
              </div>
            </div>

            {/* Days 4 to 7 Breakdown */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              {ITINERARY_DAYS.slice(4).map((day) => (
                <div
                  key={day.dayNumber}
                  className={`p-3.5 sm:p-4 rounded-xl border transition ${
                    docTheme === 'light'
                      ? 'bg-stone-50/90 border-stone-200 shadow-sm'
                      : 'bg-stone-850 border-stone-700/80 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between border-b pb-2 border-stone-200 dark:border-stone-700 gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                            {day.dayNumber}
                          </span>
                          <span className={`font-bold text-xs sm:text-sm font-heading truncate ${
                            docTheme === 'light' ? 'text-stone-900' : 'text-white'
                          }`}>
                            {day.dayTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                            {day.date}
                          </span>
                          <a
                            href={day.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="no-print inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded font-semibold transition"
                          >
                            <MapPin className="w-2.5 h-2.5" />
                            <span>Map</span>
                          </a>
                        </div>
                      </div>

                      <div className="text-[11px] text-stone-500 font-medium italic">
                        📍 {day.route}
                      </div>

                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300 leading-snug">
                        {day.description.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {day.image && (
                      <div className="sm:w-44 md:w-48 shrink-0 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-900 relative shadow-sm h-28 sm:h-auto">
                        <img
                          src={day.image}
                          alt={day.imageCaption || day.dayTitle}
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2">
                          <span className="text-[10px] font-medium text-stone-200 line-clamp-2 leading-tight">
                            {day.imageCaption}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/80 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    <span>🍽️ <strong>Meals:</strong> {day.mealsIncluded}</span>
                    <span>🏨 <strong>Stay:</strong> {day.stayLocation} ({day.stayType})</span>
                    {day.altitude && <span>🏔️ <strong>Altitude:</strong> {day.altitude}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Footer */}
          <div className="px-6 py-3 bg-stone-950 text-stone-400 text-[10px] flex items-center justify-between border-t border-stone-800">
            <span>Trek & Stay Expeditions • Dodham Yatra Brochure</span>
            <span className="font-mono-num font-bold text-stone-300">Page 3 of 5</span>
          </div>
        </article>

        {/* -----------------------------------------------------------------------
            PAGE 4: INCLUSIONS, EXCLUSIONS, PICKUPS & ACCOMMODATIONS
        ----------------------------------------------------------------------- */}
        <article
          id="pdf-page-4"
          className={`rounded-2xl shadow-xl overflow-hidden border transition-colors print:shadow-none print:border-none print:rounded-none print-avoid-break ${
            docTheme === 'light' ? 'bg-white border-stone-300 text-stone-900' : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Section Header */}
            <div className="border-b pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className={`text-lg sm:text-xl font-bold font-serif-brand uppercase ${
                docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
              }`}>
                INCLUSIONS, EXCLUSIONS & LOGISTICS
              </h2>
            </div>

            {/* Inclusions & Exclusions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Inclusions */}
              <div className={`p-4 rounded-xl border ${
                docTheme === 'light' ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/60'
              }`}>
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>PACKAGE INCLUSIONS</span>
                </h3>
                <ul className="space-y-1.5 text-stone-700 dark:text-stone-300">
                  {INCLUSIONS.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className={`p-4 rounded-xl border ${
                docTheme === 'light' ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/20 border-rose-800/60'
              }`}>
                <h3 className="font-bold text-rose-700 dark:text-rose-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>PACKAGE EXCLUSIONS</span>
                </h3>
                <ul className="space-y-1.5 text-stone-700 dark:text-stone-300">
                  {EXCLUSIONS.slice(0, 10).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pick Up Locations Table with Google Maps */}
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-2.5 ${
                docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
              }`}>
                REPORTING & PICK UP HUBS
              </h3>
              <div className={`border rounded-xl overflow-hidden text-xs ${
                docTheme === 'light' ? 'border-stone-200' : 'border-stone-700'
              }`}>
                <div className={`grid grid-cols-12 p-3 font-bold uppercase text-[10px] tracking-wider border-b ${
                  docTheme === 'light' ? 'bg-stone-100 text-stone-700 border-stone-200' : 'bg-stone-800 text-stone-300 border-stone-700'
                }`}>
                  <div className="col-span-8">Pick Up Hub / Location</div>
                  <div className="col-span-4 text-right">Navigation</div>
                </div>
                <div className="divide-y divide-stone-200 dark:divide-stone-700">
                  {PICKUP_POINTS.map((pt, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-2">
                      <div>
                        <div className={`font-bold ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                          {pt.name}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {pt.reportingTime} • {pt.address}
                        </div>
                      </div>
                      <a
                        href={pt.googleMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shrink-0 transition"
                      >
                        <span>Google Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accommodations Grid */}
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
              }`}>
                STAYS & HIGH-ALTITUDE CAMPS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {ACCOMMODATIONS.map((stay, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border overflow-hidden flex flex-col transition hover:shadow-md ${
                      docTheme === 'light' ? 'bg-stone-50 border-stone-200 shadow-sm' : 'bg-stone-800 border-stone-700 shadow-sm'
                    }`}
                  >
                    <div className="relative h-32 w-full bg-stone-900 overflow-hidden">
                      <img
                        src={stay.image}
                        alt={stay.name}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-bold text-amber-400">{stay.location}</span>
                      </div>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className={`font-bold text-xs sm:text-sm ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                          {stay.name}
                        </div>
                        <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {stay.type}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 line-clamp-3 leading-relaxed">
                          {stay.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="px-6 py-3 bg-stone-950 text-stone-400 text-[10px] flex items-center justify-between border-t border-stone-800">
            <span>Trek & Stay Expeditions • Dodham Yatra Brochure</span>
            <span className="font-mono-num font-bold text-stone-300">Page 4 of 5</span>
          </div>
        </article>

        {/* -----------------------------------------------------------------------
            PAGE 5: PRICING, GROUP OFFERS, LIVE UPI QR PAY & HOSTS CONTACT
        ----------------------------------------------------------------------- */}
        <article
          id="pdf-page-5"
          className={`rounded-2xl shadow-xl overflow-hidden border transition-colors print:shadow-none print:border-none print:rounded-none print-avoid-break ${
            docTheme === 'light' ? 'bg-white border-stone-300 text-stone-900' : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Section Header */}
            <div className="border-b pb-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className={`text-lg sm:text-xl font-bold font-serif-brand uppercase ${
                  docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  PRICING & INSTANT UPI QR RESERVATION
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Direct Booking via UPI / QR
              </span>
            </div>

            {/* Pricing Packages Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Bangalore Plan */}
              <div className={`p-5 rounded-xl border-2 flex flex-col justify-between ${
                docTheme === 'light'
                  ? 'bg-amber-50/50 border-amber-500 shadow-sm'
                  : 'bg-amber-950/20 border-amber-500'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Flight + Complete Tour
                    </span>
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      POPULAR
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mt-1 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                    Bangalore to Bangalore Package
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">Includes flights/train assistance + full yatra</p>
                  <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono-num mt-3">
                    ₹ 34,000 /-
                  </div>
                  <span className="text-[11px] text-stone-500">per person (7 Days • 6 Nights)</span>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">Token Advance: ₹5,000</span>
                  <button
                    onClick={() => openBookingModalForPackage('bangalore')}
                    className="no-print px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Reserve Bangalore Plan
                  </button>
                </div>
              </div>

              {/* Delhi Plan */}
              <div className={`p-5 rounded-xl border flex flex-col justify-between ${
                docTheme === 'light'
                  ? 'bg-stone-50 border-stone-300 shadow-sm'
                  : 'bg-stone-800 border-stone-700'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                      Standard Land Tour
                    </span>
                    <span className="bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Base Plan
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mt-1 ${docTheme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                    Delhi to Delhi Package
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">Haridwar / Delhi start + Himalayan transit</p>
                  <div className={`text-3xl font-extrabold font-mono-num mt-3 ${
                    docTheme === 'light' ? 'text-stone-900' : 'text-white'
                  }`}>
                    ₹ 17,500 /-
                  </div>
                  <span className="text-[11px] text-stone-500">per person (7 Days • 6 Nights)</span>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">Token Advance: ₹5,000</span>
                  <button
                    onClick={() => openBookingModalForPackage('delhi')}
                    className="no-print px-3.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Reserve Delhi Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Group Offers Callout */}
            <div className="bg-gradient-to-r from-amber-600/15 via-emerald-600/15 to-amber-600/15 p-3.5 rounded-xl border border-amber-500/40 flex items-center justify-between text-xs font-bold flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>5+ Bookings → ₹1,000 OFF / person</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                <Gift className="w-4 h-4 text-emerald-500" />
                <span>9+ Bookings → 1 SLOT FREE 🎁</span>
              </div>
            </div>

            {/* Live Dynamic UPI QR Codes Matrix for Instant Payment */}
            <div className={`p-5 rounded-xl border text-center ${
              docTheme === 'light' ? 'bg-stone-50 border-stone-200' : 'bg-stone-850 border-stone-700'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                  Scan to Pay with Any UPI App (GPay / PhonePe / Paytm / BHIM)
                </div>
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
                Official Account: <strong>{TRIP_META.upiPayeeName}</strong> • {TRIP_META.bankName}
              </div>

              {/* Verified UPI ID Badge */}
              <div className="flex justify-center items-center gap-2 mb-4 flex-wrap text-xs">
                <div className="bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-amber-950 dark:text-amber-200 shadow-sm">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 dark:text-amber-400">Official UPI ID:</span>
                  <span className="font-mono-num font-extrabold text-xs text-stone-900 dark:text-white">{TRIP_META.upiId}</span>
                </div>
              </div>

              <div className="flex justify-center gap-6 sm:gap-10 items-center flex-wrap">
                {delhiQrUrl && (
                  <div className="bg-white p-3 rounded-xl border border-stone-300 shadow-md text-stone-900 text-center">
                    <img src={delhiQrUrl} alt="Delhi Plan QR Code" className="w-32 h-32 mx-auto rounded" />
                    <span className="text-[11px] font-bold block mt-1.5 text-stone-800">Delhi: ₹17,500</span>
                    <span className="text-[9px] text-stone-600 font-mono-num font-bold">{TRIP_META.upiId}</span>
                    <span className="text-[8px] text-emerald-700 font-medium block">A/c: Ganapathi Bhat</span>
                  </div>
                )}

                {blrQrUrl && (
                  <div className="bg-white p-3 rounded-xl border-2 border-amber-500 shadow-md text-stone-900 text-center">
                    <img src={blrQrUrl} alt="Bangalore Plan QR Code" className="w-32 h-32 mx-auto rounded" />
                    <span className="text-[11px] font-bold block mt-1.5 text-amber-800">Bangalore: ₹34,000</span>
                    <span className="text-[9px] text-stone-600 font-mono-num font-bold">{TRIP_META.upiId}</span>
                    <span className="text-[8px] text-emerald-700 font-medium block">A/c: Ganapathi Bhat</span>
                  </div>
                )}
              </div>

              {/* Copy UPI & Instant Booking Button */}
              <div className="mt-4 flex justify-center gap-3 text-xs flex-wrap">
                <button
                  onClick={handleCopyUpi}
                  className="px-3.5 py-1.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied UPI ID!' : `Copy UPI ID (${TRIP_META.upiId})`}</span>
                </button>

                <button
                  onClick={() => openBookingModalForPackage('bangalore')}
                  className="no-print px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition shadow cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Customize & Pay Custom Amount</span>
                </button>
              </div>
            </div>

            {/* Things to Carry (Interactive Checklist right on PDF) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${
                  docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  THINGS TO CARRY (ESSENTIAL PACKING LIST)
                </h3>
                <span className="text-[11px] text-stone-400 no-print">
                  (Click items to check off)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 text-xs">
                {PACKING_ITEMS.map((item) => {
                  const isChecked = !!checkedPackingItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePackingItem(item.id)}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400 shadow-sm'
                          : docTheme === 'light'
                          ? 'bg-stone-50/80 border-stone-200 text-stone-800 hover:bg-stone-100'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 shrink-0 ${
                        isChecked ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-400'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="leading-snug">
                        <strong className="block text-xs font-semibold mb-0.5">{item.title}</strong>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="pt-2">
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                docTheme === 'light' ? 'text-stone-900' : 'text-stone-100'
              }`}>
                TERMS & CONDITIONS AND POLICIES
              </h3>
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <p>• Kedarnath and Badrinath pilgrimage routes are subject to Uttarakhand weather and high-altitude highway guidelines.</p>
                <p>• Token slot reservation of ₹5,000 per person is non-refundable upon confirmed booking.</p>
                <p>• Organizers are not liable for external flight delays or personal itinerary deviations.</p>
                <p>• Group discounts (5+ ₹1,000 off/person, 9+ 1 slot free) apply automatically on base package bookings.</p>
              </div>
            </div>

            {/* About Your Hosts Footer matching Trek & Stay Reference */}
            <div className="bg-stone-950 text-stone-100 p-6 rounded-xl border border-stone-800 text-center print-avoid-break">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                🏔️
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif-brand text-white">
                ABOUT YOUR HOSTS : {TRIP_META.companyName.toUpperCase()}
              </h2>
              <p className="text-amber-400 text-xs font-semibold mt-0.5">
                {TRIP_META.organizerTagline}
              </p>
              <p className="text-xs text-stone-400 max-w-2xl mx-auto mt-2 leading-relaxed">
                {TRIP_META.aboutStory}
              </p>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300 pt-4 border-t border-stone-800">
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-bold">Helpline</span>
                  <a href={`tel:${TRIP_META.contactPhone}`} className="font-bold text-white hover:text-amber-400">
                    {TRIP_META.contactPhone}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-bold">WhatsApp Desk</span>
                  <a href={`https://wa.me/${TRIP_META.whatsappNumber}`} className="font-bold text-emerald-400 hover:underline">
                    +91 99029 37730
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-bold">Official Portal</span>
                  <a href="https://trekandstay.vercel.app" target="_blank" rel="noreferrer" className="font-bold text-amber-300 hover:underline">
                    trekandstay.vercel.app
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-bold">Inquiries</span>
                  <a href={`mailto:${TRIP_META.email}`} className="font-bold text-white hover:text-amber-400">
                    {TRIP_META.email}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap justify-center gap-3 no-print">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download PDF (A4)'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>

                <a
                  href={`https://wa.me/${TRIP_META.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="px-6 py-3 bg-stone-950 text-stone-400 text-[10px] flex items-center justify-between border-t border-stone-800">
            <span>Trek & Stay Expeditions • Dodham Yatra Brochure</span>
            <span className="font-mono-num font-bold text-stone-300">Page 5 of 5</span>
          </div>
        </article>

      </main>

      {/* =========================================================================
          INTERACTIVE BOOKING & UPI PAYMENT MODAL (TRIGGERABLE FROM PDF)
      ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="bg-stone-900 text-stone-100 max-w-2xl w-full rounded-2xl border border-amber-500/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif-brand">
                    Reserve Dodham Yatra Slot
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Instant UPI QR Payment & WhatsApp Confirmation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
              {!bookingConfirmed ? (
                <>
                  {/* Package Selector */}
                  <div>
                    <label className="font-bold text-stone-300 uppercase tracking-wider text-[10px] block mb-1.5">
                      Select Package:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PACKAGES.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            selectedPackageId === pkg.id
                              ? 'bg-amber-950/50 border-amber-500 text-white'
                              : 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <div className="font-bold text-xs">{pkg.name}</div>
                          <div className="text-sm font-extrabold text-amber-400 font-mono-num mt-0.5">
                            ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-stone-500">{pkg.badge}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travelers Counter */}
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-200 block">Number of Travelers</span>
                      <span className="text-[11px] text-stone-400">5+ pax: ₹1,000 off/person | 9+ pax: 1 Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                        className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-stone-600 text-white font-bold text-base flex items-center justify-center transition cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-amber-300 font-mono-num w-6 text-center">
                        {travelersCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount(travelersCount + 1)}
                        className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-base flex items-center justify-center transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {discountLabel && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 font-semibold flex items-center gap-2">
                      <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{discountLabel}</span>
                    </div>
                  )}

                  {/* Optional Adventure Add-ons */}
                  <div className="space-y-2">
                    <label className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block">
                      Optional Add-ons:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div
                        onClick={() => setIncludeRafting(!includeRafting)}
                        className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition ${
                          includeRafting ? 'bg-amber-950/40 border-amber-500' : 'bg-stone-800/40 border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Waves className="w-4 h-4 text-cyan-400" />
                          <div>
                            <span className="font-bold block">16km Rafting</span>
                            <span className="text-[10px] text-stone-400">+₹1,200 / person</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          includeRafting ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-500'
                        }`}>
                          {includeRafting && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div
                        onClick={() => setIncludeBungee(!includeBungee)}
                        className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition ${
                          includeBungee ? 'bg-amber-950/40 border-amber-500' : 'bg-stone-800/40 border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <div>
                            <span className="font-bold block">Highest Bungee</span>
                            <span className="text-[10px] text-stone-400">+₹3,700 / person</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          includeBungee ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-500'
                        }`}>
                          {includeBungee && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Amount Choice */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentType('token')}
                      className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                        paymentType === 'token'
                          ? 'bg-amber-950/60 border-amber-500 text-white'
                          : 'bg-stone-900 border-stone-700 text-stone-400'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-stone-400">Token Slot Deposit</div>
                      <div className="text-sm font-bold text-amber-400 font-mono-num">
                        ₹{tokenAdvanceTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-500">₹5,000 / traveler</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentType('full')}
                      className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                        paymentType === 'full'
                          ? 'bg-amber-950/60 border-amber-500 text-white'
                          : 'bg-stone-900 border-stone-700 text-stone-400'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-stone-400">Full Tour Payment</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono-num">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-500">100% Settled</div>
                    </button>
                  </div>

                  {/* QR Code & Pay Box */}
                  <div className="bg-white rounded-xl p-4 text-center text-stone-900 shadow-md">
                    <div className="text-xs font-bold text-stone-800 mb-0.5">
                      Scan to Pay with Any UPI App
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mb-1">
                      Payee: {TRIP_META.upiPayeeName} • {TRIP_META.bankName}
                    </div>
                    <div className="text-[11px] text-stone-600 mb-2">
                      Configured Amount: <strong className="text-stone-900 font-mono-num">₹{payableAmount.toLocaleString('en-IN')}</strong>
                    </div>

                    {dynamicQrUrl ? (
                      <div className="flex justify-center p-1 bg-stone-50 rounded-lg border border-stone-200 max-w-[180px] mx-auto">
                        <img src={dynamicQrUrl} alt="UPI Payment QR" className="w-full h-auto rounded" />
                      </div>
                    ) : (
                      <div className="h-36 flex items-center justify-center text-xs text-stone-400">
                        Generating QR Code...
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-between bg-stone-100 p-2 rounded-lg border border-stone-300 text-xs">
                      <div className="text-left">
                        <div className="text-[9px] text-stone-500 font-semibold uppercase">UPI ID:</div>
                        <div className="font-mono-num font-bold text-stone-800">{TRIP_META.upiId}</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded transition cursor-pointer"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <a
                      href={upiString}
                      className="mt-2.5 w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Pay directly via UPI App</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  </div>

                  {/* Lead Traveler Form */}
                  <form onSubmit={handleConfirmVoucher} className="space-y-3 pt-3 border-t border-stone-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-300 font-medium block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={travelerName}
                          onChange={(e) => setTravelerName(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-300 font-medium block mb-1">WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={travelerPhone}
                          onChange={(e) => setTravelerPhone(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-stone-300 font-medium block mb-1">
                        UPI Reference / UTR Number (Optional if paid just now)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 439281729012"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono-num"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Generate Booking Voucher</span>
                      </button>

                      <a
                        href={`https://wa.me/${TRIP_META.whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                /* Confirmed Voucher Screen */
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-serif-brand">
                    Slot Reservation Created!
                  </h4>
                  <p className="text-stone-400 text-xs max-w-md mx-auto">
                    Your booking voucher has been generated. Please share your transaction screenshot with our WhatsApp desk to receive your official boarding pass.
                  </p>

                  <div className="bg-stone-950 rounded-xl p-4 border border-stone-800 text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b border-stone-800 pb-2">
                      <span className="text-stone-400">Booking Ref:</span>
                      <span className="font-mono-num font-bold text-amber-300">{bookingRefId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Lead Traveler:</span>
                      <span className="font-bold text-white">{travelerName} ({travelerPhone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Package:</span>
                      <span className="text-white">{selectedPackage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Travelers:</span>
                      <span className="text-white">{travelersCount} Pax</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-800 pt-2">
                      <span className="text-stone-400">Amount:</span>
                      <span className="text-sm font-bold text-amber-300 font-mono-num">
                        ₹{payableAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={`https://wa.me/${TRIP_META.whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Pass to WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsBookingModalOpen(false)}
                      className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Generation Progress Modal */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print animate-fade-in">
          <div className="bg-stone-900 border border-amber-500/60 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto ring-4 ring-amber-500/30 animate-spin">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Generating PDF Brochure
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Rendering all 5 high-resolution A4 pages...
              </p>
            </div>
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs font-mono font-medium text-amber-300">
              {pdfProgressText}
            </div>
            <button
              onClick={() => setIsGeneratingPdf(false)}
              className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer pt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Action Dock (Hidden on Print) */}
      <aside aria-label="Quick Actions" className="fixed bottom-4 right-4 z-40 flex items-center gap-2 no-print">
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-full font-bold text-xs shadow-xl flex items-center gap-2 border border-amber-400/40 transition transform active:scale-95 cursor-pointer"
          title="Save or Print full 5-page A4 PDF brochure"
        >
          <Download className="w-4 h-4" />
          <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download PDF (A4)'}</span>
        </button>

        <button
          onClick={() => openBookingModalForPackage('bangalore')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-xs shadow-xl flex items-center gap-2 border border-emerald-400/40 transition transform active:scale-95 cursor-pointer"
          title="Quick Book via UPI"
        >
          <QrCode className="w-4 h-4" />
          <span className="hidden sm:inline">UPI Booking</span>
        </button>
      </aside>

    </div>
  );
};
