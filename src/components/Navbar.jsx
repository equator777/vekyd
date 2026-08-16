import React from 'react';
import { 
  Wrench, 
  ShoppingBag, 
  UserCheck, 
  PlusCircle, 
  Heart, 
  ShoppingCart, 
  Sun, 
  Moon, 
  User, 
  Sparkles,
  Search,
  Hammer,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  favoritesCount,
  openPostGoodsModal,
  openRegisterTradeModal,
  openAuthModal,
  openAdminModal,
  user,
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-opacity-80 border-b border-white/10" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('goods')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center animate-glow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Hammer className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-gradient">Vekyd</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
                Market
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setActiveTab('goods')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'goods'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Marketplace</span>
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'trades'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skilled Tradesmen</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'goods' ? "Search tools, groceries, tech, furniture..." : "Search welders, electricians, plumbers..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Actions & User Nav */}
        <div className="flex items-center gap-2">
          
          {/* Admin Control Portal Trigger Button - ONLY VISIBLE WHEN LOGGED IN AS ADMIN */}
          {user && user.userType === 'admin' && (
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-md animate-fade-in"
              title="Open Admin Control Portal"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* Post Used Item */}
          <button
            onClick={openPostGoodsModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Sell Product</span>
          </button>

          {/* Register as Pro */}
          <button
            onClick={openRegisterTradeModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all"
          >
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Offer Service</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50">
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-amber-400 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <button 
              onClick={openAuthModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-bold ${
                user.userType === 'business' 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
              }`}
            >
              <img src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn btn-primary px-4 py-1.5 text-xs font-bold"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
