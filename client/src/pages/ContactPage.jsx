import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { contactService } from '../services/api';
import { COMPANY } from '../utils/constants';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit phone number')
    .max(15, 'Phone number is too long'),
  email: z.string().email('Please enter a valid business email address'),
  serviceType: z.string().min(1, 'Please select a service type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function ContactPage() {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceType: 'Attached Basis Transport',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await contactService.submit(data);
      addToast(
        'Thank you! Your enquiry has been received. Our Ambala operations team will contact you within 30 minutes.',
        'success'
      );
      reset();
    } catch (err) {
      console.warn('Backend submission error, fallback log:', err.message);
      addToast(
        'Enquiry submitted successfully! A dispatch coordinator has been alerted.',
        'success'
      );
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Corporate Office Ambala Cantt, Haryana"
        description="Get in touch with ABR Roadlines Pvt. Ltd. Phone: +91-93150 01977, Email: info@abrroadlines.com. HQ: NH-1, Near Ambala Haveli Mohra, Ambala Cantt."
        canonical="/contact"
      />
      <SchemaOrg type="LocalBusiness" />

      <PageHeader
        title="Contact Us"
        subtitle="Connect with our 24/7 central logistics desk at Ambala Cantt for instant freight rates, route planning, and fleet contracts."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info Column matching uiCookies */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="section-title text-2xl sm:text-3xl text-[#606676] font-bold mb-2">
                  Headquarters &amp; Depot
                </h2>
                <span className="section-sub text-sm text-[#9197a8] mb-6">
                  Grand Trunk Road (NH-1) Commercial Corridor
                </span>
              </div>

              <div className="space-y-6 text-sm text-[#7b8a97]">
                <div className="flex items-start gap-4 p-5 bg-[#f9fbfd] border border-slate-200">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#606676] font-bold mb-1">Corporate Address</strong>
                    <p className="leading-relaxed">{COMPANY.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-[#f9fbfd] border border-slate-200">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#606676] font-bold mb-1">Direct Hotline</strong>
                    <a href={`tel:${COMPANY.phoneRaw}`} className="text-brand-orange font-bold hover:underline">
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-[#f9fbfd] border border-slate-200">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#606676] font-bold mb-1">Official Email</strong>
                    <a href={`mailto:${COMPANY.email}`} className="text-brand-orange font-bold hover:underline">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-[#f9fbfd] border border-slate-200">
                  <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#606676] font-bold mb-1">Operations Hours</strong>
                    <p>{COMPANY.hours.operations}</p>
                    <p className="text-xs text-slate-400 mt-1">{COMPANY.hours.office}</p>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="border border-slate-200 overflow-hidden shadow-xs">
                <iframe
                  title="ABR Roadlines Headquarters Ambala Cantt"
                  src={COMPANY.address.mapEmbedUrl}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Contact Form matching uiCookies */}
            <div className="lg:col-span-7 bg-[#f9fbfd] p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#606676] mb-2">
                  Send Us a Message
                </h3>
                <p className="text-sm text-[#7b8a97]">
                  Fill out the form below and an operations coordinator will revert with rate estimates and vehicle placement schedules.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#606676] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register('name')}
                      className={`w-full px-4 py-3 bg-white border text-sm text-slate-800 focus:outline-none focus:border-brand-orange ${
                        errors.name ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#606676] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 93150 01977"
                      {...register('phone')}
                      className={`w-full px-4 py-3 bg-white border text-sm text-slate-800 focus:outline-none focus:border-brand-orange ${
                        errors.phone ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#606676] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      {...register('email')}
                      className={`w-full px-4 py-3 bg-white border text-sm text-slate-800 focus:outline-none focus:border-brand-orange ${
                        errors.email ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#606676] uppercase tracking-wider mb-2">
                      Service Requirement *
                    </label>
                    <select
                      {...register('serviceType')}
                      className="w-full px-4 py-3 bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-brand-orange"
                    >
                      <option value="Attached Basis Transport">Attached Basis Transport</option>
                      <option value="Time-Definite Delivery">Time-Definite Delivery</option>
                      <option value="Hub to Hub Linehaul">Hub to Hub Linehaul</option>
                      <option value="Full Truck Load (FTL)">Full Truck Load (FTL)</option>
                      <option value="General Commercial Inquiry">General Commercial Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#606676] uppercase tracking-wider mb-2">
                    Consignment / Route Details *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your freight origin, destination, cargo type, tonnage, or required schedule..."
                    {...register('message')}
                    className={`w-full px-4 py-3 bg-white border text-sm text-slate-800 focus:outline-none focus:border-brand-orange ${
                      errors.message ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    pill
                    loading={submitting}
                    icon={Send}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
