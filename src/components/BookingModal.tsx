import { useState, FormEvent } from 'react';
import { X, Calendar, MapPin, Users, CheckCircle2, MessageCircle, ArrowUpRight, Phone } from 'lucide-react';
import { hqDetails } from '../data/destinationsData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialPrice?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialDestination = 'Maharashtra Monsoon Trails',
  initialPrice = '₹13,499'
}: BookingModalProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [departureCity, setDepartureCity] = useState('Kollur / Coastal KA Base');
  const [date, setDate] = useState('2026-07-15');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Construct the comprehensive structured pretyped WhatsApp message
    const formattedMsg = 
`*New Trek & Stay Booking Enquiry*
━━━━━━━━━━━━━━━━━━━━
📍 *Package:* ${destination}
💰 *Est. Price:* ${initialPrice}
👥 *Trekkers:* ${guests}
📅 *Preferred Date:* ${date}
🚌 *Departure / Pickup:* ${departureCity}
👤 *Name:* ${name.trim()}
📱 *WhatsApp:* ${phone.trim()}
📧 *Email:* ${email.trim()}
${specialNotes.trim() ? `📝 *Special Requests:* ${specialNotes.trim()}\n` : ''}━━━━━━━━━━━━━━━━━━━━
_I would like to book my stay with Trek & Stay._`;

    const targetUrl = `https://wa.me/919902937730?text=${encodeURIComponent(formattedMsg)}`;
    setGeneratedWhatsAppUrl(targetUrl);
    setIsSuccess(true);

    // Open WhatsApp directly in new window / app
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Handled via fallback button on success screen
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Details Ready for WhatsApp!</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-sm mb-4">
              Thank you, <span className="font-semibold text-slate-900">{name || 'Adventurer'}</span>. Your booking request for <span className="font-semibold text-slate-900">{destination}</span> has been compiled with all your details and sent to our WhatsApp desk (<span className="font-semibold text-slate-900">+91 99029 37730</span>).
            </p>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-700 mb-5 space-y-1.5 font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-1 font-sans font-bold text-slate-900">
                <span>Summary</span>
                <span className="text-emerald-700">Trek & Stay</span>
              </div>
              <p><span className="text-slate-500 font-sans">Trek:</span> {destination}</p>
              <p><span className="text-slate-500 font-sans">Date:</span> {date}</p>
              <p><span className="text-slate-500 font-sans">Guests:</span> {guests} trekkers</p>
              <p><span className="text-slate-500 font-sans">Pickup:</span> {departureCity}</p>
              <p><span className="text-slate-500 font-sans">Contact:</span> {phone}</p>
            </div>

            {/* Prominent WhatsApp Launch Action */}
            <a
              href={generatedWhatsAppUrl || hqDetails.whatsappBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-full text-xs transition-all shadow-lg active:scale-95 mb-3"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Click to Open Chat on WhatsApp (+91 99029 37730)</span>
            </a>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
            >
              Close this window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full px-3.5 py-1 text-[11px] font-bold">
                  Direct WhatsApp Booking Form
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Near Kollur, KA</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Reserve Your Stay & Trek Batch
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill the details below to dispatch your pretyped booking inquiry directly to Trek & Stay WhatsApp (<strong className="text-slate-700">+91 99029 37730</strong>).
              </p>
            </div>

            {/* Group discount banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 mb-4 flex items-center justify-between text-[11px] text-amber-900">
              <span className="font-semibold">🔥 Group Offer:</span>
              <span>₹500 off on 3+ bookings | 6 bookings = 1 Free</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Trek Package / Stay
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Kodachadri Foothills & Kollur Campsite Stay">Kodachadri Foothills & Kollur Campsite Stay</option>
                    <option value="Maharashtra Monsoon Trails">MH Monsoon Trails & Forts (₹13,499 - 4N/5D)</option>
                    <option value="Kalu Falls Misty Sahyadris">Kalu Falls & Jivdhan Fort (₹7,999 - 2N/3D)</option>
                    <option value="Maharashtra Waterfalls Mania">Maharashtra Waterfalls Mania (₹8,500 - 4D/3N)</option>
                    <option value="Shitkada Rappel + Harihar Fort">Shitkada Rappel + Harihar (₹8,999 - 3D/2N)</option>
                    <option value="Maharashtra 4-Dham Pilgrimage">Maharashtra 4-Dham Yatra (₹9,499 - 4N/5D)</option>
                    <option value="Kedarnath - Badrinath Do Dham">Kedarnath - Badrinath Do Dham (₹17,499 - 6N/7D)</option>
                    <option value="South Maharashtra Hidden Gems">South Maharashtra Waterfalls (₹11,500 - 5D)</option>
                    <option value="Custom Private Group Batch">Custom Private Group / Corporate Outing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Departure Hub / Pickup
                  </label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Kollur / Kundapura / Udupi Base">Kollur / Kundapura / Udupi Base</option>
                    <option value="Bengaluru (Bangalore)">Bengaluru (Bangalore)</option>
                    <option value="Mangaluru">Mangaluru</option>
                    <option value="Shivamogga (Shimoga)">Shivamogga (Shimoga)</option>
                    <option value="Mysuru (Mysore)">Mysuru (Mysore)</option>
                    <option value="Hubballi (Hubli)">Hubballi (Hubli)</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Direct Arrival at Campsite">Direct Arrival at Campsite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Trekkers / Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Trekkers</option>
                      <option value="3">3 Trekkers (₹500 Group Off)</option>
                      <option value="4">4 Trekkers (₹500 Group Off)</option>
                      <option value="5">5 Trekkers</option>
                      <option value="6+">6+ Group (1 Free Slot on select tours)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Batch / Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Kulkarni"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone No.
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 99029 37730"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rohan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Veg meals, tent sharing"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-full text-xs tracking-wider transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Submit & Send Details to WhatsApp (+91 99029 37730)</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
