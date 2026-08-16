import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdBanner from './components/AdBanner';
import TradeCategoryBar from './components/TradeCategoryBar';
import GoodsMarketplace from './components/GoodsMarketplace';
import TradeDirectory from './components/TradeDirectory';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

// Modals & Control Consoles
import PostGoodsModal from './components/Modals/PostGoodsModal';
import RegisterTradeModal from './components/Modals/RegisterTradeModal';
import ItemDetailModal from './components/Modals/ItemDetailModal';
import TradeDetailModal from './components/Modals/TradeDetailModal';
import QuoteModal from './components/Modals/QuoteModal';
import AuthModal from './components/Modals/AuthModal';
import SearchResultsModal from './components/Modals/SearchResultsModal';
import AdminPanel from './components/Admin/AdminPanel';
import AdminPasswordModal from './components/Modals/AdminPasswordModal';
import CartDrawer from './components/CartDrawer';
import { trackVisitor } from './utils/visitorTracker';

import { INITIAL_GOODS, INITIAL_TRADESMEN, INITIAL_USERS, INITIAL_ADS, TRADE_CATEGORIES } from './data/initialData';
import { Sparkles } from 'lucide-react';

const sanitizeCurrency = (data) => {
  if (!data) return data;
  const jsonStr = JSON.stringify(data).replace(/\$/g, '₹');
  return JSON.parse(jsonStr);
};

export default function App() {
  // Navigation & Search State
  const [activeTab, setActiveTab] = useState('goods'); // 'goods' | 'trades'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('all');

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('tc_theme') || 'dark');

  // Real-Time Visitor IP & Geolocation Tracking state
  const [visitorLogs, setVisitorLogs] = useState(() => {
    return JSON.parse(localStorage.getItem('tc_visitor_logs_v2') || '[]');
  });

  useEffect(() => {
    trackVisitor().then(logs => {
      if (logs && logs.length > 0) setVisitorLogs(logs);
    });
  }, []);

  // Dynamic Trade Categories state
  const [tradeCategories, setTradeCategories] = useState(() => {
    const saved = localStorage.getItem('tc_trade_categories_v2');
    return saved ? JSON.parse(saved) : TRADE_CATEGORIES;
  });

  // Core Data Persistence with v3 keys
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('tc_users_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : INITIAL_USERS);
  });

  const [goods, setGoods] = useState(() => {
    const saved = localStorage.getItem('tc_goods_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : INITIAL_GOODS);
  });

  const [tradesmen, setTradesmen] = useState(() => {
    const saved = localStorage.getItem('tc_tradesmen_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : INITIAL_TRADESMEN);
  });

  const [ads, setAds] = useState(() => {
    const saved = localStorage.getItem('tc_ads_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : INITIAL_ADS);
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tc_favorites_v3');
    return saved ? JSON.parse(saved) : ['g-1786885630190'];
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('tc_cart_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : []);
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tc_user_v3');
    return sanitizeCurrency(saved ? JSON.parse(saved) : null);
  });

  // Automatically purge legacy mobile cache on v4 release
  useEffect(() => {
    const hasPurged = localStorage.getItem('vekyd_sync_v4');
    if (!hasPurged) {
      localStorage.removeItem('tc_users');
      localStorage.removeItem('tc_goods');
      localStorage.removeItem('tc_tradesmen');
      localStorage.removeItem('tc_ads');
      localStorage.removeItem('tc_users_v2');
      localStorage.removeItem('tc_goods_v2');
      localStorage.removeItem('tc_tradesmen_v2');
      localStorage.removeItem('tc_ads_v2');
      localStorage.removeItem('tc_users_v3');
      localStorage.removeItem('tc_goods_v3');
      localStorage.removeItem('tc_tradesmen_v3');
      localStorage.removeItem('tc_ads_v3');
      localStorage.removeItem('tc_trade_categories_v2');
      localStorage.setItem('vekyd_sync_v4', 'true');
      setUsers(sanitizeCurrency(INITIAL_USERS));
      setGoods(sanitizeCurrency(INITIAL_GOODS));
      setTradesmen(sanitizeCurrency(INITIAL_TRADESMEN));
      setAds(sanitizeCurrency(INITIAL_ADS));
    }
  }, []);

  // Modal Visibility States
  const [isPostGoodsOpen, setIsPostGoodsOpen] = useState(false);
  const [isRegisterTradeOpen, setIsRegisterTradeOpen] = useState(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState(null);
  const [selectedTradesmanForDetail, setSelectedTradesmanForDetail] = useState(null);
  const [tradesmanForQuote, setTradesmanForQuote] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPasswordOpen, setIsAdminPasswordOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Global window handler for Admin Prompt
  useEffect(() => {
    window.openAdminPrompt = () => {
      if (user && user.userType === 'admin') {
        setIsAdminModalOpen(true);
      } else {
        setIsAdminPasswordOpen(true);
      }
    };
  }, [user]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tc_theme', theme);
  }, [theme]);

  // Sync LocalStorage with v3 keys
  useEffect(() => { localStorage.setItem('tc_trade_categories_v2', JSON.stringify(tradeCategories)); }, [tradeCategories]);
  useEffect(() => { localStorage.setItem('tc_users_v3', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('tc_goods_v3', JSON.stringify(goods)); }, [goods]);
  useEffect(() => { localStorage.setItem('tc_tradesmen_v3', JSON.stringify(tradesmen)); }, [tradesmen]);
  useEffect(() => { localStorage.setItem('tc_ads_v3', JSON.stringify(ads)); }, [ads]);
  useEffect(() => { localStorage.setItem('tc_favorites_v3', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('tc_cart_v3', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => {
    if (user) localStorage.setItem('tc_user_v3', JSON.stringify(user));
    else localStorage.removeItem('tc_user_v3');
  }, [user]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // User & Admin Handlers
  const handleAddUser = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
    showToast(`✓ User "${newUser.name}" added to system!`);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast('User account deleted');
  };

  const handleToggleBusinessTier = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const isNowBusiness = u.userType !== 'business';
        return {
          ...u,
          userType: isNowBusiness ? 'business' : 'general',
          role: isNowBusiness ? 'Verified Business Member ($500/mo)' : 'General Seller (1 Item Max)',
          subscriptionExpiresAt: isNowBusiness ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null
        };
      }
      return u;
    }));
    showToast('✓ Updated user membership tier!');
  };

  // Goods Handlers
  const handleAddGoods = (newItem) => {
    setGoods(prev => [newItem, ...prev]);
    showToast(`✓ Published listing "${newItem.title}" (Valid for 30 Days)!`);
  };

  const handleDeleteGoods = (goodsId) => {
    setGoods(prev => prev.filter(g => g.id !== goodsId));
    showToast('Product listing removed');
  };

  const handleRenewGoodsExpiry = (goodsId) => {
    setGoods(prev => prev.map(g => {
      if (g.id === goodsId) {
        return {
          ...g,
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
        };
      }
      return g;
    }));
    showToast('✓ Renewed 30-day listing validity!');
  };

  const handleToggleFavorite = (itemId) => {
    setFavorites(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Added to your favorites!');
        return [...prev, itemId];
      }
    });
  };

  // Ad Banner Handlers
  const handleAdClick = (ad) => {
    setAds(prev => prev.map(a => a.id === ad.id ? { ...a, clicks: a.clicks + 1 } : a));
    showToast(`Visiting sponsor "${ad.sponsorName}"...`);
  };

  const handleAddAd = (newAd) => {
    setAds(prev => [newAd, ...prev]);
    showToast('✓ Published new sponsored business banner!');
  };

  const handleDeleteAd = (adId) => {
    setAds(prev => prev.filter(a => a.id !== adId));
    showToast('Ad banner removed');
  };

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
        return updated;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`✓ Added "${item.title}" to cart!`);
  };

  const handleUpdateCartQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: newQty } : i));
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
    showToast('Item removed from cart');
  };

  // Tradesmen Handlers
  const handleRegisterTrade = (newPro) => {
    setTradesmen(prev => [newPro, ...prev]);

    const catName = newPro.tradeCategory;
    const catId = catName.toLowerCase().replace(/\s+/g, '-');

    setTradeCategories(prev => {
      const exists = prev.some(c => c.id === catId || c.name.toLowerCase() === catName.toLowerCase());
      if (exists) return prev;
      return [
        ...prev,
        {
          id: catId,
          name: catName,
          icon: 'Sparkles',
          count: '1+',
          gradient: 'from-cyan-500 to-indigo-600',
          description: `Specialized ${catName} contracting services`
        }
      ];
    });

    setActiveTab('trades');
    setSelectedTrade(catId);
    showToast(`✓ Welcome ${newPro.name}! Profile registered under ${catName}.`);
  };

  // Count active goods posted by current user for 1-item limit check
  const currentUserActiveGoodsCount = user ? goods.filter(g => g.sellerId === user.id).length : 0;

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 text-white selection:bg-indigo-500 selection:text-white pb-20 md:pb-0">
      
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs shadow-2xl border border-indigo-400/40 flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        setIsCartOpen={setIsCartOpen}
        favoritesCount={favorites.length}
        openPostGoodsModal={() => setIsPostGoodsOpen(true)}
        openRegisterTradeModal={() => setIsRegisterTradeOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        openAdminModal={() => setIsAdminModalOpen(true)}
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Showcase */}
      <Hero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openPostGoodsModal={() => setIsPostGoodsOpen(true)}
        openRegisterTradeModal={() => setIsRegisterTradeOpen(true)}
      />

      {/* Monetized Sponsored Business Ad Banner */}
      <AdBanner
        ads={ads}
        onAdClick={handleAdClick}
        openRegisterBusiness={() => setIsAuthModalOpen(true)}
      />

      {/* Trade Category Quick Bar */}
      <TradeCategoryBar
        selectedTrade={selectedTrade}
        setSelectedTrade={(tradeId) => {
          setSelectedTrade(tradeId);
          if (tradeId !== 'all') {
            setActiveTab('trades');
          }
        }}
        tradeCategories={tradeCategories}
      />

      {/* Main Dynamic Body Switcher */}
      <main className="flex-1">
        {activeTab === 'goods' ? (
          <GoodsMarketplace
            goods={goods}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
            openPostGoodsModal={() => setIsPostGoodsOpen(true)}
          />
        ) : (
          <TradeDirectory
            tradesmen={tradesmen}
            selectedTrade={selectedTrade}
            setSelectedTrade={setSelectedTrade}
            onSelectTradesman={(pro) => setSelectedTradesmanForDetail(pro)}
            onRequestQuote={(pro) => setTradesmanForQuote(pro)}
            openRegisterTradeModal={() => setIsRegisterTradeOpen(true)}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setSelectedTrade={setSelectedTrade}
        setActiveTab={setActiveTab}
      />

      {/* Modals & Drawers */}
      <PostGoodsModal
        isOpen={isPostGoodsOpen}
        onClose={() => setIsPostGoodsOpen(false)}
        onAddGoods={handleAddGoods}
        currentUser={user}
        userActiveGoodsCount={currentUserActiveGoodsCount}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      <RegisterTradeModal
        isOpen={isRegisterTradeOpen}
        onClose={() => setIsRegisterTradeOpen(false)}
        onRegisterTrade={handleRegisterTrade}
        tradeCategories={tradeCategories}
      />

      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedItemForDetail ? favorites.includes(selectedItemForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <TradeDetailModal
        tradesman={selectedTradesmanForDetail}
        onClose={() => setSelectedTradesmanForDetail(null)}
        onRequestQuote={(pro) => setTradesmanForQuote(pro)}
      />

      <QuoteModal
        isOpen={!!tradesmanForQuote}
        onClose={() => setTradesmanForQuote(null)}
        tradesman={tradesmanForQuote}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        tradeCategories={tradeCategories}
        onLogin={(u) => {
          setUser(u);
          showToast(`Logged in as ${u.name}`);
        }}
        onLogout={() => {
          setUser(null);
          showToast('Signed out');
        }}
      />

      <AdminPasswordModal
        isOpen={isAdminPasswordOpen}
        onClose={() => setIsAdminPasswordOpen(false)}
        onAdminSuccess={() => {
          setIsAdminPasswordOpen(false);
          setUser(INITIAL_USERS[0]); // Authenticate as Site Admin
          setIsAdminModalOpen(true);
          showToast('✓ Site Owner Admin Authenticated Successfully!');
        }}
      />

      <AdminPanel
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        users={users}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser}
        onToggleBusinessTier={handleToggleBusinessTier}
        goods={goods}
        onAddGoods={handleAddGoods}
        onDeleteGoods={handleDeleteGoods}
        onRenewGoodsExpiry={handleRenewGoodsExpiry}
        ads={ads}
        onAddAd={handleAddAd}
        onDeleteAd={handleDeleteAd}
        visitorLogs={visitorLogs}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <SearchResultsModal
        isOpen={Boolean(searchQuery && searchQuery.trim() !== '')}
        onClose={() => setSearchQuery('')}
        searchQuery={searchQuery}
        goods={goods}
        tradesmen={tradesmen}
        onSelectItem={(item) => setSelectedItemForDetail(item)}
        onSelectTradesman={(pro) => setSelectedTradesmanForDetail(pro)}
      />

      {/* Floating Mobile Bottom Dock */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        setIsCartOpen={setIsCartOpen}
        openPostGoodsModal={() => {
          if (user && user.userType === 'general' && currentUserActiveGoodsCount >= 1) {
            showToast('⚠️ General Tier Limit Reached (1 Item Max). Upgrade to Business!');
            setIsAuthModalOpen(true);
          } else {
            setIsPostGoodsOpen(true);
          }
        }}
        openRegisterTradeModal={() => setIsRegisterTradeOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        user={user}
      />

    </div>
  );
}
