import React from 'react';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import CtaBanner from '../components/home/CtaBanner';
import {
  COMPANY_STORY,
  TIMELINE,
  LEADERSHIP,
  CERTIFICATIONS,
} from '../data/companyData';
import {
  Clock,
  Cpu,
  ShieldCheck,
  Heart,
  Award,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

const valueIcons = {
  Clock,
  Cpu,
  ShieldCheck,
  Heart,
};

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | 20+ Years of Road Transport Excellence"
        description="Learn about ABR Roadlines Pvt. Ltd., our story from Ambala Cantt NH-1, our leadership, ISO certifications, and nationwide tech-enabled logistics mission."
        canonical="/about"
      />
      <SchemaOrg type="LocalBusiness" />

      {/* uiCookies Page Title Banner */}
      <PageHeader
        title="About Transport & Logistics"
        subtitle="Two Decades of Highway Freight Leadership Anchored at Ambala Cantt, G.T. Road (NH-1), Haryana"
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="section-title text-2xl sm:text-4xl text-[#606676] font-bold mb-2">
                  {COMPANY_STORY.headline}
                </h2>
                <span className="section-sub text-base text-[#9197a8]">
                  From Regional Pioneer to National Logistics Infrastructure
                </span>
              </div>

              <p className="text-[#7b8a97] leading-relaxed text-base font-normal">
                {COMPANY_STORY.paragraph1}
              </p>
              <p className="text-[#7b8a97] leading-relaxed text-base font-normal">
                {COMPANY_STORY.paragraph2}
              </p>
              <p className="text-[#7b8a97] leading-relaxed text-base font-normal">
                {COMPANY_STORY.paragraph3}
              </p>

              <div className="pt-4 grid grid-cols-3 gap-6 border-t border-slate-100">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#606676]">500+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-1">
                    Commercial Trucks
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-brand-orange">20+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-1">
                    Years on Highways
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#606676]">150+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-1">
                    Connected Cities
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image from uiCookies */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="/ui-assets/intro-bg.jpg"
                  alt="ABR Roadlines Headquarters Ambala Cantt"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Headquarters & Transit Junction</span>
                  </div>
                  <h3 className="font-bold text-[#606676] text-base">
                    Grand Trunk Road (NH-1), Ambala Cantt, Haryana
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Strategic central junction connecting North Indian industrial manufacturing corridors to Western, Southern and Eastern trade routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#f9fbfd] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
              Mission, Vision &amp; Values
            </h2>
            <span className="section-sub text-base sm:text-lg text-[#9197a8]">
              The Core Principles Governing Every Departure and Delivery SLA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 sm:p-10 border-t-4 border-t-brand-orange shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#606676] mb-3">Our Mission</h3>
              <p className="text-[#7b8a97] leading-relaxed text-base font-light">
                {COMPANY_STORY.mission}
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 border-t-4 border-t-[#606676] shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#606676]/10 text-[#606676] flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#606676] mb-3">Our Vision</h3>
              <p className="text-[#7b8a97] leading-relaxed text-base font-light">
                {COMPANY_STORY.vision}
              </p>
            </div>
          </div>

          {/* 4 Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_STORY.values.map((v, i) => {
              const Icon = valueIcons[v.icon] || ShieldCheck;
              return (
                <div key={i} className="p-6 bg-white border border-slate-200 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#606676] text-base mb-2">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-[#7b8a97] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team (Matching uiCookies Our People) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
              Our Leadership Team
            </h2>
            <span className="section-sub text-base sm:text-lg text-[#9197a8]">
              Seasoned Highway Logistics Directors and Supply Chain Specialists
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all text-center flex flex-col justify-between group"
              >
                <div>
                  <div className="relative overflow-hidden bg-slate-100 h-64">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#606676]">{leader.name}</h3>
                    <div className="text-xs font-semibold text-brand-orange uppercase tracking-wider mt-1 mb-3">
                      {leader.role}
                    </div>
                    <p className="text-xs text-[#7b8a97] leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 py-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  {leader.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-[#f9fbfd] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
              Certifications &amp; Accreditations
            </h2>
            <span className="section-sub text-base sm:text-lg text-[#9197a8]">
              Audited Standards in Safety, Cargo Security and Quality Management
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#606676] text-base mb-1">{cert.title}</h3>
                  <div className="text-xs font-semibold text-brand-orange uppercase mb-3">
                    {cert.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#7b8a97] leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified &amp; Active</span>
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
