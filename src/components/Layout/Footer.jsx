import React, { useState } from 'react';
import { Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-dark-border noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand/Credentials Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-widest text-white">
              CHEF <span className="text-primary">K</span>
            </h3>
            <p className="text-sm text-dark-muted leading-relaxed">
              Professional kitchen operator, recipe formulator, and food safety specialist with over 10 years of professional experience.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-primary font-semibold tracking-wider uppercase">
              <Award className="w-4 h-4 text-primary" />
              <span>HACCP Certified Coach</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Quick Links</h4>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About & Credentials</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">E-Commerce Menu</a></li>
              <li><a href="#special-offers" className="hover:text-primary transition-colors">Exclusive Offers</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">Expert Team</a></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Contact Info</h4>
            <ul className="space-y-3 text-sm text-dark-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Chef Kufreabasi HQ, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+234 812 345 6789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>consultancy@chefk.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Operational Updates</h4>
            <p className="text-sm text-dark-muted">
              Subscribe to receive curated kitchen safety tips, menu releases, and masterclass invitations.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                <CheckCircle className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-dark-card border border-dark-border text-white text-xs px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  style={{ borderRadius: '0px' }}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-widest uppercase py-3 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copy & Legal */}
        <div className="border-t border-dark-border/50 pt-8 text-center text-xs text-dark-muted flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Chef Kufreabasi. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Safety Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
