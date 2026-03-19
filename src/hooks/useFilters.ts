import { useState, useMemo } from 'react';
import { Product } from '../constants';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

export const useFilters = (products: Product[], initialSearchQuery: string = '') => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterBrand, setFilterBrand] = useState<string>('Todas');

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(initialSearchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(initialSearchQuery.toLowerCase());
      const matchesBrand = filterBrand === 'Todas' || p.brand === filterBrand;
      return matchesCategory && matchesSearch && matchesBrand;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, initialSearchQuery, sortBy, filterBrand]);

  const brands = useMemo(() => {
    const b = new Set(products.map(p => p.brand));
    return ['Todas', ...Array.from(b)];
  }, [products]);

  return {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filterBrand,
    setFilterBrand,
    filteredProducts,
    brands
  };
};
