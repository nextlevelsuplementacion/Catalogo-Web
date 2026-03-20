export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
  flavors?: string[];
  flavorImages?: Record<string, string>;
}