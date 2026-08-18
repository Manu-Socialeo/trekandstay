import { useState, useMemo } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { createQRCodeMatrix } from '../utils/qrCode';
import { hqDetails } from '../data/destinationsData';

interface UpiQrCardProps {
  amount?: number | string;
  note?: string;
  showAmountControls?: boolean;
  className?: string;
  compact?: boolean;
}

export function UpiQrCard({
  amount,
  note = 'Trek and Stay Booking',
  showAmountControls = false,
  className = '',
  compact = false
}: UpiQrCardProps) {
  const [selectedUpi, setSelectedUpi] = useState<'ybl' | 'okhdfcbank'>('ybl');
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>(amount ? String(amount).replace(/[^0-9]/g, '') : '');

  const upiId = selectedUpi === 'ybl' ? 'ganapathibhat5@ybl' : 'ganapathibhat5@okhdfcbank';
  const payeeName = 'Ganapathi Bhat';

  // Construct UPI deep-link URL
  const numericAmount = customAmount ? parseFloat(customAmount) : (typeof amount === 'number' ? amount : (amount ? parseFloat(String(amount).replace(/[^0-9]/g, '')) : undefined));
  
  const upiUrl = useMemo(() => {
    let url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
    if (numericAmount && !isNaN(numericAmount) && numericAmount > 0) {
      url += `&am=${numericAmount.toFixed(2)}`;
    }
    if (note) {
      url += `&tn=${encodeURIComponent(note)}`;
    }
    return url;
  }, [upiId, payeeName, numericAmount, note]);

  // Generate QR Matrix
  const qrMatrix = useMemo(() => {
    try {
      return createQRCodeMatrix(upiUrl, 'M');
    } catch {
      return createQRCodeMatrix(`upi://pay?pa=ganapathibhat5@ybl&pn=Ganapathi%20Bhat&cu=INR`, 'M');
    }
  }, [upiUrl]);

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const svgElement = document.getElementById(`upi-qr-svg-${selectedUpi}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 600, 600);
        ctx.drawImage(img, 30, 30, 540, 540);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `Trek-and-Stay-UPI-QR-${payeeName.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const formattedWhatsAppMsg = encodeURIComponent(
    `*Trek & Stay - Payment Confirmation*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Payer / Trekker:* [Your Name]\n` +
    `💰 *Amount Paid:* ${numericAmount ? '₹' + numericAmount : '₹[Amount]'}\n` +
    `📲 *Paid to UPI:* ${upiId} (${payeeName})\n` +
    `🏦 *Bank:* Canara Bank\n` +
    `🔖 *UTR / Transaction ID:* [Please paste 12-digit UTR]\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `_Attaching payment screenshot below._`
  );

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden text-slate-900 transition-all ${compact ? 'p-4' : 'p-6 sm:p-7'} ${className}`}>
      {/* Top Card Header */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-emerald-100">
            GB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                {payeeName}
              </h4>
              <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Verified Trek & Stay UPI</span>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full uppercase tracking-wider border border-emerald-200">
          Official QR
        </span>
      </div>

      {/* Amount Display / Control if enabled */}
      {showAmountControls && (
        <div className="mb-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Payment Amount</span>
            {numericAmount && numericAmount > 0 && (
              <span className="text-xs font-extrabold text-emerald-700">₹{numericAmount.toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">₹</span>
            <input
              type="number"
              placeholder="Enter custom amount (e.g. 500)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="flex gap-1.5 mt-2 overflow-x-auto pb-0.5">
            {[500, 1000, 2000, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCustomAmount(String(preset))}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors shrink-0"
              >
                +₹{preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Container */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center relative mb-4">
        <div className="bg-white p-3.5 rounded-2xl shadow-md border border-slate-200/60 relative group">
          <svg
            id={`upi-qr-svg-${selectedUpi}`}
            viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}
            className={compact ? 'w-44 h-44' : 'w-52 h-52 sm:w-60 sm:h-60'}
            shapeRendering="crispEdges"
          >
            <rect width={qrMatrix.length} height={qrMatrix.length} fill="#FFFFFF" />
            {qrMatrix.map((row, rIdx) =>
              row.map((cell, cIdx) =>
                cell ? <rect key={`${rIdx}-${cIdx}`} x={cIdx} y={rIdx} width={1} height={1} fill="#0F172A" /> : null
              )
            )}
          </svg>

          {/* Google Pay / UPI Center Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-white rounded-full p-1.5 shadow-lg border border-slate-200 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-[11px] font-bold text-slate-600 mt-3 flex items-center gap-1.5">
          <span>Scan to pay with any UPI App</span>
        </p>

        {/* Bank Badge */}
        <div className="mt-2.5 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-800">
          <div className="w-3.5 h-3.5 flex items-center justify-center">
            {/* Canara Bank triangular badge motif */}
            <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
              <polygon points="50,15 90,85 10,85" fill="#0072CE" />
              <polygon points="50,35 75,80 25,80" fill="#F8B133" />
            </svg>
          </div>
          <span>Canara Bank 2821</span>
        </div>
      </div>

      {/* Primary & Secondary UPI ID Switcher / Copy Box */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            UPI ID / VPA
          </label>
          <div className="flex gap-1 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setSelectedUpi('ybl')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                selectedUpi === 'ybl' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              @ybl
            </button>
            <button
              type="button"
              onClick={() => setSelectedUpi('okhdfcbank')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                selectedUpi === 'okhdfcbank' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              @okhdfcbank
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2.5 pl-3.5">
          <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 select-all truncate pr-2">
            {upiId}
          </div>
          <button
            type="button"
            onClick={() => handleCopy(upiId)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Supported UPI Apps Pills */}
      <div className="mb-4">
        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">Accepted Apps</p>
        <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
          {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Cred', 'Amazon Pay', 'Any Bank App'].map((app) => (
            <span key={app} className="bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/60">
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {/* Mobile 1-Tap UPI Launch Button */}
        <a
          href={upiUrl}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Pay via UPI App (Tap on Mobile)</span>
        </a>

        <div className="grid grid-cols-2 gap-2">
          {/* Share on WhatsApp */}
          <a
            href={`https://wa.me/919902937730?text=${formattedWhatsAppMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-2.5 px-3 rounded-2xl text-[11px] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-50" />
            <span>Send Receipt</span>
          </a>

          {/* Download QR Code */}
          <button
            type="button"
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-2.5 px-3 rounded-2xl text-[11px] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Save QR</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Official verified account: <strong className="text-slate-700">{payeeName}</strong>. 100% secure payment for Trek & Stay.</span>
      </div>
    </div>
  );
}
