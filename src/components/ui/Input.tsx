import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <input 
        className={`w-full px-5 py-3 bg-slate-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
