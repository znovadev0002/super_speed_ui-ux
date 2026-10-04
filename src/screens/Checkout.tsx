import { useState } from 'react';
import type { CartItem } from '../types';
import { formatPrice, BackButton } from '../components/UI';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  goBack: () => void;
  onPlaceOrder: (address: string, phone: string) => void;
}

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', eta: '3-5 business days', price: 5000 },
  { id: 'express', label: 'Express Delivery', eta: '1-2 business days', price: 12000 },
];

const paymentOptions = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'kbz', label: 'KBZ Pay', icon: '📱' },
  { id: 'wave', label: 'Wave Pay', icon: '🌊' },
  { id: 'aya', label: 'AYA Pay', icon: '🏦' },
];

export default function CheckoutScreen({ cartItems, goBack, onPlaceOrder }: CheckoutScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [township, setTownship] = useState('');
  const [city, setCity] = useState('Yangon');
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('cod');
  const [placed, setPlaced] = useState(false);

  const selectedDelivery = deliveryOptions.find((d) => d.id === delivery)!;
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + selectedDelivery.price;

  const canPlace = name.trim() && phone.trim() && address.trim() && township.trim();

  const handlePlaceOrder = () => {
    if (!canPlace) return;
    setPlaced(true);
    setTimeout(() => {
      onPlaceOrder(`${address}, ${township}, ${city}`, phone);
    }, 1500);
  };

  if (placed) {
    return (
      <div className="bg-white min-h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-gray-900 uppercase mb-2">Order Placed!</h2>
        <p className="text-sm text-gray-500">Your order has been confirmed. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full pb-6">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 flex items-center gap-3">
        <BackButton onPress={goBack} />
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">Checkout</h1>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center px-5 mb-6">
        {['Address', 'Delivery', 'Payment'].map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${i === 0 ? 'text-black' : 'text-gray-400'}`}>{step}</span>
            </div>
            {i < 2 && <div className="w-6 h-px bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Delivery Address</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aung Kyaw"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+95 9 123 456 789"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Street Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="No. 25, Bogyoke Street"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Township *</label>
              <input
                type="text"
                value={township}
                onChange={(e) => setTownship(e.target.value)}
                placeholder="Kyauktada"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors bg-white"
              >
                <option>Yangon</option>
                <option>Mandalay</option>
                <option>Naypyidaw</option>
                <option>Bago</option>
                <option>Mawlamyine</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50 mb-6" />

      {/* Delivery Method */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Delivery Method</h2>
        <div className="space-y-2">
          {deliveryOptions.map((opt) => (
            <button
              key={opt.id}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-colors text-left ${
                delivery === opt.id ? 'border-black' : 'border-gray-200'
              }`}
              onClick={() => setDelivery(opt.id)}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${delivery === opt.id ? 'border-black' : 'border-gray-300'}`}>
                {delivery === opt.id && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                <p className="text-xs text-gray-500">{opt.eta}</p>
              </div>
              <p className="text-sm font-bold text-gray-900">{formatPrice(opt.price)} MMK</p>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50 mb-6" />

      {/* Payment Method */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Payment Method</h2>
        <div className="grid grid-cols-2 gap-2">
          {paymentOptions.map((opt) => (
            <button
              key={opt.id}
              className={`p-3 rounded-2xl border-2 text-left transition-colors ${
                payment === opt.id ? 'border-black bg-black/5' : 'border-gray-200'
              }`}
              onClick={() => setPayment(opt.id)}
            >
              <span className="text-xl block mb-1">{opt.icon}</span>
              <p className="text-xs font-semibold text-gray-900">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50 mb-6" />

      {/* Order Summary */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Order Summary</h2>
        <div className="space-y-2 mb-3">
          {cartItems.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-gray-400">x{item.quantity} · Size {item.selectedSize}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-900 flex-shrink-0">{formatPrice(item.product.price * item.quantity)} MMK</p>
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-100 my-3" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold">{formatPrice(subtotal)} MMK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Delivery</span>
            <span className="text-sm font-semibold">{formatPrice(selectedDelivery.price)} MMK</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-display text-xl font-bold text-gray-900">{formatPrice(total)} MMK</span>
          </div>
        </div>
      </div>

      {/* Place Order */}
      <div className="px-5">
        <button
          className={`w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-colors ${
            canPlace ? 'bg-black text-white active:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handlePlaceOrder}
          disabled={!canPlace}
        >
          Place Order · {formatPrice(total)} MMK
        </button>
        {!canPlace && (
          <p className="text-center text-xs text-gray-400 mt-2">Please fill in all required fields</p>
        )}
      </div>
    </div>
  );
}
