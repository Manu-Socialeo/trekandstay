import { X, QrCode, Shield, CheckCircle2 } from 'lucide-react';
import { UpiQrCard } from './UpiQrCard';

interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number | string;
  initialNote?: string;
}

export function PaymentQrModal({
  isOpen,
  onClose,
  initialAmount,
  initialNote = 'Trek & Stay Official Booking'
}: PaymentQrModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-md w-full p-5 sm:p-7 relative shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 pr-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full px-3 py-0.5 text-[10px] font-bold">
              <QrCode className="w-3 h-3" />
              <span>Official UPI Payment Desk</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Scan & Pay via UPI
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Scan the QR code or copy the UPI ID using Google Pay, PhonePe, Paytm, BHIM, or any banking app.
          </p>
        </div>

        {/* UPI QR Card Component */}
        <UpiQrCard
          amount={initialAmount}
          note={initialNote}
          showAmountControls={true}
        />

        {/* 3 Step Instruction Guide */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
          <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Payment Steps</p>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">1</span>
            <span>Scan QR code above with any UPI app or enter UPI ID <strong>ganapathibhat5@ybl</strong>.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">2</span>
            <span>Verify payee name: <strong>Ganapathi Bhat (Canara Bank)</strong> before confirming payment.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">3</span>
            <span>Click <strong>Send Receipt</strong> to dispatch your 12-digit UTR/screenshot to our WhatsApp desk (+91 99029 37730).</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-full text-xs transition-colors cursor-pointer"
        >
          Done / Close Window
        </button>
      </div>
    </div>
  );
}
