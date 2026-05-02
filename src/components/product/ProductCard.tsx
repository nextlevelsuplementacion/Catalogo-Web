import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const hasFlavors = product.flavors && product.flavors.length > 0;

  const [selectedFlavor, setSelectedFlavor] = useState(() => {
    if (!hasFlavors) return null;

    const firstAvailable = product.flavors!.find(f => (f.stock ?? 0) > 0);
    return firstAvailable || product.flavors![0];
  });

  const [isHovered, setIsHovered] = useState(false);

  const currentImage = selectedFlavor?.image || product.image;

  const getStock = () => {
    if (hasFlavors) {
      return selectedFlavor?.stock ?? 0;
    }
    return product.stock ?? 0;
  };
  const isOutOfStock = getStock() === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-4 border border-slate-100 dark:border-zinc-800 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
    >
      {/* Badge */}
      {!!product.badge?.trim() && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-black text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/30">
          {product.badge}
        </div>
      )}

      {/* Imagen */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-zinc-800/50">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </AnimatePresence>

        {/* Overlay botón */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
          <motion.div className="w-full" whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() =>
                addToCart(
                  product,
                  hasFlavors ? selectedFlavor : null
                )
              }
              disabled={isOutOfStock}
              className={`w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${
                isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ShoppingCart className="size-4 mr-2" />
              {isOutOfStock ? 'Sin stock' : 'Añadir al Carrito'}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 px-1 flex flex-col flex-1">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
            {product.brand}
          </span>
        </div>

        {/* Nombre */}
        <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight line-clamp-1 uppercase tracking-tight">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Sabores */}
        {product.flavors && (
          <div className="flex flex-wrap gap-1 pt-1">
            {product.flavors.map(flavor => {
              const isSelected = selectedFlavor?.name === flavor.name;
              const isDisabled = flavor.stock === 0;

              return (
                <button
                  key={flavor.name}
                  onClick={() => !isDisabled && setSelectedFlavor(flavor)}
                  className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                    isDisabled
                      ? 'bg-red-100 text-red-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-black shadow-md shadow-primary/20'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-primary'
                  }`}
                >
                  {flavor.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Stock */}
        {/* {hasFlavors ? (
          <span className={`text-[10px] font-bold ${
            selectedFlavor?.stock === 0 ? 'text-red-500' : 'text-slate-400'
          }`}>
            {selectedFlavor?.stock === 0
              ? 'Sin stock'
              : `Stock: ${selectedFlavor?.stock}`}
          </span>
        ) : (
          <span className={`text-[10px] font-bold ${
            (product.stock ?? 0) === 0 ? 'text-red-500' : 'text-slate-400'
          }`}>
            {(product.stock ?? 0) === 0
              ? 'Sin stock'
              : `Stock: ${product.stock}`}
          </span>
        )} */}

        {/* Linea divisora */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-800">
  
          {/* Precio */}
          <div className="flex flex-col justify-center">
            {product.oldPrice && (
              <span className="text-[10px] text-slate-400 line-through font-bold">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              {formatCurrency(product.price)}
            </span>
          </div>

          {/* Botón + */}
          <button
            onClick={() =>
              addToCart(
                product,
                hasFlavors ? selectedFlavor : null
              )
            }
            disabled={isOutOfStock}
            className={`size-11 rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-primary text-black hover:scale-105'
            }`}
          >
            <motion.div
              whileTap={{ scale: 1.3, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Plus className="size-5" />
            </motion.div>
          </button>

        </div>
      </div>

      {/* Botón flotante */}
      {/* <button
        onClick={() =>
          addToCart(
            product,
            product.flavors?.length ? selectedFlavor : undefined
          )
        }
        disabled={isOutOfStock}
        className={`absolute bottom-4 right-4 size-11 rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
          isOutOfStock
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-primary text-black hover:scale-105'
        }`}
      >
        <motion.div
          whileTap={{ scale: 1.3, rotate: 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Plus className="size-5" />
        </motion.div>
      </button> */}
      {/* {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-300/40 rounded-[2rem] z-20 pointer-events-none" />
      )} */}
    </motion.div>
    
  );
};

export default ProductCard;