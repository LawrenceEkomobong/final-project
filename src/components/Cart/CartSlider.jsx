import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';
import { initializePaystackCheckout } from '../../lib/paystack';

export default function CartSlider({ isOpen, onClose, onAuthOpen }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastRef, setLastRef] = useState('');

  // Watch auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (data?.subscription) data.subscription.unsubscribe();
    };
  }, []);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      // Prompt user to sign in
      onAuthOpen();
      return;
    }

    setLoading(true);
    const amount = getCartTotal();

    // Launch Paystack payment flow
    initializePaystackCheckout({
      email: user.email,
      amount: amount,
      onSuccess: async (response) => {
        try {
          // Payment succeeded, write order to Supabase
          const orderData = {
            user_id: user.id,
            total_amount: amount,
            status: 'paid',
            paystack_ref: response.reference,
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          };

          const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

          if (error) throw error;

          // Clear cart state and show success panel
          setLastRef(response.reference);
          clearCart();
          setCheckoutSuccess(true);
        } catch (err) {
          console.error('Order recording failed:', err);
          alert('Payment succeeded but we encountered an issue recording your order. Please contact support with reference: ' + response.reference);
        } finally {
          setLoading(false);
        }
      },
      onClose: () => {
        setLoading(false);
      }
    });
  };

  const closeAndReset = () => {
    setCheckoutSuccess(false);
    setLastRef('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 transition-opacity" 
        onClick={closeAndReset}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slide-over panel */}
        <div className="w-screen max-w-md bg-cream text-charcoal border-l border-cream-border flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-cream-border flex items-center justify-between bg-cream-card">
            <h3 className="font-serif text-lg font-bold tracking-wide flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Your Culinary Cart</span>
            </h3>
            <button 
              onClick={closeAndReset}
              className="p-1 hover:text-primary transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents / Views */}
          {checkoutSuccess ? (
            /* Success Screen */
            <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-charcoal">Order Finalized Successfully</h4>
                <p className="text-xs text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                  Your payment has been authorized and your kitchen booking is confirmed. Chef K's compliance team will reach out shortly.
                </p>
              </div>
              <div className="bg-cream-dark/50 border border-cream-border p-3 w-full font-mono text-xs text-center">
                Ref: <span className="font-semibold text-primary">{lastRef}</span>
              </div>
              <button
                onClick={closeAndReset}
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest py-3.5 transition-colors"
                style={{ borderRadius: '0px' }}
              >
                Continue Exploring
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-4 text-center">
              <ShoppingBag className="w-12 h-12 text-cream-border animate-pulse" />
              <div className="space-y-1">
                <p className="font-serif font-semibold text-charcoal">Your cart is empty</p>
                <p className="text-xs text-charcoal-muted max-w-[240px] mx-auto leading-relaxed">
                  Explore Chef Kufreabasi's customized menus or safety masterclass seats to add them to your cart.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest transition-colors mt-2"
                style={{ borderRadius: '0px' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Active Items List */
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 bg-cream-card border border-cream-border p-3 relative group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-cream border border-cream-border shrink-0 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between text-left pr-4">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-charcoal line-clamp-1">{item.name}</h4>
                        <p className="text-xs font-bold text-primary mt-0.5">₦{item.price.toLocaleString()}</p>
                      </div>
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-cream-border w-fit bg-cream">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-charcoal-muted hover:text-primary transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-charcoal-muted hover:text-primary transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-cream-border hover:text-primary transition-colors focus:outline-none"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Footer summary */}
              <div className="p-6 border-t border-cream-border bg-cream-card space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-charcoal-muted">Subtotal</span>
                  <span className="font-serif text-lg font-bold text-charcoal">
                    ₦{getCartTotal().toLocaleString()}
                  </span>
                </div>
                
                <div className="text-[10px] text-charcoal-muted border-l-2 border-emerald-500 pl-3 leading-relaxed text-left">
                  Prices include all standard food sanitation auditing compliance costs. Taxes calculated at checkout.
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs font-bold tracking-widest uppercase py-4 transition-all flex items-center justify-center gap-2"
                  style={{ borderRadius: '0px' }}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>
                
                {!user && (
                  <p className="text-[10px] text-center text-charcoal-muted uppercase tracking-wider">
                    * Authenticated login required for Paystack payments
                  </p>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
