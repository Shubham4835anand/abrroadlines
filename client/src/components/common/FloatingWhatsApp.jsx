import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY } from '../../utils/constants';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${COMPANY.whatsappRaw}?text=${encodeURIComponent(
    COMPANY.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex flex-col bg-white p-3.5 rounded-xl shadow-soft-lg border border-slate-200 max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-brand-navy">Chat with Operations</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-600">
            Need an instant quote or fleet availability? Message our 24/7 team now.
          </p>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label={`Chat with ABR Roadlines on WhatsApp at ${COMPANY.whatsapp}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
}

