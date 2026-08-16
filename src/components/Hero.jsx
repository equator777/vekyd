import React from 'react';
import { 
  ShoppingBag, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Hammer, 
  CheckCircle2, 
  Globe2, 
  ArrowRight,
  Flame,
  PlusCircle,
  UserCheck
} from 'lucide-react';

export default function Hero({
  activeTab,
  setActiveTab,
  openPostGoodsModal,
  openRegisterTradeModal
}) {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent border-b border-white/5">
      
      {/* Dynamic Glowing Background Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-300 mb-5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Dynamic Marketplace &amp; Skilled Craftsmen Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 sm:mb-4 leading-tight">
            Buy &amp; Sell <span className="text-gradient">Used Goods</span> or Hire <span className="text-gradient-emerald">Master Tradesmen</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            The premier colorful platform connecting buyers, sellers, and specialized trade professionals — from certified <strong className="text-cyan-300 font-semibold">welders</strong>, <strong className="text-amber-300 font-semibold">electricians</strong>, and <strong className="text-blue-300 font-semibold">plumbers</strong> to <strong className="text-stone-300 font-semibold">masons</strong> and <strong className="text-rose-300 font-semibold">craftsmen</strong>.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            <button
              onClick={() => setActiveTab('goods')}
              className={`btn ${activeTab === 'goods' ? 'btn-primary' : 'btn-secondary'} px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg flex-1 sm:flex-none justify-center`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Goods</span>
            </button>

            <button
              onClick={() => setActiveTab('trades')}
              className={`btn ${activeTab === 'trades' ? 'btn-emerald' : 'btn-secondary'} px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg flex-1 sm:flex-none justify-center`}
            >
              <Wrench className="w-4 h-4" />
              <span>Browse Trades</span>
            </button>

            <button
              onClick={openPostGoodsModal}
              className="btn btn-warm px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg flex-1 sm:flex-none justify-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Item</span>
            </button>

            <button
              onClick={openRegisterTradeModal}
              className="btn bg-cyan-600 hover:bg-cyan-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 flex-1 sm:flex-none justify-center"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register Trade</span>
            </button>
          </div>

          {/* Ticker Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-4xl mx-auto text-left">
            <div className="p-3 border-r border-white/10 last:border-none">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>2,400+</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Used Goods Listed</p>
            </div>
            
            <div className="p-3 border-r border-white/10 last:border-none">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
                <Hammer className="w-5 h-5 text-cyan-400" />
                <span>850+</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Registered Tradesmen</p>
            </div>

            <div className="p-3 border-r border-white/10 last:border-none">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>100%</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Verified Profiles</p>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                <Globe2 className="w-5 h-5 text-indigo-400" />
                <span>Free Host</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">GH Pages / Vercel Ready</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
