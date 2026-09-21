import React from 'react';
import { ShieldAlert, AlertTriangle, Lock, ShieldCheck, CheckCircle2, X } from 'lucide-react';

export default function SafetyWarningModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg bg-slate-900/95 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-7 relative shadow-2xl shadow-rose-950/50 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          aria-label="Close safety warning"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flashing Icon Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/25 animate-bounce" style={{ animationDuration: '2.5s' }}>
            <AlertTriangle className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/25 text-rose-300 border border-rose-500/40 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Official Security &amp; Anti-Fraud Warning
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Important Payment Safety Notice
          </h2>
        </div>

        {/* Main Alert Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-amber-950/40 to-slate-950/80 border border-rose-500/40 space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              <strong className="text-rose-300 font-bold block text-sm sm:text-base mb-1">
                We do NOT accept or encourage making payments online on our website.
              </strong>
              Vekyd has <span className="text-amber-300 font-bold">NO option or gateway to process online payments through our website</span>. 
              Never send advance payments, online UPI transfers, or bank deposits to anyone claiming to represent Vekyd.
            </div>
          </div>
        </div>

        {/* 3 Key Rules */}
        <div className="space-y-2.5 mb-6 text-xs text-gray-300 font-medium">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
            <Lock className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>No Online Payments:</strong> Never pay advance tokens or booking fees online.</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>In-Person Inspection:</strong> Inspect items and meet tradesmen face-to-face before paying.</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
            <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Beware of Scams:</strong> Never share passwords, credit card numbers, or OTPs.</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="btn btn-warm w-full py-3.5 text-xs sm:text-sm font-extrabold shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>I Understand &amp; Proceed to Website</span>
        </button>

      </div>
    </div>
  );
}
