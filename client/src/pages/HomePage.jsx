import React from 'react';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import FeatureCargoCare from '../components/home/FeatureCargoCare';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CounterSection from '../components/home/CounterSection';
import LatestBlogsSection from '../components/home/LatestBlogsSection';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Nationwide Tech-Enabled Logistics & Commercial Road Transport"
        description="ABR Roadlines Pvt. Ltd. provides dedicated attached fleets, time-definite linehauls, and hub-to-hub transport with 99.4% on-time SLA across India."
        canonical="/"
      />
      <SchemaOrg type="LocalBusiness" />

      {/* 1. Hero Slider Carousel */}
      <Hero />

      {/* 2. Our 24 Hour's Services */}
      <ServicesOverview />

      {/* 3. We do care about your cargo Feature Banner */}
      <FeatureCargoCare />

      {/* 4. Why Choose Us Tabbed Section */}
      <WhyChooseUs />

      {/* 5. We are Trusted By Testimonials & Partner Logobar */}
      <TestimonialsSection />

      {/* 6. Parallax Counter Section */}
      <CounterSection />

      {/* 7. Latest Blogs Section */}
      <LatestBlogsSection />

      {/* 8. Final CTA Banner */}
      <CtaBanner />
    </>
  );
}
