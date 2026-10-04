import type { Screen } from '../types';
import { categories } from '../data';

interface CategoriesScreenProps {
  navigateTo: (screen: Screen) => void;
}

export default function CategoriesScreen({ navigateTo }: CategoriesScreenProps) {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Browse all sport categories</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 px-5 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="relative rounded-2xl overflow-hidden h-36 text-left active:scale-[0.98] transition-transform"
            onClick={() => navigateTo({ type: 'product-listing', category: cat.id })}
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-display text-white text-xl font-bold uppercase leading-tight">{cat.name}</h3>
              <p className="text-white/70 text-[10px] font-medium mt-0.5">{cat.count} products</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
