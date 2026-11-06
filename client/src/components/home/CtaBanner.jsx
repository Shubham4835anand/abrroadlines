import React from 'react';
import Button from '../common/Button';
import { COMPANY } from '../../utils/constants';

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-[#f9fbfd] border-t border-slate-200 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#606676]">
          Ready to Expedite Your Highway Supply Chain?
        </h2>
        <p className="text-[#7b8a97] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Request a customized rate for the shipping of your goods, or speak directly with our Ambala Cantt freight planning team.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Button to="/get-quote" variant="primary" size="lg" pill className="text-base px-10">
            Get a Quote
          </Button>
          <Button href={`tel:${COMPANY.phoneRaw}`} variant="outline-dark" size="lg" pill className="text-base px-10">
            Call Desk: {COMPANY.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
