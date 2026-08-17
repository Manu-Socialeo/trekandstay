import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Camera, Sparkles, Star, Maximize2, ShieldCheck } from 'lucide-react';

interface BatchPhoto {
  id: number;
  image: string;
  title: string;
  location: string;
  batchName: string;
  trekkersCount: string;
  badge: string;
}

const batchPhotos: BatchPhoto[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop",
    title: "Harishchandragad Konkan Kada Cloudburst",
    location: "Ahmednagar / Junnar, Maharashtra",
    batchName: "Monsoon Weekend Batch #14",
    trekkersCount: "22 Trekkers",
    badge: "Sahyadri Monsoon"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2070&auto=format&fit=crop",
    title: "Shitkada 300ft Roaring Waterfall Rappelling",
    location: "Igatpuri, Maharashtra",
    batchName: "Technical Adventure Batch",
    trekkersCount: "16 Trekkers",
    badge: "Waterfall Rappel"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2070&auto=format&fit=crop",
    title: "Devkund Secret Pool Rainforest Crossing",
    location: "Tamhini Ghat, Maharashtra",
    batchName: "Waterfalls Mania Batch #09",
    trekkersCount: "24 Trekkers",
    badge: "Rainforest Trail"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    title: "Harihar Fort 80° Vertical Rock-Cut Stairs",
    location: "Trimbakeshwar, Nashik",
    batchName: "Historic Fort Expedition",
    trekkersCount: "18 Trekkers",
    badge: "Fort Pinnacle"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop",
    title: "Kodachadri Sunset Ridge & Mookambika Base",
    location: "Kollur / Shivamogga, Karnataka",
    batchName: "Karnataka Western Ghats Batch",
    trekkersCount: "20 Trekkers",
    badge: "Western Ghats HQ"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1589308454676-4658133529a1?q=80&w=2070&auto=format&fit=crop",
    title: "Kedarnath & Badrinath Sacred Himalayan Pass",
    location: "Garhwal Himalayas, Uttarakhand",
    batchName: "Do Dham Sacred Yatra Batch",
    trekkersCount: "15 Pilgrims",
    badge: "Himalayan Yatra"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef234a98?q=80&w=2070&auto=format&fit=crop",
    title: "Starlight Bonfire & Midnight Camp Circle",
    location: "Bhandardara Campsite, Sahyadris",
    batchName: "Weekend Wilderness Glamp",
    trekkersCount: "26 Trekkers",
    badge: "Night Glamping"
  }
];

const testimonials = [
  {
    text: "The Maharashtra Monsoon Trails batch was incredible. The trek captains made the Harihar vertical stairs climb feel super safe with harnesses, and the hot Maharashtrian pithla-bhakri at the local village homestay was heartwarming!",
    author: "Rohan Kulkarni",
    role: "Bengaluru Explorer • Harihar & Shitkada Batch",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Rappelling down 300ft Shitkada waterfall in full monsoons was thrilling! UIAA-certified twin ropes, auto-locking descenders, and patient instructors who gave confidence to every first-timer.",
    author: "Ananya Deshmukh",
    role: "Pune Explorer • Shitkada Waterfall Rappelling",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "We booked a private batch for our team of 8 from Mangaluru. From punctual pickup to misty Kalu Falls base and Harishchandragad Konkan Kada, everything was executed with precision.",
    author: "Karthik Hegde",
    role: "Mangaluru Group • Kalu & Jivdhan Batch",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Did the Kedarnath & Badrinath Do Dham Yatra with Trek & Stay. Spiritual, well-organized with clean hotel stays, timely VIP passes, and round-trip transport from Delhi.",
    author: "Pooja Sharma",
    role: "Pilgrim • Kedarnath & Badrinath",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Waterfalls Mania trip was pure magic. Devkund Secret Falls and Nanemachi were overflowing with turquoise water. The group discount for 3+ people made it super affordable too.",
    author: "Vignesh Iyer",
    role: "Chennai Trekker • Devkund & Nanemachi",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Trek & Stay is our go-to adventure crew. Transparent pricing, no hidden costs, clear pre-trek WhatsApp group briefing, and certified captains. Can't wait for the next season!",
    author: "Sneha Patil",
    role: "Hubballi Explorer • Maharashtra 4-Dham",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<BatchPhoto | null>(null);

  // Auto carousel effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % batchPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + batchPhotos.length) % batchPhotos.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % batchPhotos.length);
  };

  // Helper to get relative offset for fanned view
  const getCardStyle = (index: number) => {
    const total = batchPhotos.length;
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total; // Normalized between -3 and +3

    if (diff === 0) {
      return "z-30 scale-100 sm:scale-105 opacity-100 shadow-2xl border-2 border-emerald-400";
    } else if (Math.abs(diff) === 1) {
      return "z-20 scale-[0.85] sm:scale-95 opacity-70 sm:opacity-85 shadow-xl";
    } else if (Math.abs(diff) === 2) {
      return "hidden md:block z-10 scale-85 opacity-60 shadow-md";
    } else {
      return "hidden lg:block z-0 scale-75 opacity-30 shadow-xs";
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-slate-50/80 border-b border-slate-200/80 flex flex-col items-center overflow-hidden">
      
      {/* Top Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-block border border-slate-200 bg-white rounded-full px-4 py-1 text-[11px] font-bold text-slate-700 tracking-wide shadow-xs">
            Live From The Trails
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified 2026 Batch Reels</span>
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-3">
          Real Experience from Sahyadri &<br />Himalayan Batch Trekkers
        </h2>
        
        {/* Star Rating Badge */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-slate-700">
          <span className="text-slate-950 font-black text-sm bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">4.9 ★★★★★</span>
          <span className="text-slate-500 font-normal">Over 1,500+ adventurers guided safely across 8 states</span>
        </div>
      </div>

      {/* Interactive Photo Carousel Reel */}
      <div 
        className="w-full max-w-6xl relative mb-6 py-4 flex flex-col items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
      >
        {/* Active Item Caption Bar */}
        <div className="mb-4 text-center transition-all duration-500 min-h-[90px]">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            {batchPhotos[activeIndex].badge} • {batchPhotos[activeIndex].batchName}
          </span>
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 px-4">
            {batchPhotos[activeIndex].title}
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{batchPhotos[activeIndex].location} • {batchPhotos[activeIndex].trekkersCount}</span>
          </p>
        </div>

        {/* Carousel Slider Cards - Improved mobile scaling */}
        <div className="w-full flex justify-center items-center gap-1 sm:gap-4 md:gap-6 min-h-[320px] sm:min-h-[420px] md:min-h-[460px] relative px-4">
          {batchPhotos.map((photo, index) => {
            const isCenter = index === activeIndex;
            const isNear = Math.abs((index - activeIndex + batchPhotos.length) % batchPhotos.length) === 1 || 
                           Math.abs((index - activeIndex + batchPhotos.length) % batchPhotos.length) === batchPhotos.length - 1;

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (isCenter) {
                    setLightboxPhoto(photo);
                  } else {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }
                }}
                className={`transition-all duration-500 cursor-pointer rounded-[24px] sm:rounded-[28px] overflow-hidden shrink-0 relative group select-none ${
                  isCenter 
                    ? "w-[260px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[340px] sm:h-[400px] md:h-[440px] " + getCardStyle(index)
                    : isNear
                      ? "w-[100px] sm:w-[160px] md:w-[200px] lg:w-[220px] h-[260px] sm:h-[320px] md:h-[360px] " + getCardStyle(index)
                      : "hidden"
                }`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                {/* Card Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-0.5">
                    {photo.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                    {photo.title}
                  </h4>
                  {isCenter && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[11px] text-slate-300">
                      <span>{photo.trekkersCount}</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:underline">
                        <Maximize2 className="w-3 h-3" /> Click to Zoom
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Controls & Navigation */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            aria-label="Previous batch photo"
            className="w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-slate-500 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {batchPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  setIsAutoPlaying(false);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeIndex 
                    ? "w-8 bg-emerald-600" 
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next batch photo"
            className="w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-slate-500 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* 3-Column Reviews Masonry Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {testimonials.slice(0, 6).map((t, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-xs relative group hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="mb-6">
              <div className="flex text-amber-400 text-xs mb-3">
                ★★★★★
              </div>
              <p className="text-slate-600 text-xs md:text-[13px] leading-relaxed font-normal">
                "{t.text}"
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <img 
                src={t.avatar} 
                alt={t.author} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" 
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{t.author}</p>
                <p className="text-[11px] text-slate-400 font-medium">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Photo Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-900">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 mb-1 inline-block">
                  {lightboxPhoto.badge} • {lightboxPhoto.batchName}
                </span>
                <h3 className="text-xl font-bold text-white">{lightboxPhoto.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lightboxPhoto.location} • {lightboxPhoto.trekkersCount}</span>
                </p>
              </div>

              <a
                href="https://wa.me/919902937730?text=I%20saw%20your%20trekker%20batch%20photos%20and%20want%20to%20join%20upcoming%20batches"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-full text-xs transition-all shadow-md shrink-0"
              >
                Join Next Batch
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
