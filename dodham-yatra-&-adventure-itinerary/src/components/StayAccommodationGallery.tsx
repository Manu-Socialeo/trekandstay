import React from 'react';
import { Bed, Tent, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { ACCOMMODATIONS } from '../data/tripData';

export const StayAccommodationGallery: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200" id="accommodations">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Bed className="w-3.5 h-3.5 text-amber-700" />
            Comfort & Stays
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif-brand">
            ACCOMMODATION & TENT STAYS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            Hygienic hotels, mountain lodges, and alpine tent experiences chosen for comfort and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ACCOMMODATIONS.map((acc, idx) => (
            <div
              key={idx}
              className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-stone-200 overflow-hidden">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md border border-stone-700">
                    {acc.type}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{acc.location}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-stone-900">{acc.name}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{acc.description}</p>

                  <div className="mt-4 pt-3 border-t border-stone-200">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Key Stay Features:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {acc.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="bg-white border border-stone-200 text-stone-700 text-xs px-2.5 py-1 rounded-md flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
