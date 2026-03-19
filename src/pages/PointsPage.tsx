import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Gift, Zap, Lock, MapPin, Bell, UserCircle, Home, Ticket, User, Search, AlertCircle } from 'lucide-react';
import { usePoints } from '../hooks/usePoints';
import { formatNumber } from '../utils/helpers';

const PointsPage: React.FC = () => {
  const {
    dniInput,
    setDniInput,
    userPoints,
    lastCheckedDni,
    dniError,
    checkPoints
  } = usePoints();

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white font-sans pb-24 lg:pb-12 transition-colors duration-500 overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-6 py-4">
        {/* Hero & Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Input Area */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 leading-none text-slate-900 dark:text-white">
                SportPoints - <span className="text-primary">Consulta tus Puntos</span>
              </h1>
              <p className="text-slate-500 dark:text-zinc-400 text-lg max-w-xl mb-8">
                Ingresa tu DNI para ver tus puntos acumulados y canjearlos por descuentos exclusivos.
              </p>
            </motion.div>

            <div className="bg-slate-50 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-primary/10 p-8 rounded-2xl max-w-md relative overflow-hidden shadow-xl dark:shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-500">
                    DNI (sin puntos ni espacios)
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej: 12345678"
                    value={dniInput}
                    onChange={(e) => setDniInput(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white rounded-xl py-4 px-5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                </div>
                <button 
                  onClick={checkPoints}
                  className="w-full bg-primary text-black font-black uppercase italic py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(150,255,0,0.3)]"
                >
                  Consultar Puntos
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Result */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {userPoints !== null ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-between shadow-xl dark:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Star className="size-5 text-primary fill-current" />
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 dark:text-zinc-500">Resumen de Cuenta</span>
                    </div>
                    <div className="space-y-1 mb-10">
                      <p className="text-sm text-slate-500 dark:text-zinc-400">Balance actual</p>
                      <h2 className="text-5xl font-black italic text-slate-900 dark:text-white leading-none">
                        Tienes <span className="text-primary">{formatNumber(userPoints)}</span> puntos
                      </h2>
                    </div>
                    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl border-l-4 border-primary mb-8 shadow-sm">
                      <p className="text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-2">¡Casi llegas!</p>
                      <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
                        ¡Te faltan {formatNumber(Math.max(0, 2000 - userPoints))} puntos para tu próximo descuento de 25%!
                      </p>
                      <div className="mt-4 w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (userPoints / 2000) * 100)}%` }}
                          className="bg-primary h-full shadow-[0_0_8px_#96ff00]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 text-center shadow-sm">
                      <p className="text-xs text-slate-400 dark:text-zinc-500 uppercase font-bold">Nivel</p>
                      <p className="text-lg font-black italic text-slate-900 dark:text-white uppercase">Pro-Elite</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 text-center shadow-sm">
                      <p className="text-xs text-slate-400 dark:text-zinc-500 uppercase font-bold">Próximo</p>
                      <p className="text-lg font-black italic text-primary uppercase">Platinum</p>
                    </div>
                  </div>
                </motion.div>
              ) : dniError ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50/50 dark:bg-zinc-900/40 border border-dashed border-red-200 dark:border-red-900/50 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                >
                  <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                    <AlertCircle className="size-8 text-red-500" />
                  </div>
                  <p className="text-red-500 font-bold uppercase italic tracking-widest max-w-[280px] leading-tight">
                    {dniError}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50/50 dark:bg-zinc-900/40 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                >
                  <Search className="size-12 text-slate-300 dark:text-zinc-700" />
                  <p className="text-slate-400 dark:text-zinc-500 font-bold uppercase italic tracking-widest">Esperando consulta...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">Listado de beneficios</h3>
              <p className="text-slate-500 dark:text-zinc-500 text-sm">Canjea tus puntos acumulados por descuentos directos.</p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow mx-8 bg-slate-200 dark:bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="bg-slate-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-12">
                <Ticket className="size-8 text-slate-400 dark:text-zinc-600 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-500 bg-slate-200 dark:bg-zinc-800 px-3 py-1 rounded-full uppercase">Básico</span>
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest">500 puntos</p>
                <h4 className="text-4xl font-black italic text-slate-900 dark:text-white uppercase leading-none">5% OFF</h4>
              </div>
              <button className="mt-8 w-full border border-slate-300 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 py-3 rounded-xl font-bold uppercase text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                Desbloqueado
              </button>
            </div>

            {/* Benefit 2 */}
            <div className="bg-slate-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-12">
                <Zap className="size-8 text-slate-400 dark:text-zinc-600 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Popular</span>
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest">1000 puntos</p>
                <h4 className="text-4xl font-black italic text-slate-900 dark:text-white uppercase leading-none">10% OFF</h4>
              </div>
              <button className="mt-8 w-full border border-primary text-primary py-3 rounded-xl font-bold uppercase text-xs hover:bg-primary hover:text-black transition-all">
                Canjear ahora
              </button>
            </div>

            {/* Benefit 3 */}
            <div className="bg-slate-100 dark:bg-zinc-950 p-8 rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700 opacity-70">
              <div className="flex justify-between items-start mb-12">
                <Lock className="size-8 text-slate-300 dark:text-zinc-700" />
                <span className="text-xs font-bold text-slate-400 dark:text-zinc-600 bg-slate-200 dark:bg-zinc-900 px-3 py-1 rounded-full uppercase">Premium</span>
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 dark:text-zinc-600 text-sm font-bold uppercase tracking-widest">2000 puntos</p>
                <h4 className="text-4xl font-black italic text-slate-300 dark:text-zinc-600 uppercase leading-none">25% OFF</h4>
              </div>
              <p className="mt-8 text-center text-xs text-slate-400 dark:text-zinc-600 font-bold uppercase italic">Faltan 500 pts</p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-24">
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 group">
            <img 
              src="https://picsum.photos/seed/map/1200/600?grayscale" 
              alt="Tiendas" 
              className="w-full h-full object-cover opacity-60 dark:opacity-40 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-white/40 dark:via-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 max-w-sm">
              <h3 className="text-3xl font-black italic text-slate-900 dark:text-white uppercase leading-tight mb-2">Encuentra tu tienda más cercana</h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6">Usa tus puntos en cualquiera de nuestras 50+ sucursales físicas.</p>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs px-8 py-4 rounded-xl hover:bg-primary dark:hover:bg-primary transition-colors">
                Ver Mapa
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PointsPage;