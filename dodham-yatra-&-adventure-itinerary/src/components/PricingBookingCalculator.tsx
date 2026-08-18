import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  QrCode,
  Users,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Calendar,
  Waves,
  Zap,
  Gift,
  HelpCircle,
  Download,
  Printer
} from 'lucide-react';
import { PACKAGES, GROUP_OFFERS, TRIP_META } from '../data/tripData';
import { PackageOption } from '../types';

export const PricingBookingCalculator: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<'bangalore' | 'delhi'>('bangalore');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [includeRafting, setIncludeRafting] = useState<boolean>(false);
  const [includeBungee, setIncludeBungee] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<'token' | 'full'>('token');
  
  // Traveler details for confirmation
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerCity, setTravelerCity] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  // UI States
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  const selectedPackage = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[0];
  const basePricePerPerson = selectedPackage.pricePerPerson;

  // Additional activity rates
  const RAFTING_PRICE = 1200;
  const BUNGEE_PRICE = 3700;

  // Calculation Logic
  // 1. Group discounts:
  // 5+ travelers -> ₹1,000 off per person
  // 9+ travelers -> 1 slot completely free (charge for (N - 1) travelers at base rate)
  let discountAmount = 0;
  let discountLabel = '';
  let effectiveBaseTotal = 0;

  if (travelersCount >= 9) {
    // 1 Slot Free: price of 1 base slot is free
    discountAmount = basePricePerPerson;
    discountLabel = `🎁 1 Free Slot Applied (Saved ₹${discountAmount.toLocaleString('en-IN')})`;
    effectiveBaseTotal = (travelersCount - 1) * basePricePerPerson;
  } else if (travelersCount >= 5) {
    // ₹1,000 off per person
    discountAmount = travelersCount * 1000;
    discountLabel = `🔥 Group Discount: ₹1,000 OFF × ${travelersCount} pax (Saved ₹${discountAmount.toLocaleString('en-IN')})`;
    effectiveBaseTotal = travelersCount * (basePricePerPerson - 1000);
  } else {
    effectiveBaseTotal = travelersCount * basePricePerPerson;
  }

  const addOnsTotal =
    (includeRafting ? RAFTING_PRICE * travelersCount : 0) +
    (includeBungee ? BUNGEE_PRICE * travelersCount : 0);

  const grandTotal = effectiveBaseTotal + addOnsTotal;

  // Token Advance option: e.g. ₹5,000 per person
  const tokenAdvanceTotal = travelersCount * TRIP_META.tokenAdvanceAmount;
  const payableAmount = paymentType === 'token' ? tokenAdvanceTotal : grandTotal;

  // Generate UPI Payment URI
  // Standard NPCI UPI URI Scheme: upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...
  const upiString = `upi://pay?pa=${TRIP_META.upiId}&pn=${encodeURIComponent(
    TRIP_META.upiPayeeName
  )}&am=${payableAmount}&cu=INR&tn=${encodeURIComponent(
    `DodhamYatra-${selectedPackage.name.substring(0, 15)}-${travelersCount}pax`
  )}`;

  // Generate QR Code dynamically
  useEffect(() => {
    QRCode.toDataURL(upiString, {
      width: 260,
      margin: 2,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [upiString, payableAmount]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TRIP_META.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `*New Trek & Stay Booking Enquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Package:* ${selectedPackage.name} (Dodham Yatra + Adventure)\n` +
      `📅 *Dates:* ${TRIP_META.dates} (7 Days • 6 Nights)\n` +
      `👥 *Travelers:* ${travelersCount} Person(s)\n` +
      `🌊 *Rafting Add-on:* ${includeRafting ? 'Yes (₹1,200/pax)' : 'No'}\n` +
      `🪂 *Bungee Add-on:* ${includeBungee ? 'Yes (₹3,700/pax)' : 'No'}\n` +
      `💰 *Total Tour Cost:* ₹${grandTotal.toLocaleString('en-IN')}\n` +
      `💳 *Paying Now:* ${paymentType === 'token' ? `Token Advance (₹${payableAmount.toLocaleString('en-IN')})` : `Full Payment (₹${payableAmount.toLocaleString('en-IN')})`}\n` +
      `👤 *Lead Name:* ${travelerName || 'Yatri'}\n` +
      `📱 *WhatsApp:* ${travelerPhone || 'Not provided'}\n` +
      `📧 *Email:* ${travelerEmail || 'Not provided'}\n` +
      `🏙️ *City:* ${travelerCity || 'Not provided'}\n` +
      (utrNumber ? `🔖 *UTR / Ref:* ${utrNumber}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_I would like to book my yatra & adventure with Trek & Stay._`
    );
    window.open(`https://wa.me/${TRIP_META.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName || !travelerPhone) {
      alert('Please enter your name and phone number to generate booking voucher.');
      return;
    }

    const generatedRef = 'DY-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(generatedRef);
    setShowConfirmationModal(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-900 text-stone-100 border-b border-stone-800" id="booking-calculator">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-amber-500/30 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            Instant Slot Reservation & Price Calculator
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 font-serif-brand">
            BOOK YOUR DODHAM EXPEDITION
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl mx-auto">
            Choose your departure hub, configure group members, enjoy instant group discounts, and reserve directly via UPI QR code or WhatsApp.
          </p>
        </div>

        {/* Pricing Matrix / Date Selector Styled like reference PDF */}
        <div className="bg-stone-850 rounded-2xl border border-stone-700/80 p-4 sm:p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-700">
            <div>
              <h3 className="text-lg font-bold text-amber-300">Departure Schedule & Rates</h3>
              <p className="text-xs text-stone-400">Fixed departure batches with confirmed accommodation & transport</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full font-semibold">
                ● 100% Guaranteed Departures
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                  selectedPackageId === pkg.id
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10'
                    : 'bg-stone-800/60 border-stone-700 hover:border-stone-600'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                    RECOMMENDED
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">{pkg.badge}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPackageId === pkg.id
                          ? 'border-amber-400 bg-amber-400 text-stone-950'
                          : 'border-stone-600'
                      }`}
                    >
                      {selectedPackageId === pkg.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">{pkg.name}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Route: {pkg.startLocation} ➔ Kedarnath & Badrinath ➔ {pkg.endLocation}
                  </p>

                  <div className="mt-3 space-y-1.5 text-xs text-stone-300">
                    {pkg.transportIncluded.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-700 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono-num">
                      ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400"> / person</span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-md ${
                      selectedPackageId === pkg.id
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-700 text-stone-300'
                    }`}
                  >
                    {selectedPackageId === pkg.id ? 'Selected' : 'Choose Plan'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Calculator & Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator & Form */}
          <div className="lg:col-span-7 bg-stone-850 rounded-2xl border border-stone-700/80 p-5 sm:p-7 shadow-xl">
            <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Step 1: Configure Travelers & Add-ons</span>
            </h3>

            {/* Travelers Selector */}
            <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-stone-200">Number of Travelers</label>
                  <p className="text-xs text-stone-400">Add 5+ for group discounts</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                    className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-stone-600 text-white font-bold text-lg flex items-center justify-center transition active:scale-95"
                  >
                    -
                  </button>
                  <span className="text-xl font-extrabold text-amber-300 font-mono-num w-8 text-center">
                    {travelersCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelersCount(travelersCount + 1)}
                    className="w-9 h-9 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg flex items-center justify-center transition active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Group Offer Live Trigger Banner */}
              {discountLabel ? (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{discountLabel}</span>
                </div>
              ) : (
                <div className="mt-3 text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tip: Add {5 - travelersCount} more traveler(s) to unlock flat ₹1,000 OFF per person!</span>
                </div>
              )}
            </div>

            {/* Optional Adventure Add-ons */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Optional Rishikesh Adventure Add-ons:
              </label>

              {/* Rafting Addon */}
              <div
                onClick={() => setIncludeRafting(!includeRafting)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  includeRafting
                    ? 'bg-amber-950/40 border-amber-500 text-white'
                    : 'bg-stone-800/40 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      includeRafting ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-500'
                    }`}
                  >
                    {includeRafting && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <Waves className="w-4 h-4 text-cyan-400" />
                      <span>White Water Ganga River Rafting (16 km)</span>
                    </div>
                    <p className="text-[11px] text-stone-400">Includes cliff jumping & safety equipment</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono-num">+₹1,200</span>
                  <span className="text-[10px] text-stone-400 block">/ person</span>
                </div>
              </div>

              {/* Bungee Addon */}
              <div
                onClick={() => setIncludeBungee(!includeBungee)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  includeBungee
                    ? 'bg-amber-950/40 border-amber-500 text-white'
                    : 'bg-stone-800/40 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      includeBungee ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-500'
                    }`}
                  >
                    {includeBungee && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>India’s Highest Bungee Jump (Mohan Chatti - 83m)</span>
                    </div>
                    <p className="text-[11px] text-stone-400">Certified Jump Masters & Video recording</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono-num">+₹3,700</span>
                  <span className="text-[10px] text-stone-400 block">/ person</span>
                </div>
              </div>
            </div>

            {/* Traveler Contact Form */}
            <form onSubmit={handleConfirmBooking} className="space-y-4 pt-4 border-t border-stone-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Lead Traveler Details:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">WhatsApp Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={travelerPhone}
                    onChange={(e) => setTravelerPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@gmail.com"
                    value={travelerEmail}
                    onChange={(e) => setTravelerEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-300 font-medium block mb-1">City / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore / Chennai / Delhi"
                    value={travelerCity}
                    onChange={(e) => setTravelerCity(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* UTR / Transaction ID */}
              <div>
                <label className="text-xs text-stone-300 font-medium block mb-1">
                  UPI Transaction Ref / UTR (Optional if paid now)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423985729103 or UPI Reference No."
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono-num"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-600/30 transition transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Generate Booking Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Price Summary & UPI QR Code Box */}
          <div className="lg:col-span-5 bg-stone-850 rounded-2xl border border-amber-500/40 p-5 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>Payment & Live Summary</span>
              </h3>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                UPI / QR Verified
              </span>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-stone-900/90 rounded-xl p-4 border border-stone-700/80 space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>
                  Base Plan ({selectedPackage.name.split(' ')[0]} × {travelersCount})
                </span>
                <span className="font-mono-num font-semibold text-white">
                  ₹{(travelersCount * basePricePerPerson).toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Group Discount Savings</span>
                  <span className="font-mono-num">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeRafting && (
                <div className="flex justify-between text-cyan-300">
                  <span>Rishikesh Rafting ({travelersCount} pax)</span>
                  <span className="font-mono-num">+₹{(RAFTING_PRICE * travelersCount).toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeBungee && (
                <div className="flex justify-between text-amber-300">
                  <span>Bungee Jump ({travelersCount} pax)</span>
                  <span className="font-mono-num">+₹{(BUNGEE_PRICE * travelersCount).toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-stone-300">Total Tour Value:</span>
                  <span className="text-[10px] text-stone-500 block">GST & permits included</span>
                </div>
                <span className="text-xl font-extrabold text-amber-300 font-mono-num">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Choice Switch (Token Deposit vs Full Amount) */}
            <div className="mt-4">
              <label className="text-xs font-bold text-stone-300 block mb-1.5">Choose Amount to Pay Now:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType('token')}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    paymentType === 'token'
                      ? 'bg-amber-950/60 border-amber-500 text-white'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="text-[11px] font-semibold">Reserve Token Slot</div>
                  <div className="text-sm font-bold text-amber-400 font-mono-num">
                    ₹{tokenAdvanceTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-stone-400">(₹5,000 / traveler)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    paymentType === 'full'
                      ? 'bg-amber-950/60 border-amber-500 text-white'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="text-[11px] font-semibold">Full Tour Payment</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono-num">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-stone-400">(100% Settled)</div>
                </button>
              </div>
            </div>

            {/* High-Resolution Dynamic UPI QR Code Display */}
            <div className="mt-5 bg-white rounded-xl p-4 text-center text-stone-900 shadow-md">
              <div className="text-xs font-bold text-stone-800 mb-0.5">
                Scan to Pay with Any UPI App
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mb-1">
                Payee: {TRIP_META.upiPayeeName} • {TRIP_META.bankName}
              </div>
              <div className="text-[11px] text-stone-600 mb-2">
                Amount configured: <strong className="text-stone-900 font-mono-num">₹{payableAmount.toLocaleString('en-IN')}</strong>
              </div>

              {qrCodeDataUrl ? (
                <div className="flex justify-center p-1.5 bg-stone-50 rounded-lg border border-stone-200 max-w-[200px] mx-auto shadow-inner">
                  <img src={qrCodeDataUrl} alt="UPI Payment QR Code" className="w-full h-auto rounded" />
                </div>
              ) : (
                <div className="h-44 flex items-center justify-center text-xs text-stone-400">
                  Generating QR Code...
                </div>
              )}

              {/* UPI ID & Copy Button */}
              <div className="mt-3 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] text-stone-500 font-semibold uppercase block">Verified UPI ID:</span>
                    <span className="font-mono-num font-bold text-stone-800">{TRIP_META.upiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded transition cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* One-click Mobile UPI App trigger */}
              <a
                href={upiString}
                className="mt-3 w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
              >
                <span>Tap to Open in Mobile UPI App</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Receipt / Voucher Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 text-stone-100 max-w-lg w-full rounded-2xl border border-amber-500/60 p-6 shadow-2xl relative">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 ring-4 ring-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-serif-brand text-stone-50">Booking Request Registered!</h3>
              <p className="text-xs text-stone-400 mt-1">
                Your reservation voucher has been created. Our team will verify and send final passes over WhatsApp.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="mt-5 bg-stone-850 rounded-xl p-4 border border-stone-700 text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-700 pb-2">
                <span className="text-stone-400">Booking Reference:</span>
                <span className="font-mono-num font-bold text-amber-300">{bookingRefId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Lead Traveler:</span>
                <span className="font-bold text-white">{travelerName} ({travelerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Tour Package:</span>
                <span className="font-medium text-white">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Travel Dates:</span>
                <span className="font-medium text-white">{TRIP_META.dates} (7D/6N)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Travelers Count:</span>
                <span className="font-bold text-white">{travelersCount} Person(s)</span>
              </div>
              {utrNumber && (
                <div className="flex justify-between">
                  <span className="text-stone-400">UTR / Ref:</span>
                  <span className="font-mono-num text-amber-300">{utrNumber}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-700 items-baseline">
                <span className="text-stone-400">Total Calculated:</span>
                <span className="text-base font-extrabold text-amber-300 font-mono-num">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
