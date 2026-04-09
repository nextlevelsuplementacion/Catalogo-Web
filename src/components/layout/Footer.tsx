import React from 'react';
import { Bolt, ShieldCheck, Bell } from 'lucide-react';
import Isologo from '@/src/utils/isologotipo';

const Footer: React.FC = () => {
  return (
    <footer className="group max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-zinc-800 mt-auto w-full">
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-bold text-xl text-black dark:text-white">
          <Isologo className="w-6 h-6 fill-current text-black dark:text-white transition-colors duration-300 group-hover:text-primary" />
          <span>Next Level</span>
        </div>
        <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 hidden md:block"></div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          <ShieldCheck className="size-5 text-primary" />
          Catálogo
        </div>
        {/* <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Bell className="size-5 text-primary" />
          Soporte 24/7
        </div> */}
      </div>
      <div className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        © {new Date().getFullYear()} Next Level. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;