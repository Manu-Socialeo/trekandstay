import React from 'react';
import { CheckCircle2, XCircle, Shield, AlertCircle, Utensils, Compass, Bus, Tent, HeartPulse } from 'lucide-react';
import { INCLUSIONS, EXCLUSIONS } from '../data/tripData';

export const InclusionsExclusions: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-stone-100 border-b border-stone-200" id="inclusions-exclusions">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Shield className="w-3.5 h-3.5 text-stone-600" />
            Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-brand">
            INCLUSIONS AND EXCLUSIONS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            Everything clearly itemized so you have 100% peace of mind before you step onto the trail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* INCLUSIONS BOX */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-emerald-200/80 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">PACKAGE INCLUDES</h3>
                <p className="text-xs text-emerald-700 font-medium">Provided in your confirmed booking</p>
              </div>
            </div>

            <ul className="space-y-3">
              {INCLUSIONS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-stone-100 bg-emerald-50/60 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center gap-2 text-xs text-emerald-900">
              <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>Meals Policy:</strong> 2 Meals per day (Breakfast & Dinner) included at hotels/camps as per plan.</span>
            </div>
          </div>

          {/* EXCLUSIONS BOX */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-rose-200/80 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 to-amber-500" />
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-rose-100">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">PACKAGE EXCLUDES</h3>
                <p className="text-xs text-rose-700 font-medium">Optional add-ons & personal expenses</p>
              </div>
            </div>

            <ul className="space-y-3">
              {EXCLUSIONS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 leading-snug">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-stone-100 bg-rose-50/60 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center gap-2 text-xs text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span><strong>Trek Note:</strong> Food during 16km Kedarnath trek is self-managed at local trail dhabas.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
