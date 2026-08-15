import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/ui/Toast';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import PointsPage from './pages/PointsPage';
import { useCart } from './hooks/useCart';

const AppContent: React.FC = () => {
  const { toast, hideToast } = useCart();
  // const [page, setPage] = useState<'catalog' | 'checkout' | 'points'>('catalog');
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a05] text-slate-900 dark:text-slate-100 font-sans selection:bg-primary selection:text-black flex flex-col transition-colors duration-500">
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 flex-1 w-full">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Navigate to="/catalogo" replace />} />

            <Route
              path="/catalogo"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CatalogPage searchQuery={searchQuery} />
                </motion.div>
              }
            />

            <Route
              path="/producto/:id"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductPage />
                </motion.div>
              }
            />

            <Route
              path="/checkout"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckoutPage />
                </motion.div>
              }
            />

            <Route
              path="/puntos"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PointsPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/checkout');
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
