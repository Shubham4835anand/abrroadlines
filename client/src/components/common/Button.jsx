import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  pill = true,
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  onClick,
  ...props
}) {
  const roundedClass = pill ? 'rounded-full' : 'rounded-lg';

  const baseClasses = `inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] ${roundedClass}`;

  const variants = {
    primary:
      'bg-brand-orange hover:bg-brand-orange-hover text-white shadow-btn focus-visible:ring-brand-orange',
    cyan:
      'bg-brand-cyan hover:bg-brand-cyan-hover text-white shadow-md focus-visible:ring-brand-cyan',
    secondary:
      'bg-brand-navy hover:bg-brand-navy-light text-white shadow-md focus-visible:ring-brand-navy',
    outline:
      'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white focus-visible:ring-brand-orange',
    'outline-dark':
      'border-2 border-slate-700 text-slate-800 hover:bg-brand-navy hover:text-white focus-visible:ring-brand-navy',
    white:
      'bg-white text-slate-900 hover:bg-slate-100 shadow-md focus-visible:ring-white',
    ghost:
      'text-brand-orange hover:bg-brand-orange-50 focus-visible:ring-brand-orange',
  };

  const sizes = {
    sm: 'text-xs px-5 py-2 gap-1.5',
    md: 'text-sm px-7 py-3 gap-2',
    lg: 'text-base px-9 py-3.5 gap-2.5',
  };

  const combinedClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
