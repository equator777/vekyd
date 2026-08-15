import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ExternalLink, DollarSign, Tag, TrendingUp } from 'lucide-react';

export default function AdBanner({ ads, onAdClick, openRegisterBusiness }) {
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  if (!ads || ads.length === 0) return null;

  const currentAd = ads[activeAdIndex];

  return (
    <div className="py-4 bg-slate-950">
      <div className="container mx-auto px-4">
        
        {/* Banner Card Container */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 shadow-2xl group">
          
          {/* Background Image with Blur Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="max-w-2xl">
              
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Business Sponsor
                </span>
                
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {currentAd.sponsorTier}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {currentAd.commissionTag}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                {currentAd.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                {currentAd.subtitle}
              </p>

              {/* Discount Code Pill */}
              {currentAd.discountCode && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-black/50 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Use Code: <strong>{currentAd.discountCode}</strong></span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-3 shrink-0 w-full md:w-auto">
              
              <button
                onClick={() => onAdClick(currentAd)}
                className="btn btn-warm text-xs px-5 py-3 font-extrabold shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"
              >
                <span>{currentAd.ctaText}</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={openRegisterBusiness}
                className="btn bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-400/40 text-[11px] font-bold py-2 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all"
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>Advertise Your Business ($500/mo)</span>
              </button>

            </div>

          </div>

          {/* Ad Carousel Dots */}
          {ads.length > 1 && (
            <div className="absolute bottom-3 right-6 z-20 flex items-center gap-1.5">
              {ads.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAdIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeAdIndex === i ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
