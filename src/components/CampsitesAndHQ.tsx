import { MapPin, Phone, Mail, Navigation, Tent, Shield, Building2, ExternalLink } from 'lucide-react';
import { hqDetails } from '../data/destinationsData';

export function CampsitesAndHQ() {
  return (
    <section id="campsites-hq" className="py-20 px-6 md:px-12 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block border border-slate-200 bg-white rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-4 tracking-wide shadow-2xs">
            Headquarters & Campsite Network
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
            Rooted in Karnataka, Exploring Across India
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Headquartered near Kollur, Karnataka with operational dispatch hubs and verified wilderness campsites across Karnataka, the Western Ghats, Maharashtra Sahyadris, and Uttarakhand.
          </p>
        </div>

        {/* Top Grid: Headquarters & Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Headquarters Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[32px] p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Official Location</span>
                    <h3 className="text-xl font-bold text-slate-900">{hqDetails.name}</h3>
                  </div>
                </div>
                <a
                  href={hqDetails.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-colors"
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

              <div className="space-y-3.5 text-xs text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Official Google Maps Address:</strong>
                      <span className="font-semibold text-slate-800">Trek and Stay, Kollur, Karnataka 576220</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">GPS Coordinates: {hqDetails.headquartersAddress.geoCoordinates.latitude}° N, {hqDetails.headquartersAddress.geoCoordinates.longitude}° E</span>
                    </div>
                  </div>
                  <a
                    href={hqDetails.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-all"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Trek Support Helpline:</strong>{' '}
                    <a href={`tel:${hqDetails.phoneHelpline}`} className="text-emerald-700 font-bold hover:underline">
                      {hqDetails.phoneHelpline}
                    </a>
                    <span className="text-slate-400 mx-2">|</span>
                    <strong className="text-slate-900">Pilgrimage:</strong>{' '}
                    <a href={`tel:${hqDetails.pilgrimageHelpline}`} className="text-emerald-700 font-bold hover:underline">
                      {hqDetails.pilgrimageHelpline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Official Email:</strong>{' '}
                    <a href={`mailto:${hqDetails.email}`} className="text-slate-800 font-semibold hover:underline">
                      {hqDetails.email}
                    </a>
                    <span className="text-slate-400 mx-2">|</span>
                    <strong className="text-slate-900">Domain:</strong>{' '}
                    <span className="text-slate-700">{hqDetails.domain}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
              <a
                href={hqDetails.whatsappBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-full text-xs font-bold text-center transition-all shadow-sm"
              >
                Connect on WhatsApp (+91 99029 37730)
              </a>
              <a
                href={hqDetails.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Maps</span>
              </a>
              <a
                href={hqDetails.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Regional Departure Hubs */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[32px] p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Regional Network</span>
                  <h3 className="text-xl font-bold text-slate-900">Live Departure Hubs & Staging Points</h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                We run regular weekend departures with coordinated landmark pickup points, pre-departure WhatsApp groups, and live transport tracking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {hqDetails.regionalDepartureHubs.map((hub, i) => (
                  <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-900 text-xs block mb-1">📍 {hub.city}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{hub.address}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/70 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-950 font-medium">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Door-to-camp logistics: Private tempo travellers, Volvo coaches & licensed mountain vehicles.</span>
            </div>
          </div>

        </div>

        {/* Bottom Grid: Verified Campsites Network */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Field Basecamps
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Verified Wilderness Campsites
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              All sites feature weatherproof alpine dome tents, private washrooms, organic local meals, and 24/7 first aid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hqDetails.activeCampsites.map((camp, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                      <Tent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      Verified Base
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm mb-1">{camp.name}</h4>
                  <span className="text-[11px] font-bold text-emerald-700 block mb-2.5">📍 {camp.region}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{camp.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
