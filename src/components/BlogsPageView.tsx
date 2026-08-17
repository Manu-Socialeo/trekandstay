import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  Leaf, 
  Sparkles, 
  MapPin, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  MessageCircle,
  ChevronRight,
  Filter,
  User
} from 'lucide-react';
import { allBlogsData, BlogPostDetail } from '../data/blogData';

interface BlogsPageViewProps {
  onOpenBooking: (destinationTitle?: string) => void;
  onNavigateHome: (hash?: string) => void;
  initialSelectedSlug?: string | null;
}

export function BlogsPageView({ onOpenBooking, onNavigateHome, initialSelectedSlug }: BlogsPageViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPostDetail | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Sahyadri Trails', 'Western Ghats', 'Himalayan Yatra', 'Adventure Sports'];

  // Handle initial slug or URL hash and document title
  useEffect(() => {
    if (initialSelectedSlug) {
      const match = allBlogsData.find(b => b.slug === initialSelectedSlug || b.id === initialSelectedSlug);
      if (match) {
        setActiveArticle(match);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialSelectedSlug]);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | Trek & Stay Field Journal`;
    } else {
      document.title = `Blogs & Field Journal | Trek & Stay - Sahyadri & Himalayan Guides`;
    }
  }, [activeArticle]);

  const handleSelectArticle = (post: BlogPostDetail) => {
    setActiveArticle(post);
    window.history.pushState(null, '', `#blog-${post.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveArticle(null);
    window.history.pushState(null, '', '#blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (post: BlogPostDetail) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#blog-' + post.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const filteredBlogs = allBlogsData.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = allBlogsData[0]; // The flagship Harishchandragad story

  // -------------------------------------------------------------
  // VIEW 1: FULL IN-DEPTH ARTICLE READING VIEW
  // -------------------------------------------------------------
  if (activeArticle) {
    const whatsappUrl = `https://wa.me/919902937730?text=${encodeURIComponent(
      `Hello Trek & Stay! I am reading your in-depth trail chronicle "${activeArticle.title}" on the Blogs page and want to inquire about upcoming batch departures for ${activeArticle.destinationName}.`
    )}`;

    return (
      <div className="pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto animate-fade-in text-slate-900">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Field Guides</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button onClick={() => onNavigateHome()} className="hover:text-slate-900">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={handleBackToList} className="hover:text-slate-900">Blogs & Field Journal</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-700 font-bold truncate max-w-[200px]">{activeArticle.destinationName}</span>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-[32px] border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 md:p-14">
          {/* Category & Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {activeArticle.category}
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{activeArticle.readTime}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-4">
            {activeArticle.title}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-medium">
            {activeArticle.subtitle}
          </p>

          {/* Author Card & Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-100 mb-10">
            <div className="flex items-center gap-3.5">
              <img 
                src={activeArticle.author.avatar} 
                alt={activeArticle.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm" 
              />
              <div>
                <span className="block text-sm font-extrabold text-slate-900">{activeArticle.author.name}</span>
                <span className="block text-xs text-slate-500">{activeArticle.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{activeArticle.date}</span>
              </div>
              <button 
                onClick={() => handleShare(activeArticle)}
                className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-700 font-bold bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
                title="Share article link"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>

          {/* Hero Photography */}
          <div className="aspect-[16/9] w-full rounded-[28px] overflow-hidden mb-10 relative shadow-md">
            <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-5 left-6 right-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold">{activeArticle.destinationName}</span>
              </div>
              <span className="text-xs uppercase font-bold tracking-wider bg-black/50 backdrop-blur-md px-3 py-1 rounded-md">
                Trek & Stay Field Journal
              </span>
            </div>
          </div>

          {/* Key Highlights Checklist Box */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 mb-10">
            <div className="flex items-center gap-2.5 mb-4 text-emerald-950 font-extrabold text-base sm:text-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3>Trail Highlights & Sensory Immersion</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              {activeArticle.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-white/70 p-3 rounded-2xl border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                  <span className="font-medium leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Narrative Sections */}
          <div className="space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
            {activeArticle.contentSections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight pt-4 border-t border-slate-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-slate-700 text-sm sm:text-base">
                    {p}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 border-l-4 border-emerald-600 pl-5 py-3 bg-slate-50 italic text-slate-900 text-sm sm:text-lg font-medium rounded-r-2xl shadow-2xs">
                    "{section.quote}"
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Sustainability & Stewardship Section */}
          <div className="mt-12 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-base sm:text-xl mb-3">
              <Leaf className="w-6 h-6" />
              <h3>Living Sustainably: Leave No Trace & Indigenous Support</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed max-w-3xl">
              Trek & Stay is committed to regenerative mountain tourism. Every batch operates with zero single-use plastics, fair local wages for village cooks and guides, and sacred site custodianship.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeArticle.sustainabilityPillars.map((pillar, idx) => (
                <div key={idx} className="bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Field Gallery */}
          {activeArticle.gallery && activeArticle.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Visual Field Chronicle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeArticle.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md group">
                    <img 
                      src={imgUrl} 
                      alt={`${activeArticle.title} capture ${gIdx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ & Route Wisdom */}
          {activeArticle.faq && activeArticle.faq.length > 0 && (
            <div className="mt-12 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg mb-6">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3>Frequently Asked Questions & Route Advice</h3>
              </div>
              <div className="space-y-4">
                {activeArticle.faq.map((faqItem, fIdx) => (
                  <div key={fIdx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-2">{faqItem.question}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faqItem.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 mr-2">Keywords:</span>
            {activeArticle.tags.map((tag, tIdx) => (
              <span key={tIdx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-3xl">
            <div>
              <span className="text-base font-bold text-slate-900 block mb-1">
                Ready to explore {activeArticle.destinationName}?
              </span>
              <span className="text-xs text-slate-500">
                Join our certified captains on weekly departures from Bengaluru, Pune, Mumbai, Hubballi & Delhi.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenBooking(activeArticle.destinationName)}
                className="flex-1 md:flex-initial bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Book This Trail
              </button>
            </div>
          </div>
        </article>

        {/* Read Next Recommendations */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">More Field Chronicles from Trek & Stay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allBlogsData
              .filter(b => b.id !== activeArticle.id)
              .slice(0, 2)
              .map(rec => (
                <div 
                  key={rec.id}
                  onClick={() => handleSelectArticle(rec)}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex gap-4"
                >
                  <img src={rec.image} alt={rec.title} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div className="flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{rec.category}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {rec.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> {rec.readTime}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: MAIN BLOGS & TRAIL JOURNAL MAGAZINE DIRECTORY
  // -------------------------------------------------------------
  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto animate-fade-in text-slate-900">
      {/* Magazine Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-xs font-bold text-emerald-800 tracking-wide">
            The Field Journal • 8 Destination Editions
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
          Trail Chronicles & Sustainable Field Guides
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Deep, narrative-rich chronicles for every destination. Dive into ancient fort history, sacred temple traditions, village culinary craft, waterfall descents, and Leave No Trace mountain conservation written by our lead expedition captains.
        </p>
      </div>

      {/* Flagship Editorial Spotlight (Feature Article) */}
      {featuredBlog && selectedCategory === 'All' && searchQuery === '' && (
        <div 
          onClick={() => handleSelectArticle(featuredBlog)}
          className="bg-slate-950 text-white rounded-[36px] overflow-hidden mb-16 shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group transition-all hover:border-emerald-500/50"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img 
              src={featuredBlog.image} 
              alt={featuredBlog.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Featured Flagship Chronicle
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                <span className="text-emerald-400 font-bold uppercase">{featuredBlog.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {featuredBlog.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight mb-4 group-hover:text-emerald-300 transition-colors">
                {featuredBlog.title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-6">
                {featuredBlog.subtitle}
              </p>

              {/* Highlights Preview */}
              <div className="space-y-2 mb-6 hidden sm:block">
                {featuredBlog.keyHighlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={featuredBlog.author.avatar} 
                  alt={featuredBlog.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-emerald-400" 
                />
                <div>
                  <span className="text-xs font-bold text-white block">{featuredBlog.author.name}</span>
                  <span className="text-[10px] text-slate-400 block">{featuredBlog.author.role}</span>
                </div>
              </div>

              <span className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md group-hover:translate-x-1">
                <span>Read Story</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat} {cat === 'All' ? `(${allBlogsData.length})` : `(${allBlogsData.filter(b => b.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs, trails, waterfalls..."
            className="w-full bg-slate-50 border border-slate-300 rounded-full pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 8-Guide Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <article 
            key={blog.id} 
            onClick={() => handleSelectArticle(blog)}
            className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
              
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                <span className="bg-emerald-900/90 backdrop-blur-md text-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>

              <div className="absolute top-3.5 right-3.5 w-8 h-8 bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center gap-1.5 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{blog.destinationName}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium mb-2.5">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-slate-900 text-lg font-extrabold leading-snug tracking-tight mb-2.5 group-hover:text-emerald-700 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                  {blog.subtitle}
                </p>
              </div>

              {/* Author & Footer Action */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-emerald-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-900 block truncate max-w-[120px]">{blog.author.name}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Read Guide ↗</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-lg mb-1">No Trail Chronicles Found</h3>
          <p className="text-xs text-slate-500 mb-4">Try clearing your search query or selecting a different category filter.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Reset Filters & View All 8 Guides
          </button>
        </div>
      )}
    </div>
  );
}
