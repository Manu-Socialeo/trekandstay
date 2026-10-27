import { useState, useEffect } from 'react';
import { Shield, FileText, CheckCircle2, Cookie, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { hqDetails } from '../data/destinationsData';

export type PolicyTab = 'terms' | 'privacy' | 'cookies';

interface PolicyViewProps {
  key?: string;
  initialTab?: PolicyTab;
  onOpenBooking: () => void;
  onTabChange?: (tab: PolicyTab) => void;
}

export function PolicyView({ initialTab = 'terms', onOpenBooking, onTabChange }: PolicyViewProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  // Sync state whenever prop changes from outside navigation
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: PolicyTab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto animate-fade-in text-slate-900">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block border border-slate-200 bg-slate-50 rounded-full px-4 py-1 text-[11px] font-semibold text-slate-500 mb-4 tracking-wide shadow-2xs">
          Legal, Safety & Compliance Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Trek & Stay Policies & Terms
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Headquarters: {hqDetails.headquartersAddress.street}, {hqDetails.headquartersAddress.city}, Karnataka {hqDetails.headquartersAddress.postalCode} • Last updated: 2026
        </p>
      </div>

      {/* Policy Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => handleTabClick('terms')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-slate-950 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </button>
        <button
          onClick={() => handleTabClick('privacy')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-slate-950 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>
        <button
          onClick={() => handleTabClick('cookies')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'cookies'
              ? 'bg-slate-950 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Cookie className="w-3.5 h-3.5" />
          <span>Cookie Policy</span>
        </button>
      </div>

      {/* Tab Content Box */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 sm:p-12 shadow-xs leading-relaxed text-xs sm:text-sm text-slate-600 space-y-6">
        
        {/* TAB 1: TERMS & CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Booking Agreement & Expedition Acceptance</h2>
              <p>
                By reserving any trek package, campsite stay, sacred yatra, or winter expedition through Trek & Stay ("Trek & Stay", "we", "us", registered online at trekandstay.com), the primary booker acknowledges and accepts all operational guidelines and liability releases on behalf of all participants in their party.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Batch Cancellations & Structured Refund Schedules</h3>
              <p className="mb-2">
                We maintain fair, transparent cancellation policies tailored to the distinct operational realities of short weekend trails vs. long-distance Himalayan expeditions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1.5 text-xs uppercase tracking-wide text-emerald-700">
                    A. Western Ghats & Sahyadri Weekend Trails
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                    <li><strong>7+ Days Before:</strong> 100% credit towards any upcoming batch or full refund minus nominal forest permit fees.</li>
                    <li><strong>3 to 6 Days Before:</strong> 50% credit voucher or free slot transfer to another friend/family member.</li>
                    <li><strong>Less than 72 Hours:</strong> Non-refundable due to pre-committed vehicle seats and forest entries.</li>
                    <li><strong>Rescheduling:</strong> Free of charge up to 5 days prior to scheduled weekend departure.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1.5 text-xs uppercase tracking-wide text-cyan-700">
                    B. Himalayan Expeditions (Winter Spiti & Dodham Yatra)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                    <li><strong>30+ Days Before:</strong> 90% refund of total fee, or 100% future trip credit note.</li>
                    <li><strong>15 to 29 Days Before:</strong> 50% refund of total package fee.</li>
                    <li><strong>Less than 15 Days Before / No-Show:</strong> Strictly non-refundable due to pre-contracted mountain tempo travelers and remote homestay bookings.</li>
                    <li><strong>Mid-tour voluntary drop or AMS descent:</strong> Non-refundable.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Payment Verification & Authorized UPI Channels</h3>
              <p className="mb-2">
                To guarantee trekker payment protection and prevent unauthorized third-party solicitation:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Official Verified Payee:</strong> All electronic advance and booking payments are routed to authorized coordinator <strong>Ganapathi Bhat</strong> via official UPI ID <code>ganapathibhat5@ybl</code> (or secondary: <code>ganapathibhat5@okhdfcbank</code>) on Canara Bank (A/C: ****2821).</li>
                <li><strong>Receipt Issuance:</strong> Payment transfers should be confirmed by sharing the 12-digit UPI UTR / reference number or screenshot with the Trek & Stay WhatsApp desk at <strong>+91 99029 37730</strong> for immediate slot locking and official PDF/WhatsApp invoice dispatch.</li>
                <li><strong>Fraud Protection:</strong> Trek & Stay will never ask you to transfer funds to unverified personal numbers or unauthorized payment gateways not listed on our official website.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">4. Group Discounts & Promotional Rules</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Weekend Trails:</strong> Flat ₹500 off per person for groups of 3+ trekkers; select multi-day long trails offer 1 free slot on 6 confirmed bookings.</li>
                <li><strong>Winter Spiti Expedition:</strong> Flat ₹1,000 OFF per person for groups of 9 or more travelers booking simultaneously on the same departure date.</li>
                <li><strong>Non-combinable:</strong> Group discounts apply to standard published rates and cannot be combined with ad-hoc external coupon codes.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">5. High-Altitude Expeditions, Buffer Days & Mountain Realities</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Buffer Day Stays:</strong> Expeditions include scheduled accommodation nights (e.g. 7 nights for Winter Spiti). Day 8 buffer days absorb snowfall delays. Any forced extended stay beyond scheduled nights (Night 8 onwards due to road closures) is billed directly at local actuals.</li>
                <li><strong>4×4 Specialized Snow Rescue / Transfers:</strong> Standard mountain tempo travelers/SUVs are provided. Where excessive snow, black ice, or local administration orders mandate specialized 4×4 vehicles with snow chains, local transfer costs are shared pro-rata among participants at actuals without markup.</li>
                <li><strong>Winter Sub-Zero Plumbing & Bukhari Heating:</strong> In sub-zero Himalayan winters (-10°C to -25°C), running water pipes freeze solid. Running taps are substituted by traditional bucket hot water and clean dry compost toilets. Homestays provide central wood-fired Bukhari stoves. Individual electric room heaters may carry a nominal surcharge depending on village power supply.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">6. Medical Fitness, Altitude Illness (AMS) & Evacuation</h3>
              <p className="mb-2">
                Participants are responsible for declaring pre-existing medical conditions (cardiac ailments, severe asthma, chronic hypertension). High-altitude itineraries (11,000 ft to 15,000 ft) require reasonable cardiovascular stamina.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Trek & Stay captains carry group first-aid kits, pulse oximeters, and basic emergency oxygen support.</li>
                <li>Participants are strongly advised to obtain comprehensive domestic travel insurance covering high-altitude medical emergency and search/evacuation costs.</li>
                <li>Trek & Stay acts as an adventure coordinator; all outside ambulance, hospital, or helicopter search and rescue charges are strictly payable directly by the participant or their insurer.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">7. Leave-No-Trace & Eco-Sanctuary Conduct</h3>
              <p>
                Trekkers must adhere to Karnataka Forest Department, Western Ghats Ecology, Maharashtra Wildlife, and Himalayan local council regulations. Single-use plastic dumping, littering, or consumption of alcohol/substances during active trails, sacred shrine premises, and Buddhist monasteries is strictly forbidden.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">8. Weather, Landslides & Force Majeure</h3>
              <p>
                In case of sudden cloudbursts, severe landslides, BRO road clearing operations, or administrative red alerts, Trek & Stay captains hold the ultimate authority to alter route sections or offer compensatory future dates to ensure 100% human life safety.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information Collection & Legal Purpose</h2>
              <p>
                Trek & Stay collects only information essential for safety compliance, forest access permits, batch WhatsApp coordination, and booking fulfillment (such as full legal names, WhatsApp phone numbers, departure city preferences, and emergency contact details).
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Absolute Non-Sale of Personal Data</h3>
              <p>
                We never sell, rent, monetise, or trade your personal information, phone numbers, or travel records to third-party advertisers under any circumstances.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">3. WhatsApp Group Communications & Privacy</h3>
              <p>
                Batch-specific WhatsApp groups are formed 24-48 hours before departure strictly for operational updates, live driver GPS coordinates, and trek leader coordination. Members may request private 1-on-1 SMS dispatch if they prefer not to participate in group messaging.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">4. Data Security & Contact Inquiries</h3>
              <p>
                All records are securely protected. For any data modification or deletion requests, contact our privacy desk directly at <strong>info@trekandstay.com</strong> or write to Trek & Stay Headquarters, Kodachadri Foothills Road, Kollur, Udupi District, KA 576220.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: COOKIES */}
        {activeTab === 'cookies' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Cookie & Local Session Preferences</h2>
              <p>
                We use strictly necessary functional cookies and local browser storage to manage your selected dates, departure city preferences, and fast website loading.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">Essential Functional Cookies</p>
                  <p className="text-[11px] text-slate-500">Required for trip reservations, date picker state, and security.</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Always Active</span>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">Performance & Route Telemetry</p>
                  <p className="text-[11px] text-slate-500">Helps us optimize high-speed load times across mobile and desktop devices.</p>
                </div>
                <span className="text-xs font-bold text-slate-800 bg-slate-200 px-3 py-1 rounded-full">Enabled</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Quick Contact Bar */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-slate-700 shrink-0" />
          <span>Questions about policies? Call our helpline: <strong>+91 99029 37730</strong></span>
        </div>
        <a 
          href={hqDetails.whatsappBookingUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-slate-950 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Message Trek Captain
        </a>
      </div>
    </div>
  );
}
