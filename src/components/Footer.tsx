import { Compass, MessageCircle, MapPin } from 'lucide-react';
import { hqDetails } from '../data/destinationsData';

interface FooterProps {
  onOpenBooking: (destination?: string, price?: string) => void;
  onOpenPayment?: () => void;
  onNavigate: (view: 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery', hash?: string) => void;
}

export function Footer({ onOpenBooking, onOpenPayment, onNavigate }: FooterProps) {
  const whatsappUrl = "https://wa.me/919902937730?text=I%20would%20like%20to%20book%20my%20stay%20with%20trek%20and%20stay";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-8 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Compact 4-column layout in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 group cursor-pointer inline-flex focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-slate-900" />
              </div>
              <div className="text-left">
                <span className="text-lg font-black tracking-tight text-white block leading-none">
                  Trek & Stay
                </span>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 block">Welcome to the Wilderness</span>
              </div>
            </button>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Weekly departures from Bengaluru, Pune, Mumbai & Delhi. Certified Sahyadri & Himalayan Guides.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigate('upcoming')} className="hover:text-emerald-400 font-bold transition-colors cursor-pointer">Upcoming Itinerary</button></li>
              <li><button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 font-bold transition-colors cursor-pointer">Trek Packages</button></li>
              <li><button onClick={() => onNavigate('blogs')} className="hover:text-emerald-400 font-bold transition-colors cursor-pointer">Blogs</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-emerald-400 font-bold transition-colors cursor-pointer">Gallery</button></li>
              <li><button onClick={() => onNavigate('campsites')} className="hover:text-white transition-colors cursor-pointer">Campsites & HQ</button></li>
            </ul>
          </div>

          {/* Column 3: Support & Legal */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">Support & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors cursor-pointer">24/7 Helpline</button></li>
              {onOpenPayment && (
                <li>
                  <button 
                    onClick={onOpenPayment} 
                    className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>UPI Pay & QR Code</span>
                  </button>
                </li>
              )}
              <li><button onClick={() => onNavigate('home', 'faq')} className="hover:text-white transition-colors cursor-pointer">FAQ & Packing</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">Connect</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-slate-950" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li><a href={hqDetails.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram @trek_and_stay</a></li>
              <li>
                <a href={hqDetails.googleMapsUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  <span>Kollur, Karnataka 576220</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright only */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-medium">
          <p>© 2026 Trek & Stay. Empowering responsible mountain exploration.</p>
        </div>
      </div>
    </footer>
  );
}
