import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle, ChevronDown, ChevronUp, AlertTriangle, RefreshCcw } from 'lucide-react';
import { TERMS_AND_CONDITIONS } from '../data/tripData';

export const TermsAndPolicies: React.FC = () => {
  const [showAllTerms, setShowAllTerms] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-stone-100 border-b border-stone-200" id="terms-policies">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <FileText className="w-3.5 h-3.5 text-stone-600" />
            Policies & Guidelines
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif-brand">
            TERMS & CONDITIONS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto">
            Essential guidelines for safety, booking validation, mountain code of conduct, and refund terms.
          </p>
        </div>

        {/* 17 Terms & Conditions List */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Yatra Code & Booking Terms (17 Essential Points)</span>
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm text-stone-700">
            {(showAllTerms ? TERMS_AND_CONDITIONS : TERMS_AND_CONDITIONS.slice(0, 8)).map(
              (term, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{term}</p>
                </div>
              )
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <button
              onClick={() => setShowAllTerms(!showAllTerms)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition"
            >
              <span>{showAllTerms ? 'Show Fewer Terms' : `View All ${TERMS_AND_CONDITIONS.length} Terms & Conditions`}</span>
              {showAllTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* CANCELLATION POLICY BOX Styled matching Reference PDF */}
        <div className="mt-6 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100 flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-rose-600" />
            <span>CANCELLATION & REFUND POLICY</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              Please review the schedule and physical demands carefully. High altitude treks can be challenging.
            </p>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div>
                <strong>1) Registration Deposit:</strong> The initial token booking deposit (₹5,000 per slot) secures reserved vehicle berths, guide arrangements, and high-altitude tent slots and is non-refundable upon confirmation.
              </div>
              <div>
                <strong>2) Full Fee Settlement:</strong> The remaining tour balance is payable at least 7 days prior to trip departure or upon reporting at Haridwar.
              </div>
              <div>
                <strong>3) Cancellation by Organizers:</strong> In the rare event of extreme government road closures or yatra suspension prior to start, 100% tour fee will be refunded or adjusted against an alternative departure date.
              </div>
              <div>
                <strong>4) Voluntary Withdrawal:</strong> No refund is admissible for voluntary dropouts or leaving the trek midway due to personal stamina.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
