import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (supabase.isMock) {
          setMessage("Mock registration successful! You are now logged in.");
          setTimeout(() => onClose(), 2000);
        } else {
          setMessage("Registration successful! Check your email for confirmation link.");
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = async () => {
    setEmail('chef.demo@kufreabasi.com');
    setPassword('demopass123');
    setLoading(true);
    setError(null);
    try {
      await supabase.auth.signInWithPassword({
        email: 'chef.demo@kufreabasi.com',
        password: 'demopass123'
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-dark-card border border-dark-border text-white w-full max-w-md shadow-2xl p-6 sm:p-8 z-10" style={{ borderRadius: '0px' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-muted hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h3 className="font-serif text-2xl font-bold tracking-wide">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-xs text-dark-muted mt-1 uppercase tracking-wider">
            {isLogin ? 'Access secure checkout and orders' : 'Register for safety & consultancy masterclasses'}
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 bg-primary/10 border border-primary/20 text-primary text-xs p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-muted mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-dark-muted">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-dark border border-dark-border text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-primary text-white"
                style={{ borderRadius: '0px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-muted mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-dark-muted">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark border border-dark-border text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-primary text-white"
                style={{ borderRadius: '0px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs font-bold tracking-widest uppercase py-3.5 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setMessage(null);
            }}
            className="text-xs text-dark-muted hover:text-white transition-colors underline underline-offset-4"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        {/* Mock Mode Helper */}
        {supabase.isMock && (
          <div className="mt-6 border-t border-dark-border/50 pt-6">
            <p className="text-[10px] text-dark-muted text-center uppercase tracking-wider mb-2">Sandbox Helper Option</p>
            <button
              onClick={handleMockLogin}
              className="w-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold py-2.5 transition-colors flex items-center justify-center gap-2"
            >
              ⚡ Fast Demo Mock Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
