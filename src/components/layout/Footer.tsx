import React from 'react';
import { Bolt, ShieldCheck, Bell } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-zinc-800 mt-auto w-full">
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <Bolt className="size-6 text-primary" />
          Pedix Sports
        </div>
        <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 hidden md:block"></div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          <ShieldCheck className="size-5 text-primary" />
          Tienda Verificada
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Bell className="size-5 text-primary" />
          Soporte 24/7
        </div>
      </div>
      <div className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        © {new Date().getFullYear()} Pedix Sports. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
