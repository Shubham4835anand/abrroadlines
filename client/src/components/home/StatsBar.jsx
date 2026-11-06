import React from 'react';
import { COMPANY } from '../../utils/constants';
import StatCounter from '../common/StatCounter';
import { Truck, MapPin, Award, ShieldCheck, Route } from 'lucide-react';

export default function StatsBar() {
  const icons = [Truck, MapPin, Award, ShieldCheck, Route];

  return (
    <section className="relative z-10 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-slate-200/80 p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {COMPANY.stats.map((stat, idx) => {
            const Icon = icons[idx] || Truck;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? 'pt-4 md:pt-0 md:px-4' : 'md:pr-4'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">
                  <StatCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

