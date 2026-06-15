import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';

interface CartSummaryProps {
  onCheckout: () => void;
  discount?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout, discount = 0 }) => {
  const { cartTotal } = useCart();
  const discountAmount = cartTotal * discount;
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 border-t border-slate-200 dark:border-zinc-800 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>Subtotal</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
            <span>Descuento ({Math.round(discount * 100)}%)</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        {/* <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>Envío</span>
          <span className="text-emerald-500">Gratis</span>
        </div> */}
        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-end">
          <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Total</span>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatCurrency(finalTotal)}</span>
        </div>
      </div>
      
      <Button 
        onClick={onCheckout}
        className="w-full py-6 text-base"
      >
        Finalizar Compra
      </Button>
      
      {/* <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">
        Envío gratis a todo el país en compras superiores a $20.000
      </p> */}
    </div>
  );
};

export default CartSummary;
