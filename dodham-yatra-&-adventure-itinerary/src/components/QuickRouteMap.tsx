import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Mountain, Compass, Info, ArrowRight } from 'lucide-react';

interface RouteStop {
  id: string;
  name: string;
  altitude: string;
  type: 'Transit' | 'Adventure' | 'Base Camp' | 'Trek Start' | 'Holy Shrine';
  day: string;
  coordinates: string;
  googleMapUrl: string;
  description: string;
}

const ROUTE_STOPS: RouteStop[] = [
  {
    id: 'haridwar',
    name: 'Haridwar Junction',
    altitude: '1,030 ft',
    type: 'Transit',
    day: 'Day 1 & Day 6',
    coordinates: '29.9457° N, 78.1642° E',
    googleMapUrl: 'https://maps.google.com/?q=Haridwar+Junction',
    description: 'The ancient holy gateway on the banks of Ganga; assembly point for Himalayan tempo travellers.'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh & Ganga Rapids',
    altitude: '1,120 ft',
    type: 'Adventure',
    day: 'Day 1 & Day 6',
    coordinates: '30.0869° N, 78.2676° E',
    googleMapUrl: 'https://maps.google.com/?q=Rishikesh+Rafting',
    description: 'Yoga & adventure capital: 16 km White Water Ganga Rafting, Cliff Jumping & India’s highest Bungee.'
  },
  {
    id: 'devprayag',
    name: 'Devprayag Sangam',
    altitude: '2,723 ft',
    type: 'Transit',
    day: 'Day 1 Drive',
    coordinates: '30.1459° N, 78.5986° E',
    googleMapUrl: 'https://maps.google.com/?q=Devprayag+Sangam',
    description: 'Sacred confluence where the turquoise Bhagirathi meets the Alaknanda to form the Holy Ganga.'
  },
  {
    id: 'sonprayag',
    name: 'Sonprayag Base Camp',
    altitude: '6,000 ft',
    type: 'Base Camp',
    day: 'Day 1 & 3 Stay',
    coordinates: '30.6300° N, 78.9950° E',
    googleMapUrl: 'https://maps.google.com/?q=Sonprayag+Uttarakhand',
    description: 'Mountain hotel base camp with luggage cloakrooms before embarking on the holy Kedarnath ascent.'
  },
  {
    id: 'gaurikund',
    name: 'Gaurikund Trek Point',
    altitude: '6,500 ft',
    type: 'Trek Start',
    day: 'Day 2 Trek',
    coordinates: '30.6500° N, 79.0300° E',
    googleMapUrl: 'https://maps.google.com/?q=Gaurikund+Uttarakhand',
    description: 'Thermal spring base and official trailhead for the 16 km pilgrimage path to Kedarnath.'
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath Dham',
    altitude: '11,755 ft',
    type: 'Holy Shrine',
    day: 'Day 2 & 3 Stay',
    coordinates: '30.7346° N, 79.0669° E',
    googleMapUrl: 'https://maps.google.com/?q=Kedarnath+Temple',
    description: 'Sacred Jyotirlinga shrine surrounded by towering snow peaks; evening Aarti and alpine tent stay.'
  },
  {
    id: 'badrinath',
    name: 'Badrinath Dham',
    altitude: '10,279 ft',
    type: 'Holy Shrine',
    day: 'Day 4 & 5 Stay',
    coordinates: '30.7433° N, 79.4938° E',
    googleMapUrl: 'https://maps.google.com/?q=Badrinath+Temple',
    description: 'Sacred abode of Lord Vishnu situated between Nar and Narayana mountain ranges; Tapt Kund hot springs.'
  },
  {
    id: 'mana',
    name: 'Mana (India’s 1st Village)',
    altitude: '10,500 ft',
    type: 'Base Camp',
    day: 'Day 5 Visit',
    coordinates: '30.7656° N, 79.4960° E',
    googleMapUrl: 'https://maps.google.com/?q=Mana+Village+Uttarakhand',
    description: 'Indo-Tibetan border village: Bheem Pul, Saraswati River origin, and legendary Vyas Gufa.'
  }
];

export const QuickRouteMap: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState<RouteStop>(ROUTE_STOPS[5]); // Default Kedarnath

  return (
    <section className="py-12 sm:py-16 bg-stone-900 text-stone-100 border-b border-stone-800" id="route-map">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30 mb-2">
            <Compass className="w-3.5 h-3.5" />
            Interactive Route Visualizer
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 font-serif-brand">
            HIMALAYAN ROUTE & ELEVATION
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl mx-auto">
            From the foothills of Haridwar & Rishikesh to 11,755 ft at Kedarnath. Tap any station to explore elevation & GPS directions.
          </p>
        </div>

        {/* Route Stations Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {ROUTE_STOPS.map((stop) => {
            const isSelected = selectedStop.id === stop.id;

            return (
              <button
                key={stop.id}
                onClick={() => setSelectedStop(stop)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                <span>{stop.name}</span>
                <span className="text-[10px] opacity-80 font-mono-num">({stop.altitude})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Station Spotlight Card */}
        <div className="bg-stone-850 rounded-2xl border border-stone-700/80 p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-700">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {selectedStop.type}
                </span>
                <span className="text-xs text-stone-400 font-medium">Schedule: {selectedStop.day}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedStop.name}</h3>
            </div>

            <a
              href={selectedStop.googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-900/30 shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedStop.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-stone-400">
                <span>📍 GPS: {selectedStop.coordinates}</span>
              </div>
            </div>

            <div className="md:col-span-4 bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400 mb-0.5">Peak Altitude</div>
              <div className="text-2xl font-extrabold text-amber-300 font-mono-num">{selectedStop.altitude}</div>
              <div className="text-[11px] text-stone-400 mt-1">Above Mean Sea Level</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
