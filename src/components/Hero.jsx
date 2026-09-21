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
  UserCheck,
  Upload,
  AlertTriangle,
  ShieldAlert,
  Lock
} from 'lucide-react';

export default function Hero({
  activeTab,
  setActiveTab,
  openPostGoodsModal,
  openRegisterTradeModal,
  openQuickUploadModal
}) {
  return (
    <div className="relative overflow-hidden pt-6 sm:pt-8 pb-8 sm:pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent border-b border-white/5">
      
      {/* Dynamic Glowing Background Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge pill */}
          <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-semibold text-cyan-300 mb-5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="truncate">Dynamic Marketplace &amp; Skilled Craftsmen Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
            Buy &amp; Sell Products, <br />
            <span className="text-gradient">Hire Trusted Trade Experts</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The all-in-one local network for selling pre-owned items, listing fresh groceries, and connecting with certified craftsmen, welders, plumbers, &amp; mechanics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => setActiveTab('goods')}
              className={`btn px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg transition-all ${
                activeTab === 'goods'
                  ? 'btn-primary shadow-indigo-500/30 ring-2 ring-indigo-400/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('trades')}
              className={`btn px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg transition-all ${
                activeTab === 'trades'
                  ? 'btn-accent shadow-cyan-500/30 ring-2 ring-cyan-400/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Find Skilled Tradesmen</span>
            </button>

            <button
              onClick={openPostGoodsModal}
              className="btn btn-warm px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/20 flex-1 sm:flex-none justify-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Product</span>
            </button>

            <button
              onClick={openRegisterTradeModal}
              className="btn bg-cyan-600 hover:bg-cyan-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 flex-1 sm:flex-none justify-center"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register Trade</span>
            </button>

          </div>

          {/* Anti-Scam & Fraud Alert Warning Banner */}
          <div className="max-w-4xl mx-auto rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-rose-950/80 via-amber-950/70 to-slate-900/90 border-2 border-rose-500/60 shadow-2xl shadow-rose-900/40 text-left relative overflow-hidden backdrop-blur-xl animate-fade-in">
            {/* Flashing Warning Glow Background */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
              {/* Animated Flashing Warning Icon Badge */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-lg shadow-rose-500/30 shrink-0 flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s' }}>
                <AlertTriangle className="w-7 h-7 text-amber-300 animate-pulse" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-400/40 text-[11px] font-extrabold tracking-wide uppercase animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Safety &amp; Anti-Fraud Warning
                  </span>
                  <span className="text-[11px] text-amber-300/90 font-semibold">Important Notice for All Buyers &amp; Sellers</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  We <span className="text-gradient from-rose-400 via-amber-300 to-rose-400 uppercase tracking-wide">do NOT accept or encourage online payments</span> on our website.
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  Vekyd has <strong className="text-amber-300 font-bold">NO option or gateway to process payments through our website</strong>. Never send advance money, online UPI transfers, or bank deposits to anyone claiming to represent Vekyd. Always inspect items &amp; meet craftsmen in person before making any payment.
                </p>
              </div>
            </div>

            {/* Anti-Fraud Protection Tips Bar */}
            <div className="mt-3.5 pt-3 border-t border-rose-500/20 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-gray-300 font-medium">
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-xl border border-rose-500/20">
                <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>No Advance Online Payments</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-xl border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Meet &amp; Inspect Goods In Person</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-xl border border-cyan-500/20">
                <AlertTriangle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Report Fraudulent Listings</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
