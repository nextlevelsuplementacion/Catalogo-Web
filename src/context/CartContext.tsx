import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../constants';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, flavor?: string) => void;
  removeFromCart: (id: string, flavor?: string) => void;
  updateQuantity: (id: string, flavor: string | undefined, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
  toast: { message: string; visible: boolean };
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState({ message: '', visible: false });

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const addToCart = useCallback((product: Product, flavor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedFlavor === flavor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedFlavor === flavor) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedFlavor: flavor }];
    });
    
    setToast({ message: `¡${product.name} añadido!`, visible: true });
    setTimeout(() => hideToast(), 3000);
  }, [hideToast]);

  const removeFromCart = useCallback((id: string, flavor?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedFlavor === flavor)));
  }, []);

  const updateQuantity = useCallback((id: string, flavor: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedFlavor === flavor) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
    clearCart,
    toast,
    hideToast
  }), [cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart, toast, hideToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
