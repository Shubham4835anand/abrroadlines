import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import { SAMPLE_BLOGS } from '../data/sampleBlogs';
import { Calendar, Clock, User, ArrowLeft, Tag, ChevronRight } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = SAMPLE_BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedBlogs = SAMPLE_BLOGS.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        canonical={`/blogs/${blog.slug}`}
        ogType="article"
        ogImage={blog.coverImage}
        article={{
          publishedAt: blog.publishedAt,
          author: blog.author,
          tags: blog.tags,
        }}
      />
      <SchemaOrg type="Article" data={blog} />

      <PageHeader
        title={blog.title}
        subtitle={`${blog.category} • ${blog.readTime}`}
        breadcrumb={[
          { label: 'Blogs', to: '/blogs' },
          { label: 'Article' },
        ]}
      />

      <article className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cover Image */}
              <div className="overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Meta bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 py-3 border-y border-slate-100">
                <span className="flex items-center gap-1.5 font-semibold text-[#606676]">
                  <User className="w-4 h-4 text-brand-orange" />
                  {blog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  {blog.readTime}
                </span>
              </div>

              {/* Article Typography */}
              <div
                className="prose prose-lg max-w-none text-[#7b8a97] leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#606676] [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#606676] [&>h3]:mt-6 [&>p]:leading-relaxed [&>blockquote]:border-l-4 [&>blockquote]:border-brand-orange [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#606676] [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && (
                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                    <Tag className="w-3.5 h-3.5" />
                    Tags:
                  </span>
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Navigation Back */}
              <div className="pt-6 border-t border-slate-100">
                <Link
                  to="/blogs"
                  className="readmore-link text-sm font-bold uppercase text-brand-orange inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Articles</span>
                </Link>
              </div>
            </div>

            {/* Right Sidebar matching uiCookies */}
            <div className="lg:col-span-4 space-y-8">
              {/* Recent Articles Widget */}
              <div className="bg-[#f9fbfd] border border-slate-200 p-6">
                <h3 className="text-base font-bold text-[#606676] uppercase tracking-wide mb-4 pb-2 border-b border-slate-200">
                  Recent Insights
                </h3>
                <div className="space-y-4">
                  {relatedBlogs.map((item) => (
                    <div key={item._id} className="flex gap-3 items-center group">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-16 object-cover shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#606676] group-hover:text-brand-orange line-clamp-2 transition-colors">
                          <Link to={`/blogs/${item.slug}`}>{item.title}</Link>
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Quote Widget */}
              <div className="bg-[#1f262d] text-white p-6 text-center space-y-3">
                <h4 className="text-base font-bold uppercase text-white">
                  Need Freight Rates?
                </h4>
                <p className="text-xs text-slate-300">
                  Calculate real-time linehaul rates across India with our rapid quotation engine.
                </p>
                <Link
                  to="/get-quote"
                  className="inline-block px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase rounded-full transition-colors"
                >
                  Get Instant Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
