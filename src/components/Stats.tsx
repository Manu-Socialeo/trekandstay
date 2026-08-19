import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ShieldCheck, Compass, Users, MapPin, Award, Star } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trek & Stay Track Record</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-black text-slate-900 leading-[1.18] tracking-tight mb-4">
            How Travelers Explore the<br /><span className="text-gradient-emerald">Wilderness with Confidence</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            From the misty crests of Kodachadri and Harishchandragad to the sacred shrines of the high Himalayas, our certified expeditions are built on uncompromising safety and unmatched hospitality.
          </p>
        </div>

        {/* Bento Metrics Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          {/* Main Hero Card: 15,000+ Trekkers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-xl border border-emerald-900/40 flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white ml-1">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
                  Verified Expeditions
                </span>
              </div>

              <div className="my-4">
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white tracking-tight leading-none mb-3">
                  <CountUp value={15000} />+
                </h3>
                <p className="text-lg sm:text-xl font-bold text-white mb-2">
                  Adventurers Guided into the Wild
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  Solo backpackers, corporate groups, photography enthusiasts, and families who have completed safe, life-enriching trails with Trek & Stay.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Zero-Compromise Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Solo-Female Traveler Friendly</span>
              </div>
            </div>
          </motion.div>

          {/* Right 2 Stacked Bento Cards */}
          <div className="md:col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 2: 45+ Trails */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-50 border border-slate-200/80 rounded-[30px] p-7 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight mb-2">
                  <CountUp value={45} />+
                </h4>
                <p className="text-sm font-bold text-slate-900 mb-2">Curated Wilderness Trails</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monsoon waterfalls, 80° rock-cut fort stairs, misty ridges, and high-altitude Himalayan pilgrimages.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-emerald-700">
                Karnataka • Maharashtra • Uttarakhand
              </div>
            </motion.div>

            {/* Card 3: 8+ Departure Hubs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 border border-slate-200/80 rounded-[30px] p-7 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight mb-2">
                  <CountUp value={8} />+
                </h4>
                <p className="text-sm font-bold text-slate-900 mb-2">Connected Departure Hubs</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scheduled pickups from Bengaluru, Mysuru, Mangaluru, Hubballi, Shivamogga, Pune, Mumbai & Delhi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-emerald-700">
                End-to-End AC Transit Included
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

