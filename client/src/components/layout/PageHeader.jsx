import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <section
      className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url('/ui-assets/page-title-bg.jpg')` }}
    >
      {/* Dark overlay matching uiCookies */}
      <div className="absolute inset-0 bg-[#1f262d]/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 font-light mb-4 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* uiCookies Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-brand-orange transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-orange font-semibold">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

