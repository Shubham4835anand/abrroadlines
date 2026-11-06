import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import { SAMPLE_BLOGS } from '../data/sampleBlogs';
import { Search, Calendar, Clock, ChevronRight, User } from 'lucide-react';

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = useMemo(() => {
    const set = new Set(SAMPLE_BLOGS.map((b) => b.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredBlogs = useMemo(() => {
    return SAMPLE_BLOGS.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredBlogs.slice(start, start + postsPerPage);
  }, [filteredBlogs, currentPage, postsPerPage]);

  return (
    <>
      <SEO
        title="Logistics Insights & Road Transport Blogs"
        description="Thought leadership, highway transport optimization, fleet telematics guides, and freight market analysis from ABR Roadlines Pvt. Ltd."
        canonical="/blogs"
      />
      <SchemaOrg type="LocalBusiness" />

      <PageHeader
        title="Standard Blog & Insights"
        subtitle="Perspectives from our highway logistics engineers on reducing freight cost, improving SLA adherence, and modern fleet telematics."
        breadcrumb={[{ label: 'Blogs' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14 bg-[#f9fbfd] p-4 border border-slate-200">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 focus:outline-none focus:border-brand-orange text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-orange text-white'
                      : 'bg-white text-[#606676] border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid matching uiCookies standard blog layout */}
          {paginatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative overflow-hidden h-52 bg-slate-100">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                        {blog.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-orange" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#606676] group-hover:text-brand-orange transition-colors mb-3 line-clamp-2">
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <p className="text-sm text-[#7b8a97] leading-relaxed line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author.split(',')[0]}
                    </span>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="readmore-link text-xs font-bold uppercase text-brand-orange inline-flex items-center gap-1"
                    >
                      <span>Read Post</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#f9fbfd] border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-[#606676] mb-2">No Articles Found</h3>
              <p className="text-sm text-slate-500 mb-4">
                We could not find any insights matching "{searchTerm}". Try another search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-brand-orange hover:underline uppercase"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 border border-slate-200 text-xs font-bold uppercase disabled:opacity-50 text-slate-700 bg-white hover:bg-slate-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 text-xs font-bold transition-colors ${
                    currentPage === idx + 1
                      ? 'bg-brand-orange text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-4 py-2 border border-slate-200 text-xs font-bold uppercase disabled:opacity-50 text-slate-700 bg-white hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
