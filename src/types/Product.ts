export interface Flavor {
  productId: string; // útil para el merge desde CSV
  name: string;
  image: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock?: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
  flavors?: Flavor[];
}