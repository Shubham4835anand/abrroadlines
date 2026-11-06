import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { SAMPLE_BLOGS } from '../../data/sampleBlogs';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function LatestBlogsSection() {
  const blogs = SAMPLE_BLOGS.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Knowledge & Insights"
            title="Latest Freight & Supply Chain Insights"
            subtitle="Industry perspectives from our logistics engineers on reducing freight cost, improving SLA adherence, and modern fleet telematics."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              padding="p-0"
              className="flex flex-col h-full bg-white group hover:border-brand-orange/40 hover:shadow-soft-lg transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width="800"
                  height="450"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="orange" size="xs">
                    {blog.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy mb-2.5 group-hover:text-brand-orange transition-colors line-clamp-2">
                    <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-dark transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

