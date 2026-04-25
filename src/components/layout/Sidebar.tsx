import React, { useState } from 'react';
import {
  LayoutGrid,
  Zap,
  Dumbbell,
  Cookie,
  Droplet,
  Flame,
  Activity,
  Sparkles,
  Bolt,
  Atom,
  ChevronDown
} from 'lucide-react';import { CATEGORIES } from '../../constants';

const ICON_MAP: Record<string, any> = {
  LayoutGrid,
  Zap,
  Dumbbell,
  Cookie,
  Droplet,
  Flame,
  Activity,
  Sparkles,
  Bolt,
  Atom,
  ChevronDown
};

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCat = CATEGORIES.find(c => c.name === selectedCategory);
  const Icon = selectedCat ? ICON_MAP[selectedCat.icon] : null;

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 space-y-4 lg:space-y-6">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-3 lg:p-4 border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <h3 className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 px-2">Categorías</h3>
        
        {/* Mobile Dropdown */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-black uppercase"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="size-4" />}
            {selectedCategory || 'Categorías'}
          </div>
          <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <nav className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:flex-col gap-2 mt-2 lg:mt-0`}>
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <button 
              key={cat.name}
              onClick={() => { setSelectedCategory(cat.name); setIsOpen(false); }}
              className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-xs font-black text-left leading-tight transition-all ${
                selectedCategory === cat.name 
                  ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                  : 'text-slate-500 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {Icon && <Icon className="size-4 mt-[2px]" />}
              <span className="uppercase tracking-tighter break-words">
                {cat.name}
              </span>
            </button>
            );
          })}
        </nav>
      </div>
      
      {/* <div className="bg-primary text-black rounded-2xl p-6 relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="text-xl font-black uppercase leading-tight mb-3">¡Descuento Pro!</h4>
          <p className="text-[10px] font-bold opacity-80 mb-4">Usa el código <span className="bg-black text-white px-1.5 py-0.5 rounded">PROELITE</span> para un 25% OFF.</p>
          <button className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Copiar Código</button>
        </div>
        <div className="absolute -right-10 -bottom-10 size-40 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
