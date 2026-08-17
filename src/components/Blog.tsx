import { useState } from 'react';
import { ArrowUpRight, Search, BookOpen, Clock, Leaf, Sparkles, MapPin } from 'lucide-react';
import { allBlogsData, BlogPostDetail } from '../data/blogData';

interface BlogProps {
  onSelectPost: (post: BlogPostDetail) => void;
  onNavigateToBlogsPage?: () => void;
}

export function Blog({ onSelectPost, onNavigateToBlogsPage }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Sahyadri Trails', 'Western Ghats', 'Himalayan Yatra', 'Adventure Sports'];

  const filteredBlogs = allBlogsData.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 md:py-28 px-6 md:px-12 bg-white max-w-7xl mx-auto border-t border-slate-100">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1 text-[11px] font-bold text-emerald-800 tracking-wide">
              Trek & Stay Field Journal • 8 Destination Editions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 leading-[1.2] tracking-tight">
            Trail Chronicles, Lore<br />& Sustainable Field Guides
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl">
            Immerse yourself in deeply researched, narrative-rich chronicles for every destination. Discover local village culture, mountain heritage, Leave No Trace sustainability, and route wisdom from our certified leads.
          </p>
        </div>
        
        {/* Search & Counter Widget */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trails, peaks, lore..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {onNavigateToBlogsPage && (
            <button 
              onClick={onNavigateToBlogsPage}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 group shrink-0 cursor-pointer"
            >
              <span>Explore Blogs Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button 
            onClick={() => onSelectPost(allBlogsData[0])}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 group shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Featured Guide</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {cat} {cat === 'All' ? `(${allBlogsData.length})` : `(${allBlogsData.filter(b => b.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredBlogs.map((blog) => (
          <article 
            key={blog.id} 
            onClick={() => onSelectPost(blog)}
            className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            {/* Top Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
              
              {/* Category & Word Count Badges */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                <span className="bg-emerald-900/90 backdrop-blur-md text-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>

              {/* Top Right Floating Arrow */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Destination Tag */}
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center gap-1.5 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{blog.destinationName}</span>
              </div>
            </div>

            {/* Middle Content */}
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

              {/* Sustainability & Author Footer */}
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
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-base mb-1">No Trail Chronicles Found</h3>
          <p className="text-xs text-slate-500 mb-4">Try clearing your search query or selecting a different category filter.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            View All 8 Guides
          </button>
        </div>
      )}
    </section>
  );
}
