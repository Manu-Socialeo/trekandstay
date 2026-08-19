import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Clock,
  ShieldCheck,
  PhoneCall,
  QrCode,
  Download,
  FileText,
  CheckCircle2,
  Mountain,
  Waves,
  MessageCircle,
  CreditCard,
  Flame,
  Gift,
  ExternalLink,
  ChevronRight,
  Printer,
  Compass
} from 'lucide-react';
import { destinationsData, DestinationDetail } from '../data/destinationsData';
import { DocumentBrochureView } from './DocumentBrochureView';
import { exportBrochureToPdf, openPrintOptimizedWindow } from '../utils/pdfExport';
import { TRIP_META } from '../data/tripData';

interface UpcomingTripsPageViewProps {
  onOpenBooking: (destinationTitle?: string, price?: string) => void;
  onSelectDestination?: (destination: DestinationDetail) => void;
  onNavigateHome: (view: 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery', hash?: string) => void;
  onOpenPayment?: () => void;
}

export interface UpcomingTripBatch {
  id: string;
  title: string;
  destinationSlug: string;
  dateRange: string;
  month: string;
  duration: string;
  price: string;
  departureHub: string;
  availableSlots: number;
  status: 'Filling Fast' | 'Available' | 'Few Slots Left' | 'Almost Full';
  badge?: string;
  isDodhamSpecial?: boolean;
}

export const initialUpcomingTrips: UpcomingTripBatch[] = [
  {
    id: 'batch-dodham-oct-1',
    title: 'Dodham Yatra & Adventure Special (Kedarnath • Badrinath • Rishikesh)',
    destinationSlug: 'kedarnath-badrinath-do-dham',
    dateRange: 'October 02 - October 08, 2026',
    month: 'October 2026',
    duration: '7D/6N',
    price: '₹17,500 (Delhi) / ₹34,000 (BLR Flight)',
    departureHub: 'Bangalore (Flight) / Delhi (Transit)',
    availableSlots: 6,
    status: 'Few Slots Left',
    badge: '🌟 Flagship Expedition',
    isDodhamSpecial: true
  },
  {
    id: 'batch-mh-monsoon-1',
    title: 'Maharashtra Monsoon Trails (Konkan Kada & Kalu Falls)',
    destinationSlug: 'maharashtra-monsoon-trails',
    dateRange: 'July 15 - July 19, 2026',
    month: 'July 2026',
    duration: '4N/5D',
    price: '₹13,499',
    departureHub: 'Bengaluru / Pune / Mumbai',
    availableSlots: 6,
    status: 'Filling Fast',
    badge: 'Popular'
  },
  {
    id: 'batch-kalu-falls-1',
    title: 'Kalu Falls & Jivdhan Fort Expedition',
    destinationSlug: 'kalu-falls-misty-sahyadris',
    dateRange: 'July 24 - July 26, 2026',
    month: 'July 2026',
    duration: '2N/3D',
    price: '₹7,999',
    departureHub: 'Pune / Mumbai / Bengaluru',
    availableSlots: 8,
    status: 'Available',
    badge: 'Weekend Special'
  },
  {
    id: 'batch-kodachadri-1',
    title: 'Kodachadri Foothills & Kollur Campsite Stay',
    destinationSlug: 'kodachadri-foothills-stay',
    dateRange: 'August 01 - August 03, 2026',
    month: 'August 2026',
    duration: '3D/2N',
    price: '₹6,499',
    departureHub: 'Kollur / Mangaluru / Bengaluru',
    availableSlots: 10,
    status: 'Available',
    badge: 'HQ Base'
  },
  {
    id: 'batch-harihar-1',
    title: 'Shitkada Rappel + Harihar 80° Rock-Cut Steps',
    destinationSlug: 'shitkada-rappel-harihar',
    dateRange: 'August 08 - August 10, 2026',
    month: 'August 2026',
    duration: '3D/2N',
    price: '₹8,999',
    departureHub: 'Pune / Mumbai / Hubballi',
    availableSlots: 4,
    status: 'Few Slots Left',
    badge: 'High Adrenaline'
  },
  {
    id: 'batch-kedarnath-1',
    title: 'Kedarnath - Badrinath Do Dham Pilgrimage',
    destinationSlug: 'kedarnath-badrinath-do-dham',
    dateRange: 'August 18 - August 24, 2026',
    month: 'August 2026',
    duration: '6N/7D',
    price: '₹17,499',
    departureHub: 'Delhi / Haridwar / Rishikesh',
    availableSlots: 5,
    status: 'Filling Fast',
    badge: 'Sacred Yatra'
  },
  {
    id: 'batch-waterfalls-1',
    title: 'Maharashtra Waterfalls Mania (Devkund & Secret Gorges)',
    destinationSlug: 'maharashtra-waterfalls-mania',
    dateRange: 'August 28 - August 31, 2026',
    month: 'August 2026',
    duration: '4D/3N',
    price: '₹8,500',
    departureHub: 'Bengaluru / Pune / Mysuru',
    availableSlots: 7,
    status: 'Available'
  }
];

export function UpcomingTripsPageView({
  onOpenBooking,
  onSelectDestination,
  onNavigateHome,
  onOpenPayment
}: UpcomingTripsPageViewProps) {
  // Tabs: 'calendar' (Batches) | 'brochure' (Dodham Master Brochure)
  const [activeTab, setActiveTab] = useState<'calendar' | 'brochure'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [trips] = useState<UpcomingTripBatch[]>(initialUpcomingTrips);

  // PDF Export generation state in Upcoming Trips
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Upcoming Trips & Dodham PDF Brochure | Trek & Stay';

    // Hash check for direct brochure link
    const hash = window.location.hash.toLowerCase();
    if (
      hash.includes('dodham') ||
      hash.includes('brochure') ||
      hash.includes('itinerary')
    ) {
      setActiveTab('brochure');
    }
  }, []);

  const handleDownloadDodhamPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfProgressText('Initializing Dodham A4 PDF layout...');
    
    // Switch to brochure tab if not already there so PDF elements are active in DOM
    if (activeTab !== 'brochure') {
      setActiveTab('brochure');
      await new Promise(r => setTimeout(r, 400));
    }

    try {
      await exportBrochureToPdf((step) => {
        setPdfProgressText(step);
      });
      setPdfProgressText('Brochure PDF downloaded successfully!');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfProgressText('');
      }, 2000);
    } catch {
      setPdfProgressText('Opening Print / Save as PDF view...');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfProgressText('');
        openPrintOptimizedWindow();
      }, 1000);
    }
  };

  const handleOpenBrochureTab = () => {
    setActiveTab('brochure');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTrips = selectedMonth === 'all'
    ? trips
    : trips.filter(t => t.month.toLowerCase().includes(selectedMonth.toLowerCase()));

  const dodhamWhatsappUrl = `https://wa.me/${TRIP_META.whatsappNumber}?text=${encodeURIComponent(
    "Hi Trek & Stay, I would like to inquire/book the Dodham Yatra & Adventure Special (2nd-8th Oct 2026)."
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 sm:pt-32 pb-20 animate-fade-in font-sans">
      
      {/* =========================================================================
          TOP ACTION BAR & BREADCRUMB (Cleanly positioned below website header)
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6">
        <div className="border border-white/10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigateHome('home')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              Upcoming Expeditions & Sacred Yatras 2026
            </span>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Batches Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('brochure')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'brochure'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dodham PDF & Itinerary</span>
            </button>
          </div>

          {/* Quick PDF & UPI CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadDodhamPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Download official Dodham PDF brochure"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download Dodham PDF'}</span>
            </button>

            {onOpenPayment && (
              <button
                onClick={onOpenPayment}
                className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-emerald-600/30 border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>UPI Pay</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Global PDF Generation Progress Banner */}
      {isGeneratingPdf && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-4">
          <div className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl text-center text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg animate-pulse">
            <Download className="w-4 h-4 animate-bounce" />
            <span>{pdfProgressText || 'Rendering 5-Page High Resolution PDF Brochure...'}</span>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB CONTENT AREA
      ========================================================================= */}
      {activeTab === 'calendar' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6">
          
          {/* Header & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-950/40 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-400 mb-3 tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Batches Schedule 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              All Scheduled Departure Batches
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Explore upcoming weekend escapes, waterfall rappelling trails in the Sahyadris, and sacred Himalayan expeditions. Every batch includes transit, verified accommodations, local hot meals, and certified trek captains.
            </p>
          </div>

          {/* Month Filter Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {[
              { label: 'All Batches', val: 'all' },
              { label: 'July 2026', val: 'july' },
              { label: 'August 2026', val: 'august' },
              { label: 'September 2026', val: 'september' },
              { label: 'October 2026 (Dodham)', val: 'october' }
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => setSelectedMonth(item.val)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedMonth === item.val
                    ? 'bg-white text-slate-950 shadow-md font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Batches Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filteredTrips.map((trip) => {
              const matchedDest = destinationsData.find(
                (d) => d.slug === trip.destinationSlug || d.id === trip.destinationSlug
              );

              return (
                <div 
                  key={trip.id}
                  className={`rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group ${
                    trip.isDodhamSpecial
                      ? 'bg-gradient-to-b from-stone-900 to-slate-950 border-2 border-amber-500/60 ring-2 ring-amber-500/20'
                      : 'bg-slate-900/90 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Status & Badge Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {trip.badge ? (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          trip.isDodhamSpecial 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {trip.badge}
                        </span>
                      ) : <div />}

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        trip.status === 'Few Slots Left' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : trip.status === 'Filling Fast'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {trip.status} ({trip.availableSlots} slots left)
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-white text-lg leading-snug mb-3 group-hover:text-emerald-400 transition-colors">
                      {trip.title}
                    </h3>

                    {/* Key Trip Meta */}
                    <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">{trip.dateRange}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Duration: <strong>{trip.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">Departure: {trip.departureHub}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1">
                          Package Price
                        </span>
                        <span className="text-lg font-black text-white">{trip.price}</span>
                      </div>

                      {matchedDest && onSelectDestination && (
                        <button
                          type="button"
                          onClick={() => onSelectDestination(matchedDest)}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                          title="View Trip Details"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenBooking(trip.title, trip.price)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Book Slot</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Batch / Group Departure Banner */}
          <div className="bg-slate-900 text-white border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="px-3 py-1 bg-white/10 rounded-full text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-3 inline-block">
                Custom Dates Available
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">Want a Private Batch or Corporate Trek?</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We curate custom departure dates from Bengaluru, Pune, Mumbai, or direct campsite pickups for private groups of 6+ trekkers with dedicated guides and tailored logistics.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking('Custom Private Group Batch', 'Custom')}
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 px-8 rounded-full text-xs transition-all shadow-lg active:scale-95 shrink-0 cursor-pointer"
            >
              Request Custom Batch
            </button>
          </div>

        </div>
      ) : (
        /* =========================================================================
            TAB 2: INTEGRATED DODHAM MASTER BROCHURE & PDF VIEWER
        ========================================================================= */
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          {/* Embedded Full Document Brochure */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <DocumentBrochureView
              onNavigateHome={() => onNavigateHome('home')}
              onOpenGlobalBooking={onOpenBooking}
              onOpenGlobalPayment={onOpenPayment}
              hideTopBar={false}
            />
          </div>
        </div>
      )}

    </div>
  );
}
