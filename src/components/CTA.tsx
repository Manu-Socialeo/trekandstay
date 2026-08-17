import { ArrowUpRight } from 'lucide-react';

interface CTAProps {
  onOpenBooking: () => void;
}

export function CTA({ onOpenBooking }: CTAProps) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white max-w-7xl mx-auto">
      <div className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-xs">
        <div>
          <span className="inline-block bg-white border border-slate-200 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-5 tracking-wide shadow-2xs">
            Join Upcoming Batches
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 leading-[1.18] tracking-tight mb-5">
            Plan Your Next<br />Wilderness Trek Today
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 max-w-md">
            Embark on a journey through roaring waterfalls, misty Sahyadri ridges, and majestic forts. Early bird discounts and group offers are now live for upcoming batches.
          </p>
          
          <div className="flex items-center">
            <button 
              onClick={onOpenBooking}
              className="flex items-center gap-3.5 bg-transparent border border-slate-900 hover:bg-slate-900 hover:text-white pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold text-slate-900 transition-all group active:scale-95"
            >
              <span>Book Your Slot</span>
              <div className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-white flex items-center justify-center group-hover:scale-105 transition-all shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-slate-900 transition-colors" />
              </div>
            </button>
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
