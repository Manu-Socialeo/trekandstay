import React from 'react';
import { Phone, MessageCircle, Mail, Globe, Instagram, MapPin, Printer, ShieldCheck, Mountain, Compass, Heart } from 'lucide-react';
import { TRIP_META } from '../data/tripData';

export const HostContactSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800" id="contact-hosts">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* About Your Hosts Header matching Trek & Stay reference */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30 text-2xl font-bold">
            <Mountain className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-serif-brand">
            ABOUT YOUR HOSTS : {TRIP_META.companyName.toUpperCase()}
          </h2>
          <p className="text-amber-400 font-semibold text-xs sm:text-sm mt-1">
            {TRIP_META.organizerTagline}
          </p>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            {TRIP_META.aboutStory}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700 text-xs text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>HQ: {TRIP_META.headquarters}</span>
            <a
              href={TRIP_META.hqMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline font-semibold hover:text-amber-300 ml-1"
            >
              (View Map)
            </a>
          </div>
        </div>

        {/* Contact Action Cards Matrix matching Trek & Stay Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {/* Helpdesk */}
          <a
            href={`tel:${TRIP_META.contactPhone}`}
            className="bg-stone-850 hover:bg-stone-800 border border-stone-700/80 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-stone-950 transition">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Primary Helpline</span>
              <span className="text-xs sm:text-sm font-bold text-stone-100">{TRIP_META.contactPhone}</span>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${TRIP_META.whatsappNumber}?text=${encodeURIComponent(
              `*New Trek & Stay Booking Enquiry*\n━━━━━━━━━━━━━━━━━━━━\n📍 *Package:* Kedarnath - Badrinath Do Dham Yatra + Adventure\n📅 *Dates:* 2nd – 8th October\n_I would like to book my stay & yatra with Trek & Stay._`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-850 hover:bg-stone-800 border border-stone-700/80 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">WhatsApp Booking Desk</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">+91 99029 37730</span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${TRIP_META.email}`}
            className="bg-stone-850 hover:bg-stone-800 border border-stone-700/80 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-stone-950 transition">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Official Inquiries</span>
              <span className="text-xs sm:text-sm font-bold text-stone-100">{TRIP_META.email}</span>
            </div>
          </a>

          {/* Instagram Community */}
          <a
            href={TRIP_META.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-850 hover:bg-stone-800 border border-stone-700/80 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Instagram Journal</span>
              <span className="text-xs sm:text-sm font-bold text-stone-100">{TRIP_META.instagram}</span>
            </div>
          </a>

          {/* Official Website */}
          <a
            href={TRIP_META.livePortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-850 hover:bg-stone-800 border border-stone-700/80 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Official Trek Portal</span>
              <span className="text-xs sm:text-sm font-bold text-stone-100">trekandstay.vercel.app</span>
            </div>
          </a>

          {/* Print PDF Download CTA */}
          <button
            onClick={handlePrint}
            className="bg-stone-850 hover:bg-stone-800 border border-amber-500/40 p-4 rounded-xl flex items-center gap-3.5 transition group shadow-sm text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-amber-400 uppercase font-bold block">Offline PDF Itinerary</span>
              <span className="text-xs sm:text-sm font-bold text-white">Save / Print Clean Copy</span>
            </div>
          </button>
        </div>

        {/* Bottom copyright & brand stamp */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>© 2026 {TRIP_META.legalName}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Departures from {TRIP_META.departureHubs}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
