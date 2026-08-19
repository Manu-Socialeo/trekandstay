import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  onOpenBooking: () => void;
}

export function About({ onOpenBooking }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-12 bg-slate-50/70 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-800 mb-5 tracking-wide shadow-2xs">
            About Trek & Stay
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-black text-slate-900 leading-[1.18] tracking-tight mb-4">
            Where Every Wilderness<br /><span className="text-gradient-emerald">Journey Begins</span>
          </h2>
          <p className="text-base md:text-lg text-slate-900 font-bold mb-3 leading-snug">
            Curating high-energy monsoon trails, Sahyadri fort climbs, and sacred Himalayan expeditions from Karnataka.
          </p>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 max-w-lg">
            At Trek & Stay, we believe that real adventure should combine wilderness thrill with complete peace of mind. With departures connecting Bengaluru, Mysuru, Mangaluru, Hubballi, and Pune, our packages include round-trip transportation, cozy shared stays, delicious meals, and certified trek leaders.
          </p>

          {/* 3 Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-emerald-600 font-black text-sm block mb-0.5">🛡️ Certified</span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">UIAA Gear & Captains</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-emerald-600 font-black text-sm block mb-0.5">⛺ Handpicked</span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">Verified Basecamps</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-emerald-600 font-black text-sm block mb-0.5">🍲 Authentic</span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">Local Hot Meals</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={onOpenBooking}
              className="flex items-center gap-3.5 bg-slate-900 hover:bg-black text-white pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold transition-all group active:scale-95 cursor-pointer shadow-md"
            >
              <span>Explore All Batches</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-400 flex items-center justify-center group-hover:scale-105 transition-all shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 font-bold" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column 2 Stacked Images */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Top Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onClick={onOpenBooking}
            className="relative rounded-[26px] overflow-hidden aspect-[16/9.5] shadow-md group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop" 
              alt="Trekkers on a lush green Sahyadri ridge" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5 sm:p-6">
              <div className="flex justify-between items-center w-full">
                <p className="text-white font-semibold text-xs sm:text-sm tracking-tight">
                  Real moments from our Sahyadri & Himalayan treks
                </p>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onClick={onOpenBooking}
            className="rounded-[26px] overflow-hidden aspect-[21/9] shadow-md group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop" 
              alt="Panoramic view of Western Ghats monsoon trail" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
