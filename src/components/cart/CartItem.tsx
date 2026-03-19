import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../constants';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-3xl border border-slate-100 dark:border-zinc-800 group hover:border-primary/30 transition-all">
      <div className="size-20 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-zinc-800">
        <img 
          src={item.flavorImages?.[item.selectedFlavor || ''] || item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">{item.name}</h4>
            <button 
              onClick={() => removeFromCart(item.id, item.selectedFlavor)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          {item.selectedFlavor && (
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.selectedFlavor}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-full p-1 border border-slate-100 dark:border-zinc-800">
            <button 
              onClick={() => updateQuantity(item.id, item.selectedFlavor, -1)}
              className="size-6 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Minus className="size-3" />
            </button>
            <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.selectedFlavor, 1)}
              className="size-6 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plus className="size-3" />
            </button>
          </div>
          <span className="text-sm font-black text-slate-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
