import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SERVICES } from '../../data/servicesData';

const SERVICE_IMAGES = {
  'attached-basis': '/ui-assets/trans.jpg',
  'time-definite': '/ui-assets/moving.jpg',
  'hub-to-hub': '/ui-assets/shipping.jpg',
};

export default function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* uiCookies Section Title & Subtitle */}
        <div className="mb-14">
          <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
            Our 24 Hour’s Services
          </h2>
          <span className="section-sub text-base sm:text-lg text-[#9197a8]">
            Engineered Pan-India Road Transport &amp; Contracted Fleet Linehauls
          </span>
        </div>

        {/* 3-Column Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {SERVICES.map((service) => {
            const thumbImg = SERVICE_IMAGES[service.slug] || service.image;
            return (
              <div key={service.id} className="flex flex-col items-center group">
                {/* Service Thumbnail */}
                <div className="w-full overflow-hidden mb-6 shadow-sm border border-slate-100">
                  <Link to={`/services/${service.slug}`} className="block overflow-hidden">
                    <img
                      src={thumbImg}
                      alt={service.title}
                      className="w-full h-56 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Service Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#606676] group-hover:text-brand-orange transition-colors mb-3">
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[#7b8a97] text-sm sm:text-base leading-relaxed mb-4 px-2 line-clamp-3">
                  {service.excerpt}
                </p>

                {/* uiCookies Read More Link */}
                <Link
                  to={`/services/${service.slug}`}
                  className="readmore-link text-sm font-semibold text-brand-orange hover:text-brand-orange-dark uppercase tracking-wider mt-auto inline-flex items-center gap-1"
                >
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
