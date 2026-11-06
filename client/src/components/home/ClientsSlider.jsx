import React from 'react';

export default function ClientsSlider() {
  const clients = [
    { name: 'Tata Steel Logistics', logo: '/images/clients/client-1.svg' },
    { name: 'Reliance Retail', logo: '/images/clients/client-2.svg' },
    { name: 'Adani Logistics', logo: '/images/clients/client-3.svg' },
    { name: 'Maruti Suzuki Supply', logo: '/images/clients/client-4.svg' },
    { name: 'ITC Limited', logo: '/images/clients/client-5.svg' },
    { name: 'Havells India', logo: '/images/clients/client-6.svg' },
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by India’s Premier Manufacturing & FMCG Conglomerates
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-brand-orange/40 hover:shadow-soft transition-all duration-200"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                width="240"
                height="80"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

