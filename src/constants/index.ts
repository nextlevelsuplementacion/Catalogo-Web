// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   oldPrice?: number;
//   category: string;
//   image: string;
//   description: string;
//   badge?: string;
//   flavors?: string[];
//   flavorImages?: Record<string, string>;
// }

export interface CartItem{
  quantity: number;
  selectedFlavor?: string;
}

// export const MOCK_POINTS: Record<string, number> = {
//   '12345678': 1500,
//   '87654321': 500,
//   '11111111': 2500,
// };

export const MOCK_DISCOUNTS: Record<string, number> = {
  'PEDIX20': 0.2,
  'BIENVENIDO': 0.1,
  'PROELITE': 0.25,
};

// export const PRODUCTS: Product[] = [
//   {
//     id: '1',
//     name: 'Premium Whey Protein',
//     brand: 'Star Nutrition',
//     price: 32500,
//     category: 'Nutrición',
//     image: 'https://images.unsplash.com/photo-1593095191850-2a733009e0bb?auto=format&fit=crop&q=80&w=800',
//     description: 'Proteína de suero • 1kg',
//     badge: 'Nuevo',
//     flavors: ['Vainilla', 'Chocolate', 'Frutilla', 'Cookies & Cream'],
//     flavorImages: {
//       'Vainilla': 'https://images.unsplash.com/photo-1593095191850-2a733009e0bb?auto=format&fit=crop&q=80&w=800',
//       'Chocolate': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
//       'Frutilla': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=800',
//       'Cookies & Cream': 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=800'
//     }
//   },
//   {
//     id: '2',
//     name: 'Creatina Micronizada',
//     brand: 'ENA Sport',
//     price: 28900,
//     category: 'Nutrición',
//     image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
//     description: 'Fuerza y Potencia • 300g',
//     flavors: ['Neutro', 'Limón', 'Frutos Rojos'],
//     flavorImages: {
//       'Neutro': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
//       'Limón': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
//       'Frutos Rojos': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800'
//     }
//   },
//   {
//     id: '3',
//     name: 'Pre-Work Explosive',
//     brand: 'X-TREME',
//     price: 16500,
//     oldPrice: 21000,
//     category: 'Nutrición',
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
//     description: 'Energía extrema • 250g',
//     badge: 'Oferta',
//     flavors: ['Manzana Verde', 'Blue Razz', 'Sandía'],
//     flavorImages: {
//       'Manzana Verde': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
//       'Blue Razz': 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
//       'Sandía': 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=800'
//     }
//   },
//   {
//     id: '4',
//     name: 'Multi Vit Complex',
//     brand: 'Nutrex',
//     price: 14200,
//     category: 'Nutrición',
//     image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
//     description: 'Salud y Bienestar • 90 Caps'
//   },
//   {
//     id: '5',
//     name: 'AlphaBoost Pro',
//     brand: 'Pedix',
//     price: 45500,
//     category: 'Calzado',
//     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
//     description: 'Zapatillas de Running de alto rendimiento'
//   },
//   {
//     id: '6',
//     name: 'Remera TechFit X',
//     brand: 'Pedix',
//     price: 12900,
//     category: 'Entrenamiento',
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
//     description: 'Remera técnica respirable'
//   }
// ];

export const CATEGORIES = [
  { name: 'Todos', icon: 'LayoutGrid' },
  { name: 'Creatinas', icon: 'Footprints' },
  { name: 'Proteinas', icon: 'Dumbbell' },
  { name: 'Barras Proteicas', icon: 'Watch' },
  { name: 'Geles', icon: 'ShoppingBag' },
  { name: 'Quemadores', icon: 'ShoppingBag' },
  { name: 'Magnesios', icon: 'ShoppingBag' },
  { name: 'Colágenos', icon: 'ShoppingBag' },
  { name: 'Pre-Entrenos', icon: 'ShoppingBag' },
  { name: 'Aminoacidos', icon: 'Leaf' }
];
