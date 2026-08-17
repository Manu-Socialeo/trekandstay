import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize2, X, Instagram, MapPin, Camera } from 'lucide-react';
import { AppView } from '../App';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  location: string;
  category: 'monsoon' | 'himalayas' | 'glamping' | 'community';
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop',
    title: 'Harishchandragad Peak Inversion',
    location: 'Malshej Ghat, MH',
    category: 'monsoon'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1596245050071-705307593c7f?q=80&w=2070&auto=format&fit=crop',
    title: 'Konkan Kada Sunset View',
    location: 'Ahmednagar, MH',
    category: 'monsoon'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop',
    title: 'Roaring Kalu Falls',
    location: 'Malshej, Maharashtra',
    category: 'monsoon'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    title: 'Kedarnath Valley Backdrop',
    location: 'Uttarakhand, Himalayas',
    category: 'himalayas'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1626014303757-646c21425821?q=80&w=2070&auto=format&fit=crop',
    title: 'Basecamp Morning Brew',
    location: 'Bhandardara Lake',
    category: 'glamping'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop',
    title: 'Cloud Walk at Ratangad',
    location: 'Sahyadri Range',
    category: 'monsoon'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2070&auto=format&fit=crop',
    title: 'Sandhan Valley Rappelling',
    location: 'Ahmednagar',
    category: 'monsoon'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2070&auto=format&fit=crop',
    title: 'Kaas Plateau Wildflowers',
    location: 'Satara, MH',
    category: 'monsoon'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=2070&auto=format&fit=crop',
    title: 'Summit Silhouette',
    location: 'Kalsubai Peak',
    category: 'monsoon'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1624396115568-55b89052b694?q=80&w=2070&auto=format&fit=crop',
    title: 'Trimbakeshwar Temple Environs',
    location: 'Nashik, MH',
    category: 'monsoon'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    title: 'Campfire Stories',
    location: 'Coastal KA Basecamp',
    category: 'glamping'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
    title: 'Lush Gorges of Karnataka',
    location: 'Kollur Ghats',
    category: 'monsoon'
  }
];

interface GalleryViewProps {
  onNavigateHome: (view: AppView) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigateHome }) => {
  const [filter, setFilter] = useState<'all' | GalleryImage['category']>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <button 
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Photo Journal • Extracted from Google Maps & Field Recaps</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-extrabold text-emerald-700 mb-4 tracking-wide shadow-sm uppercase">
            Visual Expeditions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
            The Wilderness Gallery
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Real photos from our weekly batches across the Western Ghats and Himalayas. Witness the mist, the summits, and the community of Trek & Stay.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'monsoon', label: '🌧️ Monsoon Peaks' },
            { id: 'himalayas', label: '🏔️ Himalayan Giants' },
            { id: 'glamping', label: '⛺ Camp Life' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm border ${
                filter === btn.id 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-200/50 scale-105' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-100 cursor-pointer shadow-md hover:shadow-xl transition-shadow border border-slate-200"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider">{img.location}</span>
                  </div>
                  <h3 className="text-white text-lg font-bold leading-tight mb-4">{img.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full border border-white/30">
                      {img.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Social Callout */}
        <div className="mt-20 bg-slate-50 border border-slate-200 rounded-[40px] p-8 md:p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-emerald-200">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Want to see more live recaps?</h2>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-xl mx-auto">
            We post daily stories and batch highlights from our ongoing expeditions on Instagram. Join 1,500+ adventurers who track the wilderness with us.
          </p>
          <a 
            href="https://instagram.com/trek_and_stay" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-600 transition-all hover:shadow-xl hover:shadow-emerald-200 active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            Follow @trek_and_stay
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain bg-slate-900"
                referrerPolicy="no-referrer"
              />
              <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-wider">{selectedImage.location}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">{selectedImage.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-4 py-2 rounded-full border border-slate-200">
                    Category: <span className="text-emerald-700 capitalize">{selectedImage.category}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
