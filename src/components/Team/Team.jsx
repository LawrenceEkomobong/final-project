import React from 'react';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';

export default function Team() {
  const members = [
    {
      name: 'Chef Kufreabasi',
      title: 'Principal Food Consultant & Safety Coach',
      credential: 'HACCP Auditor | 10+ Years Experience',
      image: image1
    },
    {
      name: 'Chef Daniel Henshaw',
      title: 'Culinary Operations Manager',
      credential: 'Menu Modeler & Yield Analyst',
      image: image2
    },
    {
      name: 'Auditor Sarah Alabi',
      title: 'Food Safety Compliance Officer',
      credential: 'HACCP Trainer & Kitchen Auditor',
      image: image1
    }
  ];

  return (
    <section id="team" className="bg-cream-dark/30 py-20 border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Kitchen Integrity Officers</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
            Our Expert Members
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div 
              key={index}
              className="bg-cream-card border border-cream-border p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Image Container with high contrast border */}
              <div className="aspect-square w-full bg-cream overflow-hidden border border-cream-border mb-4 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 transition-colors pointer-events-none"></div>
              </div>

              {/* Details */}
              <div className="text-left space-y-1">
                <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  {member.title}
                </p>
                <div className="h-px bg-cream-border/60 my-2"></div>
                <p className="text-[10px] text-charcoal-muted uppercase tracking-widest font-semibold">
                  {member.credential}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
