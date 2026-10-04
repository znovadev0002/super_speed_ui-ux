import { useState } from 'react';
import type { Screen, CartItem } from '../types';
import { products } from '../data';
import { HeartIcon, StarIcon, formatPrice, BackButton } from '../components/UI';

interface ProductDetailProps {
  productId: string;
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetailScreen({
  productId,
  navigateTo,
  goBack,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: ProductDetailProps) {
  const product = products.find((p) => p.id === productId) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isFavorite = favorites.includes(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart({ product, quantity, selectedColor, selectedSize });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    onAddToCart({ product, quantity, selectedColor, selectedSize });
    navigateTo({ type: 'cart' });
  };

  return (
    <div className="bg-white min-h-full pb-4">
      {/* Image Gallery */}
      <div className="relative bg-gray-100">
        <img
          src={product.images[selectedImage] || product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <BackButton onPress={goBack} />
          <div className="flex gap-2">
            <button
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              onClick={() => onToggleFavorite(product.id)}
            >
              <HeartIcon filled={isFavorite} className="w-4.5 h-4.5" />
            </button>
            <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>
        </div>
        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === selectedImage ? 'w-6 bg-black' : 'w-1.5 bg-black/30'}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {product.images.length > 1 && (
        <div className="flex gap-2 px-5 pt-3">
          {product.images.map((img, i) => (
            <button
              key={i}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-black' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(i)}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="px-5 pt-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
            <h1 className="font-display text-2xl font-bold text-gray-900 uppercase leading-tight mt-0.5">
              {product.name}
            </h1>
          </div>
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
              New
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={s <= Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}>
                <StarIcon className="w-3.5 h-3.5" />
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mt-3">
          <span className="font-display text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
            <span className="text-base font-semibold text-gray-500 ml-1">MMK</span>
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)} MMK</span>
          )}
          {product.originalPrice && (
            <span className="text-sm font-bold text-emerald-600">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-5 my-4" />

      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div className="px-5 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-900">Color</p>
            <p className="text-xs text-gray-400">
              {selectedColor === '#0a0a0a' ? 'Black' : selectedColor === '#ffffff' ? 'White' : selectedColor === '#808080' ? 'Gray' : 'Selected'}
            </p>
          </div>
          <div className="flex gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-9 h-9 rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-black scale-110' : 'border-gray-200'
                } ${color === '#ffffff' ? 'shadow-inner' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="px-5 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-900">Size</p>
          <button className="text-xs text-gray-400 underline">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`min-w-[42px] h-10 px-3 rounded-xl border text-xs font-bold transition-all ${
                selectedSize === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 active:bg-gray-50'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-xs text-gray-400 mt-2">Please select a size</p>
        )}
      </div>

      {/* Quantity */}
      <div className="px-5 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center active:bg-gray-50 text-gray-700 font-bold text-lg"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="text-base font-bold text-gray-900 w-6 text-center">{quantity}</span>
          <button
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center active:bg-gray-50 text-gray-700 font-bold text-lg"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-5 mb-4" />

      {/* Description */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Product Info Accordion */}
      <div className="px-5 mb-4">
        <button
          className="w-full flex justify-between items-center py-3 border-t border-gray-100"
          onClick={() => setShowInfo(!showInfo)}
        >
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Product Info</h3>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${showInfo ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showInfo && (
          <div className="pb-3 space-y-2">
            {product.info.map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                <span className="text-xs text-gray-900 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart + Buy Now */}
      <div className="px-5 flex gap-3 mt-2">
        <button
          className={`flex-1 py-4 rounded-2xl border-2 text-sm font-bold uppercase tracking-wider transition-all ${
            selectedSize
              ? addedToCart
                ? 'border-emerald-500 text-emerald-500'
                : 'border-black text-black active:bg-gray-50'
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
          }`}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
        <button
          className={`flex-1 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-colors ${
            selectedSize
              ? 'bg-black text-white active:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleBuyNow}
          disabled={!selectedSize}
        >
          Buy Now
        </button>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center px-5 mb-4">
            <h2 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">You May Also Like</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-5 pb-1">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 w-36 cursor-pointer"
                onClick={() => navigateTo({ type: 'product-detail', productId: p.id })}
              >
                <div className="rounded-xl overflow-hidden bg-gray-100 h-36">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="mt-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{p.brand}</p>
                  <p className="text-xs font-semibold text-gray-900 line-clamp-1 mt-0.5">{p.name}</p>
                  <p className="text-xs font-bold text-gray-900 mt-0.5">{formatPrice(p.price)} MMK</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
