import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

function CountUp({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function Stats() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col items-center relative z-10"
      >
        {/* Top Category Label */}
        <p className="text-[11px] font-semibold text-slate-400 tracking-wider mb-2 uppercase">
          Trek & Stay By The Numbers
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 mb-8 text-center leading-[1.2] tracking-tight">
          How Travelers Explore the<br />Wilderness with Confidence
        </h2>
        
        {/* Giant Number + Globe Graphic Container */}
        <div className="relative w-full max-w-3xl flex flex-col items-center justify-center my-6 md:my-10">
          {/* Big Blue Stat */}
          <h3 className="text-[15vw] sm:text-[13vw] md:text-[110px] lg:text-[128px] font-black text-[#1d63ed] leading-none tracking-tight z-10 select-none">
            <CountUp value={15000} />+
          </h3>
          
          {/* Earth Hemisphere Graphic */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative -mt-10 sm:-mt-14 md:-mt-16 w-64 sm:w-80 md:w-96 aspect-square rounded-full overflow-hidden flex items-center justify-center shadow-inner"
          >
            <img 
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1974&auto=format&fit=crop" 
              alt="Planet Earth globe sphere" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            {/* Soft Radial Fade & Atmospheric glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Subtle Micro-Labels with precise rotations */}
          <div className="hidden lg:block absolute -left-12 top-6 text-[11px] font-medium text-slate-400 -rotate-[16deg] pointer-events-none select-none">
            Sahyadri Monsoon Expeditions
          </div>
          <div className="hidden lg:block absolute -right-10 top-8 text-[11px] font-medium text-slate-400 rotate-[18deg] pointer-events-none select-none">
            Weekly Weekend Departures
          </div>
          <div className="hidden lg:block absolute -left-8 bottom-12 text-[11px] font-medium text-slate-400 rotate-[8deg] pointer-events-none select-none">
            Bengaluru & Pune Hubs
          </div>
          <div className="hidden lg:block absolute -right-6 bottom-12 text-[11px] font-medium text-slate-400 -rotate-[12deg] pointer-events-none select-none">
            Certified Trek Leaders
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
          {[
            {
              number: 45,
              suffix: '+',
              title: 'Waterfalls & Fort Trails',
              desc: 'From Kalu Falls and Devkund to Harihar and Harishchandragad, we cover Maharashtra & Himalayas deepest gems.'
            },
            {
              number: 8,
              suffix: '+',
              title: 'Departure Cities',
              desc: 'Seamless scheduled departures from Bengaluru, Mysuru, Mangaluru, Hubballi, Hyderabad, Chennai, Pune and Delhi.'
            },
            {
              number: 100,
              suffix: '%',
              title: 'All-Inclusive Logistics',
              desc: 'Round-trip transportation, shared accommodation, local home-cooked meals, and certified safety captains.'
            }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-50/60 rounded-[28px] p-8 border border-slate-100/80 shadow-xs hover:border-slate-200 transition-colors"
            >
              <h4 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                <CountUp value={stat.number} />{stat.suffix}
              </h4>
              <p className="text-base font-bold text-slate-900 mb-3">{stat.title}</p>
              <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
