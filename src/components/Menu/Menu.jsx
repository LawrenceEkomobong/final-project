import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Flame, Eye } from 'lucide-react';

// Product images
import Product2 from '../../assets/Product2.png';
import Product3 from '../../assets/Product3.png';
import Product4 from '../../assets/Product4.png';
import Product5 from '../../assets/Product5.png';
import Product6 from '../../assets/Product6.png';

export default function Menu() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Soups', icon: '🥣' },
    { name: 'Swallow', icon: '🌾' },
    { name: 'Sides', icon: '🥗' }
  ];

  const products = [
    {
      id: 'p2',
      name: 'Fisherman Seafood Soup',
      category: 'Soups',
      description: 'A premium, spice-infused broth loaded with fresh prawns, calamari, crabs, and locally sourced white fish, finished with aromatic scent leaves.',
      price: 18500,
      image: Product2,
      spicy: true,
      haccpChecked: true
    },
    {
      id: 'p3',
      name: 'Gourmet Afang Soup',
      category: 'Soups',
      description: 'Finely shredded Afang (okazi) leaves and tender waterleaves simmered in rich palm oil, stockfish, periwinkles, and dried prawns.',
      price: 15000,
      image: Product3,
      spicy: false,
      haccpChecked: true
    },
    {
      id: 'p4',
      name: 'Pounded Yam & Efo Riro',
      category: 'Swallow',
      description: 'Smooth, stretchy pounded yam paired with a rich, aromatic spinach stew cooked with locust beans, red bell peppers, shaki, and beef tripe.',
      price: 12500,
      image: Product4,
      spicy: true,
      haccpChecked: true
    },
    {
      id: 'p5',
      name: 'Wheat Meal & Egusi Soup',
      category: 'Swallow',
      description: 'Fiber-rich ground wheat swallow served with hand-rolled Egusi melon seed soup cooked with spinach, dried fish, and shredded bushmeat.',
      price: 13000,
      image: Product5,
      spicy: false,
      haccpChecked: true
    },
    {
      id: 'p6',
      name: 'Smoky Party Jollof Special',
      category: 'Sides',
      description: 'Long-grain parboiled rice cooked in a rich, charred tomato-pepper base, infused with local firewood smoke, and served with sweet plantains.',
      price: 8500,
      image: Product6,
      spicy: true,
      haccpChecked: true
    }
  ];

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="menu" className="bg-cream-dark/30 py-20 border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Chef Kufreabasi Specials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
            Discover Food Menus
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Categories Tab Filtering */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center border border-cream-border bg-cream-card p-1 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none ${
                  activeTab === cat.name
                    ? 'bg-primary text-white'
                    : 'text-charcoal hover:text-primary hover:bg-cream/40'
                }`}
                style={{ borderRadius: '0px' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-cream-card border border-cream-border p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-cream overflow-hidden border border-cream-border mb-4 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.spicy && (
                      <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>Spicy</span>
                      </span>
                    )}
                    {product.haccpChecked && (
                      <span className="bg-dark text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                        HACCP Safe
                      </span>
                    )}
                  </div>
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-white text-charcoal hover:bg-primary hover:text-white transition-colors"
                      aria-label="View product details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-left mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-charcoal leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between border-t border-cream-border/60 pt-4 mt-auto">
                <span className="text-lg font-bold text-primary font-serif">
                  ₦{product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  style={{ borderRadius: '0px' }}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-cream-card border border-cream-border text-charcoal w-full max-w-2xl shadow-2xl p-6 relative flex flex-col md:flex-row gap-6" style={{ borderRadius: '0px' }}>
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-charcoal-muted hover:text-charcoal"
              aria-label="Close details"
            >
              <span className="text-xl font-bold">×</span>
            </button>

            {/* Left Image */}
            <div className="w-full md:w-1/2 aspect-square border border-cream-border bg-cream">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-between text-left space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                  {selectedProduct.category}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-charcoal mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xl font-serif font-bold text-primary mt-2">
                  ₦{selectedProduct.price.toLocaleString()}
                </p>
                <div className="h-px bg-cream-border my-3"></div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-charcoal-muted">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>100% Chef-monitored HACCP compliance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-charcoal-muted">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Allergen-separated prep station</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest transition-colors"
                style={{ borderRadius: '0px' }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart (₦{selectedProduct.price.toLocaleString()})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
