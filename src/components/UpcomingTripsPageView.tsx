import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users, Sparkles, Clock, ShieldCheck, PhoneCall, QrCode } from 'lucide-react';
import { destinationsData, DestinationDetail } from '../data/destinationsData';

interface UpcomingTripsPageViewProps {
  onOpenBooking: (destinationTitle?: string, price?: string) => void;
  onSelectDestination?: (destination: DestinationDetail) => void;
  onNavigateHome: (view: 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery', hash?: string) => void;
  onOpenPayment?: () => void;
}

export interface UpcomingTripBatch {
  id: string;
  title: string;
  destinationSlug: string;
  dateRange: string;
  month: string;
  duration: string;
  price: string;
  departureHub: string;
  availableSlots: number;
  status: 'Filling Fast' | 'Available' | 'Few Slots Left' | 'Almost Full';
  badge?: string;
}

// Default initial upcoming batches schedule
export const initialUpcomingTrips: UpcomingTripBatch[] = [
  {
    id: 'batch-mh-monsoon-1',
    title: 'Maharashtra Monsoon Trails (Konkan Kada & Kalu Falls)',
    destinationSlug: 'maharashtra-monsoon-trails',
    dateRange: 'July 15 - July 19, 2026',
    month: 'July 2026',
    duration: '4N/5D',
    price: '₹13,499',
    departureHub: 'Bengaluru / Pune / Mumbai',
    availableSlots: 6,
    status: 'Filling Fast',
    badge: 'Popular'
  },
  {
    id: 'batch-kalu-falls-1',
    title: 'Kalu Falls & Jivdhan Fort Expedition',
    destinationSlug: 'kalu-falls-misty-sahyadris',
    dateRange: 'July 24 - July 26, 2026',
    month: 'July 2026',
    duration: '2N/3D',
    price: '₹7,999',
    departureHub: 'Pune / Mumbai / Bengaluru',
    availableSlots: 8,
    status: 'Available',
    badge: 'Weekend Special'
  },
  {
    id: 'batch-kodachadri-1',
    title: 'Kodachadri Foothills & Kollur Campsite Stay',
    destinationSlug: 'kodachadri-foothills-stay',
    dateRange: 'August 01 - August 03, 2026',
    month: 'August 2026',
    duration: '3D/2N',
    price: '₹6,499',
    departureHub: 'Kollur / Mangaluru / Bengaluru',
    availableSlots: 10,
    status: 'Available',
    badge: 'HQ Base'
  },
  {
    id: 'batch-harihar-1',
    title: 'Shitkada Rappel + Harihar 80° Rock-Cut Steps',
    destinationSlug: 'shitkada-rappel-harihar',
    dateRange: 'August 08 - August 10, 2026',
    month: 'August 2026',
    duration: '3D/2N',
    price: '₹8,999',
    departureHub: 'Pune / Mumbai / Hubballi',
    availableSlots: 4,
    status: 'Few Slots Left',
    badge: 'High Adrenaline'
  },
  {
    id: 'batch-kedarnath-1',
    title: 'Kedarnath - Badrinath Do Dham Pilgrimage',
    destinationSlug: 'kedarnath-badrinath-do-dham',
    dateRange: 'August 18 - August 24, 2026',
    month: 'August 2026',
    duration: '6N/7D',
    price: '₹17,499',
    departureHub: 'Delhi / Haridwar / Rishikesh',
    availableSlots: 5,
    status: 'Filling Fast',
    badge: 'Sacred Yatra'
  },
  {
    id: 'batch-waterfalls-1',
    title: 'Maharashtra Waterfalls Mania (Devkund & Secret Gorges)',
    destinationSlug: 'maharashtra-waterfalls-mania',
    dateRange: 'August 28 - August 31, 2026',
    month: 'August 2026',
    duration: '4D/3N',
    price: '₹8,500',
    departureHub: 'Bengaluru / Pune / Mysuru',
    availableSlots: 7,
    status: 'Available'
  }
];

export function UpcomingTripsPageView({
  onOpenBooking,
  onSelectDestination,
  onNavigateHome,
  onOpenPayment
}: UpcomingTripsPageViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [trips, setTrips] = useState<UpcomingTripBatch[]>(initialUpcomingTrips);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Upcoming Trips & Batch Calendar | Trek & Stay';
  }, []);

  const filteredTrips = selectedMonth === 'all' 
    ? trips 
    : trips.filter(t => t.month.toLowerCase().includes(selectedMonth.toLowerCase()));

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-4 sm:px-6 md:px-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            {onOpenPayment && (
              <button
                onClick={onOpenPayment}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>UPI Pay / QR</span>
              </button>
            )}
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Showing <strong className="text-slate-900">{filteredTrips.length}</strong> upcoming batches
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-4 tracking-wide shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled Batch Departures 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
            Upcoming Trips & Trek Batches
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Choose your preferred weekend batch or long expedition. All batches include comfortable transit, verified stays, certified mountain captains, hot local meals, and permits.
          </p>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {[
            { label: 'All Batches', val: 'all' },
            { label: 'July 2026', val: 'july' },
            { label: 'August 2026', val: 'august' },
            { label: 'September 2026', val: 'september' }
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setSelectedMonth(item.val)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMonth === item.val
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Upcoming Trips Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTrips.map((trip) => {
            const matchedDest = destinationsData.find(d => d.slug === trip.destinationSlug || d.id === trip.destinationSlug);

            return (
              <div 
                key={trip.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:border-slate-300"
              >
                <div>
                  {/* Status & Badge Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {trip.badge ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {trip.badge}
                      </span>
                    ) : <div />}

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      trip.status === 'Few Slots Left' 
                        ? 'bg-red-100 text-red-700'
                        : trip.status === 'Filling Fast'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {trip.status} ({trip.availableSlots} slots left)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-3 group-hover:text-emerald-700 transition-colors">
                    {trip.title}
                  </h3>

                  {/* Key Trip Meta */}
                  <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{trip.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Duration: <strong>{trip.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">Pickup: {trip.departureHub}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1">Package Price</span>
                    <span className="text-xl font-black text-slate-900">{trip.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {matchedDest && onSelectDestination && (
                      <button
                        type="button"
                        onClick={() => onSelectDestination(matchedDest)}
                        className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onOpenBooking(trip.title, trip.price)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-full text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Batch / Group Departure Banner */}
        <div className="bg-slate-950 text-white rounded-[32px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="px-3 py-1 bg-white/10 rounded-full text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-3 inline-block">
              Custom Dates Available
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Want a Private Batch or Corporate Trek?</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We curate custom departure dates from Bengaluru, Pune, Mumbai, or direct campsite pickups for private groups of 6+ trekkers with dedicated guides and tailored logistics.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking('Custom Private Group Batch', 'Custom')}
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 px-8 rounded-full text-xs transition-all shadow-lg active:scale-95 shrink-0 cursor-pointer"
          >
            Request Custom Batch
          </button>
        </div>

      </div>
    </div>
  );
}
