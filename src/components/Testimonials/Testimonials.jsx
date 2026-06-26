import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../../assets/image1.png';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "If you are hiring Chef K for kitchen consultancy, expect operational clarity from day one. Her team streamlined our food prep, cut our waste margins by 15%, and trained our staff to pass state health inspections with flying colors. Truly the 'fixer' you call when food operations need to run safer and smarter.",
      author: "Lulu Collins",
      title: "Operations Director, The Lagos Pantry",
      avatar: image1
    },
    {
      text: "Chef Kufreabasi revolutionized our home kitchen protocols. Her safety guidelines are simple, structured, and easy to stick to. We no longer worry about cross-contamination, and our custom menu development has added an incredible range of healthy, delicious meals to our daily routine.",
      author: "Dr. Amara Nwosu",
      title: "Private Consultancy Client",
      avatar: image1
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-cream py-20 border-b border-cream-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Quote Mark Asset */}
        <div className="flex justify-center mb-6">
          <Quote className="w-12 h-12 text-primary/20 fill-current" />
        </div>

        {/* Testimonial Text */}
        <div className="min-h-[160px] flex items-center justify-center">
          <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl italic text-charcoal leading-relaxed">
            "{testimonials[activeIndex].text}"
          </blockquote>
        </div>

        {/* Client details with Avatar */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-border shadow-sm">
            <img 
              src={testimonials[activeIndex].avatar} 
              alt={testimonials[activeIndex].author} 
              className="w-full h-full object-cover filter grayscale"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-charcoal">{testimonials[activeIndex].author}</p>
            <p className="text-xs text-primary font-medium tracking-wide uppercase mt-0.5">{testimonials[activeIndex].title}</p>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="p-2 border border-cream-border text-charcoal-muted hover:text-primary hover:bg-cream-dark/30 transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full ${idx === activeIndex ? 'bg-primary' : 'bg-cream-border'}`}
              ></button>
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-2 border border-cream-border text-charcoal-muted hover:text-primary hover:bg-cream-dark/30 transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
