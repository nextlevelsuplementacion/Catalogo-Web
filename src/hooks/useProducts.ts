import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface Flavor {
  productId: string;
  name: string;
  image: string;
  stock: number;
}

export const useProducts = (productsUrl: string, flavorsUrl: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, flavorsRes] = await Promise.all([
          fetch(productsUrl),
          fetch(flavorsUrl)
        ]);

        const productsText = await productsRes.text();
        const flavorsText = await flavorsRes.text();

        // --------------------
        // PARSE PRODUCTS
        // --------------------
        const productRows = productsText.split('\n').slice(1);

        const parsedProducts: Product[] = productRows
          .filter(row => row.trim())
          .map(row => {
            const [
              id,
              name,
              brand,
              price,
              oldPrice,
              stock,
              category,
              image,
              description,
              badge
            ] = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

            return {
              id,
              name,
              brand,
              price: Number(price),
              oldPrice: oldPrice ? Number(oldPrice) : undefined,
              stock: stock ? Number(stock) : undefined,
              category,
              image,
              description,
              badge: badge || undefined,
              flavors: undefined
            };
          });

        // --------------------
        // PARSE FLAVORS
        // --------------------
        const flavorRows = flavorsText.split('\n').slice(1);

        const parsedFlavors: Flavor[] = flavorRows
          .filter(row => row.trim())
          .map(row => {
            const [productId, name, image, stock] = row.split(',');

            return {
              productId,
              name,
              image,
              stock: Number(stock)
            };
          });

        // --------------------
        // MERGE PRODUCTS + FLAVORS
        // --------------------
        const productsWithFlavors: Product[] = parsedProducts.map(product => {
          const productFlavors = parsedFlavors.filter(
            f => f.productId === product.id
          );

          return {
            ...product,
            flavors: productFlavors.length > 0 ? productFlavors : undefined
          };
        });

        setProducts(productsWithFlavors);
        setError(null);
      } catch (err: any) {
        console.error('Error cargando productos:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productsUrl, flavorsUrl]);

  return { products, loading, error };
};