import type { Screen } from '../types';
import { products } from '../data';
import { BackButton, ProductCard } from '../components/UI';

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void;
  favorites: string[];
  showFavorites?: boolean;
  showAddresses?: boolean;
  showEditProfile?: boolean;
  goBack?: () => void;
}

const menuItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Edit Profile',
    screen: 'edit-profile' as Screen['type'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Saved Addresses',
    screen: 'saved-addresses' as Screen['type'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    label: 'Favorite Products',
    screen: 'favorites' as Screen['type'],
  },
];

const settingsItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    label: 'Notifications',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    label: 'Settings',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    label: 'Help & Support',
  },
];

const EditProfileView = ({ goBack }: { goBack: () => void }) => (
  <div className="bg-white min-h-full pb-6">
    <div className="px-5 pt-4 pb-4 flex items-center gap-3">
      <BackButton onPress={goBack} />
      <h1 className="font-display text-2xl font-bold text-gray-900 uppercase">Edit Profile</h1>
    </div>
    <div className="flex flex-col items-center px-5 mb-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <button className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
      </div>
    </div>
    <div className="px-5 space-y-4">
      {['Full Name', 'Email', 'Phone', 'Date of Birth'].map((field) => (
        <div key={field}>
          <label className="text-xs text-gray-500 font-medium mb-1 block">{field}</label>
          <input
            type="text"
            placeholder={field === 'Full Name' ? 'Aung Kyaw' : field === 'Email' ? 'aungkyaw@email.com' : field === 'Phone' ? '+95 9 123 456 789' : '01/01/1995'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-black transition-colors"
          />
        </div>
      ))}
      <button className="w-full bg-black text-white font-bold text-sm uppercase tracking-wider py-4 rounded-2xl mt-2">
        Save Changes
      </button>
    </div>
  </div>
);

const SavedAddressesView = ({ goBack }: { goBack: () => void }) => {
  const addresses = [
    { label: 'Home', address: 'No. 25, Bogyoke Street, Kyauktada, Yangon', isDefault: true },
    { label: 'Office', address: 'Sule Square, Level 10, Kyauktada, Yangon', isDefault: false },
  ];
  return (
    <div className="bg-white min-h-full pb-6">
      <div className="px-5 pt-4 pb-4 flex items-center gap-3">
        <BackButton onPress={goBack} />
        <h1 className="font-display text-2xl font-bold text-gray-900 uppercase">Saved Addresses</h1>
      </div>
      <div className="px-5 space-y-3 mb-4">
        {addresses.map((addr) => (
          <div key={addr.label} className={`p-4 rounded-2xl border-2 ${addr.isDefault ? 'border-black' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-900">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full">DEFAULT</span>
                )}
              </div>
              <button className="text-xs text-gray-400 underline">Edit</button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{addr.address}</p>
          </div>
        ))}
      </div>
      <div className="px-5">
        <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 active:bg-gray-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Address
        </button>
      </div>
    </div>
  );
};

const FavoritesView = ({
  favorites,
  navigateTo,
  goBack,
}: {
  favorites: string[];
  navigateTo: (s: Screen) => void;
  goBack: () => void;
}) => {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  return (
    <div className="bg-white min-h-full pb-4">
      <div className="px-5 pt-4 pb-4 flex items-center gap-3">
        <BackButton onPress={goBack} />
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 uppercase">Favorites</h1>
          <p className="text-xs text-gray-400">{favoriteProducts.length} items saved</p>
        </div>
      </div>
      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No favorites yet. Tap the heart on any product to save it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-5">
          {favoriteProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => navigateTo({ type: 'product-detail', productId: p.id })}
              isFavorite={true}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ProfileScreen({
  navigateTo,
  favorites,
  showFavorites,
  showAddresses,
  showEditProfile,
  goBack,
}: ProfileScreenProps) {
  if (showEditProfile && goBack) return <EditProfileView goBack={goBack} />;
  if (showAddresses && goBack) return <SavedAddressesView goBack={goBack} />;
  if (showFavorites && goBack) return <FavoritesView favorites={favorites} navigateTo={navigateTo} goBack={goBack} />;

  return (
    <div className="bg-white min-h-full pb-4">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">Profile</h1>
      </div>

      {/* Avatar + Info */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-xl font-bold text-gray-900 uppercase">Aung Kyaw</p>
            <p className="text-xs text-gray-500 mt-0.5">aungkyaw@email.com</p>
            <p className="text-xs text-gray-400 mt-0.5">+95 9 123 456 789</p>
          </div>
          <button
            className="w-9 h-9 bg-black rounded-xl flex items-center justify-center active:bg-gray-800"
            onClick={() => navigateTo({ type: 'edit-profile' })}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex px-5 mb-6 gap-3">
        {[
          { label: 'Orders', value: '3' },
          { label: 'Favorites', value: favorites.length.toString() },
          { label: 'Reviews', value: '12' },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
            <p className="font-display text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Account Menu */}
      <div className="px-5 mb-4">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 px-1">Account</p>
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left active:bg-gray-50 transition-colors ${i > 0 ? 'border-t border-gray-100' : ''}`}
              onClick={() => navigateTo({ type: item.screen } as Screen)}
            >
              <span className="text-gray-600 flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-semibold text-gray-900 flex-1">{item.label}</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="px-5 mb-6">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 px-1">Preferences</p>
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          {settingsItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left active:bg-gray-50 transition-colors ${i > 0 ? 'border-t border-gray-100' : ''}`}
            >
              <span className="text-gray-600 flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-semibold text-gray-900 flex-1">{item.label}</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5">
        <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-4 text-sm font-bold text-gray-700 uppercase tracking-wider active:bg-gray-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
}
