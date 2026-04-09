import React, { useState } from 'react';
import { ArrowLeft, Wallet, Landmark, ShoppingBasket, MessageCircle, Lock, Truck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';
import { MOCK_DISCOUNTS } from '../constants';

interface CheckoutPageProps {
  setPage: (page: 'catalog' | 'checkout' | 'points') => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ setPage }) => {
  const { cart, cartTotal } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const discountAmount = cartTotal * discount;
  const finalTotal = cartTotal - discountAmount;

  const applyCoupon = () => {
    const d = MOCK_DISCOUNTS[coupon.toUpperCase()];
    if (d) {
      setDiscount(d);
    } else {
      alert('Cupón inválido');
    }
  };

  const handleWhatsAppOrder = () => {
    if (!name || !address) {
      alert('Por favor, completa tu nombre y dirección.');
      return;
    }

    const phoneNumber = '5493576654177';
    const itemsList = cart.map(item => 
      `• ${item.name} (x${item.quantity})${item.selectedFlavor ? ` [${item.selectedFlavor}]` : ''} - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');

    const message = `*NUEVO PEDIDO - Next Level*\n\n` +
      `*Cliente:* ${name}\n` +
      `*Dirección:* ${address}\n` +
      `*Pago:* ${paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}\n\n` +
      `*Detalle del pedido:*\n${itemsList}\n\n` +
      (discount > 0 ? `*Subtotal:* ${formatCurrency(cartTotal)}\n*Descuento:* ${Math.round(discount * 100)}%\n` : '') +
      `*TOTAL FINAL: ${formatCurrency(finalTotal)}*\n\n` +
      `_Enviado desde la web_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] dark:bg-[#0A0A05] text-slate-900 dark:text-slate-100 font-sans px-6 py-12">
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Form */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Finalizar Compra</h1>
            <p className="text-slate-500 dark:text-slate-400">Completa tus datos para enviarnos tu pedido por WhatsApp.</p>
          </div>

          <div className="space-y-6">
            {/* Section 1: Contact */}
            <div className="p-8 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</span>
                <h2 className="text-xl font-semibold">Información de Contacto</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Nombre Completo</label>
                  <input 
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-transparent border border-slate-300 dark:border-zinc-700 rounded-full focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Dirección de Entrega</label>
                  <input 
                    type="text"
                    placeholder="Calle, número, departamento y ciudad"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-6 py-4 bg-transparent border border-slate-300 dark:border-zinc-700 rounded-full focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Payment */}
            <div className="p-8 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</span>
                <h2 className="text-xl font-semibold">Método de Pago</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary/10'
                      : 'border-slate-300 dark:border-zinc-700 bg-transparent'
                  }`}
                >
                  <Wallet className={`size-8 ${paymentMethod === 'cash' ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="font-medium">Efectivo</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                    paymentMethod === 'transfer'
                      ? 'border-primary bg-primary/10'
                      : 'border-slate-300 dark:border-zinc-700 bg-transparent'
                  }`}
                >
                  <Landmark className={`size-8 ${paymentMethod === 'transfer' ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="font-medium">Transferencia</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:w-[400px]">
          <div className="p-8 rounded-xl border border-primary/10 shadow-xl lg:sticky lg:top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBasket className="size-6 text-primary" />
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedFlavor}`} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-transparent overflow-hidden flex-shrink-0">
                    <img 
                      src={item.flavorImages?.[item.selectedFlavor || ''] || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.selectedFlavor && `${item.selectedFlavor} • `}Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Código de Descuento</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text"
                  placeholder="Ingresá tu código"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-slate-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm uppercase placeholder:normal-case"
                />
                <button 
                  onClick={applyCoupon}
                  className="w-full sm:w-auto px-6 bg-primary text-black font-bold rounded-xl text-sm hover:scale-105 transition-transform py-3"
                >
                  Aplicar
                </button>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6 space-y-3">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Envío</span>
                <span className="text-primary font-medium">Gratis</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary text-sm font-medium">
                  <span>Descuento ({Math.round(discount * 100)}%)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold pt-2">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-primary hover:bg-primary/90 font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20 text-black text-sm sm:text-base"
              >
                <MessageCircle className="size-5 flex-shrink-0" />
                <span className="truncate">Enviar Pedido por WhatsApp</span>
              </button>
              <p className="text-xs text-center text-slate-400 leading-relaxed">
                Serás redirigido a WhatsApp para finalizar el pago y coordinar el envío.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-primary/10 pt-6">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                <Lock className="size-3 text-primary" />
                Datos Encriptados
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                <Truck className="size-3 text-primary" />
                Envío Express
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CheckoutPage;