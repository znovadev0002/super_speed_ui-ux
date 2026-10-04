import type { Screen, Order } from '../types';
import { formatPrice, BackButton, StatusBadge } from '../components/UI';

interface OrdersScreenProps {
  orders: Order[];
  navigateTo: (screen: Screen) => void;
  selectedOrderId?: string;
  goBack?: () => void;
}

const TrackingTimeline = ({ status }: { status: Order['status'] }) => {
  const steps = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const statusMap: Record<string, number> = {
    Processing: 1,
    Shipped: 2,
    Delivered: 4,
    Cancelled: -1,
  };
  const currentStep = statusMap[status] ?? 0;

  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-3 py-4">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">Order was cancelled</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = i <= currentStep;
        const active = i === currentStep;
        return (
          <div key={step} className="flex gap-3 items-start">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${done ? 'bg-black border-black' : 'bg-white border-gray-200'}`}>
                {done && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${done ? 'bg-black' : 'bg-gray-200'} transition-colors`} />
              )}
            </div>
            <div className="pt-1 pb-8 last:pb-0">
              <p className={`text-sm font-semibold ${active ? 'text-black' : done ? 'text-gray-600' : 'text-gray-300'}`}>
                {step}
              </p>
              {active && (
                <p className="text-xs text-gray-400 mt-0.5">In progress</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderDetailView = ({ order, goBack }: { order: Order; goBack: () => void }) => (
  <div className="bg-white min-h-full pb-6">
    {/* Header */}
    <div className="px-5 pt-4 pb-4 flex items-center gap-3">
      <BackButton onPress={goBack} />
      <div>
        <p className="text-xs text-gray-400 font-medium">Order Details</p>
        <h1 className="font-display text-xl font-bold text-gray-900 uppercase tracking-tight">{order.id}</h1>
      </div>
    </div>

    {/* Status Banner */}
    <div className={`mx-5 p-4 rounded-2xl mb-5 ${
      order.status === 'Delivered' ? 'bg-emerald-50' :
      order.status === 'Shipped' ? 'bg-blue-50' :
      order.status === 'Cancelled' ? 'bg-red-50' : 'bg-amber-50'
    }`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium text-gray-500">Current Status</p>
          <p className="font-display text-xl font-bold text-gray-900 uppercase mt-0.5">{order.status}</p>
          <p className="text-xs text-gray-500 mt-1">Placed on {new Date(order.date).toLocaleDateString('en-MM', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      {order.trackingNumber && (
        <div className="mt-3 pt-3 border-t border-black/5">
          <p className="text-xs text-gray-500">Tracking Number</p>
          <p className="text-xs font-bold text-gray-900 font-mono mt-0.5">{order.trackingNumber}</p>
        </div>
      )}
    </div>

    {/* Track Order */}
    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
      <div className="px-5 mb-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Track Order</h2>
        <TrackingTimeline status={order.status} />
      </div>
    )}

    {/* Divider */}
    <div className="h-2 bg-gray-50 mb-5" />

    {/* Items */}
    <div className="px-5 mb-5">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Items Ordered</h2>
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.product.brand}</p>
              <p className="text-sm font-semibold text-gray-900 leading-tight">{item.product.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">Size {item.selectedSize} · Qty {item.quantity}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(item.product.price * item.quantity)} MMK</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-2 bg-gray-50 mb-5" />

    {/* Delivery Address */}
    <div className="px-5 mb-5">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Delivery Address</h2>
      <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{order.phone}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{order.address}</p>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="h-2 bg-gray-50 mb-5" />

    {/* Price Summary */}
    <div className="px-5">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Payment Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="text-sm font-semibold">{formatPrice(order.subtotal)} MMK</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Delivery Fee</span>
          <span className="text-sm font-semibold">{formatPrice(order.deliveryFee)} MMK</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex justify-between">
          <span className="font-bold text-gray-900">Total Paid</span>
          <span className="font-display text-xl font-bold text-gray-900">{formatPrice(order.total)} MMK</span>
        </div>
      </div>
    </div>
  </div>
);

export default function OrdersScreen({ orders, navigateTo, selectedOrderId, goBack }: OrdersScreenProps) {
  if (selectedOrderId && goBack) {
    const order = orders.find((o) => o.id === selectedOrderId);
    if (order) return <OrderDetailView order={order} goBack={goBack} />;
  }

  return (
    <div className="bg-white min-h-full pb-4">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">My Orders</h1>
        <p className="text-xs text-gray-400 mt-0.5">{orders.length} orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
            <svg className="w-9 h-9 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="2" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="12" y2="16" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 uppercase mb-2">No Orders Yet</h2>
          <p className="text-sm text-gray-500 mb-6">Your order history will appear here once you make a purchase</p>
          <button
            className="bg-black text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-2xl"
            onClick={() => navigateTo({ type: 'categories' })}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {orders.map((order) => (
            <button
              key={order.id}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left active:bg-gray-50 transition-colors"
              onClick={() => navigateTo({ type: 'order-detail', orderId: order.id })}
            >
              {/* Order header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs font-mono text-gray-400">{order.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.date).toLocaleDateString('en-MM', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Items preview */}
              <div className="flex gap-2 mb-3">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-gray-500">+{order.items.length - 3}</span>
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center ml-1">
                  <p className="text-xs font-semibold text-gray-900 line-clamp-1">{order.items[0].product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>

              {/* Total + Arrow */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Total Paid</p>
                  <p className="font-display text-lg font-bold text-gray-900">{formatPrice(order.total)} MMK</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
