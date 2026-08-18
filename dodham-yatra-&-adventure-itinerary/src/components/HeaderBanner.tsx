import React from 'react';
import { Phone, MessageCircle, Printer, FileText, Sparkles, MapPin, Calendar, Compass } from 'lucide-react';
import { TRIP_META } from '../data/tripData';

interface HeaderBannerProps {
  viewMode: 'interactive' | 'brochure';
  setViewMode: (mode: 'interactive' | 'brochure') => void;
  onBookClick: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  viewMode,
  setViewMode,
  onBookClick,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi! I am interested in the Dodham Yatra + Adventure Special (2nd-8th Oct). Please share the booking details.`
    );
    window.open(`https://wa.me/${TRIP_META.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 py-1.5 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide text-white flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          <span>LIMITED SLOTS: 2nd – 8th October Departure</span>
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden sm:inline bg-amber-900/40 px-2 py-0.5 rounded-full text-amber-100 text-xs">
          🔥 5+ Bookings: ₹1,000 OFF/person | 9+ Bookings: 1 Slot FREE 🎁
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 via-stone-800 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/30">
            <span className="text-xl sm:text-2xl font-bold">🏔️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">
                TREK & STAY
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                EXPEDITIONS
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold tracking-tight text-stone-100 font-serif-brand">
              DODHAM YATRA + ADVENTURE
            </h1>
            <p className="text-[10px] text-stone-400 font-medium hidden sm:block">
              Kedarnath • Badrinath • Rishikesh Rafting • Bungee
            </p>
          </div>
        </div>

        {/* Quick Links & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Mode Toggle (Interactive Website vs PDF Brochure format) */}
          <div className="flex items-center bg-stone-800 p-1 rounded-lg border border-stone-700 text-xs">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all text-xs ${
                viewMode === 'interactive'
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              App View
            </button>
            <button
              onClick={() => setViewMode('brochure')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all flex items-center gap-1 text-xs ${
                viewMode === 'brochure'
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Brochure</span>
            </button>
          </div>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            title="Download or Print Itinerary PDF"
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg border border-stone-700 transition shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </button>

          {/* WhatsApp Enquire */}
          <button
            onClick={handleWhatsApp}
            title="Chat on WhatsApp"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 rounded-lg border border-emerald-600/40 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>WhatsApp</span>
          </button>

          {/* Book Now Button */}
          <button
            onClick={onBookClick}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg shadow-md shadow-amber-600/30 transition transform active:scale-95"
          >
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
