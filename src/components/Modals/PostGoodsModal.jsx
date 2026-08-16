import React, { useState } from 'react';
import { X, Plus, Sparkles, AlertCircle, Building2, Clock, CheckCircle2 } from 'lucide-react';

export default function PostGoodsModal({
  isOpen,
  onClose,
  onAddGoods,
  currentUser,
  userActiveGoodsCount,
  openAuthModal
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('tools');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState('Austin, TX');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  // Enforce General User 1-listing limit rule
  const isGeneralUserLimitReached = currentUser && currentUser.userType === 'general' && userActiveGoodsCount >= 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGeneralUserLimitReached) return;
    if (!title || !price) return;

    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    const newItem = {
      id: `g-custom-${now}`,
      title,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      condition,
      location: location || 'Local Area',
      sellerName: currentUser ? currentUser.name : 'Registered Member',
      sellerId: currentUser ? currentUser.id : 'u-guest',
      sellerType: currentUser ? (currentUser.userType || 'general') : 'general',
      sellerRole: currentUser ? currentUser.role : 'General Seller',
      sellerRating: 5.0,
      sellerAvatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      image: imageUrl || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
      description: description || 'No detailed description provided.',
      postedDate: 'Just now',
      createdAt: now,
      expiresAt: now + thirtyDays, // 30 Days Expiration Rule
      specifications: [
        '30-Day Listing Validity',
        `Condition: ${condition}`,
        currentUser && currentUser.userType === 'business' ? 'Verified Business Listing' : 'Single Item Listing'
      ],
      featured: false
    };

    onAddGoods(newItem);
    onClose();
    // Reset form
    setTitle('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageUrl('');
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">List Product for Sale</h2>
            <p className="text-xs text-gray-400">Listings are valid for 30 days. General users can post 1 item at a time.</p>
          </div>
        </div>

        {/* Rule Warning if 1-item limit reached */}
        {isGeneralUserLimitReached ? (
          <div className="p-5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-3 animate-fade-in mb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              <span>General User 1-Item Limit Reached</span>
            </div>
            <p className="leading-relaxed">
              As a General User, you currently have <strong>1 active listing</strong> valid for 30 days. General users are limited to 1 single product listing at a time.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-amber-500/20">
              <span className="font-semibold text-amber-300">Want to sell multiple products or groceries?</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAuthModal();
                }}
                className="btn btn-warm text-[11px] py-1.5 px-3 font-bold"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Upgrade to Business (₹500/mo)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Listing will be active on platform for <strong>30 days</strong> from today.</span>
            </div>

            <div>
              <label className="label">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Organic Honey Box or DeWalt 20V Drill Kit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field bg-slate-900 text-white font-bold border border-white/20"
                >
                  <option value="groceries" className="bg-slate-900 text-white py-1">Groceries &amp; Pantry</option>
                  <option value="tools" className="bg-slate-900 text-white py-1">Power &amp; Hand Tools</option>
                  <option value="electronics" className="bg-slate-900 text-white py-1">Electronics &amp; Tech</option>
                  <option value="furniture" className="bg-slate-900 text-white py-1">Furniture &amp; Decor</option>
                  <option value="vehicles" className="bg-slate-900 text-white py-1">Bikes &amp; Vehicles</option>
                  <option value="collectibles" className="bg-slate-900 text-white py-1">Vintage &amp; Collectibles</option>
                  <option value="garden" className="bg-slate-900 text-white py-1">Home &amp; Outdoor</option>
                </select>
              </div>

              <div>
                <label className="label">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="input-field bg-slate-900 text-white font-bold border border-white/20"
                >
                  <option value="Brand New / Fresh" className="bg-slate-900 text-white py-1">Brand New / Fresh Pantry</option>
                  <option value="Like New" className="bg-slate-900 text-white py-1">Like New</option>
                  <option value="Excellent" className="bg-slate-900 text-white py-1">Excellent</option>
                  <option value="Good" className="bg-slate-900 text-white py-1">Good</option>
                  <option value="Fair" className="bg-slate-900 text-white py-1">Fair</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="65"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Original Price (₹)</label>
                <input
                  type="number"
                  placeholder="95"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  placeholder="Austin, TX"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input-field"
              />
              
              {/* Image Preview Selector */}
              <div className="mt-2">
                <span className="text-[11px] text-gray-400 block mb-1">Or click a preset sample image:</span>
                <div className="flex items-center gap-2">
                  {sampleImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Preset"
                      onClick={() => setImageUrl(src)}
                      className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 ${
                        imageUrl === src ? 'border-indigo-400 scale-105' : 'border-white/10 hover:border-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="label">Description &amp; Details</label>
              <textarea
                rows={3}
                placeholder="Describe product condition, expiration dates, contents, or delivery details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={onClose} className="btn btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-xs px-6 py-2.5 font-bold shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>Publish Listing (30 Days)</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
