import React from 'react';
import { Hammer, Wrench, ShieldCheck, Heart, Share2, Globe, Sparkles } from 'lucide-react';
import { TRADE_CATEGORIES } from '../data/initialData';

export default function Footer({ setSelectedTrade, setActiveTab }) {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-12 pb-8 text-gray-400">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Hammer className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">Vekyd</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Vekyd is the premier dynamic platform for buying and selling pre-owned goods, groceries, &amp; gear while connecting with certified trade specialists.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <Globe className="w-3.5 h-3.5" />
              <span>100% Free Hosting Ready (Static SPA)</span>
            </div>
          </div>

          {/* Trade Categories Menu */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Specialized Trades</h4>
            <ul className="space-y-1.5 text-xs">
              {TRADE_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveTab('trades');
                      setSelectedTrade(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>• {cat.name} Directory</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">More Services</h4>
            <ul className="space-y-1.5 text-xs">
              {TRADE_CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveTab('trades');
                      setSelectedTrade(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>• {cat.name} Directory</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Host Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Deploy Free Hosts</h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded-lg bg-white/5 border border-white/5">
                <strong className="text-white block">GitHub Pages</strong>
                <span className="text-[11px] text-gray-400">Run <code className="text-indigo-300 font-mono">npm run deploy</code></span>
              </li>
              <li className="p-2 rounded-lg bg-white/5 border border-white/5">
                <strong className="text-white block">Netlify / Vercel</strong>
                <span className="text-[11px] text-gray-400">Includes <code className="text-cyan-300 font-mono">netlify.toml</code> &amp; <code className="text-cyan-300 font-mono">vercel.json</code></span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Vekyd. Designed with vibrant aesthetics.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.openAdminPrompt) {
                  window.openAdminPrompt();
                }
              }}
              className="text-[11px] text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal Login</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Craftsmen &amp; Traders
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
