import { useState } from 'react';
import type { Screen } from '../types';
import { products, categories } from '../data';
import { ProductCard, SectionHeader, HeartIcon, StarIcon, formatPrice } from '../components/UI';

interface HomeScreenProps {
  navigateTo: (screen: Screen) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  cartCount: number;
}

export default function HomeScreen({ navigateTo, favorites, onToggleFavorite, cartCount }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNew);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigateTo({ type: 'product-listing', category: 'all' });
    }
  };

  return (
    <div className="bg-white pb-4">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400 font-medium">Good morning,</p>
          <h1 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">Aung Kyaw</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
            onClick={() => navigateTo({ type: 'profile' })}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full" />
          </button>
          <button
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
            onClick={() => navigateTo({ type: 'profile' })}
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pb-5">
        <div
          className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 cursor-text"
          onClick={() => navigateTo({ type: 'product-listing', category: 'all' })}
        >
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="flex-1 text-sm text-gray-400 font-medium">Search for products...</span>
          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-5 mb-6">
        <div
          className="relative rounded-3xl overflow-hidden h-52 cursor-pointer"
          onClick={() => navigateTo({ type: 'product-listing', category: 'running' })}
        >
          <img
            src="https://images.unsplash.com/photo-1531520563951-4c0e3d3fcacc?w=800&h=450&fit=crop&auto=format"
            alt="New season collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">
              New Season 2024
            </p>
            <h2 className="font-display text-white text-4xl font-extrabold uppercase leading-none mb-3">
              DOMINATE
              <br />
              YOUR GAME
            </h2>
            <button className="bg-white text-black text-xs font-bold px-5 py-2 rounded-full self-start uppercase tracking-wider active:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <SectionHeader
          title="Categories"
          onViewAll={() => navigateTo({ type: 'categories' })}
        />
        <div className="flex gap-3 overflow-x-auto px-5 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex-shrink-0 flex flex-col items-center gap-2"
              onClick={() => navigateTo({ type: 'product-listing', category: cat.id })}
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight max-w-[60px]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Second Hero Banner */}
      <div className="px-5 mb-6">
        <div
          className="relative rounded-3xl overflow-hidden h-36 cursor-pointer"
          onClick={() => navigateTo({ type: 'product-listing', category: 'shoes' })}
        >
          <img
            src="https://images.unsplash.com/photo-1569664739361-5d5727ca3df9?w=800&h=300&fit=crop&auto=format"
            alt="Shoes collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-center items-end text-right">
            <p className="text-white/70 text-[10px] uppercase tracking-[0.15em] font-semibold">Limited Drop</p>
            <h3 className="font-display text-white text-2xl font-extrabold uppercase leading-tight">
              SIGNATURE
              <br />
              COLLECTION
            </h3>
            <button className="mt-2 border border-white text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-6">
        <SectionHeader
          title="Featured"
          onViewAll={() => navigateTo({ type: 'product-listing', category: 'all' })}
        />
        <div className="grid grid-cols-2 gap-3 px-5">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigateTo({ type: 'product-detail', productId: product.id })}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div className="mb-6">
        <SectionHeader
          title="Best Sellers"
          onViewAll={() => navigateTo({ type: 'product-listing', category: 'all' })}
        />
        <div className="flex gap-4 overflow-x-auto px-5 pb-1">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigateTo({ type: 'product-detail', productId: product.id })}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
              variant="wide"
            />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="mb-2">
        <SectionHeader
          title="New Arrivals"
          onViewAll={() => navigateTo({ type: 'product-listing', category: 'all' })}
        />
        <div className="grid grid-cols-2 gap-3 px-5">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigateTo({ type: 'product-detail', productId: product.id })}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
