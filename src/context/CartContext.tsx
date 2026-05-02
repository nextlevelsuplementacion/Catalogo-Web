import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from 'react';

import { Product, CartItem } from '../constants';
import { Flavor } from '../types/Product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, flavor?: Flavor | null) => void;
  removeFromCart: (id: string, flavor?: Flavor | null) => void;
  updateQuantity: (id: string, flavor: Flavor | null | undefined, delta: number) => void;
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

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = useCallback((product: Product, flavor?: Flavor | null) => {
    const hasFlavors = !!product.flavors?.length;

    // =========================
    // PRODUCTO SIN SABORES
    // =========================
    if (!hasFlavors) {
      const stock = product.stock ?? 0;

      if (stock <= 0) {
        setToast({ message: `Sin stock de ${product.name}`, visible: true });
        setTimeout(() => hideToast(), 3000);
        return;
      }

      setCart(prev => {
        const existing = prev.find(
          item => item.id === product.id && !item.selectedFlavor
        );

        if (existing) {
          if (existing.quantity >= stock) {
            setToast({
              message: `Stock máximo alcanzado (${stock})`,
              visible: true
            });
            setTimeout(() => hideToast(), 3000);
            return prev;
          }

          return prev.map(item =>
            item === existing
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            selectedFlavor: null
          }
        ];
      });

      setToast({ message: `¡${product.name} añadido!`, visible: true });
      setTimeout(() => hideToast(), 3000);
      return;
    }

    // =========================
    // PRODUCTO CON SABORES
    // =========================
    if (!flavor) return;

    if (flavor.stock <= 0) {
      setToast({ message: `Sin stock de ${flavor.name}`, visible: true });
      setTimeout(() => hideToast(), 3000);
      return;
    }

    setCart(prev => {
      const existing = prev.find(
        item =>
          item.id === product.id &&
          item.selectedFlavor?.name === flavor.name
      );

      if (existing) {
        if (existing.quantity >= flavor.stock) {
          setToast({
            message: `Stock máximo alcanzado (${flavor.stock})`,
            visible: true
          });
          setTimeout(() => hideToast(), 3000);
          return prev;
        }

        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedFlavor: flavor
        }
      ];
    });

    setToast({ message: `¡${product.name} añadido!`, visible: true });
    setTimeout(() => hideToast(), 3000);
  }, [hideToast]);

  // =========================
  // REMOVE
  // =========================
  const removeFromCart = useCallback((id: string, flavor?: Flavor | null) => {
    setCart(prev =>
      prev.filter(item =>
        !(item.id === id &&
          (item.selectedFlavor?.name ?? null) === (flavor?.name ?? null))
      )
    );
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = useCallback(
    (id: string, flavor: Flavor | null | undefined, delta: number) => {
      setCart(prev =>
        prev.map(item => {
          const match =
            item.id === id &&
            (item.selectedFlavor?.name ?? null) === (flavor?.name ?? null);

          if (!match) return item;

          const maxStock =
            flavor?.stock ??
            item.selectedFlavor?.stock ??
            item.stock ??
            Infinity;

          const newQty = Math.min(
            maxStock,
            Math.max(1, item.quantity + delta)
          );

          return { ...item, quantity: newQty };
        })
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotal,
      clearCart,
      toast,
      hideToast
    }),
    [cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart, toast, hideToast]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};