import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/companyData';

const PARTNER_LOGOS = [
  { img: '/ui-assets/partner/p1.jpg', name: 'Partner 1' },
  { img: '/ui-assets/partner/p2.jpg', name: 'Partner 2' },
  { img: '/ui-assets/partner/p3.jpg', name: 'Partner 3' },
  { img: '/ui-assets/partner/p4.jpg', name: 'Partner 4' },
  { img: '/ui-assets/partner/p5.jpg', name: 'Partner 5' },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prev = () => {
    setCurrentTestimonial((idx) =>
      idx === 0 ? TESTIMONIALS.length - 1 : idx - 1
    );
  };

  const next = () => {
    setCurrentTestimonial((idx) =>
      idx === TESTIMONIALS.length - 1 ? 0 : idx + 1
    );
  };

  const t = TESTIMONIALS[currentTestimonial];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title matching uiCookies */}
        <div className="mb-12">
          <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
            We are Trusted By
          </h2>
          <span className="section-sub text-base sm:text-lg text-[#9197a8]">
            Corporate Logistics Directors &amp; Manufacturing Leaders
          </span>
        </div>

        {/* Testimonial Quote Carousel */}
        <div className="relative max-w-3xl mx-auto py-6">
          <div className="flex justify-center gap-1 mb-4 text-amber-400">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>

          <p className="text-lg sm:text-2xl text-[#606676] font-light leading-relaxed italic mb-6">
            "{t.comment}"
          </p>

          <div className="text-brand-orange font-bold text-base sm:text-lg tracking-wide">
            - {t.name} ({t.designation}, {t.company}) -
          </div>
          <span className="text-xs text-slate-400 block mt-1">{t.location}</span>

          {/* Testimonial Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-400 flex items-center justify-center transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === i ? 'bg-brand-orange' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-400 flex items-center justify-center transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Divider matching uiCookies */}
        <hr className="my-16 border-slate-200" />

        {/* Partner Carousel matching uiCookies .partner-section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 border border-slate-100 hover:border-slate-200 rounded-lg transition-all"
              >
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
