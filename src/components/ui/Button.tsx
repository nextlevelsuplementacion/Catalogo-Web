import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-tight transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-black hover:shadow-[0_0_15px_rgba(150,255,0,0.4)]',
    secondary: 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-zinc-700',
    outline: 'border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 hover:border-primary/50',
    ghost: 'hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-500 hover:text-primary'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-full',
    lg: 'px-8 py-4 text-sm rounded-full',
    icon: 'size-10 rounded-full'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
