import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-50 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-primary min-w-[300px]"
        >
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-black">
            <ShoppingCart className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest">{message}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Añadido al carrito</p>
          </div>
          <CheckCircle className="size-5 text-emerald-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
