import React from 'react';
import { QrCode, Phone, MessageCircle, Printer, ArrowUpRight, Flame } from 'lucide-react';
import { TRIP_META } from '../data/tripData';

interface FloatingActionBarProps {
  onBookClick: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onBookClick }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*New Trek & Stay Booking Enquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Package:* Dodham Yatra + Adventure Special (2nd-8th Oct)\n` +
      `_I would like to book my yatra with Trek & Stay._`
    );
    window.open(`https://wa.me/${TRIP_META.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-3 shadow-2xl no-print">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Price & Offer Summary on Left */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 font-mono-num">
              Delhi: ₹17,500 | BLR: ₹34,000
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
              🔥 5+ ₹1k OFF | 9+ FREE 🎁
            </span>
          </div>
          <p className="text-[11px] text-stone-400">Fixed Departures: 2nd – 8th October (7D/6N)</p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Call Helpdesk */}
          <a
            href={`tel:${TRIP_META.contactPhone}`}
            title="Call Guide"
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl border border-stone-700 transition shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Call Helpdesk</span>
          </a>

          {/* WhatsApp Support */}
          <button
            onClick={handleWhatsApp}
            title="Chat on WhatsApp"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-emerald-700/90 hover:bg-emerald-600 text-emerald-100 rounded-xl border border-emerald-600/40 transition shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Book / Pay QR CTA */}
          <button
            onClick={onBookClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-600/30 transition transform active:scale-95 shrink-0"
          >
            <QrCode className="w-4 h-4 text-amber-100" />
            <span>Book Now & Pay QR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
