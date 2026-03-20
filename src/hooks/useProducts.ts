import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

export const useProducts = (csvUrl: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para parsear campos de CSV que vienen como strings JSON
  const parseCSVField = (field: string) => {
  if (!field) return undefined;
  try {
    // Quita comillas externas si existen
    const trimmed = field.trim();
    const cleaned = trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;
    // Reemplaza comillas dobles duplicadas internas
    const normalized = cleaned.replace(/""/g, '"');
    return JSON.parse(normalized);
  } catch (e) {
    console.warn("No se pudo parsear el campo:", field);
    return undefined;
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(csvUrl, { cache: "no-store" }); // NO cache
        const text = await res.text();

        // Separar filas y saltar encabezado
        const filas = text.split('\n').slice(1);

        const datos: Product[] = filas
          .filter(f => f.trim())
          .map(fila => {
            // Separar respetando comas dentro de comillas
            const [
              id, name, brand, price, oldPrice, category,
              image, description, badge, flavors, flavorImages
            ] = fila.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

            return {
              id,
              name,
              brand,
              price: Number(price),
              oldPrice: oldPrice ? Number(oldPrice) : undefined,
              category,
              image,
              description,
              badge: badge || undefined,
              flavors: parseCSVField(flavors),
              flavorImages: parseCSVField(flavorImages),
            };
          });

        setProducts(datos);
        setLoading(false);
      } catch (err: any) {
        console.error("Error cargando productos:", err);
        setError(err.message || "Error desconocido");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [csvUrl]);

  return { products, loading, error };
};