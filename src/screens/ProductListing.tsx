import { useState } from 'react';
import type { Screen } from '../types';
import { products, categories } from '../data';
import { ProductCard, BackButton, SearchBar } from '../components/UI';

interface ProductListingProps {
  category: string;
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const categoryMap: Record<string, string> = {
  football: 'Football',
  running: 'Running',
  basketball: 'Basketball',
  gym: 'Gym & Fitness',
  tennis: 'Tennis',
  cycling: 'Cycling',
  sportswear: 'Sportswear',
  shoes: 'Shoes',
  accessories: 'Accessories',
  equipment: 'Equipment',
  all: 'All Products',
};

const sortOptions = ['Recommended', 'Price: Low-High', 'Price: High-Low', 'Rating', 'Newest'];

export default function ProductListingScreen({
  category,
  navigateTo,
  goBack,
  favorites,
  onToggleFavorite,
}: ProductListingProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Recommended');
  const [showSort, setShowSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categoryName = categoryMap[category] || category;
  const catObj = categories.find((c) => c.id === category);

  let filtered = products;

  if (category !== 'all') {
    filtered = filtered.filter((p) => p.category === categoryName);
    if (filtered.length === 0) {
      filtered = products;
    }
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }

  if (sort === 'Price: Low-High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'Price: High-Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'Rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === 'Newest') filtered = [...filtered].filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));

  return (
    <div className="bg-white min-h-full pb-4">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <BackButton onPress={goBack} />
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {catObj ? `${catObj.count} products` : `${filtered.length} products`}
          </p>
          <h1 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight leading-tight">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="px-5 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search in category..." />
      </div>

      {/* Sort + Filter Bar */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto pb-0.5">
        <button
          className="flex-shrink-0 flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 active:bg-gray-50"
          onClick={() => setShowSort(!showSort)}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          {sort}
        </button>
        {['New', 'Best Seller', 'Sale'].map((f) => (
          <button
            key={f}
            className={`flex-shrink-0 border rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              activeFilter === f
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-700 active:bg-gray-50'
            }`}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      {showSort && (
        <div className="mx-5 mb-4 border border-gray-200 rounded-2xl overflow-hidden">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${
                sort === opt ? 'bg-black text-white' : 'text-gray-700 active:bg-gray-50'
              }`}
              onClick={() => {
                setSort(opt);
                setShowSort(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <p className="text-gray-400 text-sm">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigateTo({ type: 'product-detail', productId: product.id })}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
