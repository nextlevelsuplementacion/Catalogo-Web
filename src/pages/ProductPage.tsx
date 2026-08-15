import { useState } from 'react';
import { ShoppingBag, Minus, Plus, Truck, CheckCircle, BarChart3, Dumbbell, ShoppingCart } from 'lucide-react';

export default function ProductPage() {
    const [selectedFlavor, setSelectedFlavor] = useState('Vainilla');
    const flavorOptions = ['Vainilla', 'Double Chocolate', 'Frutos Rojos'];

    return (
        <main className="mx-auto w-full max-w-7xl text-slate-900 dark:text-slate-100">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 lg:p-8">
                <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col gap-4 lg:col-span-7">
                        <div className="group aspect-square w-full overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-zinc-800/70">
                            <img
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-3CDCPuWUAgjbL2tswHULHcZq5DLTC7qz5fxO7w4zqY2C5ediNFgSPu8Y-MSbsrefZxmEluvZXGGiCkjPoEZ54bplQbeCWtNHa2Bq4ToT3wvx6mwQ3plG0JvIaiePkWw7_zAGX5fKY__vHo0SKOzjxA7yvQnA-f9u51siI2SZTZzrDtXYIO7Kw1rgwWKvIOEr4aciVOqSxkIK1-lnTdoYszSvkjac6Qwf_PvDbEkNQdPyZodEgAj6_0NjY5jipUsDjm6T1SiJkAeD"
                                alt="Premium Whey Protein"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDZTbkCb91H4k6KjLASBjwkGqRloONNtCBlmiQuj2QFQk62XHeb-5Gs2QG_aNSF01VbVlERiqWmc0TMJIuY8TMSrYKRArxDVWtAy5d1rf-fUQLlhPhQ72EQbgWAr4uvaZAwh1Fe9iYFSvSokqlqw973JCcfG0U1s9UUJIBV-0FOqN7TVP9deUr3jAl-01BFHanMfQGIibH2z765YolIbCQPzWmU_HKUAfyYfoY0p4dNE48K9EQeqopFi7XwImabeYfXHtFDmtNBNzg5',
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZrBxSqEzn9BcYjD-2PdScAV2b2ZdZerMdKbPUV29atEIXD0YuW0cE0nxKUjsFiEY48MMhBOiQy85-xSMBX07B5wFYlYBC8eUlECI0UWWL-FevVvgySBGDs_clcIKMrQegk6b4E5tUxGUQ6ceaoKgop3rt0p36zA8U8dksREKL2rBdHJC7J04BOEqx0WaL3h7_V1flsSSuvjq_hWu4k0d_RQBqHOKM0aB0TUlBjR1rjtrD4xDVuvQBofJECorQLbJwqeG_z9Y78Da',
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuBbdzK4MXxCTbUBuHzNHJ-Kp2pq9HWuuNN7M-jobtwIJMKu3eRJUqKBDrc6wFkToFSfEQqvXDRte0JPuHRPYnSNRbQm6ykEETDPQa2d3KABAdKchnCFD1d6CPReafxx4n6RGnuYSZAtZHFybWq6LKA8Q_vQ3MNHPVQ3nKVJRkojYL32cBT-g1hi60B_CALQTSb5tkEGSe57LD4BwfkQhploORrFeWZHpItbxHPBUoQawJwchhnXrE_KEcfmZYuTgSGkD8guw2HquXcy',
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuBZsLaN-rp_d1fZ5PrRki5woQs11cOsTEDgf7zCRjKW2vVuoznnk-_B0b-EopvzKXoA1HvUQZCyS9g5v7HnsaJTt1W8wQzRW8x8zSQeESl0muui_8lmIer2XqLvPwd8DGWDoLUEh61xeNxuMIZ5j5iY3jZh8i_A_j-gWES00MvvkbUFqmJESUGCBAM-sYj05Sj76c15Enu0ErTQoaXFtYhhKjRiOZag6PGTmzLtmW_Ct6BdWJJvoTlDvPGpTbS-rhQ4uN5o2KTsCRE1'
                            ].map((src, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-[1rem] bg-slate-100 opacity-70 transition-opacity hover:opacity-100 dark:bg-zinc-800">
                                    <img className="h-full w-full object-cover" src={src} alt="Vista adicional del producto" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:col-span-5">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="w-max rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                Premium Series
                            </span>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">SKU: STAR-WHEY-01</span>
                        </div>
                        <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter sm:text-4xl">Premium Whey Protein</h1>
                        <p className="mb-6 text-lg font-bold text-primary">Star Nutrition</p>
                        <div className="mb-8 flex flex-wrap items-baseline gap-4">
                            <span className="text-3xl font-black sm:text-4xl">
                                $32.500 <span className="text-lg font-bold text-slate-500 dark:text-slate-400">ARS</span>
                            </span>
                            <span className="text-sm font-semibold text-slate-400 line-through dark:text-slate-500">$38.900</span>
                        </div>

                        <div className="mb-8">
                            <label className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                                Seleccionar Sabor
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {flavorOptions.map((flavor) => (
                                    <button
                                        key={flavor}
                                        onClick={() => setSelectedFlavor(flavor)}
                                        className={`flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${selectedFlavor === flavor ? 'border-primary bg-primary/10 text-slate-900 shadow-sm shadow-primary/20 dark:text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-300'}`}
                                    >
                                        <span>{flavor}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                                            {selectedFlavor === flavor ? 'En stock' : ''}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-zinc-800 dark:bg-zinc-800/70">
                                    <button className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:text-primary dark:text-slate-300">
                                        <Minus />
                                    </button>
                                    <span className="w-10 text-center font-black">1</span>
                                    <button className="flex h-10 w-10 items-center justify-center text-slate-500 transition-colors hover:text-primary dark:text-slate-300">
                                        <Plus />
                                    </button>
                                </div>
                            </div>
                            <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-lg font-black uppercase tracking-[0.3em] text-black transition-all hover:shadow-[0_0_20px_rgba(150,255,0,0.25)]">
                                <ShoppingBag />
                                Añadir al carrito
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-8 dark:border-zinc-800 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Truck className="text-primary" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.3em]">Envío Rápido</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">24-48hs</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-primary" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.3em]">100% Original</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Garantía</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50 sm:p-7">
                        <div className="mb-6 flex items-center gap-3">
                            <BarChart3 className="text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.3em]">Información Nutricional</h3>
                        </div>
                        <div className="space-y-4">
                            {[{ l: 'Proteína', v: '25g' }, { l: 'BCAAs', v: '5.5g' }, { l: 'Glutamina', v: '4g' }].map((item) => (
                                <div key={item.l} className="flex justify-between border-b border-slate-200 pb-2 dark:border-zinc-700">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{item.l}</span>
                                    <span className="text-sm font-black">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50 sm:p-7">
                        <div className="mb-6 flex items-center gap-3">
                            <Dumbbell className="text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.3em]">Modo de Uso</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="mb-2 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Preparación</h4>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Mezclar 1 scoop (30g) con 200-250ml de agua fría o leche descremada. Agitar en shaker por 30 segundos.</p>
                            </div>
                            <div>
                                <h4 className="mb-2 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Cuándo tomar</h4>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Consumir inmediatamente después del entrenamiento o como snack proteico a media mañana.</p>
                            </div>
                            <div className="rounded-r-md border-l-2 border-primary bg-primary/5 p-3">
                                <p className="text-[11px] font-black uppercase italic tracking-[0.24em] text-primary">Tip Pro: Usar agua bien helada para una mejor textura y sabor.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div className="mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tighter sm:text-3xl">
                            Productos Relacionados
                        </h2>

                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                            También te puede interesar
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {[{ name: 'Creatina Monohidrato', price: '$18.900' }, { name: 'Shaker Pro Series', price: '$6.200' }, { name: 'Pre-Workout Pump', price: '$24.500' }, { name: 'Elite Multivitamin', price: '$15.800' }].map((p) => (
                            <div key={p.name} className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="aspect-square bg-slate-100 dark:bg-zinc-800" />
                                <div className="p-5">
                                    <h4 className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">{p.name}</h4>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="font-black text-slate-900 dark:text-white">{p.price}</span>
                                        <button className="rounded-full bg-slate-100 p-2 text-primary transition-colors hover:bg-primary hover:text-black dark:bg-zinc-800">
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
