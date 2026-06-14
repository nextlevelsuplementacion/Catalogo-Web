import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, Search, Moon, Sun, ShoppingCart, Star, LayoutGrid } from 'lucide-react';
import Imagotipo from '@/src/utils/imagotipo';
import { useCart } from '../../hooks/useCart';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  searchQuery,
  setSearchQuery,
  setIsCartOpen
}) => {
  const { cartCount } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121208]/80 backdrop-blur-md px-6 md:px-10 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
              to="/catalogo"
              className="flex items-center gap-3 text-slate-900 dark:text-primary"
          >
            <div className="flex items-center space-x-3">
              <Imagotipo 
                className="w-16 h-16" 
                style={{ fill: isDarkMode ? '#97ff00' : '#000000' }} 
              />
            </div>
            {/* <h2 className="text-xl font-black leading-tight tracking-tight uppercase hidden sm:block">
              Next Level
            </h2> */}
          </Link>
        </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/catalogo"
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                currentPath === '/catalogo'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-primary'
              }`}
            >
              <LayoutGrid className="size-4" />
              Catálogo
            </Link>
            <Link
              to="/puntos"
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                currentPath === '/puntos'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-primary'
              }`}
            >
              <Star className="size-4" />
              Puntos
            </Link>
          </nav>
        
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="hidden md:flex relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />

            <input
              className="w-full bg-slate-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Link
              to="/catalogo"
              className={`lg:hidden size-10 flex items-center justify-center rounded-full transition-all ${
                currentPath === '/catalogo'
                  ? 'bg-primary text-black shadow-lg shadow-primary/30 scale-110'
                  : 'bg-slate-100 dark:bg-zinc-900 hover:bg-primary/10'
              }`}
            >
              <LayoutGrid className="size-5" />
            </Link>
            <Link
              to="/puntos"
              className={`lg:hidden size-10 flex items-center justify-center rounded-full transition-all ${
                currentPath === '/puntos'
                  ? 'bg-primary text-black shadow-lg shadow-primary/30 scale-110'
                  : 'bg-slate-100 dark:bg-zinc-900 hover:bg-primary/10'
              }`}
            >
              <Star className="size-5" />
            </Link>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-900 hover:bg-primary/10 transition-colors group"
            >
              {isDarkMode ? <Sun className="size-5 group-hover:text-primary" /> : <Moon className="size-5 group-hover:text-primary" />}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative size-10 flex items-center justify-center rounded-full bg-primary text-black hover:scale-105 transition-transform"
            >
              <ShoppingCart className="size-5" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold size-5 flex items-center justify-center rounded-full border-2 border-primary"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
