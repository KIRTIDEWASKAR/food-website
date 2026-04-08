import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import ExploreMenu from './components/ExploreMenu/ExploreMenu.jsx';
import Cart from './components/Cart/Cart.jsx';
import OrderSuccess from './components/OrderSuccess/OrderSuccess.jsx';


import Footer from './components/Footer/Footer.jsx';
import Toast from './components/Toast/Toast.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, icon = '✓', type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, icon, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);
  return { toasts, addToast };
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { toasts, addToast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (food) => {
    setCartItems(prev => {
      const key = `${food.id}-${food.size}`;
      const exists = prev.find(i => `${i.id}-${i.size}` === key);
      if (exists) {
        return prev.map(i => `${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...food, qty: 1 }];
    });
    addToast(`${food.name} added to cart`, '🛒', 'success');
  };

  const updateQty = (id, size, delta) => {
    setCartItems(prev => {
      return prev
        .map(i => i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0);
    });
  };

  const removeItem = (id, size) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
    addToast('Item removed', '🗑️', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    addToast('Cart cleared', '🗑️', 'info');
  };

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cartTotal > 30 ? 0 : (cartTotal > 0 ? 4.99 : 0);
  const grandTotal = (cartTotal + delivery).toFixed(2);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-content">
          <div className="loader-logo">Spoon & Flame</div>
          <div className="loader-spinner" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        theme={theme}
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onCartClick={() => setCartOpen(true)}
        onNavClick={scrollTo}
      />
      <main>
        <Hero onOrderClick={() => scrollTo('menu')} />
        <ExploreMenu onAddToCart={addToCart} />
      
      
      </main>
      <Footer />

      {cartOpen && (
        <Cart
          items={cartItems}
          onUpdate={updateQty}
          onRemove={removeItem}
          onClear={clearCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}
      {checkoutOpen && cartItems.length > 0 && (
        <OrderSuccess
          items={cartItems}
          total={grandTotal}
          onClose={() => { setCheckoutOpen(false); clearCart(); }}
        />
      )}

      <Toast toasts={toasts} />
      <BackToTop />
    </>
  );
}
