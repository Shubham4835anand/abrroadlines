import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { COMPANY } from '../../utils/constants';
import Button from '../common/Button';

const SLIDES = [
  {
    id: 1,
    image: '/ui-assets/slider/slide-1.jpg',
    small: 'CALL US TODAY',
    phone: COMPANY.phone,
    title: 'Making Transportation Fast, Safe & Connected',
    lead: 'Advanced, predictive, tech-enabled logistics infrastructure operating across 150+ Indian industrial cities with 99.4% on-time SLA.',
    btnText: 'Work With Us Today',
    btnTo: '/get-quote',
    secondaryBtnText: 'Explore Services',
    secondaryBtnTo: '/services',
  },
  {
    id: 2,
    image: '/ui-assets/slider/slide-2.jpg',
    small: 'DEDICATED CONTRACT FLEETS',
    phone: '99.4% On-Time Delivery',
    title: 'We Value Your Time and Supply Chain Velocity',
    lead: 'Over 500 GPS-equipped closed multi-axle containers and 24/7 dual-driver highway linehauls anchored at Ambala Cantt HQ.',
    btnText: 'Get a Freight Quote',
    btnTo: '/get-quote',
    secondaryBtnText: 'Track Consignment',
    secondaryBtnTo: '/tracking',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[600px] sm:h-[680px] lg:h-[750px] overflow-hidden bg-slate-900 group">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay Gradient matching uiCookies */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content Caption */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-10">
        <div className="max-w-2xl text-left text-white py-12">
          {/* Animated Small Tagline */}
          <motion.small
            key={`small-${slide.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-300 mb-2"
          >
            {slide.small}
          </motion.small>

          {/* Phone Callout in Transport Orange */}
          <motion.div
            key={`phone-${slide.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-orange mb-4 tracking-tight"
          >
            {slide.phone}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5"
          >
            {slide.title}
          </motion.h1>

          {/* Lead Paragraph */}
          <motion.p
            key={`lead-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl font-normal"
          >
            {slide.lead}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            key={`actions-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button to={slide.btnTo} variant="primary" size="lg" pill>
              {slide.btnText}
            </Button>
            <Button
              to={slide.secondaryBtnTo}
              variant="white"
              size="lg"
              pill
            >
              {slide.secondaryBtnText}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-brand-orange text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-brand-orange text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            className={`transition-all ${
              current === idx
                ? 'w-8 h-2.5 rounded-full bg-brand-orange'
                : 'w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
