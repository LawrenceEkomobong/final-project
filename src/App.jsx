import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Menu from './components/Menu/Menu';
import SpecialOffers from './components/SpecialOffers/SpecialOffers';
import Team from './components/Team/Team';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Layout/Footer';
import WhatsAppCTA from './components/Layout/WhatsAppCTA';
import CartSlider from './components/Cart/CartSlider';
import AuthModal from './components/Auth/AuthModal';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-cream text-charcoal select-none selection:bg-primary selection:text-white">
        
        {/* Navigation bar */}
        <Navbar 
          onCartToggle={() => setIsCartOpen(!isCartOpen)} 
          onAuthToggle={() => setIsAuthOpen(true)} 
        />
        
        {/* Main Content Sections */}
        <main className="flex-grow">
          <Hero />
          <About />
          <Menu />
          <SpecialOffers />
          <Team />
          <Testimonials />
        </main>
        
        {/* Sticky footer */}
        <Footer />
        
        {/* Sticky WhatsApp Floating CTA */}
        <WhatsAppCTA />
        
        {/* Cart Drawer Slide-over */}
        <CartSlider 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onAuthOpen={() => setIsAuthOpen(true)}
        />
        
        {/* Authentication Modal */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
      </div>
    </CartProvider>
  );
}

export default App;
