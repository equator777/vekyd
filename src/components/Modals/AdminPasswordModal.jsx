import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminPasswordModal({ isOpen, onClose, onAdminSuccess }) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default Admin Password: admin123 or vekyd2026
    if (password === 'admin123' || password === 'vekyd2026' || password === 'admin') {
      setErrorMsg('');
      setPassword('');
      onAdminSuccess();
    } else {
      setErrorMsg('Incorrect Admin Password! Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Admin Master Authentication</h3>
          <p className="text-xs text-gray-400 mt-1">Enter site owner master password to unlock Admin Control Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="label text-xs">Admin Master Password</label>
            <input
              type="password"
              required
              autoFocus
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              className="input-field border-amber-500/40 text-amber-200"
            />
            <span className="text-[10px] text-gray-400 block mt-1">Default Password: <code className="text-amber-300 font-mono">admin123</code></span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" className="btn btn-warm text-xs px-5 font-bold shadow-lg shadow-rose-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate Admin</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
