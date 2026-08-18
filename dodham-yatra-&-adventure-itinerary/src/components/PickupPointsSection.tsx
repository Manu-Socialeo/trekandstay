import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, AlertCircle, Phone } from 'lucide-react';
import { PICKUP_POINTS, TRIP_META } from '../data/tripData';

export const PickupPointsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-stone-200" id="pickup-points">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Navigation className="w-3.5 h-3.5 text-amber-700" />
            Transit & Hubs
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-brand">
            PICK UP POINTS & TRANSIT MAPS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            Click on any location below to open exact GPS coordinates and driving directions in Google Maps.
          </p>
        </div>

        {/* Pickup Table Styled like reference PDF */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-stone-900 text-stone-100 p-3.5 sm:p-4 text-xs font-bold uppercase tracking-wider border-b border-stone-800">
            <div className="col-span-12 sm:col-span-5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Pick Up Location & Hub</span>
            </div>
            <div className="hidden sm:block sm:col-span-3">Reporting Time</div>
            <div className="hidden sm:block sm:col-span-4 text-right">Google Map Link</div>
          </div>

          <div className="divide-y divide-stone-200">
            {PICKUP_POINTS.map((point, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 hover:bg-stone-100/80 transition flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-start sm:items-center"
              >
                <div className="sm:col-span-5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">{point.name}</h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 pl-8">{point.address}</p>
                  <p className="text-[11px] text-amber-800 mt-0.5 pl-8 italic">{point.notes}</p>
                </div>

                <div className="sm:col-span-3 pl-8 sm:pl-0 flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>{point.reportingTime}</span>
                </div>

                <div className="sm:col-span-4 pl-8 sm:pl-0 w-full sm:w-auto flex sm:justify-end">
                  <a
                    href={point.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition shadow-sm w-full sm:w-auto"
                  >
                    <span>Go To Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency / Coordination Assistance Box */}
        <div className="mt-6 bg-amber-50/80 rounded-xl p-4 sm:p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Need Help with Travel Connections?</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Our 24/7 travel desk assists with flight bookings, train seat confirmation & airport pickups.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${TRIP_META.contactPhone}`}
              className="px-3.5 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-400 rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {TRIP_META.contactPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
