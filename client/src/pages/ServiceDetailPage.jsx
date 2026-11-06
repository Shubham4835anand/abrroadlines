import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import CtaBanner from '../components/home/CtaBanner';
import { SERVICES } from '../data/servicesData';
import { COMPANY } from '../utils/constants';
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock,
  Award,
  ChevronRight,
} from 'lucide-react';

const SERVICE_IMAGES = {
  'attached-basis': '/ui-assets/trans.jpg',
  'time-definite': '/ui-assets/moving.jpg',
  'hub-to-hub': '/ui-assets/shipping.jpg',
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const thumbImg = SERVICE_IMAGES[service.slug] || service.image;
  const benefitIcons = [TrendingUp, ShieldCheck, Clock, Award];

  return (
    <>
      <SEO
        title={`${service.title} | Pan-India Road Transport`}
        description={service.excerpt}
        canonical={`/services/${service.slug}`}
      />
      <SchemaOrg type="Service" data={service} />

      <PageHeader
        title={service.title}
        subtitle={service.tagline}
        breadcrumb={[
          { label: 'Services', to: '/services' },
          { label: service.shortTitle },
        ]}
      />

      {/* Main Content with Sidebar matching uiCookies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Service Navigation Widget */}
              <div className="bg-[#f9fbfd] border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-[#606676] uppercase tracking-wide mb-4 pb-2 border-b border-slate-200">
                  Services
                </h3>
                <ul className="space-y-2 text-sm font-semibold">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/services/${s.slug}`}
                        className={`flex items-center justify-between p-3 transition-colors ${
                          s.slug === service.slug
                            ? 'bg-brand-orange text-white'
                            : 'text-[#606676] hover:bg-slate-100'
                        }`}
                      >
                        <span>{s.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Assistance Card matching uiCookies */}
              <div className="bg-[#1f262d] text-white p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                  Need Help?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Speak directly with our Ambala Cantt freight planning team for route feasibility and immediate truck placement.
                </p>
                <div className="text-xl font-bold text-brand-orange">
                  {COMPANY.phone}
                </div>
                <div className="pt-2">
                  <Button
                    to="/get-quote"
                    variant="primary"
                    size="sm"
                    pill
                    className="w-full"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Main Service Image */}
              <div className="overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={thumbImg}
                  alt={service.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#606676]">
                  {service.title} Overview
                </h2>
                <p className="text-[#7b8a97] leading-relaxed text-base">
                  {service.overview}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#606676]">
                  Key Operational Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 bg-[#f9fbfd] border border-slate-100 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Benefits Grid */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#606676]">
                  Strategic Enterprise Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, i) => {
                    const Icon = benefitIcons[i] || ShieldCheck;
                    return (
                      <div key={i} className="p-6 border border-slate-200 bg-white">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-[#606676] text-base mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#7b8a97] leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Workflow */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#606676]">
                  Operational Workflow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="p-5 bg-[#f9fbfd] border border-slate-200">
                      <div className="text-3xl font-black text-brand-orange mb-2">
                        {step.step}
                      </div>
                      <h4 className="font-bold text-[#606676] text-sm mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#7b8a97] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-bold text-[#606676]">
                  Frequently Asked Questions
                </h3>
                <Accordion items={service.faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
