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
  image: string;
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
    image: 'https://images.unsplash.com/photo-1589308454676-4658133529a1?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    dateRange: 'July 15 - July 19, 2026',
    month: 'July 2026',
    duration: '4N/5D',
    price: '₹13,499',
    departureHub: 'Bengaluru / Pune / Mumbai',
    availableSlots: 6,
    status: 'Filling Fast',
    badge: 'Monsoon Special'
  },
  {
    id: 'batch-kalu-falls-1',
    title: 'Kalu Falls & Jivdhan Fort Canyon Trek',
    destinationSlug: 'kalu-falls-misty-sahyadris',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    dateRange: 'July 24 - July 26, 2026',
    month: 'July 2026',
    duration: '2N/3D',
    price: '₹7,999',
    departureHub: 'Pune / Mumbai / Bengaluru',
    availableSlots: 8,
    status: 'Available',
    badge: 'Weekend Escape'
  },
  {
    id: 'batch-kodachadri-1',
    title: 'Kodachadri Foothills & Kollur Basecamp Sanctuary',
    destinationSlug: 'kodachadri-foothills-stay',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
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
    title: 'Shitkada 300ft Rappel + Harihar 80° Rock-Cut Stairs',
    destinationSlug: 'shitkada-rappel-harihar-fort',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
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
    title: 'Kedarnath - Badrinath Do Dham Sacred Pilgrimage',
    destinationSlug: 'kedarnath-badrinath-do-dham',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
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
    title: 'Maharashtra Waterfalls Mania (Devkund Secret Pool & Tamhini)',
    destinationSlug: 'maharashtra-waterfalls-mania',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    dateRange: 'August 28 - August 31, 2026',
    month: 'August 2026',
    duration: '4D/3N',
    price: '₹8,500',
    departureHub: 'Bengaluru / Pune / Mysuru',
    availableSlots: 7,
    status: 'Available',
    badge: 'Secret Waterfalls'
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
    setPdfProgressText('Generating official 5-page Dodham PDF brochure...');

    try {
      await exportBrochureToPdf((step) => {
        setPdfProgressText(step);
      });
      setPdfProgressText('Brochure PDF downloaded successfully!');
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-20 animate-fade-in font-sans">
      
      {/* =========================================================================
          TOP ACTION BAR & BREADCRUMB
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6">
        <div className="border border-slate-200 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigateHome('home')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full border border-slate-200 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              Upcoming Expeditions & Departure Batches 2026
            </span>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Batches Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('brochure')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'brochure'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-amber-700'
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
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Download official Dodham PDF brochure"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download Dodham PDF'}</span>
            </button>

            {onOpenPayment && (
              <button
                onClick={onOpenPayment}
                className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
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
          TAB 1: BATCHES CALENDAR
      ========================================================================= */}
      <div className={activeTab === 'calendar' ? 'block' : 'hidden'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4">
          
          {/* Header & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-3 tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Batches Schedule 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900 mb-2">
              All Scheduled Departure Batches
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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
                    ? 'bg-slate-950 text-white shadow-md font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                  className={`rounded-3xl overflow-hidden shadow-sm card-hover-lift flex flex-col justify-between relative group bg-white border transition-all duration-300 ${
                    trip.isDodhamSpecial
                      ? 'border-amber-400/80 ring-2 ring-amber-400/20 shadow-amber-500/5'
                      : 'border-slate-200 hover:border-emerald-500/40 hover:shadow-xl'
                  }`}
                >
                  <div>
                    {/* Real Destination Photo Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      {/* Status & Badge Overlay */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                        {trip.badge && (
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md ${
                            trip.isDodhamSpecial 
                              ? 'bg-amber-500/90 text-slate-950 border border-amber-300' 
                              : 'bg-emerald-600/90 text-white border border-emerald-400/30'
                          }`}>
                            {trip.badge}
                          </span>
                        )}

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-md ml-auto ${
                          trip.status === 'Few Slots Left' 
                            ? 'bg-rose-500/90 text-white'
                            : trip.status === 'Filling Fast'
                            ? 'bg-amber-500/90 text-slate-950'
                            : 'bg-slate-900/80 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {trip.status} • {trip.availableSlots} left
                        </span>
                      </div>

                      {/* Bottom Title on Image for Rich Look */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{trip.departureHub}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {trip.title}
                      </h3>

                      {/* Key Trip Meta */}
                      <div className="space-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-900">{trip.dateRange}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <strong>{trip.duration}</strong>
                          </span>
                          <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                            Guided Tour
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="px-6 pb-6 pt-0 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1">
                          All-Inclusive Price
                        </span>
                        <span className="text-lg sm:text-xl font-black text-slate-900">{trip.price}</span>
                      </div>

                      {trip.isDodhamSpecial ? (
                        <button
                          type="button"
                          onClick={() => handleOpenBrochureTab()}
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2 transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Brochure</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : matchedDest && onSelectDestination && (
                        <button
                          type="button"
                          onClick={() => onSelectDestination(matchedDest)}
                          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                          title="View Trail Details"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenBooking(trip.title, trip.price)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Reserve Slot</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`https://wa.me/919902937730?text=${encodeURIComponent(
                          `Hi Trek & Stay, I want to inquire/book a slot for ${trip.title} (${trip.dateRange}).`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Batch / Group Departure Banner */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-[32px] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <span className="px-3 py-1 bg-white/10 rounded-full text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-3 inline-block">
                Custom Dates Available
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">Want a Private Batch or Corporate Trek?</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
      </div>

      {/* =========================================================================
          TAB 2: INTEGRATED DODHAM MASTER BROCHURE & PDF VIEWER
      ========================================================================= */}
      <div 
        id="pdf-brochure-wrapper"
        className={activeTab === 'brochure' ? 'block' : 'hidden'}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          {/* Embedded Full Document Brochure */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <DocumentBrochureView
              onNavigateHome={() => onNavigateHome('home')}
              onOpenGlobalBooking={onOpenBooking}
              onOpenGlobalPayment={onOpenPayment}
              hideTopBar={false}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
