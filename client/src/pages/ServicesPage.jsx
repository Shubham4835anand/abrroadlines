import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';
import { SERVICES, FLEET_SPECS } from '../data/servicesData';
import { CheckCircle2, ChevronRight, Truck } from 'lucide-react';

const SERVICE_IMAGES = {
  'attached-basis': '/ui-assets/trans.jpg',
  'time-definite': '/ui-assets/moving.jpg',
  'hub-to-hub': '/ui-assets/shipping.jpg',
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Commercial Road Transport & Logistics Services"
        description="Comprehensive highway logistics services: Attached Basis Dedicated Fleets, Time Definite Delivery, and Hub to Hub Linehaul across India."
        canonical="/services"
      />
      <SchemaOrg type="LocalBusiness" />

      <PageHeader
        title="Transportation & Logistics Services"
        subtitle="Specialized inter-state freight solutions customized for manufacturing conglomerates, FMCG supply chains, and high-velocity e-commerce operations."
        breadcrumb={[{ label: 'Services' }]}
      />

      {/* Services List Grid matching uiCookies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
              Our 24 Hour’s Core Capabilities
            </h2>
            <span className="section-sub text-base sm:text-lg text-[#9197a8]">
              Select the operational model tailored to your cargo velocity and supply chain cadence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const img = SERVICE_IMAGES[service.slug] || service.image;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative overflow-hidden h-56 bg-slate-100">
                      <img
                        src={img}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {service.badge}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#606676] group-hover:text-brand-orange transition-colors mb-3">
                        <Link to={`/services/${service.slug}`}>{service.title}</Link>
                      </h3>

                      <p className="text-sm text-[#7b8a97] leading-relaxed mb-5 line-clamp-3">
                        {service.overview}
                      </p>

                      <div className="space-y-2 border-t border-slate-100 pt-4">
                        {service.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="readmore-link text-xs font-bold uppercase text-brand-orange inline-flex items-center gap-1"
                    >
                      <span>Service Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <Button to="/get-quote" variant="outline" size="sm" pill>
                      Get Quote
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-[#f9fbfd] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
              Commercial Fleet Specifications
            </h2>
            <span className="section-sub text-base sm:text-lg text-[#9197a8]">
              High-Capacity Multi-Axle Vehicles Tuned for Maximum Volumetric Load
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET_SPECS.map((truck, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 shadow-xs p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold text-brand-orange uppercase tracking-wider mb-1">
                    {truck.category}
                  </div>
                  <h3 className="text-base font-bold text-[#606676] mb-3">
                    {truck.name}
                  </h3>
                  <div className="text-xs text-[#7b8a97] space-y-1 mb-4">
                    <div><strong>Payload:</strong> {truck.payload}</div>
                    <div><strong>Cubic Volume:</strong> {truck.volume}</div>
                  </div>
                  <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <strong>Ideal for:</strong> {truck.idealFor}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to="/get-quote"
                    className="text-xs font-bold text-brand-orange uppercase hover:underline"
                  >
                    Check Availability →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
