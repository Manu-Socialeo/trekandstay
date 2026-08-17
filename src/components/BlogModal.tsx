import { useState } from 'react';
import { X, Calendar, Clock, Share2, CheckCircle2, Leaf, ShieldCheck, HelpCircle, MapPin, MessageCircle } from 'lucide-react';
import { BlogPostDetail } from '../data/blogData';

interface BlogModalProps {
  post: BlogPostDetail | null;
  onClose: () => void;
  onOpenBooking?: (destinationTitle?: string) => void;
}

export function BlogModal({ post, onClose, onOpenBooking }: BlogModalProps) {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#' + post.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919902937730?text=${encodeURIComponent(
    `Hello Trek & Stay! I just read your trail guide "${post.title}" and would like to inquire about upcoming batch departures for ${post.destinationName}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-slate-100 flex flex-col my-auto">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 self-end z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-lg mr-4 mt-2"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 -mt-10">
          {/* Top Category & Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-3">
            {post.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            {post.subtitle}
          </p>

          {/* Author & Publishing Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 mb-8">
            <div className="flex items-center gap-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-sm" 
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="block text-xs font-extrabold text-slate-900">{post.author.name}</span>
                <span className="block text-[11px] text-slate-500">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 text-slate-700 hover:text-emerald-600 font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all"
                title="Share article link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Hero Photography */}
          <div className="aspect-[16/9] w-full rounded-[24px] overflow-hidden mb-8 relative shadow-md">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">{post.destinationName}</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                Trek & Stay Field Journal
              </span>
            </div>
          </div>

          {/* Key Highlights Box */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 sm:p-6 mb-8">
            <div className="flex items-center gap-2 mb-3 text-emerald-900 font-extrabold text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3>Trail Highlights & Sensory Essence</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {post.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Long-Form Content Sections */}
          <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            {post.contentSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pt-2 border-t border-slate-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 border-l-4 border-emerald-500 pl-4 py-2 bg-slate-50 italic text-slate-800 text-sm sm:text-base font-medium rounded-r-xl">
                    "{section.quote}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Sustainability & Community Stewardship Box */}
          <div className="mt-10 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base sm:text-lg mb-4">
              <Leaf className="w-5 h-5" />
              <h3>Living Sustainably: Leave No Trace & Community Impact</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Every expedition organized by Trek & Stay is bound by strict ecological principles and direct economic support for native mountain communities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.sustainabilityPillars.map((pillar, idx) => (
                <div key={idx} className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Visual Field Dispatch</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                    <img src={imgUrl} alt={`${post.title} gallery ${gIdx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pro FAQ & Trail Advice */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-10 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3>Frequently Asked Questions & Trail Logistics</h3>
              </div>
              <div className="space-y-4">
                {post.faq.map((faqItem, fIdx) => (
                  <div key={fIdx} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{faqItem.question}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{faqItem.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags & Keywords */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Tags:</span>
            {post.tags.map((tag, tIdx) => (
              <span key={tIdx} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Inspired to experience this trail firsthand?</span>
              <span className="text-xs text-slate-500">Weekly departures available with Trek & Stay certified leads.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Inquire on WhatsApp</span>
              </a>

              {onOpenBooking && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking(post.destinationName);
                  }}
                  className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Book Trail Batch
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
