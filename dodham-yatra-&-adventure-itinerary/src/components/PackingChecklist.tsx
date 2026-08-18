import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Backpack,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Award,
  AlertCircle
} from 'lucide-react';
import { PACKING_ITEMS } from '../data/tripData';

export const PackingChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dodham_packing_checklist');
      return saved ? JSON.parse(saved) : ['p1', 'p4', 'p10'];
    } catch {
      return ['p1', 'p4', 'p10'];
    }
  });

  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('dodham_packing_checklist', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const selectAll = () => {
    setCheckedIds(PACKING_ITEMS.map((item) => item.id));
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  const totalItems = PACKING_ITEMS.length;
  const packedCount = checkedIds.length;
  const progressPercent = Math.round((packedCount / totalItems) * 100);

  const categories = ['All', 'Essentials & ID', 'Clothing & Thermals', 'Footwear & Trek Gear', 'Toiletries & Medical', 'Electronics & Misc'];

  const filteredItems = filterCategory === 'All'
    ? PACKING_ITEMS
    : PACKING_ITEMS.filter((item) => item.category === filterCategory);

  return (
    <section className="py-12 sm:py-16 bg-stone-100 border-b border-stone-200" id="things-to-carry">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Reference PDF */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Backpack className="w-3.5 h-3.5 text-amber-700" />
            Himalayan Packing Guide
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif-brand">
            THINGS TO CARRY
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            Interactive trek checklist: Tap items as you pack into your backpack. Your progress saves automatically!
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900">Your Packing Progress</h3>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {progressPercent}% Complete
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {packedCount} of {totalItems} essentials packed in your backpack
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={selectAll}
                className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition"
              >
                Pack All
              </button>
              <button
                onClick={resetAll}
                className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-md transition flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition ${
                filterCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-600">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isChecked ? 'line-through text-stone-500' : 'text-stone-900'
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.mandatory && (
                      <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 shrink-0">
                        Required
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isChecked ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information Banner matching Reference PDF */}
        <div className="mt-8 bg-amber-50 rounded-2xl p-5 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-800">
            <h4 className="font-bold text-amber-900 mb-0.5">ADDITIONAL INFORMATION</h4>
            <p className="text-stone-700">
              Yatris are requested to report at least 30 minutes prior to scheduled departures. Carry light backpack (up to 7kg) for the Kedarnath trek; main luggage can be securely left at the Sonprayag base hotel cloakroom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
