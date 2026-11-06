import React from 'react';

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden ${
        hover ? 'card-hover-effect' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

