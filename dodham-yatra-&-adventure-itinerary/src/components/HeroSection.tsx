import React from 'react';
import { Calendar, MapPin, Clock, Mountain, ShieldCheck, Flame, Compass, Users, Sparkles, Navigation, Award, Waves, HeartHandshake } from 'lucide-react';
import { TRIP_META } from '../data/tripData';

interface HeroSectionProps {
  onBookClick: () => void;
  onOpenMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onOpenMap }) => {
  return (
    <section className="bg-stone-900 text-stone-100 relative overflow-hidden border-b border-stone-800">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-900 to-stone-950 -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Autumn Himalayan Special Edition
          </span>
          <span className="inline-flex items-center gap-1.5 bg-stone-800 text-stone-300 text-xs font-medium px-3 py-1 rounded-full border border-stone-700">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {TRIP_META.dates} (7 Days • 6 Nights)
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif-brand text-stone-50 leading-tight">
            🕉️ DODHAM YATRA <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
              + ADVENTURE SPECIAL
            </span> 🏔️
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-sm sm:text-base font-semibold text-amber-200/90 tracking-wide">
            <span>🚩 Kedarnath</span>
            <span className="text-amber-500/60">•</span>
            <span>Badrinath</span>
            <span className="text-amber-500/60">•</span>
            <span>Rishikesh</span>
            <span className="text-amber-500/60">•</span>
            <span>Rafting</span>
            <span className="text-amber-500/60">•</span>
            <span>Bungee Jump 🚩</span>
          </div>
        </div>

        {/* 4-Photo Visual Grid (Inspired by the Reference PDF Hero Collage) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/5] bg-stone-800 border border-stone-700/60">
            <img
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
              alt="Kedarnath Temple"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-xs font-bold text-amber-300">Kedarnath Dham</span>
              <span className="text-[11px] text-stone-300">11,755 ft Altitude</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/5] bg-stone-800 border border-stone-700/60">
            <img
              src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80"
              alt="Badrinath Temple"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-xs font-bold text-amber-300">Badrinath Dham</span>
              <span className="text-[11px] text-stone-300">Garhwal Valley</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/5] bg-stone-800 border border-stone-700/60">
            <img
              src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80"
              alt="Rishikesh River Rafting"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-xs font-bold text-amber-300">Ganga River Rafting</span>
              <span className="text-[11px] text-stone-300">Rishikesh Rapids</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/5] bg-stone-800 border border-stone-700/60">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
              alt="Bungee & Mountain Trek"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-xs font-bold text-amber-300">Bungee & Trails</span>
              <span className="text-[11px] text-stone-300">Adrenaline Special</span>
            </div>
          </div>
        </div>

        {/* Pricing & Group Offers Spotlight Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bangalore Package */}
          <div className="bg-stone-800/90 rounded-xl p-4 sm:p-5 border border-amber-500/40 shadow-lg relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Flight + Tour</span>
                <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  All-Inclusive
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">Bangalore to Bangalore</h3>
              <p className="text-xs text-stone-400 mt-0.5">Roundtrip flight/train assistance + complete Yatra</p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-700/80 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono-num">₹34,000</span>
                <span className="text-xs text-stone-400"> / person</span>
              </div>
              <button
                onClick={onBookClick}
                className="text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg transition"
              >
                Select
              </button>
            </div>
          </div>

          {/* Delhi Package */}
          <div className="bg-stone-800/90 rounded-xl p-4 sm:p-5 border border-stone-700 shadow-lg relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Standard Plan</span>
                <span className="bg-stone-700 text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Base Plan
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">Delhi to Delhi</h3>
              <p className="text-xs text-stone-400 mt-0.5">Haridwar / Delhi start + complete Yatra transit</p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-700/80 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono-num">₹17,500</span>
                <span className="text-xs text-stone-400"> / person</span>
              </div>
              <button
                onClick={onBookClick}
                className="text-xs font-bold bg-stone-700 hover:bg-stone-600 text-white px-3 py-1.5 rounded-lg transition"
              >
                Select
              </button>
            </div>
          </div>

          {/* Group Offers Card */}
          <div className="bg-gradient-to-br from-amber-950/60 via-stone-800 to-stone-850 rounded-xl p-4 sm:p-5 border border-amber-600/50 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>🔥 GROUP OFFERS</span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="bg-stone-900/60 p-2 rounded-lg border border-amber-500/20 flex items-center justify-between">
                  <span className="text-xs text-stone-200 font-medium">👥 5+ Bookings</span>
                  <span className="text-xs font-bold text-emerald-400">₹1,000 OFF / person</span>
                </div>
                <div className="bg-stone-900/60 p-2 rounded-lg border border-amber-500/20 flex items-center justify-between">
                  <span className="text-xs text-stone-200 font-medium">👥 9+ Bookings</span>
                  <span className="text-xs font-extrabold text-amber-300">1 SLOT FREE 🎁</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-2">Discounts automatically applied in booking calculator</p>
          </div>
        </div>

        {/* 4 Metadata Stat Badges (Duration, Location, Min Age, Difficulty) matching reference PDF */}
        <div className="mt-8 bg-stone-800/60 rounded-xl p-4 border border-stone-700/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white">7 Days • 6 Nights</p>
            <p className="text-[11px] text-stone-400">2nd – 8th October</p>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white">Uttarakhand Himalayas</p>
            <button
              onClick={onOpenMap}
              className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium mt-0.5 inline-flex items-center gap-0.5"
            >
              <Navigation className="w-3 h-3" />
              Tap To Get Directions
            </button>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Min. Age</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white">12+ Years</p>
            <p className="text-[11px] text-stone-400">18+ for Extreme Bungee</p>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Mountain className="w-4 h-4" />
              <span>Difficulty Level</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white">Moderate to High</p>
            <p className="text-[11px] text-stone-400">16km Trek to Kedarnath</p>
          </div>
        </div>

        {/* "About This Experience" Summary Box */}
        <div className="mt-8 bg-stone-850/80 rounded-xl p-5 sm:p-6 border border-stone-700/80">
          <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif-brand mb-2">
            About This Experience
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            The <strong>Dodham Yatra + Adventure Special</strong> is a once-in-a-lifetime journey uniting the sacred spiritual energy of the Garhwal Himalayas with thrilling adrenaline experiences. Travel from the holy ghats of Haridwar and Rishikesh deep into the high Himalayas to pay homage at the divine shrines of <strong>Kedarnath Dham (11,755 ft)</strong> and <strong>Badrinath Dham (10,279 ft)</strong>. Combine your sacred pilgrimage with White Water River Rafting on the roaring Ganga, an optional Bungee Jump, visits to Mana (India’s First Village), and scenic alpine tent camping under starry skies.
          </p>

          <div className="mt-4 pt-3 border-t border-stone-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Key Highlights:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-300">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Kedarnath Temple Darshan
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Badrinath Dham Prayers
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Rishikesh River Rafting
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> India’s Highest Bungee
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> 16 km Scenic Trek
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Alpine Tent Camping
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Mana (1st Village of India)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span> Dedicated Buffer Day
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
