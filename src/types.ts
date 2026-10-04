export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  description: string;
  info: { label: string; value: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  address: string;
  phone: string;
  trackingNumber?: string;
}

export type Tab = 'home' | 'categories' | 'cart' | 'orders' | 'profile';

export type Screen =
  | { type: 'home' }
  | { type: 'categories' }
  | { type: 'product-listing'; category: string }
  | { type: 'product-detail'; productId: string }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'orders' }
  | { type: 'order-detail'; orderId: string }
  | { type: 'profile' }
  | { type: 'favorites' }
  | { type: 'saved-addresses' }
  | { type: 'edit-profile' };

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}
