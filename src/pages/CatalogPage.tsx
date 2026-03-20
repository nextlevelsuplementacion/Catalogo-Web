import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';
// import { PRODUCTS } from '../constants';
import { useProducts } from '../hooks/useProducts';
import { useFilters, SortOption } from '../hooks/useFilters';
import Sidebar from '../components/layout/Sidebar';
import ProductGrid from '../components/product/ProductGrid';
import Dropdown from '../components/ui/Dropdown';

interface CatalogPageProps {
  searchQuery: string;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ searchQuery }) => {
  const { products, loading, error } = useProducts(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSUIh24E74W12uWaOLzqbpkRefRsv5b2ePHcIKmlUA-Utp1m7w6vLQ88yTewOX8QM-RRNa66k3UbAJj/pub?gid=0&single=true&output=csv'
  );

  const [imagesReady, setImagesReady] = useState(false);

  // useEffect(() => {
  //   const allImages = products.flatMap(p => [
  //     p.image,
  //     ...(p.flavorImages ? Object.values(p.flavorImages) : [])
  //   ]);

  //   preloadImages(allImages).then(() => {
  //     setImagesReady(true);
  //   });
  // }, [products]);

  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filterBrand,
    setFilterBrand,
    filteredProducts,
    brands
  } = useFilters(products, searchQuery);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const sortOptions = [
    { id: 'default', label: 'Recomendados' },
    { id: 'price-asc', label: 'Menor Precio' },
    { id: 'price-desc', label: 'Mayor Precio' },
    { id: 'name', label: 'Nombre A-Z' }
  ];

  const brandOptions = brands.map(b => ({ id: b, label: b }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <main className="flex-1 min-w-0 space-y-16">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16 border-b-4 border-slate-900 dark:border-white pb-8">
        {/* header y filtros */}
          <div className="space-y-4 min-w-0 flex-1">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] select-none break-normal py-2">
              {selectedCategory}
            </h2>
            <div className="flex items-center gap-4">
              <span className="bg-primary text-black px-4 py-1 text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">{filteredProducts.length} ITEMS</span>
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">DISPONIBLES AHORA</span>
            </div>
          </div>
          {/* ...título y conteo de items */}
          <div className="flex flex-wrap items-center gap-4 xl:justify-end flex-shrink-0">
            <Dropdown 
              label="MARCA"
              value={filterBrand}
              options={brandOptions}
              onChange={(id) => setFilterBrand(id)}
              isOpen={isBrandOpen}
              setIsOpen={setIsBrandOpen}
              icon={<Filter className="size-6" />}
            />
            <Dropdown 
              label="ORDENAR"
              value={sortBy}
              options={sortOptions}
              onChange={(id) => setSortBy(id as SortOption)}
              isOpen={isSortOpen}
              setIsOpen={setIsSortOpen}
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading && (
          <p className="text-center text-slate-500 dark:text-zinc-400">
            Cargando productos...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
    </div>
  );
};

export default CatalogPage;