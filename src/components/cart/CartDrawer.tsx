import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#121208] z-50 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-black shadow-lg shadow-primary/20">
                  <ShoppingBag className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Tu Carrito</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cartCount} productos</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="size-24 bg-slate-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                    <ShoppingBag className="size-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">El carrito está vacío</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-[200px]">¡Agrega algunos productos para comenzar tu entrenamiento!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-primary text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Seguir Comprando
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.selectedFlavor}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cart.length > 0 && (
              <CartSummary onCheckout={onCheckout} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
