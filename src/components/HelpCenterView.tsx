import { useState, FormEvent } from 'react';
import { ArrowUpRight, Search, PhoneCall, Mail, MessageSquare, CheckCircle2, ChevronDown, MapPin, QrCode, ShieldCheck } from 'lucide-react';
import { UpiQrCard } from './UpiQrCard';

interface HelpCenterViewProps {
  onOpenBooking: () => void;
  onOpenPaymentModal?: () => void;
}

const helpCategories = [
  {
    title: 'Batch Bookings & Departure Logistics',
    questions: [
      { q: 'How do I know my pickup point and departure timing?', a: 'Once booked, you are added to a private WhatsApp batch group 24-48 hours prior to departure. Live GPS trackers of your transport vehicle and exact landmark pickups in Bengaluru, Mysuru, Hubballi, or Pune are pinned in the group.' },
      { q: 'What is the group booking discount structure?', a: 'We offer ₹500 off per booking for groups of 3 or more trekkers. For select long tours, booking a group of 6 unlocks 1 free slot (6 bookings → 1 Free).' },
      { q: 'Can I reschedule my trek batch?', a: 'Yes! Rescheduling to another batch date is permitted with notice up to 5 days before scheduled departure.' }
    ]
  },
  {
    title: 'Payments, UPI & Invoicing',
    questions: [
      { q: 'What is the official UPI ID for Trek & Stay payments?', a: 'Our official verified UPI ID is ganapathibhat5@ybl (payee: Ganapathi Bhat on Canara Bank). We also support ganapathibhat5@okhdfcbank.' },
      { q: 'How do I get booking confirmation after UPI payment?', a: 'Immediately after transferring via Google Pay, PhonePe, Paytm, or BHIM, share your 12-digit UTR or transaction screenshot to our WhatsApp helpline (+91 99029 37730). Our desk confirms your slot and issues an instant receipt within 15 minutes.' },
      { q: 'Can I pay a token advance instead of full amount?', a: 'Yes! You can reserve your trek slot with a nominal advance token (₹1,000–₹2,000 per person) and clear the remaining balance at basecamp check-in.' }
    ]
  },
  {
    title: 'Gear & Monsoon Preparation',
    questions: [
      { q: 'What gear is provided by Trek & Stay?', a: 'We provide high-grade safety equipment including UIAA certified dual-anchor ropes for rappelling, helmets, life jackets, shared tents/homestays, and extensive first-aid kits.' },
      { q: 'Are these treks suitable for beginners and solo travelers?', a: 'Yes! Over 60% of our trekkers join solo or are first-time hikers. Our certified trek captains pace the trail and ensure complete safety at all technical sections.' }
    ]
  },
  {
    title: 'Pilgrimage & Sacred Yatras',
    questions: [
      { q: 'How are Kedarnath & Badrinath logistics managed?', a: 'Our 6N/7D Do Dham package includes transit from Haridwar/Rishikesh, Sonprayag/Gaurikund stays, VIP darshan assistance, biometric token guidance, and experienced pilgrimage coordinators.' },
      { q: 'Who do I contact for pilgrimage queries?', a: 'For sacred yatra bookings and custom spiritual tours, call our dedicated pilgrimage coordinator at +91 82175 59456.' }
    ]
  }
];

export function HelpCenterView({ onOpenBooking, onOpenPaymentModal }: HelpCenterViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in text-slate-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block border border-slate-200 bg-slate-50 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-4 tracking-wide">
          24/7 Trekker Support & Helpline
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          How Can We Help Your Journey?
        </h1>
        
        {/* Search Input Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search departures, packing lists, UPI payments, trek routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-6 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* 4 Support Channels & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-slate-100/70 transition-colors">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Trek Helpline</h3>
          <p className="text-slate-500 text-xs mb-3">WhatsApp & Call Support</p>
          <a href="tel:+919902937730" className="text-xs font-bold text-emerald-700 hover:underline">
            +91 99029 37730
          </a>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-slate-100/70 transition-colors">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Pilgrimage Desk</h3>
          <p className="text-slate-500 text-xs mb-3">Do Dham & Spiritual Yatras</p>
          <a href="tel:+918217559456" className="text-xs font-bold text-slate-900 hover:underline">
            +91 82175 59456
          </a>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-slate-100/70 transition-colors">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Email Desk</h3>
          <p className="text-slate-500 text-xs mb-3">Private & Corporate Enquiries</p>
          <a href="mailto:info@trekandstay.com" className="text-xs font-bold text-slate-900 hover:underline">
            info@trekandstay.com
          </a>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-slate-100/70 transition-colors">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-4 text-emerald-700">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Maps & Base Location</h3>
          <p className="text-slate-500 text-xs mb-3">Kollur, Karnataka 576220</p>
          <a href="https://maps.app.goo.gl/uGLFMEgJYDw5wEyR8" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-700 hover:underline">
            Open in Google Maps ↗
          </a>
        </div>
      </div>

      {/* Dedicated Official Verified Payment Section */}
      <div className="mb-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-[32px] p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Payment Verification Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Verified UPI ID & Banking Information
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              To protect trekkers from fraudulent payment links, all official Trek & Stay bookings are processed through our registered verified UPI ID and Canara Bank account.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Primary UPI ID</span>
                <span className="font-mono font-bold text-emerald-400 text-sm select-all">ganapathibhat5@ybl</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Verified Payee</span>
                <span className="font-bold text-white text-sm">Ganapathi Bhat (Canara Bank 2821)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowQrCode(!showQrCode)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-full text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>{showQrCode ? 'Hide QR Code' : 'View & Scan UPI QR Code'}</span>
              </button>
              <a
                href="https://wa.me/919902937730?text=Hello%20Trek%20%26%20Stay%20team,%20I%20have%20a%20query%20about%20UPI%20payment%20verification."
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-5 rounded-full text-xs transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Payment Help</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            {showQrCode ? (
              <div className="animate-fade-in">
                <UpiQrCard
                  note="Trek & Stay Official Booking"
                  showAmountControls={true}
                />
              </div>
            ) : (
              <div 
                onClick={() => setShowQrCode(true)}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 text-center cursor-pointer transition-all hover:scale-[1.02] group"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/20 transition-colors">
                  <QrCode className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Click to Reveal QR Code</h4>
                <p className="text-slate-400 text-xs max-w-xs mx-auto">
                  Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI app.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Categories Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Inquiries</h2>
        <div className="space-y-6">
          {helpCategories.map((cat, catIdx) => (
            <div key={catIdx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{cat.title}</h3>
              <div className="space-y-3">
                {cat.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = openFaq === key;
                  return (
                    <div key={qIdx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                      <button
                        onClick={() => toggleFaq(key)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-slate-950 cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Contact Card */}
      <div className="bg-slate-950 text-white rounded-[32px] p-8 sm:p-12">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            Leave our trip curators a message and we'll reply with a personalized expedition briefing.
          </p>

          {contactSubmitted ? (
            <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-4 flex items-center gap-3 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Message dispatched. A senior curator will contact you today.</span>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                required
                rows={3}
                placeholder="Ask about gear specifications, payment confirmation, private group charters..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700 resize-none"
              ></textarea>
              <button
                type="submit"
                className="bg-white text-slate-950 hover:bg-slate-100 px-7 py-3 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Send Inquiry to Curators
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
