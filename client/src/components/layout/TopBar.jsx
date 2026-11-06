import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY } from '../../utils/constants';

export default function TopBar() {
  return (
    <div className="bg-[#1f262d] text-slate-300 text-xs border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Left Information */}
        <div className="flex items-center space-x-6">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 text-slate-300 hover:text-brand-orange transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-orange" />
            <span className="font-semibold">{COMPANY.phone}</span>
          </a>

          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-2 text-slate-300 hover:text-brand-orange transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-orange" />
            <span>{COMPANY.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>HQ: NH-1, Ambala Cantt, Haryana</span>
          </div>
        </div>

        {/* Right Socials & Live Status */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wide uppercase">
              Fleet Dispatch: <span className="text-emerald-400 font-semibold">24/7 Live</span>
            </span>
          </div>

          <div className="h-3 w-px bg-white/20"></div>

          <div className="flex items-center space-x-3 text-slate-400 text-xs">
            <a
              href={COMPANY.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href={COMPANY.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
              aria-label="Twitter X"
            >
              X
            </a>
            <a
              href={COMPANY.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              aria-label="WhatsApp"
            >
              WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
