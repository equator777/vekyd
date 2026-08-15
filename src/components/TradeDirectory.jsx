import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Eye, 
  UserCheck,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Flame,
  Zap,
  Droplets,
  Boxes,
  Hammer
} from 'lucide-react';
import { TRADE_CATEGORIES } from '../data/initialData';

export default function TradeDirectory({
  tradesmen,
  selectedTrade,
  setSelectedTrade,
  onSelectTradesman,
  onRequestQuote,
  openRegisterTradeModal,
  searchQuery
}) {
  const [maxRate, setMaxRate] = useState(150);
  const [minRating, setMinRating] = useState(4.0);

  // Filter logic for tradesmen
  const filteredTradesmen = useMemo(() => {
    return tradesmen.filter((pro) => {
      // Category match
      if (selectedTrade !== 'all' && pro.tradeCategory.toLowerCase() !== selectedTrade.toLowerCase()) {
        return false;
      }
      // Hourly rate match
      if (pro.hourlyRate > maxRate) return false;
      // Rating match
      if (pro.rating < minRating) return false;
      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesTitle = pro.title.toLowerCase().includes(q);
        const matchesBio = pro.bio.toLowerCase().includes(q);
        const matchesTrade = pro.tradeCategory.toLowerCase().includes(q);
        const matchesSkill = pro.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesBio && !matchesTrade && !matchesSkill) return false;
      }
      return true;
    });
  }, [tradesmen, selectedTrade, maxRate, minRating, searchQuery]);

  const getTradeBadgeStyle = (category) => {
    switch (category.toLowerCase()) {
      case 'welder': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'electrician': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'plumber': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'mason': return 'bg-stone-500/20 text-stone-300 border-stone-500/40';
      case 'craftsman': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'carpenter': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'painter': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'hvac': return 'bg-violet-500/20 text-violet-300 border-violet-500/40';
      default: return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        
        {/* Directory Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Wrench className="w-7 h-7 text-cyan-400" />
              <span>Certified <span className="text-gradient-emerald">Skilled Trade Professionals</span></span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Hire vetted Craftsmen, Welders, Electricians, Plumbers, Masons, Carpenters &amp; specialists directly.
            </p>
          </div>

          <button
            onClick={openRegisterTradeModal}
            className="btn bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold self-start md:self-auto px-4 py-2.5 shadow-lg shadow-cyan-500/20"
          >
            <UserCheck className="w-4 h-4" />
            <span>Register as a Skilled Trade Pro</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="glass-card p-4 mb-8 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-4 flex-1">
            {/* Category Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
              <span>Category Filter:</span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                {selectedTrade === 'all' ? 'All Skilled Trades' : selectedTrade}
              </span>
              {selectedTrade !== 'all' && (
                <button
                  onClick={() => setSelectedTrade('all')}
                  className="text-gray-400 hover:text-white underline text-[11px]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Max Hourly Rate */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 font-medium">Max Rate:</label>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="w-24 accent-cyan-400 cursor-pointer h-1.5"
              />
              <span className="text-xs font-bold text-cyan-300">${maxRate}/hr</span>
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-400">
            Found <strong className="text-white">{filteredTradesmen.length}</strong> certified pros available
          </p>

        </div>

        {/* Directory Grid */}
        {filteredTradesmen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTradesmen.map((pro) => (
              <div
                key={pro.id}
                className="glass-card p-5 flex flex-col justify-between border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div>
                  {/* Top Avatar & Badge Info */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/40 shadow-md"
                        />
                        {pro.availableNow && (
                          <span
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"
                            title="Available Now"
                          />
                        )}
                      </div>
                      <div>
                        <h3
                          onClick={() => onSelectTradesman(pro)}
                          className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          {pro.name}
                        </h3>
                        <span className={`inline-block text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getTradeBadgeStyle(pro.tradeCategory)}`}>
                          {pro.tradeCategory}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-white">
                        ${pro.hourlyRate}<span className="text-xs text-gray-400 font-normal">/hr</span>
                      </div>
                      <div className="flex items-center justify-end text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        {pro.rating} <span className="text-[10px] text-gray-400 ml-0.5">({pro.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Experience */}
                  <p className="text-xs font-semibold text-cyan-200 mb-2 line-clamp-1">
                    {pro.title}
                  </p>

                  {/* Verification & Location */}
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {pro.verificationStatus}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {pro.location}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {pro.bio}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pro.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                        {skill}
                      </span>
                    ))}
                    {pro.skills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-bold">
                        +{pro.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Portfolio Thumbnail Preview */}
                  {pro.portfolio && pro.portfolio.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 overflow-hidden rounded-xl">
                      {pro.portfolio.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt="Portfolio item"
                          className="w-16 h-12 rounded-lg object-cover border border-white/10"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectTradesman(pro)}
                    className="btn btn-secondary text-xs flex-1 py-2 font-bold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(pro)}
                    className="btn btn-emerald text-xs flex-1 py-2 font-bold shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Quote</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card p-12 text-center max-w-lg mx-auto rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Tradesmen Found</h3>
            <p className="text-xs text-gray-400 mb-6">
              No specialists match your search criteria. Try choosing a different trade category or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSelectedTrade('all');
                setMaxRate(150);
              }}
              className="btn btn-primary text-xs font-bold"
            >
              Reset Category Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
