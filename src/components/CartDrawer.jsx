import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Trigger confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.log('Confetti');
    }

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 2000);
  };

  const handleCloseAll = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in flex justify-end">
      
      <div className="w-full max-w-md bg-slate-900 border-l border-white/10 h-full flex flex-col justify-between shadow-2xl relative">
        
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <h3 className="font-extrabold text-white text-base">Your Cart</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
              {cartItems.length} items
            </span>
          </div>

          <button
            onClick={handleCloseAll}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {orderComplete ? (
            /* Order Completed Success View */
            <div className="py-12 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Order Confirmed!</h3>
              <p className="text-xs text-gray-300 max-w-xs mx-auto mb-6 leading-relaxed">
                Thank you for buying on Vekyd! Your payment has been processed and seller notification dispatched.
              </p>
              <button onClick={handleCloseAll} className="btn btn-primary text-xs px-6 py-2.5 font-bold">
                Continue Shopping
              </button>
            </div>
          ) : cartItems.length > 0 ? (
            /* Cart Items List */
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 relative group"
              >
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <span className="text-[10px] text-cyan-400 block font-semibold">{item.sellerName}</span>
                  <div className="text-sm font-extrabold text-indigo-300 mt-1">
                    ₹{item.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="p-1 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="text-xs font-bold text-white px-1">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="p-1 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            /* Empty Cart View */
            <div className="py-16 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-300">Your cart is currently empty</p>
              <p className="text-xs text-gray-500 mt-1">Explore pre-owned tools, tech, &amp; goods to add items</p>
            </div>
          )}

        </div>

        {/* Footer Summary & Checkout */}
        {!orderComplete && cartItems.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-slate-950/80 space-y-3">
            
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span className="font-bold text-white">₹{shipping}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-indigo-400">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-primary w-full py-3 text-xs font-bold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulate Instant Free Checkout (₹{total})</span>
                </>
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
