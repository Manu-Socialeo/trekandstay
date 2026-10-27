import React, { useState, useEffect } from 'react';
import {
  Download,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Share2,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Mountain,
  Compass,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  ThermometerSnowflake,
  Sun,
  Moon,
  X,
  Send,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  Flag,
  Backpack,
  ArrowLeft
} from 'lucide-react';
import {
  SPITI_TRIP_META,
  SPITI_ITINERARY_DAYS,
  SPITI_INCLUSIONS,
  SPITI_EXCLUSIONS,
  SPITI_ACCOMMODATIONS,
  SPITI_PACKING_ITEMS,
  SPITI_TERMS_AND_CONDITIONS,
  SPITI_DEPARTURE_BATCHES
} from '../data/spitiTripData';
import { getQRCodeDataURL } from '../utils/qrCode';
import { exportSpitiBrochureToPdf } from '../utils/spitiPdfExport';

interface SpitiBrochureViewProps {
  onNavigateHome?: () => void;
  onOpenGlobalBooking?: (destination?: string, price?: string) => void;
  onOpenGlobalPayment?: () => void;
  hideTopBar?: boolean;
}

export const SpitiBrochureView: React.FC<SpitiBrochureViewProps> = ({
  onNavigateHome,
  onOpenGlobalBooking,
  onOpenGlobalPayment,
  hideTopBar = false
}) => {
  const [docTheme, setDocTheme] = useState<'light' | 'dark'>('light');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [checkedPackingItems, setCheckedPackingItems] = useState<Record<string, boolean>>({});
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true, 4: true, 5: true });

  // PDF Export Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');

  // Static pre-generated QR code
  const [spitiQrUrl, setSpitiQrUrl] = useState('');

  // Interactive Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [selectedBatch, setSelectedBatch] = useState<string>(SPITI_DEPARTURE_BATCHES[0].dateRange);
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerCity, setTravelerCity] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [bookingRefId, setBookingRefId] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    // Generate QR code for token deposit of ₹5,000 per person
    getQRCodeDataURL('delhi', 5000)
      .then(setSpitiQrUrl)
      .catch((err) => console.error('Failed to generate Spiti QR:', err));
  }, []);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const togglePackingItem = (id: string) => {
    setCheckedPackingItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SPITI_TRIP_META.officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfProgressText('Initializing official 5-page Winter Spiti PDF brochure engine...');

    try {
      await exportSpitiBrochureToPdf((step) => {
        setPdfProgressText(step);
      });
      setPdfProgressText('PDF brochure downloaded successfully!');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfProgressText('');
      }, 1500);
    } catch (err) {
      console.error('Download error:', err);
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfProgressText('');
      }, 1000);
    }
  };

  // Group offer calculation: ₹1,000 off per person if 9 or more travelers
  const baseRate = SPITI_TRIP_META.packagePrice;
  const isGroupOfferApplied = travelersCount >= 9;
  const perPersonPrice = isGroupOfferApplied ? baseRate - 1000 : baseRate;
  const totalTripAmount = perPersonPrice * travelersCount;
  const advanceTokenTotal = 5000 * travelersCount;

  const handleOpenBookingModal = () => {
    setBookingRefId(`SPITI-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);

    const message = `*NEW WINTER SPITI EXPEDITION REGISTRATION*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `🔖 *Ref ID:* ${bookingRefId}%0A` +
      `👤 *Traveler:* ${travelerName}%0A` +
      `📞 *Phone:* ${travelerPhone}%0A` +
      `📧 *Email:* ${travelerEmail}%0A` +
      `📍 *Departure City:* ${travelerCity}%0A` +
      `👥 *Travelers:* ${travelersCount} Person(s)%0A` +
      `📅 *Selected Batch:* ${selectedBatch}%0A` +
      `💰 *Total Package:* ₹${totalTripAmount.toLocaleString()}%0A` +
      `💵 *Advance Token:* ₹${advanceTokenTotal.toLocaleString()}%0A` +
      `🧾 *UTR Ref:* ${utrNumber || 'Pending Transfer'}`;

    setTimeout(() => {
      window.open(`https://wa.me/${SPITI_TRIP_META.whatsappNumber}?text=${message}`, '_blank');
    }, 600);
  };

  const whatsappDirectUrl = `https://wa.me/${SPITI_TRIP_META.whatsappNumber}?text=${encodeURIComponent(
    "Hi Trek & Stay, I want to inquire/book the Winter Spiti Expedition (8 Days / 7 Nights, ₹23,000)."
  )}`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        docTheme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Action Bar */}
      {!hideTopBar && (
        <header
          className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
            docTheme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Batches Calendar</span>
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="text-xs font-extrabold tracking-wide text-cyan-600 dark:text-cyan-400">
                  TREK & STAY
                </span>
                <span className="text-xs text-slate-400">/ Winter Spiti Master Dossier</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setDocTheme(docTheme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-full border text-xs cursor-pointer transition-colors ${
                  docTheme === 'dark'
                    ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Toggle Theme"
              >
                {docTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Spiti PDF'}</span>
              </button>

              <button
                onClick={handleOpenBookingModal}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
                <span>Book Slot (₹23,000)</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* PDF Generation Progress Notification */}
      {isGeneratingPdf && (
        <div className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 animate-bounce">
          <div className="bg-cyan-600 text-white px-6 py-2.5 rounded-full text-xs font-extrabold shadow-2xl flex items-center gap-2">
            <Download className="w-4 h-4 animate-pulse" />
            <span>{pdfProgressText || 'Rendering 5-Page High Resolution PDF Brochure...'}</span>
          </div>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <ThermometerSnowflake className="w-3.5 h-3.5" />
              Sub-Zero Himalayan Expedition
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Verified Trek & Stay Departure
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Group Offer: ₹1,000 OFF on 9+ Trekkers
            </span>
          </div>

          {/* Title & Tagline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            WINTER SPITI EXPEDITION
          </h1>
          <p className="text-base sm:text-xl font-medium text-cyan-700 dark:text-cyan-400 max-w-4xl mb-4">
            8 Days / 7 Nights • Chandigarh to Chandigarh • White Desert of Himachal
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
            Experience the magical winter landscapes of Spiti Valley — snow-covered mountains, ancient monasteries, frozen waterfalls, high-altitude villages and some of the most breathtaking roads on the planet.
          </p>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                PACKAGE PRICE
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                ₹23,000
              </div>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                Per person (Chandigarh pickup)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                HIGHEST ELEVATION
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                14,567 FT
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Hikkim & Langza Villages
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                GROUP DISCOUNT
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-500">
                ₹1,000 OFF
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Per person on groups of 9+
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                DURATION
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                8D / 7N
              </div>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                Includes Weather Buffer Day
              </span>
            </div>
          </div>

          {/* Quick CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenBookingModal}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>Book Slot with Token (₹5,000)</span>
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-800 dark:text-white bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Booking (+91 99029 37730)</span>
            </a>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generating...' : 'Official 5-Page PDF'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Main Expedition Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">

            {/* SECTION 1: DEPARTURE BATCHES CALENDAR */}
            <section id="batches">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    2026 – 2027 FIXED DEPARTURES
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Scheduled Expedition Batches
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPITI_DEPARTURE_BATCHES.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {batch.dateRange}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{batch.badge}</span>
                        <span>•</span>
                        <span>{batch.duration}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBatch(batch.dateRange);
                        handleOpenBookingModal();
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 transition-colors cursor-pointer border border-cyan-500/20"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: DAY-BY-DAY INTERACTIVE ITINERARY */}
            <section id="itinerary">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    COMPLETE EXPEDITION ROUTE
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Day-by-Day Detailed Itinerary
                  </h2>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.values(expandedDays).every(Boolean);
                    const next: Record<number, boolean> = {};
                    SPITI_ITINERARY_DAYS.forEach((d) => (next[d.dayNumber] = !allOpen));
                    setExpandedDays(next);
                  }}
                  className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  Toggle All Days
                </button>
              </div>

              <div className="space-y-4">
                {SPITI_ITINERARY_DAYS.map((day) => {
                  const isExpanded = !!expandedDays[day.dayNumber];
                  return (
                    <div
                      key={day.dayNumber}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isExpanded
                          ? 'bg-white dark:bg-slate-900 border-cyan-500/40 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {/* Day Header Trigger */}
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                              day.dayNumber === 8
                                ? 'bg-amber-500 text-slate-950 font-black'
                                : 'bg-cyan-600 text-white'
                            }`}
                          >
                            D{day.dayNumber}
                          </span>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                              {day.dayTitle}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {day.route}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {day.altitude && (
                            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                              {day.altitude}
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Day Expanded Details */}
                      {isExpanded && (
                        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          {/* Photo Banner if available */}
                          {day.image && (
                            <div className="rounded-xl overflow-hidden relative h-48 sm:h-64 shadow-xs">
                              <img
                                src={day.image}
                                alt={day.dayTitle}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                                <span className="text-xs text-white/90 font-medium italic">
                                  {day.imageCaption}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Route description bullets */}
                          <div className="space-y-2">
                            {day.description.map((desc, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                                <span>{desc}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlights pills */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {day.keyHighlights.map((hl, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                ❄️ {hl}
                              </span>
                            ))}
                          </div>

                          {/* Stay & Meal details footer */}
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white">Stay: </span>
                              <span>{day.stayLocation} ({day.stayType})</span>
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white">Meals: </span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{day.mealsIncluded}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: INCLUSIONS & EXCLUSIONS */}
            <section id="inclusions" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-extrabold text-base">Package Inclusions (100% Covered)</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {SPITI_INCLUSIONS.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="p-6 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-extrabold text-base">Exclusions & Extra Charges</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {SPITI_EXCLUSIONS.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* SECTION 4: CURATED HOMESTAYS & BUKHARI LIVING */}
            <section id="accommodations">
              <div className="mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  WINTER HOMESTAYS & HOTELS
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Handpicked Stays & Bukhari Heating
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Living in sub-zero Spiti is an authentic Himalayan cultural immersion. Traditional Spitian homes use thick mud walls and wood-fired bukharis for remarkable warmth.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SPITI_ACCOMMODATIONS.map((acc, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md">
                        {acc.location}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{acc.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{acc.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {acc.features.map((feat, fidx) => (
                          <span
                            key={fidx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: INTERACTIVE PACKING CHECKLIST */}
            <section id="packing">
              <div className="mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  SURVIVAL GEAR FOR -15°C
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Interactive Packing Checklist
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Check off items as you pack. Remember: multiple warm layers beat one bulky jacket!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPITI_PACKING_ITEMS.map((item) => {
                  const isChecked = !!checkedPackingItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePackingItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500 text-cyan-900 dark:text-cyan-200'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-cyan-600 border-cyan-600 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-bold ${isChecked ? 'line-through opacity-70' : ''}`}>
                            {item.title}
                          </span>
                          {item.mandatory && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                              MANDATORY
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 6: TERMS & CONDITIONS */}
            <section id="terms" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-cyan-500" />
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Official Terms & Operational Conditions
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {SPITI_TERMS_AND_CONDITIONS.map((term, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 shrink-0">{idx + 1}.</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Booking & Payment Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* STICKY BOOKING SUMMARY BOX */}
            <div className="sticky top-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6">
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                  OFFICIAL PRICE CALCULATION
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ₹{perPersonPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ person</span>
                </div>
                {isGroupOfferApplied && (
                  <span className="inline-block mt-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    🎉 ₹1,000 Group Discount Applied!
                  </span>
                )}
              </div>

              {/* Number of Travelers Counter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Number of Expeditioners:
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <button
                    onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="font-black text-base text-slate-900 dark:text-white">
                    {travelersCount} Person{travelersCount > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setTravelersCount(travelersCount + 1)}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Batch Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Departure Batch:
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {SPITI_DEPARTURE_BATCHES.map((b) => (
                    <option key={b.id} value={b.dateRange}>
                      {b.dateRange} ({b.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Expedition Package:</span>
                  <span>₹{baseRate.toLocaleString()} × {travelersCount}</span>
                </div>
                {isGroupOfferApplied && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>Group Offer Discount:</span>
                    <span>- ₹{(1000 * travelersCount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm text-slate-900 dark:text-white pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <span>Total Expedition Fee:</span>
                  <span className="text-cyan-600 dark:text-cyan-400">₹{totalTripAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Advance Token (Locks Seats):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{advanceTokenTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleOpenBookingModal}
                  className="w-full py-3 rounded-full text-xs sm:text-sm font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Reserve Seats Now</span>
                </button>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              {/* QR Code Embed */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                  SCAN TO PAY ADVANCE TOKEN VIA UPI
                </span>
                {spitiQrUrl ? (
                  <div className="flex justify-center">
                    <img
                      src={spitiQrUrl}
                      alt="UPI QR Code"
                      className="w-36 h-36 rounded-xl border border-slate-200 dark:border-slate-700 bg-white p-1"
                    />
                  </div>
                ) : (
                  <div className="w-36 h-36 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-400 animate-pulse" />
                  </div>
                )}
                <div className="text-center">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                    {SPITI_TRIP_META.officialUpiId}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {SPITI_TRIP_META.officialUpiPayee}
                  </span>
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedUpi ? 'Copied to Clipboard!' : 'Copy UPI ID'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSubmitted ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 block mb-1">
                    SLOT REGISTRATION • REF: {bookingRefId}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Book Winter Spiti Expedition
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Confirm your details to lock seats. Advance token: ₹{advanceTokenTotal.toLocaleString()} (₹5,000/person).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Lead Traveler Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={travelerPhone}
                      onChange={(e) => setTravelerPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Your City (Pickup Prep)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore / Delhi / Pune"
                      value={travelerCity}
                      onChange={(e) => setTravelerCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Selected Departure Batch
                  </label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold"
                  >
                    {SPITI_DEPARTURE_BATCHES.map((b) => (
                      <option key={b.id} value={b.dateRange}>
                        {b.dateRange}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    UPI 12-Digit UTR / Transaction Reference (Optional if paying later)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 428190382910"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Total Expedition Amount:</span>
                    <span className="font-bold">₹{totalTripAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-cyan-600 dark:text-cyan-400 font-bold">
                    <span>Advance Deposit Due:</span>
                    <span>₹{advanceTokenTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs sm:text-sm font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Confirm via WhatsApp</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Expedition Request Initiated!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your booking ref <strong>{bookingRefId}</strong> is registered. Our team has received your details on WhatsApp desk.
                </p>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
