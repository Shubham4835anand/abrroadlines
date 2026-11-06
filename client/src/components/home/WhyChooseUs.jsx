import React, { useState } from 'react';
import { ShieldCheck, Navigation, Zap, Award, CheckCircle2 } from 'lucide-react';

const TABS = [
  {
    id: 'secure',
    title: 'Secure',
    icon: ShieldCheck,
    image: '/ui-assets/secure.png',
    heading: 'Zero-Pilferage Closed Container Fleet',
    p1: 'Every commercial container vehicle in the ABR Roadlines fleet is equipped with tamper-evident digital seals, GPS lock mechanisms, and geo-fenced route locks. Cargo remains strictly sealed from factory loading dock to destination unloading bay.',
    p2: 'Comprehensive carrier liability coverage and annual background checks on all long-haul driving personnel ensure your valuable goods arrive in factory-mint condition.',
    points: ['Digital tamper-proof e-seals', 'Strict dock-in & dock-out protocols', 'IBA Authorized & ISO 9001:2015 Quality Management'],
  },
  {
    id: 'trackable',
    title: 'Trackable',
    icon: Navigation,
    image: '/ui-assets/track.png',
    heading: '24/7 Digital Control Tower & IoT Telemetry',
    p1: 'Our Central Operations Tower at Ambala Cantt monitors vehicle vectors, velocity, toll crossings, and engine diagnostics in real time across the entire Indian highway network.',
    p2: 'Shippers receive automated transit milestone updates via WhatsApp and SMS, alongside real-time live GPS tracking links and instantaneous e-POD clearance.',
    points: ['Live GPS speed and milestone alerts', 'Geofence deviation instant alarms', 'Instant electronic Proof of Delivery (e-POD)'],
  },
  {
    id: 'fast',
    title: 'Fast',
    icon: Zap,
    image: '/ui-assets/fast.png',
    heading: 'Dual-Driver Express Highway Linehauls',
    p1: 'To overcome transit delays, our express corridors operate with vetted dual-driver teams who alternate shifts at strategic relay points, keeping the vehicle rolling 20+ hours a day without driver fatigue.',
    p2: 'Automated FASTag electronic toll transit and priority expressway routing cut transit times by up to 35% between North, West, South, and East India.',
    points: ['Non-stop 20+ hours daily wheel rotation', 'Dedicated green-corridor priority lane routing', 'Scheduled departure timetables with guaranteed ETA'],
  },
  {
    id: 'reliable',
    title: 'Reliable',
    icon: Award,
    image: '/ui-assets/reliable.png',
    heading: '99.4% On-Time SLA & Zero Breakdown Guarantee',
    p1: 'With over two decades of highway transport legacy on Grand Trunk Road (NH-1), ABR Roadlines maintains an audited 99.4% punctual delivery record across 12M+ annual highway kilometers.',
    p2: 'In the event of unforeseen mechanical events, our nationwide 24/7 Roadside Assistance network dispatches a replacement prime mover within 3 to 4 hours to preserve client delivery schedules.',
    points: ['Audited 99.4% SLA adherence', '24/7 highway emergency relief network', 'Transparent contracts with committed capacity'],
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState('secure');
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section className="py-20 sm:py-28 bg-[#f9fbfd] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching uiCookies */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl sm:text-4xl text-[#606676] font-bold mb-2">
            Why Choose Us
          </h2>
          <span className="section-sub text-base sm:text-lg text-[#9197a8]">
            Connected Highway Infrastructure &amp; Rigorous Operational Standards
          </span>
        </div>

        {/* uiCookies CSS Tabs */}
        <div className="max-w-5xl mx-auto">
          {/* Tab Navigation Buttons */}
          <div className="flex border-b border-slate-200 justify-center mb-12 flex-wrap">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 sm:px-10 py-4 font-bold text-sm sm:text-base border-b-2 transition-all -mb-px ${
                    isActive
                      ? 'border-brand-orange text-brand-orange bg-white shadow-xs rounded-t-lg'
                      : 'border-transparent text-[#7b8a97] hover:text-[#2c3e50]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Box */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-soft border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              {/* Left Image matching uiCookies secure.png/track.png/fast.png/reliable.png */}
              <div className="md:col-span-5 flex justify-center">
                <img
                  src={currentTab.image}
                  alt={currentTab.title}
                  className="max-h-72 w-auto object-contain transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Right Content */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#606676] leading-tight">
                  {currentTab.heading}
                </h3>

                <p className="text-[#7b8a97] leading-relaxed text-sm sm:text-base">
                  {currentTab.p1}
                </p>

                <p className="text-[#7b8a97] leading-relaxed text-sm sm:text-base">
                  {currentTab.p2}
                </p>

                <div className="pt-3 space-y-2 border-t border-slate-100">
                  {currentTab.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
