import React from 'react';
import { 
  ShoppingBag, 
  Wrench, 
  PlusCircle, 
  UserCheck, 
  ShoppingCart,
  User
} from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  openPostGoodsModal,
  openRegisterTradeModal,
  openAuthModal,
  user
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="flex items-center justify-around gap-1">
        
        {/* Marketplace Tab */}
        <button
          onClick={() => setActiveTab('goods')}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'goods'
              ? 'text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Market</span>
        </button>

        {/* Tradesmen Tab */}
        <button
          onClick={() => setActiveTab('trades')}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'trades'
              ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-[10px]">Trades</span>
        </button>

        {/* Post Product CTA */}
        <button
          onClick={openPostGoodsModal}
          className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl text-rose-300 bg-rose-500/15 border border-rose-500/30 font-bold hover:bg-rose-500/25 transition-all"
        >
          <PlusCircle className="w-5 h-5 text-rose-400" />
          <span className="text-[10px]">Sell</span>
        </button>

        {/* Register Pro CTA */}
        <button
          onClick={openRegisterTradeModal}
          className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 font-bold hover:bg-emerald-500/25 transition-all"
        >
          <UserCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px]">Offer</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl text-gray-400 hover:text-white transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px]">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-rose-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center shadow-lg">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
