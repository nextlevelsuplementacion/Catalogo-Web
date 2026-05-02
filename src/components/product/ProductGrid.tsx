import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <div className="size-40 bg-slate-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-10 text-slate-300 dark:text-slate-700 border-4 border-dashed border-slate-200 dark:border-zinc-800">
          <SearchX className="size-20" />
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">No hay resultados</h3>
        <p className="text-slate-500 font-bold text-sm max-w-xs uppercase tracking-[0.2em] leading-relaxed">Ajusta tus filtros para encontrar lo que buscas.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
