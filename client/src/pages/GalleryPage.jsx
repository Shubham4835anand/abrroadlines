import React, { useState } from 'react';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import Lightbox from '../components/common/Lightbox';
import CtaBanner from '../components/home/CtaBanner';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/galleryData';
import { Maximize2, MapPin } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <SEO
        title="Fleet & Infrastructure Gallery"
        description="Explore the ABR Roadlines commercial vehicle fleet, high-throughput transshipment hubs, cross-dock loading bays, and 24/7 telematics control tower."
        canonical="/gallery"
      />
      <SchemaOrg type="LocalBusiness" />

      <PageHeader
        title="Fleet & Operations Gallery"
        subtitle="Visual tour of our 500+ commercial container vehicles, automated Ambala hub operations, and state-of-the-art predictive telemetry systems."
        breadcrumb={[{ label: 'Gallery' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-[#f9fbfd] text-[#606676] border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative border border-slate-200 bg-white cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-black/50 px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-base mt-2 text-white">{item.title}</h3>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-brand-orange" />
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-brand-orange">{item.category}</span>
                    <span>{item.location}</span>
                  </div>
                  <h4 className="font-bold text-[#606676] text-sm line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <CtaBanner />
    </>
  );
}
