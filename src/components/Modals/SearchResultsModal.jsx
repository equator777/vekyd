import React from 'react';
import { 
  Search, 
  X, 
  ShoppingBag, 
  Wrench, 
  MapPin, 
  Star, 
  IndianRupee, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function SearchResultsModal({
  isOpen,
  onClose,
  searchQuery,
  goods = [],
  tradesmen = [],
  onSelectItem,
  onSelectTradesman
}) {
  if (!isOpen || !searchQuery || searchQuery.trim() === '') return null;

  const query = searchQuery.trim().toLowerCase();

  // Filter Goods
  const matchingGoods = goods.filter((item) => {
    const title = item.title ? item.title.toLowerCase() : '';
    const desc = item.description ? item.description.toLowerCase() : '';
    const seller = item.sellerName ? item.sellerName.toLowerCase() : '';
    const cat = item.category ? item.category.toLowerCase() : '';
    const loc = item.location ? item.location.toLowerCase() : '';
    const cond = item.condition ? item.condition.toLowerCase() : '';
    const specs = Array.isArray(item.specifications) 
      ? item.specifications.some(s => typeof s === 'string' && s.toLowerCase().includes(query))
      : false;

    return title.includes(query) || desc.includes(query) || seller.includes(query) || 
           cat.includes(query) || loc.includes(query) || cond.includes(query) || specs;
  });

  // Filter Tradesmen
  const matchingTradesmen = tradesmen.filter((pro) => {
    const name = pro.name ? pro.name.toLowerCase() : '';
    const title = pro.title ? pro.title.toLowerCase() : '';
    const bio = pro.bio ? pro.bio.toLowerCase() : '';
    const cat = pro.tradeCategory ? pro.tradeCategory.toLowerCase() : '';
    const loc = pro.location ? pro.location.toLowerCase() : '';
    const skills = Array.isArray(pro.skills)
      ? pro.skills.some(s => typeof s === 'string' && s.toLowerCase().includes(query))
      : false;

    return name.includes(query) || title.includes(query) || bio.includes(query) || 
           cat.includes(query) || loc.includes(query) || skills;
  });

  const totalResults = matchingGoods.length + matchingTradesmen.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 relative max-h-[85vh] flex flex-col shadow-2xl shadow-cyan-500/10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">Search Results</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  "{searchQuery}"
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Found <strong className="text-white">{totalResults}</strong> matching results across Goods &amp; Skilled Trades
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10"
            title="Close Search Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Results Body */}
        <div className="flex-1 overflow-y-auto pt-6 space-y-8 pr-1 custom-scrollbar">
          
          {totalResults === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-12 h-12 mx-auto text-gray-600 mb-3 animate-bounce" />
              <h3 className="text-base font-bold text-white mb-1">No exact matches found for "{searchQuery}"</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Try searching for general terms like <strong className="text-cyan-300">SS Buffer</strong>, <strong className="text-indigo-300">Massage Bed</strong>, <strong className="text-amber-300">Welder</strong>, or <strong className="text-rose-300">Electrician</strong>.
              </p>
            </div>
          ) : (
            <>
              {/* SECTION 1: SKILLED TRADE PROFESSIONALS */}
              {matchingTradesmen.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Certified Skilled Trade Professionals ({matchingTradesmen.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchingTradesmen.map((pro) => (
                      <div
                        key={pro.id}
                        onClick={() => {
                          onSelectTradesman(pro);
                          onClose();
                        }}
                        className="glass-card p-4 rounded-2xl border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all duration-200 hover:scale-[1.01] bg-slate-950/60 flex items-start gap-4 group"
                      >
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/30 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                              {pro.tradeCategory}
                            </span>
                            <span className="text-xs font-extrabold text-cyan-400 flex items-center gap-0.5">
                              <IndianRupee className="w-3.5 h-3.5" />
                              {pro.hourlyRate}/hr
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {pro.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate mb-2">{pro.title}</p>

                          <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5" /> {pro.verificationStatus || 'Verified Pro'}
                            </span>
                            <span className="flex items-center gap-1 text-amber-400 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" /> {pro.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 2: MARKETPLACE PRODUCTS & GOODS */}
              {matchingGoods.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingBag className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Marketplace Used Products &amp; Goods ({matchingGoods.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchingGoods.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectItem(item);
                          onClose();
                        }}
                        className="glass-card p-3.5 rounded-2xl border border-white/10 hover:border-indigo-400/50 cursor-pointer transition-all duration-200 hover:scale-[1.01] bg-slate-950/60 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-900">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10">
                              {item.condition}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-1">
                            {item.title}
                          </h4>

                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-extrabold text-indigo-400 text-sm flex items-center gap-0.5">
                              <IndianRupee className="w-3.5 h-3.5" />
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                          <span className="truncate max-w-[120px]">{item.location || 'Local Region'}</span>
                          <span className="text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
