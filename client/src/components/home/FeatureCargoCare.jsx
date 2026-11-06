import React from 'react';
import Button from '../common/Button';

export default function FeatureCargoCare() {
  return (
    <section
      className="relative py-24 sm:py-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/ui-assets/feature-bg.jpg')` }}
    >
      {/* Dark tint overlay matching uiCookies */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We Do Care About Your Cargo!
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
            Headquartered on National Highway 1 at Ambala Cantt, ABR Roadlines operates with a commitment to zero-delay, zero-loss highway transit. Our 500+ commercial vehicles are sealed with tamper-evident digital locks and monitored by our 24/7 central telematics tower.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Whether fulfilling high-velocity manufacturing Just-in-Time delivery or inter-state retail linehauls, our dual-driver relay system ensures your shipments keep moving smoothly across India without driver fatigue or unscheduled halts.
          </p>

          <div className="pt-2">
            <Button to="/services" variant="primary" size="lg" pill>
              View Full Capabilities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

