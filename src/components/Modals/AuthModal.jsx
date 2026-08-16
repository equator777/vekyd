import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, Building2, CheckCircle2, IndianRupee, Sparkles } from 'lucide-react';
import { TRADE_CATEGORIES } from '../../data/initialData';

export default function AuthModal({ isOpen, onClose, user, onLogin, onLogout, tradeCategories }) {
  const [isRegister, setIsRegister] = useState(false);
  const [accountType, setAccountType] = useState('general'); // 'general' | 'business' | 'trade'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tradeCategory, setTradeCategory] = useState('welder');
  const [businessName, setBusinessName] = useState('');

  if (!isOpen) return null;

  const categoriesList = tradeCategories && tradeCategories.length > 0 ? tradeCategories : TRADE_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onLogout();
      onClose();
      return;
    }

    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const newUser = {
      id: `u-${now}`,
      name: name || (accountType === 'business' ? (businessName || 'Pro Business') : 'Registered Member'),
      email: email || 'user@example.com',
      userType: accountType,
      role: accountType === 'business'
        ? 'Verified Business Member (₹500/mo)'
        : accountType === 'trade'
        ? `${tradeCategory.toUpperCase()} PRO`
        : 'General Seller (1 Item Max)',
      businessName: accountType === 'business' ? (businessName || name) : null,
      subscriptionExpiresAt: accountType === 'business' ? now + thirtyDays : null,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      registeredDate: new Date().toISOString().split('T')[0]
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* User Profile View */
          <div className="text-center py-4">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-indigo-400 mb-3 shadow-lg" />
            <h3 className="text-xl font-extrabold text-white">{user.name}</h3>
            <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full mb-2 ${
              user.userType === 'business'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            }`}>
              {user.role}
            </span>
            <p className="text-xs text-gray-400 mb-6">{user.email}</p>

            <button
              onClick={handleSubmit}
              className="btn btn-warm w-full py-2.5 text-xs font-bold"
            >
              Sign Out of Account
            </button>
          </div>
        ) : (
          /* Auth Form */
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isRegister ? 'Select Account Tier & Register' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-gray-400">
                  {isRegister ? 'Choose General Seller (Free), Business (₹500/mo), or Skilled Trade' : 'Sign in to access your listings & account console'}
                </p>
              </div>
            </div>

            {/* Account Tier Selector for Registration */}
            {isRegister && (
              <div className="space-y-2 mb-6">
                <label className="label text-xs">Choose Account Tier:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  
                  {/* General User */}
                  <button
                    type="button"
                    onClick={() => setAccountType('general')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      accountType === 'general'
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold text-xs block text-white">General Seller</span>
                    <span className="text-[10px] text-gray-300 block">Free • 1 Item Max / 30 Days</span>
                  </button>

                  {/* Business $500/mo */}
                  <button
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      accountType === 'business'
                        ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold text-xs block text-amber-300 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-400" />
                      Business Tier
                    </span>
                    <span className="text-[10px] text-amber-200 font-extrabold block">₹500/mo • Unlimited Items</span>
                  </button>

                  {/* Skilled Tradesman */}
                  <button
                    type="button"
                    onClick={() => setAccountType('trade')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      accountType === 'trade'
                        ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold text-xs block text-white">Skilled Trade Pro</span>
                    <span className="text-[10px] text-gray-300 block">Offer Trade Services</span>
                  </button>

                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
              )}

              {isRegister && accountType === 'business' && (
                <div>
                  <label className="label">Business Name (₹500/mo Tier) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Apex Industrial Supply & Groceries"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field border-amber-500/40 text-amber-200"
                  />
                </div>
              )}

              <div>
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              {isRegister && accountType === 'trade' && (
                <div>
                  <label className="label">Primary Trade Specialty</label>
                  <select
                    value={tradeCategory}
                    onChange={(e) => setTradeCategory(e.target.value)}
                    className="input-field bg-slate-900 text-white font-bold border border-white/20"
                  >
                    {categoriesList.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-slate-900 text-white py-1">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                className={`btn w-full py-3 text-xs font-bold shadow-lg mt-2 ${
                  isRegister && accountType === 'business'
                    ? 'btn-warm shadow-rose-500/30'
                    : 'btn-primary'
                }`}
              >
                {isRegister 
                  ? (accountType === 'business' ? 'Subscribe & Register Business (₹500/mo)' : 'Create Account') 
                  : 'Sign In Now'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-white/10 text-center space-y-2">
              <div>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  {isRegister ? 'Already have an account? Sign In' : 'New here? Choose Tier & Register'}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (window.openAdminPrompt) window.openAdminPrompt();
                  }}
                  className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 hover:underline inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Site Owner / Admin Master Sign In</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
