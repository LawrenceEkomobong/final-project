import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Product images
import Product7 from '../../assets/Product7.png';
import Product8 from '../../assets/Product8.png';

export default function SpecialOffers() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  const offers = [
    {
      id: 'so1',
      price: '₦35,000',
      priceRaw: 35000,
      title: 'Gourmet Seafood Platter',
      description: 'Grilled jumbo prawns, sautéed calamari, and spicy local crabs served with Chef K\'s signature chilli-garlic butter sauce.',
      image: Product7,
      category: 'Premium Selection'
    },
    {
      id: 'so2',
      price: '₦28,500',
      priceRaw: 28500,
      title: 'Royal Glazed Lamb Shank',
      description: 'Slow-braised lamb shank infused with native rosemary and local spices, glazed with honey-red wine reduction on root puree.',
      image: Product8,
      category: 'Exclusive Masterclass'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % offers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section id="special-offers" className="bg-cream py-20 border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Carousel Cards (takes 8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between relative min-h-[500px]">
            
            {/* Carousel Navigation Controls */}
            <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 bg-white border border-cream-border text-charcoal hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-md focus:outline-none"
                aria-label="Previous Offer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button 
                onClick={handleNext}
                className="w-10 h-10 bg-white border border-cream-border text-charcoal hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-md focus:outline-none"
                aria-label="Next Offer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel Cards Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              {offers.map((offer, idx) => (
                <div 
                  key={offer.id}
                  className={`bg-cream-card border border-cream-border p-6 shadow-md transition-all duration-500 flex flex-col justify-between h-full ${
                    idx === activeIndex ? 'ring-2 ring-primary/20 scale-[1.01]' : 'opacity-80 scale-95 hidden md:flex'
                  }`}
                >
                  {/* Price Tag on Top */}
                  <div className="text-center space-y-1">
                    <p className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                      {offer.price}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                      {offer.category}
                    </p>
                    <div className="w-8 h-0.5 bg-primary/30 mx-auto mt-2"></div>
                  </div>

                  {/* Title & Description */}
                  <div className="text-center my-4 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-charcoal">{offer.title}</h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                      {offer.description}
                    </p>
                  </div>

                  {/* High-res Image container */}
                  <div className="aspect-video w-full overflow-hidden border border-cream-border bg-cream mb-6 flex items-center justify-center">
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="w-full h-full object-cover filter hover:brightness-105 transition-all duration-300"
                    />
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={() => addToCart({
                      id: offer.id,
                      name: offer.title,
                      price: offer.priceRaw,
                      image: offer.image,
                      category: 'Special Offers'
                    })}
                    className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest py-3.5 transition-colors flex items-center justify-center gap-2"
                    style={{ borderRadius: '0px' }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Dots indicator */}
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
              {offers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-primary' : 'bg-cream-border'}`}
                ></button>
              ))}
            </div>

          </div>

          {/* Right Column: High-End Promotional Banner (takes 4 cols on desktop) */}
          <div className="lg:col-span-4 bg-dark text-white p-8 lg:p-10 flex flex-col justify-between border border-dark-border relative overflow-hidden noise-overlay">
            {/* Visual background texture and soft primary gradient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 text-left relative z-10 my-auto">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Limited Quantities</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Our Special Offered Items
              </h2>
              <p className="text-sm text-dark-muted leading-relaxed">
                Hand-curated, highly exclusive recipes created by Chef K. Every dish uses premium cuts and undergoes strict microbiological hazard checks before staging.
              </p>
              <div className="h-0.5 w-12 bg-primary"></div>
            </div>

            <div className="relative z-10 pt-8 border-t border-dark-border">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group"
              >
                <span>View Our Full Menu</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
