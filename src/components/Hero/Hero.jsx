import React from 'react';
import Product1 from '../../assets/Product1.png';

export default function Hero() {
  const tags = [
    'Menu Development',
    'Cost Control',
    'Dietary Planning',
    'Kitchen Setup',
    'Food Safety Training',
    'HACCP'
  ];

  return (
    <section 
      id="home" 
      className="relative bg-dark text-white pt-32 pb-40 lg:pt-40 lg:pb-48 torn-edge-bottom noise-overlay overflow-hidden"
    >
      {/* Decorative background light accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Professional Chef & Operations Specialist
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Chef Kufreabasi
              </h1>
              <p className="text-sm sm:text-base font-serif italic text-white/80">
                A food consultant and food safety expert
              </p>
            </div>

            <h2 className="text-lg sm:text-xl font-medium text-white/90 border-l-2 border-primary pl-4 py-0.5">
              Chef K | Food Consultant & Food Safety Coach
            </h2>

            <p className="text-sm sm:text-base text-dark-muted leading-relaxed max-w-2xl">
              With 10+ years in professional kitchens, Chef K helps clients master both flavor and safety. As a food consultant, she develops custom menus, streamlines kitchen workflows, and solves operational challenges for homes, events, and food businesses. As a food safety coach, she trains teams on HACCP principles, cross-contamination prevention, and compliance, making safety second nature.
            </p>

            {/* Highlights/Tags */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Excellence in Action</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs font-medium bg-dark-card border border-dark-border text-white px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base font-medium text-primary tracking-wide pt-2">
              "Chef K is the 'fixer' you call when food operations need to run safer and smarter."
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#menu"
                className="inline-flex justify-center items-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-primary hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
              >
                Explore Menu
              </a>
              <a
                href={`https://wa.me/+2348123456789?text=${encodeURIComponent("Hello Chef K, I'd like to book a consultancy session.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:border-white hover:bg-white/5 transition-all"
              >
                Contact Chef
              </a>
            </div>
          </div>

          {/* Right Floating Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Soft gold/red glow behind the food */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] animate-pulse-slow">
              <img 
                src={Product1} 
                alt="Signature Culinary Dish by Chef Kufreabasi" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] transform transition hover:scale-105 duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
