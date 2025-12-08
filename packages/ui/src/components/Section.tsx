import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'transparent' | 'solid' | 'subtle';
  id?: string;
}

export function Section({
  children,
  className = '',
  background = 'transparent',
  id
}: SectionProps) {
  const backgrounds = {
    transparent: '',
    solid: 'bg-slate-800',
    subtle: 'bg-slate-800/30',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
}
