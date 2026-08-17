import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Search, Mountain, Compass, MapPin, Calendar, Users, BookOpen, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { destinationsData, DestinationDetail } from '../data/destinationsData';

interface PackagesPageViewProps {
  onOpenBooking: (destinationTitle?: string, price?: string) => void;
  onSelectDestination: (destination: DestinationDetail) => void;
  onNavigateHome: (view: 'home' | 'packages' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies', hash?: string) => void;
}

export function PackagesPageView({ onOpenBooking, onSelectDestination, onNavigateHome }: PackagesPageViewProps) {
  const [filter, setFilter] = useState<'all' | 'monsoon' | 'adventure' | 'pilgrimage' | 'karnataka'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Moderate' | 'Technical'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'All Trek & Stay Packages | Sahyadris, Western Ghats & Himalayas';
  }, []);

  const filteredDestinations = destinationsData.filter(d => {
    // Category filter
    let matchesCategory = true;
    if (filter === 'monsoon') {
      matchesCategory = d.slug.includes('monsoon') || d.slug.includes('waterfall') || d.slug.includes('kalu') || d.slug.includes('south');
    } else if (filter === 'adventure') {
      matchesCategory = d.slug.includes('rappel') || d.difficulty.includes('Technical') || d.slug.includes('harihar');
    } else if (filter === 'pilgrimage') {
      matchesCategory = d.slug.includes('pilgrimage') || d.slug.includes('dham') || d.slug.includes('kedarnath');
    } else if (filter === 'karnataka') {
      matchesCategory = d.slug.includes('kollur') || d.slug.includes('kodachadri') || d.departureHubs.includes('Kollur');
    }

    // Difficulty filter
    let matchesDifficulty = true;
    if (selectedDifficulty !== 'all') {
      matchesDifficulty = d.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase());
    }

    // Search query
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        d.title.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.departureHubs.some(hub => hub.toLowerCase().includes(q)) ||
        d.highlights.some(h => h.toLowerCase().includes(q));
    }

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredDestinations.length}</strong> of {destinationsData.length} Expeditions
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-4 tracking-wide shadow-sm">
            Complete Expedition Catalogue • 2026 Batches
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
            Curated Trek Packages & Pilgrimages
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            All-inclusive mountain expeditions departing weekly from Bengaluru, Mysuru, Mangaluru, Hubballi, Pune, and Delhi. Includes transport, homestays, hot local meals, safety gear, and certified trek leaders.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 mb-10 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by trek name, pickup city (e.g. Bengaluru, Pune), or feature..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-full border border-slate-200">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({destinationsData.length})
              </button>
              <button
                onClick={() => setFilter('monsoon')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'monsoon' ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌧️ Monsoon Trails
              </button>
              <button
                onClick={() => setFilter('adventure')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'adventure' ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧗 Waterfall Rappel & Forts
              </button>
              <button
                onClick={() => setFilter('pilgrimage')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'pilgrimage' ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🛕 Sacred Yatras
              </button>
              <button
                onClick={() => setFilter('karnataka')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'karnataka' ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌿 Kollur & HQ Base
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id} 
              id={`pkg-${dest.slug}`}
              className="group relative rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all duration-500 flex flex-col justify-between aspect-[3.5/5.1] cursor-pointer"
              onClick={() => onSelectDestination(dest)}
            >
              {/* Background Image */}
              <img 
                src={dest.image} 
                alt={`${dest.title} Trek & Stay`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20"></div>
              
              {/* Top Meta Badges */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {dest.badge}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    {dest.duration}
                  </span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-md"
                  title="View full story and itinerary"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-6 text-white">
                <p className="text-emerald-400 text-[11px] font-bold tracking-wide mb-1 line-clamp-1">
                  {dest.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug mb-3">
                  {dest.title}
                </h3>
                
                {/* Stats Bar */}
                <div className="flex items-center gap-3 text-[11px] text-white/90 mb-4 bg-black/30 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                    {dest.highestAltitude}
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    {dest.difficulty}
                  </span>
                </div>

                {/* Pickup points preview */}
                <p className="text-[10px] text-white/70 mb-4 line-clamp-1">
                  📍 Pickups: {dest.departureHubs.join(', ')}
                </p>

                {/* Price & Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <div>
                    <span className="text-[10px] text-white/60 block uppercase tracking-wider font-semibold">All-Inclusive</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-white">{dest.price}</span>
                      <span className="text-xs text-white/50 line-through">{dest.regularPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(dest);
                      }}
                      className="bg-white/10 hover:bg-white text-white hover:text-slate-950 px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-white/20 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(dest.title, dest.price);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group Benefit Callout */}
        <div className="bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Group Discount & Private Batches
            </span>
            <h3 className="text-2xl font-black text-slate-900">Need a Customized Batch for Friends or Corporate?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Get flat ₹500 discount for groups of 3+. For select long trails, booking 6 slots unlocks 1 complimentary pass (6 → 1 Free).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919902937730?text=I%20would%20like%20to%20book%20a%20private%20group%20trek%20batch%20with%20Trek%20and%20Stay"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95"
            >
              WhatsApp Group Desk
            </a>
            <button
              onClick={() => onOpenBooking('Custom Group Expedition', 'Custom')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold px-5 py-3 rounded-full text-xs transition-all cursor-pointer shadow-sm"
            >
              Custom Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
