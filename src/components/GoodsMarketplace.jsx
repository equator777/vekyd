import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  MapPin, 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  RotateCcw,
  PlusCircle,
  Clock,
  Building2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { GOODS_CATEGORIES } from '../data/initialData';

export default function GoodsMarketplace({
  goods,
  onSelectItem,
  onAddToCart,
  favorites,
  onToggleFavorite,
  searchQuery,
  openPostGoodsModal
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState('newest');

  // Multi-filter matching logic
  const filteredGoods = useMemo(() => {
    return goods.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Condition match
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) return false;
      // Price match
      if (item.price > maxPrice) return false;
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSeller = item.sellerName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSeller) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // Default order
    });
  }, [goods, selectedCategory, selectedCondition, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setMaxPrice(50000);
    setSortBy('newest');
  };

  const getConditionBadgeClass = (condition) => {
    switch (condition) {
      case 'Like New': return 'badge-rose';
      case 'Excellent': return 'badge-emerald';
      case 'Good': return 'badge-cyan';
      default: return 'badge-amber';
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-indigo-400" />
              <span>Products, Groceries &amp; <span className="text-gradient">Goods Marketplace</span></span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              General users get <strong className="text-cyan-300">1 item / 30-day listing</strong>. Verified Businesses (₹500/mo) list <strong className="text-amber-300">unlimited items &amp; groceries</strong>.
            </p>
          </div>

          <button
            onClick={openPostGoodsModal}
            className="btn btn-warm text-xs font-bold self-start md:self-auto px-4 py-2.5 shadow-lg shadow-rose-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Product for Sale</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-card p-4 mb-8 bg-slate-900/60 border border-white/10 rounded-2xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-white/10">
            {GOODS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Condition, Price Slider & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* Condition Filter */}
            <div>
              <label className="label text-xs">Condition / Type</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="input-field text-xs py-2 bg-slate-950/80 text-white border-white/10"
              >
                <option value="all">All Conditions &amp; Fresh Goods</option>
                <option value="Brand New / Fresh">Brand New / Fresh Pantry</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label text-xs mb-0">Max Price</label>
                <span className="text-xs font-bold text-indigo-400">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="50000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-white/10 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="label text-xs">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-xs py-2 bg-slate-950/80 text-white border-white/10"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end h-full">
              <button
                onClick={resetFilters}
                className="btn btn-secondary w-full py-2 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400">
            Showing <strong className="text-white">{filteredGoods.length}</strong> products for sale
          </p>
        </div>

        {/* Item Cards Grid */}
        {filteredGoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGoods.map((item) => {
              const isFav = favorites.includes(item.id);
              const discount = item.originalPrice 
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

              // Calculate 30-day expiration days left
              const daysLeft = item.expiresAt 
                ? Math.ceil((item.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))
                : 30;

              return (
                <div
                  key={item.id}
                  className="glass-card overflow-hidden flex flex-col group relative border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelectItem(item)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Condition Pill */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className={`badge ${getConditionBadgeClass(item.condition)} shadow-lg`}>
                        {item.condition}
                      </span>

                      {/* 30-Day Listing Validity Badge */}
                      <span className="badge bg-slate-950/80 text-cyan-300 border border-cyan-400/40 text-[10px] lowercase tracking-normal">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {daysLeft > 0 ? `${daysLeft}d validity` : 'expired'}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-lg">
                        -{discount}% OFF
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-950/70 border border-white/20 text-white hover:bg-rose-500 transition-colors shadow-lg"
                      title={isFav ? 'Remove Favorite' : 'Save Favorite'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Location */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                        <span className="uppercase font-bold tracking-wider text-indigo-400">{item.category}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          {item.location}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectItem(item)}
                        className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 cursor-pointer mb-2"
                      >
                        {item.title}
                      </h3>

                      {/* Seller Tag & Business Tier Badge */}
                      <div className={`p-2 rounded-xl mb-3 border ${
                        item.sellerType === 'business'
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-white/5 border-white/5'
                      }`}>
                        <div className="flex items-center gap-2">
                          <img src={item.sellerAvatar} alt={item.sellerName} className="w-5 h-5 rounded-full object-cover" />
                          <div className="flex-1 truncate">
                            <span className="text-[11px] font-semibold text-white block truncate">{item.sellerName}</span>
                            
                            {item.sellerType === 'business' ? (
                              <span className="text-[10px] text-amber-300 font-extrabold flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-amber-400" />
                                Verified Business (₹500/mo)
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 block truncate">General Seller (1 Item Max)</span>
                            )}
                          </div>
                          <div className="flex items-center text-[11px] text-amber-400 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                            {item.sellerRating}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-lg font-extrabold text-white">
                          ₹{item.price}
                        </div>
                        {item.originalPrice && (
                          <div className="text-[11px] text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
                          title="Quick View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => onAddToCart(item)}
                          className="btn btn-primary text-xs px-3 py-2 font-bold shadow-md"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card p-12 text-center max-w-lg mx-auto rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-xs text-gray-400 mb-6">
              No products match your search criteria. Try resetting your search filters or posting your product!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={resetFilters} className="btn btn-secondary text-xs font-bold">
                Reset Filters
              </button>
              <button onClick={openPostGoodsModal} className="btn btn-primary text-xs font-bold">
                Post a Product
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
