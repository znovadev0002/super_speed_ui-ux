import type { Product } from '../types';

export const formatPrice = (price: number) => price.toLocaleString('en-US');

export const StarIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const HeartIcon = ({ filled, className = 'w-4 h-4' }: { filled: boolean; className?: string }) => (
  <svg
    className={`${filled ? 'fill-black stroke-black' : 'fill-none stroke-current text-gray-600'} ${className}`}
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const BackButton = ({ onPress }: { onPress: () => void }) => (
  <button
    onClick={onPress}
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </button>
);

export const CheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  variant?: 'grid' | 'wide';
}

export const ProductCard = ({
  product,
  onPress,
  isFavorite,
  onToggleFavorite,
  variant = 'grid',
}: ProductCardProps) => {
  if (variant === 'wide') {
    return (
      <div className="flex-shrink-0 w-44 cursor-pointer" onClick={onPress}>
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-48">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <HeartIcon filled={isFavorite} className="w-3.5 h-3.5" />
          </button>
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
              NEW
            </span>
          )}
        </div>
        <div className="mt-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
          <p className="text-sm font-semibold text-gray-900 leading-tight mt-0.5 line-clamp-1">{product.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-amber-400">
              <StarIcon className="w-3 h-3" />
            </span>
            <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
          </div>
          <p className="text-sm font-bold text-gray-900 mt-0.5">
            {formatPrice(product.price)}{' '}
            <span className="text-[10px] font-normal text-gray-500">MMK</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cursor-pointer" onClick={onPress}>
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <HeartIcon filled={isFavorite} className="w-3.5 h-3.5" />
        </button>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
            NEW
          </span>
        )}
        {product.isBestSeller && !product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
            HOT
          </span>
        )}
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
        <p className="text-sm font-semibold text-gray-900 leading-tight mt-0.5 line-clamp-1">{product.name}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-amber-400">
            <StarIcon className="w-3 h-3" />
          </span>
          <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-sm font-bold text-gray-900">
            {formatPrice(product.price)}{' '}
            <span className="text-[10px] font-normal text-gray-500">MMK</span>
          </p>
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const SectionHeader = ({
  title,
  onViewAll,
}: {
  title: string;
  onViewAll?: () => void;
}) => (
  <div className="flex justify-between items-center px-5 mb-4">
    <h2 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">{title}</h2>
    {onViewAll && (
      <button onClick={onViewAll} className="text-sm font-medium text-gray-500 active:text-black transition-colors">
        View All
      </button>
    )}
  </div>
);

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search products...',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-transparent text-sm text-gray-900 font-medium"
    />
    {value && (
      <button onClick={() => onChange('')} className="text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
    )}
  </div>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Processing: 'bg-amber-50 text-amber-700',
    Shipped: 'bg-blue-50 text-blue-700',
    Delivered: 'bg-emerald-50 text-emerald-700',
    Cancelled: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};
