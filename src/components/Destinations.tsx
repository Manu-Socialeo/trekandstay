import { useState, useRef } from 'react';
import { ArrowUpRight, ArrowRight, Mountain, Compass, BookOpen, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { destinationsData, DestinationDetail } from '../data/destinationsData';

interface DestinationsProps {
  onOpenBooking: (destinationTitle?: string, price?: string) => void;
  onSelectDestination: (destination: DestinationDetail) => void;
  onNavigateToPackages?: () => void;
}

export function Destinations({ onOpenBooking, onSelectDestination, onNavigateToPackages }: DestinationsProps) {
  const [filter, setFilter] = useState<'all' | 'monsoon' | 'adventure' | 'pilgrimage'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredDestinations = destinationsData.filter(d => {
    if (filter === 'monsoon') return d.slug.includes('monsoon') || d.slug.includes('waterfall') || d.slug.includes('kalu');
    if (filter === 'adventure') return d.slug.includes('rappel') || d.difficulty.includes('Technical') || d.slug.includes('harihar');
    if (filter === 'pilgrimage') return d.slug.includes('pilgrimage') || d.slug.includes('dham') || d.slug.includes('kedarnath');
    return true;
  });

  // Display top 4 featured options on homepage to keep it clean and fast
  const displayedDestinations = filteredDestinations.slice(0, 4);

  return (
    <section id="destinations" className="py-20 md:py-28 px-6 md:px-12 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title & Action Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block border border-emerald-200/80 rounded-full px-4 py-1 text-[11px] font-bold text-emerald-800 tracking-wide bg-emerald-50 shadow-xs">
                Weekly Monsoon & Weekend Departures
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-extrabold leading-[1.15] tracking-tight text-slate-900">
              Curated Western Ghats &<br /><span className="text-gradient-emerald">Sahyadri Monsoon Expeditions</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            {[
              { key: 'all', label: 'All Trails' },
              { key: 'monsoon', label: 'Monsoon Peaks' },
              { key: 'adventure', label: 'Rappelling & Forts' },
              { key: 'pilgrimage', label: 'Sacred Yatras' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.key
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll on Mobile, 4-Card Grid on Desktop */}
        <div className="relative group/scroll mb-16">
          <div 
            ref={scrollRef}
            id="destinations-scroll"
            className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {displayedDestinations.map((dest) => (
              <div 
                key={dest.id} 
                id={`destination-${dest.slug}`}
                className="group relative min-w-[280px] sm:min-w-[320px] md:min-w-0 rounded-[32px] overflow-hidden bg-slate-900 shadow-lg card-hover-lift flex flex-col justify-between aspect-[3.6/5.1] cursor-pointer snap-center"
                onClick={() => onSelectDestination(dest)}
              >
              {/* Background Image */}
              <img 
                src={dest.image} 
                alt={`${dest.title} Trek and Stay`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20"></div>
              
              {/* Top Meta Badges */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {dest.badge}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">
                    {dest.duration}
                  </span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-slate-900 shadow-md cursor-pointer"
                  title="View full story and itinerary"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-6 text-white">
                <p className="text-emerald-300 text-[11px] font-semibold tracking-wide mb-1 line-clamp-1">
                  {dest.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight leading-snug mb-3">
                  {dest.title}
                </h3>
                
                {/* Stats Bar */}
                <div className="flex items-center gap-3 text-[11px] text-slate-200 mb-4 bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3 h-3 text-emerald-400" />
                    {dest.highestAltitude}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Compass className="w-3 h-3 text-emerald-400" />
                    {dest.difficulty}
                  </span>
                </div>

                {/* Price & Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase tracking-wider font-semibold">All-Inclusive</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-display font-extrabold text-white">{dest.price}</span>
                      <span className="text-xs text-slate-400 line-through">{dest.regularPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(dest);
                      }}
                      className="bg-white/15 hover:bg-white text-white hover:text-slate-900 px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-white/30 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Itinerary</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(dest.title, dest.price);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer glow-emerald"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Scroll Arrows - Visible on hover/touch devices */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-900 pointer-events-auto hover:bg-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-900 pointer-events-auto hover:bg-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* View All Packages Footer Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-[30px] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-900/50 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-display font-extrabold text-white">Looking for more trails or custom corporate batches?</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Explore all 8+ seasonal expeditions across Western Ghats, Sahyadris, and Himalayas.</p>
            </div>
          </div>
          {onNavigateToPackages && (
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto relative z-10 shrink-0">
              <button
                onClick={onNavigateToPackages}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore All Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
