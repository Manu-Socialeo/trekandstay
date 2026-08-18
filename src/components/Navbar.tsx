import { useState } from 'react';
import { ArrowUpRight, Menu, X, Compass, PhoneCall, MessageCircle, MapPin, Instagram, Image as ImageIcon } from 'lucide-react';
import { hqDetails } from '../data/destinationsData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPayment?: () => void;
  onNavigate: (view: 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery', hash?: string) => void;
  activeView: string;
}

export function Navbar({ onOpenBooking, onOpenPayment, onNavigate, activeView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery', hash?: string) => {
    onNavigate(view, hash);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = "https://wa.me/919902937730?text=I%20would%20like%20to%20book%20my%20stay%20with%20trek%20and%20stay";

  return (
    <nav className={`fixed top-0 w-full z-50 text-white py-3 sm:py-4 px-4 sm:px-8 md:px-12 transition-all duration-300 ${activeView !== 'home' ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2.5 cursor-pointer group focus:outline-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-slate-900" />
          </div>
          <div className="text-left">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-sm block leading-none">
              Trek & Stay
            </span>
          </div>
        </button>
        
        {/* Center Nav Links (Desktop & Tablets in wide view) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-5 xl:gap-7 text-[13px] font-medium tracking-wide">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`transition-colors cursor-pointer ${activeView === 'home' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('upcoming')} 
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${activeView === 'upcoming' ? 'text-emerald-400 font-bold' : 'text-white/80 hover:text-white'}`}
            title="Dodham Yatra & Adventure Itinerary (2nd–8th Oct)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Upcoming Itinerary</span>
            <span className="hidden xl:inline-block bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
              Dodham
            </span>
          </button>
          <button 
            onClick={() => handleNavClick('packages')} 
            className={`transition-colors cursor-pointer ${activeView === 'packages' ? 'text-emerald-400 font-bold' : 'text-white/80 hover:text-white'}`}
          >
            Trek Packages
          </button>
          <button 
            onClick={() => handleNavClick('campsites')} 
            className={`transition-colors cursor-pointer flex items-center gap-1 ${activeView === 'campsites' ? 'text-emerald-400 font-bold' : 'text-white/80 hover:text-white'}`}
          >
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>Campsites & HQ</span>
          </button>
          <button 
            onClick={() => handleNavClick('blogs')} 
            className={`transition-colors cursor-pointer flex items-center gap-1 ${activeView === 'blogs' ? 'text-emerald-400 font-bold' : 'text-white/80 hover:text-white'}`}
          >
            <span>Blogs</span>
          </button>
          <button 
            onClick={() => handleNavClick('gallery')} 
            className={`transition-colors cursor-pointer flex items-center gap-1 ${activeView === 'gallery' ? 'text-emerald-400 font-bold' : 'text-white/80 hover:text-white'}`}
          >
            <ImageIcon className="w-3 h-3 text-emerald-400" />
            <span>Gallery</span>
          </button>
          <button 
            onClick={() => handleNavClick('story')} 
            className={`transition-colors cursor-pointer ${activeView === 'story' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}
          >
            Our Story
          </button>
          <button 
            onClick={() => handleNavClick('home', 'faq')} 
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleNavClick('help')} 
            className={`transition-colors cursor-pointer ${activeView === 'help' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}
          >
            24/7 Helpline
          </button>
        </div>

        {/* Right Header CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Prominent Upcoming Itinerary Action Button */}
          <button
            onClick={() => handleNavClick('upcoming')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer border ${
              activeView === 'upcoming'
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-amber-400/40 hover:shadow-amber-500/25'
            }`}
            title="View Dodham Yatra & Adventure Special (2nd–8th Oct)"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Upcoming Itinerary</span>
            <span className="bg-amber-950/40 text-amber-200 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full hidden xl:inline">
              Oct 2-8
            </span>
          </button>

          {/* Quick UPI Pay Button */}
          {onOpenPayment && (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-emerald-600/30 border border-white/20 hover:border-emerald-400/50 text-white px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all backdrop-blur-sm cursor-pointer"
              title="Scan & Pay with UPI QR"
            >
              <span className="text-emerald-400 font-mono text-[11px] font-bold">UPI</span>
              <span>Pay / QR</span>
            </button>
          )}

          {/* Primary WhatsApp Book Now Button */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 group"
            title="Book Now on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Book Now</span>
          </a>

          {/* Secondary Batch Scheduler Button */}
          <button 
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/40 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all backdrop-blur-sm group cursor-pointer"
          >
            <span>Batches</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile & Tablet Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Mobile Upcoming Button */}
          <button
            onClick={() => handleNavClick('upcoming')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md cursor-pointer border ${
              activeView === 'upcoming'
                ? 'bg-amber-500 text-slate-950 border-amber-300'
                : 'bg-amber-600 text-white border-amber-400/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>Itinerary</span>
          </button>

          {/* Compact Mobile Book Now */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md active:scale-95 sm:hidden"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
            <span>Book</span>
          </a>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 border border-white/20 text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col gap-4 text-sm font-medium animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <p className="font-bold text-white text-sm">Trek & Stay</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Contact Desk</p>
              <p className="text-xs font-bold text-white leading-none">+91 99029 37730</p>
              <p className="text-[10px] font-medium text-emerald-400 mt-1">info@trekandstay.com</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button onClick={() => handleNavClick('upcoming')} className="p-3 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-left text-emerald-300 font-bold hover:bg-emerald-600/40 flex items-center gap-2">
              <span>📅 Upcoming Itinerary</span>
            </button>
            <button onClick={() => handleNavClick('packages')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <span>🏔️ All Packages</span>
            </button>
            <button onClick={() => handleNavClick('campsites')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <span>📍 Campsites</span>
            </button>
            <button onClick={() => handleNavClick('blogs')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <span>📰 Blogs</span>
            </button>
            <button onClick={() => handleNavClick('gallery')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Gallery</span>
            </button>
            <a 
              href="https://www.instagram.com/trekandstay.com/" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-gradient-to-tr from-purple-600/20 to-pink-500/20 border border-pink-500/30 text-left text-white flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="font-bold">Instagram</span>
            </a>
            <button onClick={() => handleNavClick('story')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <span>📖 Our Story</span>
            </button>
            <button onClick={() => handleNavClick('home', 'faq')} className="p-3 rounded-xl bg-white/5 text-left text-white hover:bg-white/10 flex items-center gap-2">
              <span>❓ FAQ</span>
            </button>
          </div>

          {/* Action Buttons in Mobile Menu */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {/* Primary WhatsApp Direct CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-full text-xs font-bold shadow-lg transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Book Now</span>
            </a>

            {/* Custom Interactive Batch Modal */}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 py-3 rounded-full text-xs font-bold shadow-md cursor-pointer"
            >
              <span>Explore Dates & Custom Batches</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Quick Mobile UPI QR Payment Button */}
            {onOpenPayment && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPayment();
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 py-2.5 rounded-full text-xs font-bold shadow-xs cursor-pointer"
              >
                <span className="text-emerald-400 font-mono text-[11px] font-bold">UPI</span>
                <span>Scan & Pay Official QR Code</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
