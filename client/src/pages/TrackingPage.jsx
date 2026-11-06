import React, { useState } from 'react';
import SEO from '../components/seo/SEO';
import SchemaOrg from '../components/seo/SchemaOrg';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import { COMPANY } from '../utils/constants';
import {
  Search,
  Truck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Phone,
  Navigation,
} from 'lucide-react';

const SAMPLE_TRACKING_DATA = {
  'ABR-10023': {
    lrNumber: 'ABR-10023',
    status: 'In Transit',
    origin: 'Ambala Central Terminal, Haryana',
    destination: 'Bhiwandi Hub, Mumbai, Maharashtra',
    currentLocation: 'Passing Kotputli on Delhi-Jaipur Expressway (NH-48)',
    vehicleNumber: 'HR-01-AB-4492 (32 Ft MX Container)',
    driverName: 'Sukhwinder Singh & Relay Driver Ramesh',
    speed: '58 km/h',
    gpsStatus: 'Active IoT Telematics — Signal Strong',
    dispatchTime: 'Yesterday, 19:30 IST',
    estimatedDelivery: 'Tomorrow, 14:00 IST',
    cargoType: 'Palletized FMCG Cartons (18.5 MT)',
    steps: [
      { title: 'Booking & Bay Dock In', location: 'Ambala HQ Hub', time: '04 Nov, 16:30', completed: true },
      { title: 'Loaded & Tamper Seal Affixed', location: 'Ambala Dock 04', time: '04 Nov, 18:45', completed: true },
      { title: 'Highway Linehaul Dispatched', location: 'NH-1 Arterial Exit', time: '04 Nov, 19:30', completed: true },
      { title: 'Transit Telematics Active', location: 'Delhi-Jaipur Expressway', time: 'Live Updates', completed: true, current: true },
      { title: 'Arrival at Bhiwandi Mother Hub', location: 'Mumbai Terminal', time: 'Expected 06 Nov, 11:30', completed: false },
      { title: 'Delivery & e-POD Signed', location: 'Consignee Bay', time: 'Expected 06 Nov, 14:00', completed: false },
    ],
  },
  'ABR-10045': {
    lrNumber: 'ABR-10045',
    status: 'Delivered',
    origin: 'Baddi Industrial Area, Himachal Pradesh',
    destination: 'Sanand Industrial Estate, Ahmedabad, Gujarat',
    currentLocation: 'Delivered at Consignee Inbound Gate 2',
    vehicleNumber: 'HR-01-XY-9021 (32 Ft Single Axle)',
    driverName: 'Harpreet Singh',
    speed: 'Stationary (Docked)',
    gpsStatus: 'Completed Geofence Exit',
    dispatchTime: '02 Nov, 14:00 IST',
    estimatedDelivery: '04 Nov, 17:15 IST (Delivered On-Time)',
    cargoType: 'Automotive Precision Sub-Assemblies (8.2 MT)',
    steps: [
      { title: 'Booking & Factory Bay Dock In', location: 'Baddi Plant Hub', time: '02 Nov, 11:00', completed: true },
      { title: 'Loaded & Manifest Signed', location: 'Baddi Dock', time: '02 Nov, 13:30', completed: true },
      { title: 'Highway Linehaul Dispatched', location: 'Via Ambala Junction', time: '02 Nov, 14:00', completed: true },
      { title: 'Expressway Transit Completed', location: 'Western Corridor', time: '04 Nov, 12:00', completed: true },
      { title: 'Arrival at Sanand Hub', location: 'Ahmedabad Terminal', time: '04 Nov, 15:30', completed: true },
      { title: 'Delivered & e-POD Signed', location: 'Factory Gate 2', time: '04 Nov, 17:15', completed: true, current: true },
    ],
  },
};

export default function TrackingPage() {
  const [query, setQuery] = useState('ABR-10023');
  const [result, setResult] = useState(SAMPLE_TRACKING_DATA['ABR-10023']);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    setError('');
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a consignment or LR number.');
      return;
    }

    if (SAMPLE_TRACKING_DATA[trimmed]) {
      setResult(SAMPLE_TRACKING_DATA[trimmed]);
    } else {
      setError(`No active consignment found for "${trimmed}". Try demo number ABR-10023 or ABR-10045.`);
      setResult(null);
    }
  };

  const loadSample = (code) => {
    setQuery(code);
    setError('');
    setResult(SAMPLE_TRACKING_DATA[code]);
  };

  return (
    <>
      <SEO
        title="Live Shipment & Consignment Tracking"
        description="Track your ABR Roadlines commercial freight consignment, LR number, vehicle GPS vectors, speed, and estimated arrival in real time."
        canonical="/tracking"
      />
      <SchemaOrg type="LocalBusiness" />

      <PageHeader
        title="Live Shipment Tracking"
        subtitle="Enter your Lorry Receipt (LR) or Consignment Number to view real-time highway GPS vectors, transit speed, and estimated arrival."
        breadcrumb={[{ label: 'Tracking' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Box matching uiCookies */}
          <div className="bg-[#f9fbfd] p-8 border border-slate-200 mb-10 shadow-xs">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Consignment / LR No. (e.g. ABR-10023)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-orange uppercase"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" pill icon={Navigation}>
                Track Shipment
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#7b8a97]">
              <span className="font-bold">Test Consignments:</span>
              <button
                type="button"
                onClick={() => loadSample('ABR-10023')}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange font-mono font-bold transition-colors"
              >
                ABR-10023 (In Transit)
              </button>
              <button
                type="button"
                onClick={() => loadSample('ABR-10045')}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange font-mono font-bold transition-colors"
              >
                ABR-10045 (Delivered)
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Tracking Result View */}
          {result && (
            <div className="space-y-8 animate-in fade-in">
              {/* Header Box */}
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-[#9197a8] uppercase tracking-wider">
                      Lorry Receipt (LR)
                    </span>
                    <h2 className="text-3xl font-black text-[#606676] mt-0.5">
                      {result.lrNumber}
                    </h2>
                  </div>

                  <div>
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${result.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-brand-orange text-white'
                        }`}
                    >
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#9197a8] block mb-1">Origin Node</span>
                    <strong className="text-[#606676] block text-sm">{result.origin}</strong>
                  </div>
                  <div>
                    <span className="text-[#9197a8] block mb-1">Destination Node</span>
                    <strong className="text-[#606676] block text-sm">{result.destination}</strong>
                  </div>
                  <div>
                    <span className="text-[#9197a8] block mb-1">Assigned Vehicle</span>
                    <strong className="text-[#606676] block text-sm">{result.vehicleNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[#9197a8] block mb-1">Estimated Arrival</span>
                    <strong className="text-brand-orange block text-sm">{result.estimatedDelivery}</strong>
                  </div>
                </div>

                {/* Live GPS Telemetry Box */}
                <div className="mt-6 p-5 bg-[#1f262d] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-brand-orange">
                        Live Highway Vector
                      </div>
                      <div className="text-sm font-semibold text-slate-100">
                        {result.currentLocation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <div>Speed: <strong className="text-white">{result.speed}</strong></div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="text-emerald-400 font-semibold">{result.gpsStatus}</div>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-[#606676] uppercase tracking-wide mb-6">
                  Transit Milestones &amp; Clearance Log
                </h3>

                <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${step.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-300 text-slate-300'
                          }`}
                      >
                        {step.completed && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4
                            className={`text-sm sm:text-base font-bold ${step.current ? 'text-brand-orange' : 'text-[#606676]'
                              }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-medium">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#7b8a97] mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {step.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Support Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#f9fbfd] p-6 border border-slate-200 flex items-start gap-4">
                  <FileCheck className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#606676] text-sm mb-1">
                      Digital Proof of Delivery (e-POD)
                    </h4>
                    <p className="text-xs text-[#7b8a97] mb-2">
                      High-resolution stamped e-POD is available for download once the consignee accepts cargo.
                    </p>
                    <span className="text-xs font-semibold text-[#606676] bg-slate-200 px-2.5 py-1 rounded">
                      Available in Enterprise Portal
                    </span>
                  </div>
                </div>

                <div className="bg-[#f9fbfd] p-6 border border-slate-200 flex items-start gap-4">
                  <Phone className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#606676] text-sm mb-1">
                      24/7 Transshipment Desk
                    </h4>
                    <p className="text-xs text-[#7b8a97] mb-2">
                      Need emergency gate pass authorization or dock entry verification?
                    </p>
                    <a
                      href={`tel:${COMPANY.phoneRaw}`}
                      className="text-xs font-bold text-brand-orange hover:underline uppercase"
                    >
                      Call Dispatch: {COMPANY.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
