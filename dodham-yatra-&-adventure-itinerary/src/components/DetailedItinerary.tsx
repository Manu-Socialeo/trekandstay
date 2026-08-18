import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Compass,
  Utensils,
  Bed,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Mountain,
  Footprints,
  Waves,
  Zap,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { ITINERARY_DAYS } from '../data/tripData';
import { ItineraryDay } from '../types';

export const DetailedItinerary: React.FC = () => {
  const [expandedDays, setExpandedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'trek' | 'darshan' | 'adventure'>('all');

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter((d) => d !== dayNum));
    } else {
      setExpandedDays([...expandedDays, dayNum]);
    }
  };

  const expandAll = () => {
    setExpandedDays([0, 1, 2, 3, 4, 5, 6, 7]);
  };

  const collapseAll = () => {
    setExpandedDays([]);
  };

  const getDayIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-4 h-4" />;
      case 'Waves':
        return <Waves className="w-4 h-4" />;
      case 'Mountain':
        return <Mountain className="w-4 h-4" />;
      case 'Footprints':
        return <Footprints className="w-4 h-4" />;
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200" id="detailed-itinerary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Reference PDF */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Day-by-Day Breakdown
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif-brand">
            PLAN IN DETAIL
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            What will we do? Comprehensive hour-by-hour Himalayan expedition, darshan schedule & safety route plan.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-stone-200 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-stone-700">Quick Actions:</span>
            <button
              onClick={expandAll}
              className="text-amber-800 hover:text-amber-900 font-semibold underline px-1"
            >
              Expand All
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={collapseAll}
              className="text-stone-600 hover:text-stone-900 font-medium px-1"
            >
              Collapse All
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Note: Himalayan timings may adjust based on weather & traffic.</span>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-6">
          {ITINERARY_DAYS.map((day) => {
            const isExpanded = expandedDays.includes(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition hover:border-amber-400/80"
              >
                {/* Day Header Card */}
                <div
                  onClick={() => toggleDay(day.dayNumber)}
                  className="cursor-pointer p-4 sm:p-5 flex items-center justify-between gap-3 bg-white hover:bg-stone-50/80 transition"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 font-bold flex flex-col items-center justify-center shrink-0 border border-amber-200">
                      <span className="text-[10px] uppercase font-extrabold text-amber-700">DAY</span>
                      <span className="text-sm sm:text-base font-extrabold font-mono-num leading-tight">
                        {day.dayNumber}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {day.date}
                        </span>
                        <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                          {day.route}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
                        {day.dayTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={day.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold transition"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Map Pin</span>
                    </a>

                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Day Expanded Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50/50 space-y-5">
                    {/* Tagline / Subtitle */}
                    <div className="text-xs sm:text-sm font-semibold text-amber-900 italic bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60">
                      "{day.tagline}"
                    </div>

                    {/* Content Grid: Photo + Description */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Photo Thumbnail */}
                      <div className="md:col-span-4 rounded-xl overflow-hidden shadow-sm border border-stone-200 bg-stone-200 aspect-[4/3]">
                        <img
                          src={day.image}
                          alt={day.dayTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="p-1.5 bg-stone-900 text-stone-300 text-[10px] text-center font-medium">
                          {day.imageCaption}
                        </div>
                      </div>

                      {/* Detailed Description & Activities */}
                      <div className="md:col-span-8 space-y-3.5">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                            Detailed Itinerary Flow:
                          </h4>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                            {day.description.map((line, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-amber-600 font-bold mt-0.5">•</span>
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                            Key Activities & Highlights:
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {day.activities.map((act, idx) => (
                              <span
                                key={idx}
                                className="bg-white border border-stone-200 text-stone-800 text-xs px-2.5 py-1 rounded-md font-medium"
                              >
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Footer Badges (Meals, Stay, Altitude, Maps) */}
                    <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-start gap-2">
                        <Utensils className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-stone-500 text-[10px] uppercase font-bold block">Meals</span>
                          <span className="text-stone-800 font-medium">{day.mealsIncluded}</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-start gap-2">
                        <Bed className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-stone-500 text-[10px] uppercase font-bold block">Stay / Night</span>
                          <span className="text-stone-800 font-medium">{day.stayLocation}</span>
                          <span className="text-[11px] text-stone-500 block">({day.stayType})</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                        <div>
                          {day.altitude && (
                            <div className="text-[11px] text-stone-700 font-medium">
                              🏔️ Altitude: <strong>{day.altitude}</strong>
                            </div>
                          )}
                          {day.distance && (
                            <div className="text-[11px] text-stone-600">
                              📏 Distance: {day.distance}
                            </div>
                          )}
                        </div>

                        <a
                          href={day.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200 shrink-0 transition"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
