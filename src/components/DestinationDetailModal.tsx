import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Mountain, 
  Compass, 
  Check, 
  ShieldCheck, 
  PhoneCall, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Tag, 
  Tent, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { DestinationDetail, hqDetails } from '../data/destinationsData';

interface DestinationDetailModalProps {
  destination: DestinationDetail | null;
  onClose: () => void;
  onOpenBooking: (destinationTitle: string, price: string) => void;
}

export function DestinationDetailModal({
  destination,
  onClose,
  onOpenBooking
}: DestinationDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'story' | 'campsite' | 'inclusions' | 'faq'>('itinerary');
  const [openDay, setOpenDay] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  if (!destination) return null;

  const whatsappMessage = encodeURIComponent(
    `I would like to book my stay with trek and stay for ${destination.title} (${destination.price})`
  );
  const whatsappUrl = `https://wa.me/919902937730?text=${whatsappMessage}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.title} | Trek & Stay`,
        text: destination.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
          <img 
            src={destination.image} 
            alt={destination.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {destination.badge}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/30">
                {destination.duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-md cursor-pointer"
                title="Share trek itinerary"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-md cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="absolute top-16 right-4 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg animate-fade-in">
              Link copied to clipboard!
            </div>
          )}

          {/* Bottom Title Content */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide mb-1">
              {destination.tagline}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-sm">
              {destination.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <span className="flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                Altitude: {destination.highestAltitude}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                Grade: {destination.difficulty}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Distance: {destination.trekDistance}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Offer Stripe */}
        <div className="bg-amber-50 border-y border-amber-200/80 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-amber-950 font-medium">
          <span className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <strong>Offer:</strong> {destination.groupDiscountOffer}
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Departures from: <strong>{destination.departureHubs.join(', ')}</strong>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 overflow-x-auto bg-slate-50/70 shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'itinerary'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'story'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Story & Highlights
          </button>
          <button
            onClick={() => setActiveTab('campsite')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'campsite'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Campsite & Location
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'inclusions'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Inclusions & Safety
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Trek FAQ
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 text-xs sm:text-sm space-y-6">
          
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Comprehensive {destination.duration} Itinerary
                  </h3>
                  <p className="text-xs text-slate-500">
                    Curated route planned with safe acclimatization and certified captains.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-slate-900">{destination.price}</span>
                  <span className="text-[11px] text-slate-400 line-through block">{destination.regularPrice}</span>
                </div>
              </div>

              <div className="space-y-3">
                {destination.dayByDayItinerary.map((day) => (
                  <div 
                    key={day.day}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    <button
                      onClick={() => setOpenDay(openDay === day.day ? 0 : day.day)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          D{day.day}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{day.title}</h4>
                          <span className="text-[11px] text-slate-500">Stay: {day.stay}</span>
                        </div>
                      </div>
                      {openDay === day.day ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {openDay === day.day && (
                      <div className="p-4 pt-2 border-t border-slate-200/60 bg-white space-y-3">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {day.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div>
                            <strong className="text-slate-800">🍲 Meals Included:</strong> {day.meals}
                          </div>
                          <div>
                            <strong className="text-slate-800">🏕️ Stay:</strong> {day.stay}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {day.activities.map((act, i) => (
                            <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                              ✓ {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: STORY & HIGHLIGHTS */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              {/* 1000+ Words Blog Field Journal Link */}
              <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold mb-1">
                    <span className="bg-emerald-500/30 border border-emerald-400/40 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                      Field Journal • 1,000+ Words
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-sm sm:text-base">Read Full Destination Chronicle & Lore</h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Explore village life, ancient history, local food, and Leave No Trace conservation.
                  </p>
                </div>
                <a
                  href={`#blog-${destination.id}`}
                  onClick={() => onClose()}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all shadow shrink-0"
                >
                  <span>Read Field Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">The Trail Story</h3>
                <p className="text-slate-600 leading-relaxed">{destination.story}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Key Highlights & Experiences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Trail Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {destination.gallery.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-200">
                      <img src={img} alt={`${destination.title} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAMPSITE & LOCATION */}
          {activeTab === 'campsite' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Tent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {destination.campsiteDetails.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Location: {destination.campsiteDetails.location} • Elevation: {destination.campsiteDetails.elevation}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {destination.campsiteDetails.description}
                </p>

                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Campsite Amenities & Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.campsiteDetails.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200/70">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Headquarters & Departure Hubs */}
              <div className="border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  Trek & Stay Departure Hubs & Pickups
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Direct AC sleeper/pushback transit available from following central points with live GPS tracking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {destination.departureHubs.map((hub, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">
                      📍 {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inclusions */}
                <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    What's Included in Package
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {destination.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-slate-500" />
                    Exclusions
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {destination.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Safety & Gear */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-900 text-white">
                <h4 className="font-bold text-white text-sm mb-2">Trek & Stay Certified Safety Protocols</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Every batch is accompanied by certified wilderness trek captains and UIAA mountaineers equipped with dual-anchor climbing ropes, medical first-aid kits, pulse-oximeters, and 24/7 centralized emergency back-up coordination.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Frequently Asked Questions for {destination.title}
              </h3>
              <div className="space-y-3">
                {destination.faq.map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-950">{destination.price}</span>
              <span className="text-xs text-slate-400 line-through">{destination.regularPrice}</span>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                All Included
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Per person • Transport, Stays, Meals & Permits included
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Direct WhatsApp Booking Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book via WhatsApp</span>
            </a>

            {/* Custom Interactive Booking Engine */}
            <button
              onClick={() => {
                onClose();
                onOpenBooking(destination.title, destination.price);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer text-center"
            >
              <span>Reserve Batch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
