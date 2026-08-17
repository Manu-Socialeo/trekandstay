import { useState } from 'react';
import { MapPin, Calendar, Users, Info, Map, Camera, Compass, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: (destination?: string, price?: string) => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [selectedLocation, setSelectedLocation] = useState('Maharashtra Monsoon Trails');
  const [selectedDate, setSelectedDate] = useState('Monsoon Batches (Jul-Sep)');
  const [selectedGuests, setSelectedGuests] = useState('2 Trekkers');

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen bg-slate-950 flex flex-col justify-between pt-28 pb-10 md:pb-14 px-6 md:px-12 overflow-hidden">
      {/* Background Image with layered mountain scenic view */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
          alt="Alps and snowy mountains" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Layered gradients to reproduce sky lighting and bottom contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-950/90"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      {/* Massive Display Title (TREK & STAY) */}
      <div className="relative z-10 w-full flex justify-center items-center mt-6 md:mt-12 pointer-events-none select-none">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[13vw] md:text-[13vw] font-black text-white tracking-tight uppercase leading-none text-center drop-shadow-2xl whitespace-nowrap"
        >
          TREK & STAY
        </motion.h1>
      </div>

      {/* Main Content & Search Widget */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          {/* Left Title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Welcome to the Wilderness
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white leading-[1.15] tracking-tight">
              Uncover Wild Trails &<br />Misty Sahyadri Peaks.
            </h2>
          </motion.div>

          {/* Right Floating Search Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-7 relative"
          >
            <div className="bg-white rounded-3xl md:rounded-full p-2 sm:p-2.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-0 border border-white/20">
              {/* Location Selector */}
              <div 
                onClick={() => onOpenBooking(selectedLocation, '₹13,499')}
                className="w-full md:w-auto flex-1 flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 rounded-2xl md:rounded-full transition-colors cursor-pointer group"
              >
                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Trek Package</p>
                  <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight truncate max-w-[150px]">{selectedLocation}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 shrink-0"></div>

              {/* Date Selector */}
              <div 
                onClick={() => onOpenBooking(selectedLocation, '₹13,499')}
                className="w-full md:w-auto flex-1 flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 rounded-2xl md:rounded-full transition-colors cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Batches</p>
                  <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight whitespace-nowrap">{selectedDate}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 shrink-0"></div>

              {/* Guest Selector */}
              <div 
                onClick={() => onOpenBooking(selectedLocation, '₹13,499')}
                className="w-full md:w-auto flex-1 flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 rounded-2xl md:rounded-full transition-colors cursor-pointer group"
              >
                <Users className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0" />
                <div className="text-left flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Trekkers</p>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight">{selectedGuests}</p>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => onOpenBooking(selectedLocation, '₹13,499')}
                className="w-full md:w-auto bg-slate-900 hover:bg-black text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 shadow-md hover:shadow-lg active:scale-95"
              >
                Book a Trek
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sub-bar / Highlights Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <p className="text-white font-bold text-xs md:text-sm tracking-tight leading-snug">
              45+ Sahyadri &<br />Himalayan Trails
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Info, label: 'Itinerary & Batch Dates' },
                { Icon: Compass, label: 'Certified Trek Captains' },
                { Icon: Camera, label: 'Waterfall Rappelling Photos' },
                { Icon: Map, label: 'Transport from Bengaluru & Pune' }
              ].map(({ Icon, label }, idx) => (
                <button 
                  key={idx} 
                  title={label}
                  onClick={() => onOpenBooking()}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <p className="text-white/80 text-[11px] md:text-xs max-w-xl leading-relaxed text-left md:text-right font-normal">
            Departures from Bengaluru, Mysuru, Mangaluru, Hubballi, Pune & Delhi. All packages include round-trip transport, shared accommodation, local meals & guided treks.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
