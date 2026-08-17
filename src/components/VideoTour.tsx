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
          <span className="inline-block border border-slate-200 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-5 tracking-wide bg-slate-50/50">
            Wilderness Footage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 leading-[1.2] tracking-tight">
            Experience the<br />Wilderness in motion
          </h2>
        </div>
        <p className="text-slate-500 text-xs md:text-sm max-w-xs md:text-right leading-relaxed font-normal">
          A real look at roaring cascades, misty cliff ascents, and bonfire moments on our guided treks.
        </p>
      </div>

      {/* Main Video Banner */}
      <div 
        onClick={onOpenVideo}
        className="relative rounded-[32px] overflow-hidden aspect-[16/8.5] group cursor-pointer shadow-lg active:scale-[0.99] transition-transform"
      >
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
          alt="Azure sea cove with sailboat and cliffs" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

        {/* Center Circular Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-slate-900 ml-1 fill-slate-900" />
          </div>
        </div>
        
        {/* Top-Right 98% Rating Badge */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 text-right select-none">
          <p className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tight drop-shadow-md">
            98%
          </p>
          <p className="text-white/90 text-xs sm:text-sm font-medium max-w-[150px] leading-tight mt-1.5 drop-shadow-sm">
            Trekkers recommend our safety & certified leaders.
          </p>
        </div>
      </div>
    </section>
  );
}
