import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  isOpen,
  setIsOpen,
  icon,
  className = ''
}) => {
  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-900 rounded-full text-xs font-bold border border-transparent hover:border-primary transition-all"
      >
        {label}: {selectedOption?.label || value} 
        {icon || <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-48 sm:w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-slate-200 dark:border-zinc-800 z-50 overflow-hidden"
          >
            <div className="py-1">
              {options.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between ${value === opt.id ? 'text-primary bg-primary/5' : ''}`}
                >
                  {opt.label}
                  {value === opt.id && <Check className="size-3" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
