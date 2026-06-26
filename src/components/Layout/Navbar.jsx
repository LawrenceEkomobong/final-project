import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, LogOut, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';

export default function Navbar({ onCartToggle, onAuthToggle }) {
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Monitor scroll height to toggle navbar background transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor Supabase Auth state changes
  useEffect(() => {
    let subscription;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    subscription = data.subscription;
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Special Offers', href: '#special-offers' },
    { label: 'Team', href: '#team' },
    { label: 'Testimonials', href: '#testimonials' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark shadow-md py-4' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#home" className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
              CHEF <span className="text-primary">KUFREABASI</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold -mt-1">
              Food Safety & Consultancy
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons (Cart & Auth) */}
          <div className="flex items-center space-x-4">
            
            {/* Cart Trigger */}
            <button 
              onClick={onCartToggle} 
              className="relative p-2 text-white hover:text-primary transition-colors focus:outline-none"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm transition-transform duration-300 scale-100">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Auth Dropdown / Button */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-1 p-2 text-white hover:text-primary transition-colors focus:outline-none"
                    aria-label="User Account"
                  >
                    <User className="w-6 h-6 stroke-[1.5]" />
                  </button>
                  
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-dark-card border border-dark-border text-white py-2 shadow-xl z-50">
                      <div className="px-4 py-2 border-b border-dark-border">
                        <p className="text-[10px] text-dark-muted font-bold uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-medium truncate mt-0.5 text-white/90">{user.email}</p>
                      </div>
                      
                      {supabase.isMock && (
                        <div className="px-4 py-1.5 border-b border-dark-border bg-amber-500/10 text-amber-400 flex items-center gap-1.5 text-[10px] font-medium">
                          <Shield className="w-3.5 h-3.5" />
                          <span>Mock Mode Session</span>
                        </div>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-dark/80 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-primary" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthToggle}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white border border-white/20 hover:border-primary hover:bg-primary transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-primary focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark border-t border-dark-border py-4 px-6 space-y-3 mt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-white/80 hover:text-white py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
