import { ArrowUpRight } from 'lucide-react';

interface CTAProps {
  onOpenBooking: () => void;
}

export function CTA({ onOpenBooking }: CTAProps) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white max-w-7xl mx-auto">
      <div className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-emerald-100 border border-emerald-300 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-800 tracking-wide shadow-2xs">
              ⚡ Limited Monsoon Batches Open
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-black text-slate-900 leading-[1.18] tracking-tight mb-4">
            Plan Your Next<br /><span className="text-gradient-emerald">Wilderness Trek Today</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 max-w-md">
            Embark on a journey through roaring waterfalls, misty Sahyadri ridges, and majestic forts. Group discounts (Flat ₹500 off on 3+ trekkers) and corporate departure slots are now open.
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={onOpenBooking}
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white pl-5 pr-2 py-2 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Book Your Slot</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-all shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <a
              href="https://wa.me/919902937730?text=Hi%20Trek%20%26%20Stay%20team%2C%20I%20would%20like%20to%20inquire%20about%20upcoming%20batches"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>💬 WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-full min-h-[380px]">
          <div 
            onClick={onOpenBooking}
            className="rounded-[28px] overflow-hidden h-full shadow-sm cursor-pointer group"
          >
            <img 
              src="https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=2070&auto=format&fit=crop" 
              alt="Hiker on a cliff" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div 
              onClick={onOpenBooking}
              className="rounded-[28px] overflow-hidden shadow-sm cursor-pointer group"
            >
              <img 
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop" 
                alt="Mountains expedition" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div 
              onClick={onOpenBooking}
              className="rounded-[28px] overflow-hidden shadow-sm cursor-pointer group"
            >
              <img 
                src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2070&auto=format&fit=crop" 
                alt="River in a valley" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
