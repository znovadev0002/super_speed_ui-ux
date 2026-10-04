import type { Screen, CartItem } from '../types';
import { formatPrice } from '../components/UI';

interface CartScreenProps {
  cartItems: CartItem[];
  navigateTo: (screen: Screen) => void;
  onRemove: (productId: string, color: string, size: string) => void;
  onUpdateQuantity: (productId: string, color: string, size: string, qty: number) => void;
}

const colorName = (hex: string) => {
  if (hex === '#0a0a0a' || hex === '#1a1a1a') return 'Black';
  if (hex === '#ffffff') return 'White';
  if (hex === '#808080') return 'Gray';
  return 'Selected';
};

export default function CartScreen({ cartItems, navigateTo, onRemove, onUpdateQuantity }: CartScreenProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5000 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 uppercase mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mb-8">Add products to your cart to start shopping</p>
        <button
          className="bg-black text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl active:bg-gray-800"
          onClick={() => navigateTo({ type: 'categories' })}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">My Cart</h1>
          <p className="text-xs text-gray-400 mt-0.5">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button className="text-xs text-gray-400 font-medium underline">Clear All</button>
      </div>

      {/* Cart Items */}
      <div className="px-5 space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
            {/* Product Image */}
            <div
              className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
              onClick={() => navigateTo({ type: 'product-detail', productId: item.product.id })}
            >
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{item.product.brand}</p>
                  <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {colorName(item.selectedColor)} · Size {item.selectedSize}
                  </p>
                </div>
                <button
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 active:bg-gray-200"
                  onClick={() => onRemove(item.product.id, item.selectedColor, item.selectedSize)}
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                {/* Quantity */}
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-1 py-0.5">
                  <button
                    className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold active:text-black"
                    onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                  <button
                    className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold active:text-black"
                    onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                {/* Price */}
                <p className="text-sm font-bold text-gray-900">
                  {formatPrice(item.product.price * item.quantity)} MMK
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50" />

      {/* Promo Code */}
      <div className="px-5 py-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
          />
          <button className="bg-black text-white text-sm font-bold px-5 rounded-xl active:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50" />

      {/* Order Summary */}
      <div className="px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Order Summary</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold text-gray-900">{formatPrice(subtotal)} MMK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Delivery Fee</span>
            <span className="text-sm font-semibold text-gray-900">{formatPrice(deliveryFee)} MMK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Promo Discount</span>
            <span className="text-sm font-semibold text-emerald-600">- 0 MMK</span>
          </div>
          <div className="h-px bg-gray-100 my-1" />
          <div className="flex justify-between">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="font-display text-xl font-bold text-gray-900">{formatPrice(total)} MMK</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="px-5 pb-2">
        <button
          className="w-full bg-black text-white font-bold text-sm uppercase tracking-wider py-4 rounded-2xl active:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          onClick={() => navigateTo({ type: 'checkout' })}
        >
          Proceed to Checkout
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Secure checkout · Cash on Delivery available
        </p>
      </div>
    </div>
  );
}
