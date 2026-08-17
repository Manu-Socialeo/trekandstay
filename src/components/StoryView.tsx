import { ArrowUpRight, Compass, Shield, Award, Users, Globe2 } from 'lucide-react';

interface StoryViewProps {
  onOpenBooking: (destination?: string) => void;
}

export function StoryView({ onOpenBooking }: StoryViewProps) {
  return (
    <div className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in text-slate-900">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block border border-slate-200 bg-slate-50 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-4 tracking-wide">
          Our Karnataka Heritage & Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Welcome to the Wilderness: Crafting Unforgettable Trek & Stay Journeys
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Born out of a deep passion for the Western Ghats, Sahyadris, and sacred Himalayan trails, Trek & Stay connects adventure lovers from Bengaluru, Mysuru, Mangaluru, Hubballi, and Pune with nature's rawest wonders.
        </p>
      </div>

      {/* Main Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        <div className="md:col-span-8 rounded-[32px] overflow-hidden aspect-[16/9] shadow-lg relative group">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2021&auto=format&fit=crop" 
            alt="Trek and Stay Captains and Batches in Western Ghats" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
              Karnataka & Sahyadri Leaders
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">12,000+ Happy Trekkers Across 8 Hub Cities</h3>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 text-white rounded-[32px] p-8 flex-1 flex flex-col justify-between shadow-lg">
            <div>
              <Compass className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">Our Mission</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                To deliver seamless end-to-end trekking experiences with verified stays, authentic local cuisine, certified captains, and transparent group pricing.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-2xl font-extrabold text-white">100%</span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Safety Record</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-400">8+</span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Departure Hubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-8">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <Shield className="w-6 h-6 text-slate-900" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Safety & Certified Guidance</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Every batch is led by certified mountaineers and local captains equipped with dual-rope climbing rigs, first-aid support, and emergency transit coordination.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-8">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <Globe2 className="w-6 h-6 text-slate-900" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Leave No Trace Tourism</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We operate eco-conscious zero-waste camps, support local homestays and village economies, and strictly protect fragile Western Ghats ecosystems.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-8">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <Users className="w-6 h-6 text-slate-900" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Community & Group Spirit</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            From campfire songs and storytelling to private corporate retreats, we foster lasting friendships across like-minded adventurers.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-950 text-white rounded-[32px] p-8 sm:p-12 text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">Ready to Answer the Call of the Wild?</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mb-8">
          Book your weekend waterfall trail, fort trek, or sacred Himalayan pilgrimage today with early bird group discounts.
        </p>
        <button
          onClick={() => onOpenBooking()}
          className="flex items-center gap-3.5 bg-white text-slate-950 hover:bg-slate-100 px-8 py-3.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span>Reserve Your Trek Batch</span>
          <ArrowUpRight className="w-4 h-4 text-slate-900" />
        </button>
      </div>
    </div>
  );
}
