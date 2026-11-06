import React from 'react';
import StatCounter from '../common/StatCounter';
import { Truck, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function CounterSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Commercial Fleet Strength', icon: Truck },
    { value: 150, suffix: '+', label: 'Pan-India Connected Hubs', icon: MapPin },
    { value: 20, suffix: '+', label: 'Years Highway Experience', icon: Award },
    { value: 99.4, suffix: '%', decimals: 1, label: 'Audited On-Time Delivery SLA', icon: CheckCircle2 },
  ];

  return (
    <section
      className="relative py-20 sm:py-24 bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: `url('/ui-assets/counter-bg.jpg')` }}
    >
      {/* Dark overlay matching uiCookies */}
      <div className="absolute inset-0 bg-[#1f262d]/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-4">
                <div className="w-14 h-14 rounded-full bg-white/10 text-brand-orange flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2">
                  <StatCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>

                <div className="text-xs sm:text-sm uppercase tracking-widest text-slate-300 font-semibold max-w-xs">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

