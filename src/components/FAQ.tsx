import { useState } from 'react';
import { ArrowDown, Plus, Minus, Backpack, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What is included in Trek & Stay packages?",
    answer: "All packages include round-trip transportation from your chosen departure city (Bengaluru, Mysuru, Mangaluru, Hubballi, Pune, etc.), comfortable shared stays/tents, delicious local meals as specified, certified trek captains, first-aid support, and all forest/entry permits."
  },
  {
    question: "Which departure cities do you operate from?",
    answer: "We run regular weekend & multi-day batches departing from Bengaluru, Mysuru, Mangaluru, Hubballi, Hyderabad, Chennai, Pune, and Delhi. Pickup points with exact live location trackers are shared via WhatsApp group prior to departure."
  },
  {
    question: "Are there group discounts or offers available?",
    answer: "Yes! We offer a flat ₹500 discount for group bookings of 3 or more trekkers. For select long expeditions, booking a group of 6 unlocks 1 free slot (6 bookings → 1 Free). Early-bird discounts also apply for bookings made in advance."
  },
  {
    question: "Can I book a private or customized batch for my company/friends?",
    answer: "Absolutely! We organize private corporate outings, college batches, and customized family tours. Reach out directly on WhatsApp at +91 99029 37730 or for pilgrimage tours at +91 82175 59456 to get a custom quote."
  }
];

const packingList = [
  "30-40L Backpack with Rain Cover",
  "High-traction Trekking/Hiking Shoes",
  "Raincoat / Poncho / Waterproof Layer",
  "2-3 sets of Quick-dry Clothes",
  "Reusable Water Bottle (1-2 Litres)",
  "Personal Medications & First-aid Kit",
  "Headlamp or Torch with extra batteries",
  "Power bank & Waterproof Mobile Pouch",
  "Light Towel & Toiletries",
  "Valid ID Proof (Aadhar/Voter ID)"
];

const dosAndDonts = {
  dos: [
    "Always follow the instructions of your Trek Captain.",
    "Stay hydrated and maintain a steady pace.",
    "Dispose of all waste responsibly (Carry it back).",
    "Inform your captain about any health issues immediately.",
    "Capture memories, but prioritize trail safety."
  ],
  donts: [
    "No littering on the mountains or waterfalls.",
    "Consumption of alcohol or smoking is strictly prohibited during the trek.",
    "Do not stray away from the group or marked trails.",
    "Avoid using plastic disposables or loud speakers.",
    "Do not disturb or feed wild animals along the route."
  ]
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'faq' | 'packing' | 'rules'>('faq');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-6 md:px-12 bg-white max-w-7xl mx-auto overflow-hidden">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-end"
      >
        <div className="lg:col-span-8">
          <span className="inline-block border border-slate-200 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-5 tracking-wide bg-slate-50/50">
            Preparation & FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 leading-[1.2] tracking-tight">
            Everything You Need to Know<br />Before Answering the Call of the Wild
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-col lg:items-end text-left lg:text-right">
          <p className="text-slate-900 font-bold text-sm mb-1">Have a specific question?</p>
          <p className="text-slate-500 text-xs md:text-sm max-w-xs leading-relaxed">
            WhatsApp us directly at <span className="font-semibold text-slate-800">+91 99029 37730</span> for instant batch guidance.
          </p>
        </div>
      </motion.div>

      {/* Tabs Controller */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-100 pb-2">
        {[
          { id: 'faq', label: 'Common Questions', icon: <Plus className="w-4 h-4" /> },
          { id: 'packing', label: 'Packing Guide', icon: <Backpack className="w-4 h-4" /> },
          { id: 'rules', label: "Do's & Don'ts", icon: <ShieldAlert className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl text-xs font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 rounded-[28px] overflow-hidden aspect-[4/3.8] shadow-md group relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop" 
            alt="Authentic lush green Sahyadri ridge during monsoon" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider mb-1">Western Ghats</p>
              <h3 className="text-lg font-black italic">Legacy in Every Step</h3>
            </div>
          </div>
        </motion.div>

        {/* Right Content Section (Dynamic based on Tab) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeTab === 'faq' && (
              <motion.div 
                key="faq-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col divide-y divide-slate-100"
              >
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    onClick={() => toggleFAQ(i)}
                    className="py-5 cursor-pointer group transition-colors select-none"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <p className="text-slate-900 font-semibold text-sm md:text-base group-hover:text-emerald-600 transition-colors">
                        {faq.question}
                      </p>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        openIndex === i 
                          ? 'bg-slate-900 border-slate-900 text-white' 
                          : 'border-slate-200 text-slate-500 group-hover:border-slate-900 group-hover:text-slate-900'
                      }`}>
                        {openIndex === i ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                        )}
                      </div>
                    </div>
                    {openIndex === i && (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed pr-6 overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'packing' && (
              <motion.div 
                key="packing-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm"
              >
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Backpack className="w-6 h-6 text-emerald-600" />
                  Essential Gear Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packingList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    <strong>Note:</strong> Carrying light is the key to an enjoyable trek. Avoid bringing expensive jewelry, large laptops, or heavy denim jeans.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'rules' && (
              <motion.div 
                key="rules-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
                  <h3 className="text-lg font-black text-emerald-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    Do's for a Safe Expedition
                  </h3>
                  <div className="space-y-4">
                    {dosAndDonts.dos.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="text-sm font-bold text-slate-800 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100">
                  <h3 className="text-lg font-black text-rose-900 mb-6 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-rose-500" />
                    Strict Don'ts & Ethics
                  </h3>
                  <div className="space-y-4">
                    {dosAndDonts.donts.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                        <span className="text-sm font-bold text-slate-800 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

