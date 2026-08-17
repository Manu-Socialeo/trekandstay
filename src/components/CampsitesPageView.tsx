import { useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Navigation, Tent, Shield, Building2, ExternalLink, Compass, CheckCircle2, Trees, Sparkles, MessageCircle } from 'lucide-react';
import { hqDetails, verifiedCampsitesData } from '../data/destinationsData';

interface CampsitesPageViewProps {
  onOpenBooking: (destinationTitle?: string, price?: string) => void;
  onNavigateHome: (view: 'home' | 'packages' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies', hash?: string) => void;
}

export function CampsitesPageView({ onOpenBooking, onNavigateHome }: CampsitesPageViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Headquarters, Regional Network & Verified Campsites | Trek & Stay';
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Trek & Stay Headquarters: <strong className="text-emerald-700">Kollur, Karnataka (PIN 576220)</strong>
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-4 tracking-wide shadow-sm">
            Operational Base & Campsite Network
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
            Rooted in Karnataka, Exploring Across India
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Headquartered near the sacred foothills of Kollur, Karnataka with operational dispatch hubs and verified eco-glamping campsites across the Western Ghats, Maharashtra Sahyadris, and Garhwal Himalayas.
          </p>
        </div>

        {/* Top Grid: Headquarters & Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Headquarters Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[32px] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider block">Official Headquarters</span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{hqDetails.name}</h2>
                  </div>
                </div>
                <a
                  href={hqDetails.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-all"
                  title="View on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kollur, KA</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Located in Kollur (Karnataka 576220) at the foothills of the Western Ghats and Kodachadri, our central wilderness basecamp coordinates mountain telemetry, gear maintenance, UIAA climbing inspections, and multi-state batch departures.
              </p>

              <div className="space-y-3.5 text-xs text-slate-600 bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Official Google Maps Address:</strong>
                      <span className="font-semibold text-slate-800">Trek and Stay, Kollur, Karnataka 576220</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">GPS: {hqDetails.headquartersAddress.geoCoordinates.latitude}° N, {hqDetails.headquartersAddress.geoCoordinates.longitude}° E</span>
                    </div>
                  </div>
                  <a
                    href={hqDetails.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Trek Support Helpline:</strong>{' '}
                    <a href={`tel:${hqDetails.phoneHelpline}`} className="text-emerald-700 font-bold hover:underline">
                      {hqDetails.phoneHelpline}
                    </a>
                    <span className="text-slate-300 mx-2">|</span>
                    <strong className="text-slate-900">Pilgrimage:</strong>{' '}
                    <a href={`tel:${hqDetails.pilgrimageHelpline}`} className="text-emerald-700 font-bold hover:underline">
                      {hqDetails.pilgrimageHelpline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Official Email:</strong>{' '}
                    <a href={`mailto:${hqDetails.email}`} className="text-slate-700 font-semibold hover:underline">
                      {hqDetails.email}
                    </a>
                    <span className="text-slate-300 mx-2">|</span>
                    <strong className="text-slate-900">Domain:</strong>{' '}
                    <span className="text-emerald-700 font-semibold">{hqDetails.domain}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
              <a
                href={hqDetails.whatsappBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-full text-xs font-black text-center transition-all shadow-md"
              >
                Connect on WhatsApp (+91 99029 37730)
              </a>
              <a
                href={hqDetails.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm border border-slate-800"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Regional Departure Hubs */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[32px] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-600">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Regional Departure Network</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Live Departure Hubs & Staging Points</h2>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                We run regular weekend departures with coordinated landmark pickup points, pre-departure WhatsApp groups, and live transport tracking across South & West India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {hqDetails.regionalDepartureHubs.map((hub, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="font-black text-slate-900 text-xs block mb-1">📍 {hub.city}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{hub.address}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-600 font-semibold">Every batch includes licensed AC transport & trek captains.</span>
              </div>
              <button 
                onClick={() => onOpenBooking()}
                className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                Book Batch
              </button>
            </div>
          </div>

        </div>

        {/* Verified Campsites Network Grid */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-2 tracking-wide">
                Verified Wilderness Stays
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Our Signature Wilderness Bases</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Each campsite is inspected for pure spring water, clean private sanitation, local organic cuisine, and solar energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedCampsitesData.map((camp, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {camp.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {camp.region}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {camp.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {camp.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {camp.amenities.map((amenity, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">Trek & Stay Certified</span>
                  <button 
                    onClick={() => onOpenBooking(camp.name, 'Included in Package')}
                    className="bg-slate-900 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Reserve Stay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900">Have Questions About Campsite Facilities or Route Navigation?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Our Kollur HQ telemetry and support desk is live 24/7. Reach out directly on WhatsApp or call our emergency trail captain desk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919902937730?text=I%20have%20an%20inquiry%20about%20Trek%20and%20Stay%20campsites%20and%20HQ"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp HQ Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
