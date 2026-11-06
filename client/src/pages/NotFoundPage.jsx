import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import Button from '../components/common/Button';
import { Home, ArrowLeft, Truck } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist on ABR Roadlines Pvt. Ltd."
      />
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-brand-orange/10 text-brand-orange mx-auto flex items-center justify-center mb-6">
            <Truck className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy mt-1 mb-3">
            Route Off-Track
          </h1>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            The road freight page or resource you requested could not be located. It might have been moved or updated.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="primary" icon={Home} iconPosition="left">
              Return to Home
            </Button>
            <Button to="/services" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

