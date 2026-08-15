import React, { useState } from 'react';
import { X, ShoppingCart, Heart, MapPin, Star, ShieldCheck, Tag, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ItemDetailModal({
  item,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) {
  const [offerPrice, setOfferPrice] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  if (!item) return null;

  const handleMakeOffer = (e) => {
    e.preventDefault();
    if (!offerPrice) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setOfferPrice('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-3xl bg-slate-900 border border-white/15 rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 hover:bg-white/20 text-gray-300 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Image */}
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 mb-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              
              <div className="absolute top-3 left-3">
                <span className="badge badge-rose text-xs shadow-lg">{item.condition}</span>
              </div>

              <button
                onClick={() => onToggleFavorite(item.id)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/70 border border-white/20 text-white hover:bg-rose-500 transition-colors shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
              </button>
            </div>

            {/* Specifications list */}
            {item.specifications && (
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Item Details</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  {item.specifications.map((spec, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                <span>{item.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-gray-400 normal-case font-normal">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {item.location}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 leading-snug">
                {item.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-extrabold text-white">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                )}
                {item.originalPrice && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Save ${item.originalPrice - item.price}
                  </span>
                )}
              </div>

              {/* Seller Pill */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={item.sellerAvatar} alt={item.sellerName} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div>
                    <span className="text-xs font-bold text-white block">{item.sellerName}</span>
                    <span className="text-[11px] text-cyan-400 font-semibold">{item.sellerRole}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    {item.sellerRating}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">Verified Seller</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Negotiation & Purchase Box */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              
              {/* Make an Offer input */}
              <form onSubmit={handleMakeOffer} className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Negotiate offer price ($)..."
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="input-field py-2 text-xs flex-1"
                />
                <button type="submit" className="btn btn-secondary text-xs font-bold py-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Offer</span>
                </button>
              </form>

              {messageSent && (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center animate-fade-in">
                  ✓ Offer sent to {item.sellerName}! They will respond shortly.
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart &amp; Buy Now (${item.price})</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
