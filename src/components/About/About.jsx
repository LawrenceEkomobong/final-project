import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';

export default function About() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="bg-cream py-20 border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Storefront & Video */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Storefront Photo */}
              <div className="border border-cream-border p-2 bg-cream-card shadow-sm h-80">
                <img 
                  src={image1} 
                  alt="Chef Kufreabasi Storefront & Culinary Studio" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Video Player Placeholder */}
              <div className="relative border border-cream-border p-2 bg-cream-card shadow-sm h-80 group overflow-hidden">
                <div className="relative w-full h-full">
                  <img 
                    src={image2} 
                    alt="Kitchen Operations Preview" 
                    className="w-full h-full object-cover"
                  />
                  {/* Black overlay mask */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button 
                      onClick={() => setIsVideoOpen(true)}
                      className="w-14 h-14 rounded-full bg-white hover:bg-primary text-primary hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none"
                      aria-label="Play video"
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Call Out Tag */}
            <div className="bg-primary/5 border-l-4 border-primary p-4 space-y-1">
              <p className="text-xs uppercase tracking-widest text-primary font-bold">Inquiries & Bookings</p>
              <p className="text-sm font-semibold text-charcoal">
                Direct Line: <a href="tel:+2348123456789" className="hover:text-primary transition-colors">+234 812 345 6789</a>
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Signature */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Our Story & Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                Welcome to Chef Kufreabasi's Workspace
              </h2>
            </div>

            <div className="space-y-4 text-sm text-charcoal-muted leading-relaxed">
              <p>
                From humble beginnings to managing industrial-scale food service setups, my culinary path has been defined by two pillars: **impeccable flavor** and **stringent food safety standards**. I believe that a great meal isn't just about taste; it is built on operational compliance, ingredient freshness, and hazard control.
              </p>
              <p>
                As a consultant, I work with food startups, high-end hospitality venues, and private households to design optimized kitchen designs, perform ingredient yield testing, and create signature menus that delight clients while keeping food margins highly profitable.
              </p>
              <p>
                As a safety specialist, I ensure teams understand safety standards thoroughly. I offer custom audits, HACCP protocol development, and practical training that protects customers, streamlines licensing compliance, and builds high-quality food safety habits.
              </p>
            </div>

            {/* Signature Area */}
            <div className="pt-6 border-t border-cream-dark flex flex-col items-start space-y-2">
              <span className="text-xs uppercase tracking-widest text-dark-muted font-bold">Founder & Principal Consultant</span>
              <span className="font-signature text-4xl sm:text-5xl text-primary transform -rotate-2 select-none pt-2">
                Chef Kufreabasi
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-4xl aspect-video bg-black flex items-center justify-center border border-white/10 relative">
            {/* Elegant placeholder layout inside player */}
            <div className="text-center space-y-4 p-8">
              <p className="text-xs uppercase tracking-widest text-primary font-bold">Kitchen Operations Showcase</p>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">Behind the Scenes: HACCP Training & Prep</h3>
              <p className="text-sm text-dark-muted max-w-md mx-auto">
                This is a mock video preview. In a production environment, this overlay loads a Vimeo, YouTube, or direct HTML5 video demonstrating kitchen safety audits.
              </p>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-primary-hover transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
