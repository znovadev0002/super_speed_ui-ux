import { useState, useCallback } from 'react';
import type { Screen, Tab, CartItem } from './types';
import { mockOrders } from './data';
import HomeScreen from './screens/Home';
import CategoriesScreen from './screens/Categories';
import ProductListingScreen from './screens/ProductListing';
import ProductDetailScreen from './screens/ProductDetail';
import CartScreen from './screens/Cart';
import CheckoutScreen from './screens/Checkout';
import OrdersScreen from './screens/Orders';
import ProfileScreen from './screens/Profile';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke={active ? 'white' : 'currentColor'} strokeWidth="2" />
  </svg>
);

const GridIcon = ({ active }: { active: boolean }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" fill={active ? 'currentColor' : 'none'} />
    <rect x="14" y="3" width="7" height="7" fill={active ? 'currentColor' : 'none'} />
    <rect x="14" y="14" width="7" height="7" fill={active ? 'currentColor' : 'none'} />
    <rect x="3" y="14" width="7" height="7" fill={active ? 'currentColor' : 'none'} />
  </svg>
);

const BagIcon = ({ active, count }: { active: boolean; count: number }) => (
  <div className="relative">
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" stroke={active ? 'white' : 'currentColor'} />
    </svg>
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
        {count > 9 ? '9+' : count}
      </span>
    )}
  </div>
);

const ReceiptIcon = ({ active }: { active: boolean }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill={active ? 'currentColor' : 'none'} />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" stroke={active ? 'white' : 'currentColor'} />
    <line x1="16" y1="17" x2="8" y2="17" stroke={active ? 'white' : 'currentColor'} />
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill={active ? 'currentColor' : 'none'} />
    <circle cx="12" cy="7" r="4" fill={active ? 'currentColor' : 'none'} />
  </svg>
);

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'categories', label: 'Explore' },
  { id: 'cart', label: 'Cart' },
  { id: 'orders', label: 'Orders' },
  { id: 'profile', label: 'Profile' },
];

export default function App() {
  const [screenStack, setScreenStack] = useState<Screen[]>([{ type: 'home' }]);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState(mockOrders);

  const currentScreen = screenStack[screenStack.length - 1];

  const navigateTo = useCallback((screen: Screen) => {
    setScreenStack((prev) => [...prev, screen]);
    window.scrollTo?.(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const navigateToTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    const tabScreens: Record<Tab, Screen> = {
      home: { type: 'home' },
      categories: { type: 'categories' },
      cart: { type: 'cart' },
      orders: { type: 'orders' },
      profile: { type: 'profile' },
    };
    setScreenStack([tabScreens[tab]]);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === item.product.id && i.selectedColor === item.selectedColor && i.selectedSize === item.selectedSize
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + item.quantity };
        return updated;
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, color: string, size: string, qty: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: qty }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const placeOrder = useCallback(
    (address: string, phone: string) => {
      const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const deliveryFee = 5000;
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
        status: 'Processing' as const,
        address,
        phone,
      };
      setOrders((prev) => [newOrder, ...prev]);
      setCartItems([]);
      setTimeout(() => navigateToTab('orders'), 1600);
    },
    [cartItems, navigateToTab]
  );

  const getActiveTab = (): Tab => {
    const t = currentScreen.type;
    if (t === 'home') return 'home';
    if (t === 'categories' || t === 'product-listing') return 'categories';
    if (t === 'cart' || t === 'checkout') return 'cart';
    if (t === 'orders' || t === 'order-detail') return 'orders';
    if (t === 'profile' || t === 'favorites' || t === 'saved-addresses' || t === 'edit-profile') return 'profile';
    return activeTab;
  };

  const showBottomNav = currentScreen.type !== 'checkout';
  const currentTab = getActiveTab();

  const renderScreen = () => {
    switch (currentScreen.type) {
      case 'home':
        return (
          <HomeScreen
            navigateTo={navigateTo}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            cartCount={cartItems.length}
          />
        );
      case 'categories':
        return <CategoriesScreen navigateTo={navigateTo} />;
      case 'product-listing':
        return (
          <ProductListingScreen
            category={currentScreen.category}
            navigateTo={navigateTo}
            goBack={goBack}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailScreen
            productId={currentScreen.productId}
            navigateTo={navigateTo}
            goBack={goBack}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            navigateTo={navigateTo}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        );
      case 'checkout':
        return <CheckoutScreen cartItems={cartItems} goBack={goBack} onPlaceOrder={placeOrder} />;
      case 'orders':
        return <OrdersScreen orders={orders} navigateTo={navigateTo} />;
      case 'order-detail':
        return (
          <OrdersScreen
            orders={orders}
            navigateTo={navigateTo}
            selectedOrderId={currentScreen.orderId}
            goBack={goBack}
          />
        );
      case 'profile':
        return <ProfileScreen navigateTo={navigateTo} favorites={favorites} />;
      case 'favorites':
        return <ProfileScreen navigateTo={navigateTo} favorites={favorites} showFavorites goBack={goBack} />;
      case 'saved-addresses':
        return <ProfileScreen navigateTo={navigateTo} favorites={favorites} showAddresses goBack={goBack} />;
      case 'edit-profile':
        return <ProfileScreen navigateTo={navigateTo} favorites={favorites} showEditProfile goBack={goBack} />;
      default:
        return <HomeScreen navigateTo={navigateTo} favorites={favorites} onToggleFavorite={toggleFavorite} cartCount={cartItems.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      {/* Phone Frame */}
      <div
        className="relative bg-white flex flex-col overflow-hidden w-full md:w-[390px] h-screen md:max-h-[844px] md:rounded-[44px]"
        style={{
          boxShadow: '0 0 0 12px #1a1a1a, 0 50px 120px rgba(0,0,0,0.85)',
        }}
      >
          {/* Status Bar */}
          <div className="flex justify-between items-center px-7 pt-3 pb-1 bg-white flex-shrink-0 relative">
            <span className="text-[13px] font-bold text-black tracking-tight">9:41</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-6 bg-black rounded-b-2xl" />
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <svg className="w-4 h-3.5 text-black" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.5" />
                <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
                <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              {/* WiFi */}
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12.55a11 11 0 0114.08 0" />
                <path d="M1.42 9a16 16 0 0121.16 0" />
                <path d="M8.53 16.11a6 6 0 016.95 0" />
                <circle cx="12" cy="20" r="1" fill="currentColor" />
              </svg>
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-6 h-3 border border-black rounded-sm flex items-center px-0.5 gap-0.5">
                  <div className="flex-1 h-1.5 bg-black rounded-sm" />
                </div>
                <div className="w-0.5 h-1.5 bg-black rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {renderScreen()}
          </div>

          {/* Bottom Navigation */}
          {showBottomNav && (
            <div className="flex-shrink-0 bg-white border-t border-gray-100 pb-safe">
              <div className="flex justify-around items-center px-2 pt-2 pb-4">
                {tabs.map((tab) => {
                  const isActive = currentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      className={`flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-colors ${isActive ? 'text-black' : 'text-gray-400'}`}
                      onClick={() => navigateToTab(tab.id)}
                    >
                      {tab.id === 'home' && <HomeIcon active={isActive} />}
                      {tab.id === 'categories' && <GridIcon active={isActive} />}
                      {tab.id === 'cart' && <BagIcon active={isActive} count={cartItems.length} />}
                      {tab.id === 'orders' && <ReceiptIcon active={isActive} />}
                      {tab.id === 'profile' && <UserIcon active={isActive} />}
                      <span className={`text-[10px] font-semibold ${isActive ? 'text-black' : 'text-gray-400'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
