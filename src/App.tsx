import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/ui/Toast';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import PointsPage from './pages/PointsPage';
import { useCart } from './hooks/useCart';

const AppContent: React.FC = () => {
  const { toast, hideToast } = useCart();
  const [page, setPage] = useState<'catalog' | 'checkout' | 'points'>('catalog');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (page) {
      case 'catalog':
        return <CatalogPage searchQuery={searchQuery} />;
      case 'checkout':
        return <CheckoutPage setPage={setPage} />;
      case 'points':
        return <PointsPage />;
      default:
        return <CatalogPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a05] text-slate-900 dark:text-slate-100 font-sans selection:bg-primary selection:text-black flex flex-col transition-colors duration-500">
      <Header 
        page={page}
        setPage={setPage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setPage('checkout');
        }}
      />

      <Footer />
      <Toast 
        message={toast.message} 
        visible={toast.visible} 
        onClose={hideToast} 
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
