import { Play } from 'lucide-react';

interface VideoTourProps {
  onOpenVideo: () => void;
}

export function VideoTour({ onOpenVideo }: VideoTourProps) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-800 mb-5 tracking-wide shadow-2xs">
            Wilderness 4K Teaser
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-black text-slate-900 leading-[1.2] tracking-tight">
            Experience the<br /><span className="text-gradient-emerald">Wilderness in Motion</span>
          </h2>
        </div>
        <p className="text-slate-600 text-xs md:text-sm max-w-xs md:text-right leading-relaxed font-medium">
          A real look at roaring cascades, misty cliff ascents, and campfire moments on our guided treks.
        </p>
      </div>

      {/* Main Video Banner */}
      <div 
        onClick={onOpenVideo}
        className="relative rounded-[32px] overflow-hidden aspect-[16/8.5] group cursor-pointer shadow-xl active:scale-[0.99] transition-transform"
      >
        <img 
          src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop" 
          alt="Majestic mountain misty ridges and waterfalls" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"></div>

        {/* Center Circular Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-slate-900 ml-1 fill-slate-900" />
          </div>
        </div>

        {/* Bottom-Left Live Tag */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>4K Sahyadri Monsoon & Kodachadri Trailer (2:15)</span>
        </div>
        
        {/* Top-Right 98% Rating Badge */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 text-right select-none">
          <p className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-none tracking-tight drop-shadow-md">
            98%
          </p>
          <p className="text-white/90 text-xs sm:text-sm font-semibold max-w-[150px] leading-tight mt-1.5 drop-shadow-sm">
            Trekkers recommend our safety & certified leaders.
          </p>
        </div>
      </div>
    </section>
  );
}
