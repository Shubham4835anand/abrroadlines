import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight, Check } from 'lucide-react';
import { COMPANY } from '../../utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSub) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailSub('');
    }
  };

  return (
    <>
      {/* uiCookies Footer Widget Section */}
      <section className="bg-[#1f262d] text-slate-300 py-16 sm:py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Col 1: Place & Contact */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-white text-lg font-bold tracking-wide uppercase">
                Place &amp; Contact
              </h3>
              <address className="not-italic text-sm text-slate-400 space-y-2 leading-relaxed">
                <p>
                  {COMPANY.address.line1},<br />
                  {COMPANY.address.line2},<br />
                  {COMPANY.address.state} {COMPANY.address.pincode}, India
                </p>

                <div className="pt-2">
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="text-white font-bold hover:text-brand-orange block text-base transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-slate-400 hover:text-white block text-sm transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>

                <div className="pt-2 text-xs text-slate-500">
                  <span>CIN: {COMPANY.cin}</span> • <span>GST: {COMPANY.gst}</span>
                </div>
              </address>
            </div>

            {/* Col 2: About Transport */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-white text-lg font-bold tracking-wide uppercase">
                About Transport
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/about" className="hover:text-brand-orange transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-brand-orange transition-colors">
                    Services Overview
                  </Link>
                </li>
                <li>
                  <Link to="/services/attached-basis" className="hover:text-brand-orange transition-colors">
                    Attached Basis Transport
                  </Link>
                </li>
                <li>
                  <Link to="/services/time-definite" className="hover:text-brand-orange transition-colors">
                    Time-Definite Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/services/hub-to-hub" className="hover:text-brand-orange transition-colors">
                    Hub to Hub Linehaul
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-brand-orange transition-colors">
                    Shipment Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand-orange transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Stay in Touch (Newsletter) */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-white text-lg font-bold tracking-wide uppercase">
                Stay in Touch
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enter your email address to receive highway logistics updates, rate card announcements, and capacity notifications.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-[#2a343d] border border-slate-700 text-sm text-white placeholder:text-slate-500 rounded-lg focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase rounded-md transition-colors flex items-center gap-1"
                  >
                    <span>Send</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Thank you! You are subscribed to ABR Roadlines updates.
                  </p>
                )}
              </form>

              <div className="pt-2">
                <Link
                  to="/get-quote"
                  className="inline-block text-xs uppercase font-bold text-brand-orange hover:underline"
                >
                  Request Freight Rate Estimation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* uiCookies Copyright Section */}
      <footer className="bg-[#161b20] text-slate-400 py-8 text-center text-xs border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Footer menu */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <Link to="/about" className="hover:text-brand-orange transition-colors">
              About
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-brand-orange transition-colors">
              Services
            </Link>
            <span>•</span>
            <Link to="/gallery" className="hover:text-brand-orange transition-colors">
              Gallery
            </Link>
            <span>•</span>
            <Link to="/blogs" className="hover:text-brand-orange transition-colors">
              Blogs
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-brand-orange transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-brand-orange transition-colors">
              Admin Portal
            </Link>
          </div>

          <div className="text-slate-500 pt-2">
            <span>
              Copyright © {currentYear} {COMPANY.name}. All Rights Reserved. Headquarters at NH-1, Near Ambala Haveli Mohra, G.T. Road, Ambala Cantt, Haryana 133001.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
