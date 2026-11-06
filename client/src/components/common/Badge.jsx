import React from 'react';

export default function Badge({
  children,
  variant = 'orange',
  size = 'sm',
  className = '',
}) {
  const variants = {
    orange: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
    navy: 'bg-brand-navy/10 text-brand-navy border-brand-navy/20',
    white: 'bg-white/15 text-white border-white/20 backdrop-blur-sm',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const sizes = {
    xs: 'text-[11px] px-2.5 py-0.5 font-semibold tracking-wider uppercase',
    sm: 'text-xs px-3 py-1 font-semibold tracking-wider uppercase',
    md: 'text-sm px-3.5 py-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.orange} ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
}

