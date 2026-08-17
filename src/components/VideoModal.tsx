import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 rounded-[32px] max-w-4xl w-full p-4 relative shadow-2xl border border-slate-800 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-video w-full rounded-[24px] overflow-hidden bg-black relative">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/Scxs7L0vhZ4?autoplay=1&mute=0"
            title="Triplio Travel Expedition Tour Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
