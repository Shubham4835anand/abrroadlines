import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const current = items[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-brand-orange text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-brand-orange text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-[60vh] flex items-center justify-center">
            <img
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <div className="mt-4 text-center max-w-2xl px-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-orange/20 text-brand-orange mb-2">
              {current.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{current.title}</h3>
            {current.location && (
              <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                {current.location}
              </p>
            )}
            <p className="text-sm text-slate-300 leading-relaxed">{current.description}</p>
            <div className="mt-2 text-xs text-slate-400">
              {currentIndex + 1} of {items.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

