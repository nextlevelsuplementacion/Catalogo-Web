import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const PRODUCTS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUIh24E74W12uWaOLzqbpkRefRsv5b2ePHcIKmlUA-Utp1m7w6vLQ88yTewOX8QM-RRNa66k3UbAJj/pub?gid=1249639291&single=true&output=csv";
const FLAVORS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUIh24E74W12uWaOLzqbpkRefRsv5b2ePHcIKmlUA-Utp1m7w6vLQ88yTewOX8QM-RRNa66k3UbAJj/pub?gid=1367866808&single=true&output=csv";

const CatalogPage: React.FC<CatalogPageProps> = ({ searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useProducts(
    PRODUCTS_URL,
    FLAVORS_URL
  );

  const initialBrand = searchParams.get('productBrand') ?? 'Todas';
  const initialCategory = searchParams.get('category') ?? 'Todos';
  const initialSort = (searchParams.get('sort') as SortOption) ?? 'default';

  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filterBrand,
    setFilterBrand,
    filteredProducts,
    brands
  } = useFilters(products, searchQuery, {
    initialBrand,
    initialCategory,
    initialSort
  });

  const handleBrandChange = (brand: string) => {
    setFilterBrand(brand);
    const params = new URLSearchParams(searchParams);

    if (brand === 'Todas') {
      params.delete('productBrand');
    } else {
      params.set('productBrand', brand);
    }

    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);

    if (category === 'Todos') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    setSearchParams(params);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    const params = new URLSearchParams(searchParams);

    if (sort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }

    setSearchParams(params);
  };

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const sortOptions = [
    { id: 'default', label: 'Recomendados' },
    { id: 'price-asc', label: 'Menor Precio' },
    { id: 'price-desc', label: 'Mayor Precio' },
    { id: 'name', label: 'Nombre A-Z' }
  ];

  const brandOptions = brands.map(b => ({ id: b, label: b }));

  useEffect(() => {
    const urlBrand = searchParams.get('productBrand') ?? 'Todas';
    const urlCategory = searchParams.get('category') ?? 'Todos';
    const urlSort = (searchParams.get('sort') as SortOption) ?? 'default';

    if (urlBrand !== filterBrand) {
      setFilterBrand(urlBrand);
    }

    if (urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }

    if (urlSort !== sortBy) {
      setSortBy(urlSort);
    }
  }, [searchParams, filterBrand, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={handleCategoryChange} 
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
              onChange={handleBrandChange}
              isOpen={isBrandOpen}
              setIsOpen={(open) => {
                setIsBrandOpen(open);
                if (open) setIsSortOpen(false);
              }}
              icon={<Filter className="size-6" />}
            />
            <Dropdown 
              label="ORDENAR"
              value={sortBy}
              options={sortOptions}
              onChange={(id) => handleSortChange(id as SortOption)}
              isOpen={isSortOpen}
              setIsOpen={(open) => {
                setIsSortOpen(open);
                if (open) setIsBrandOpen(false);
              }}
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