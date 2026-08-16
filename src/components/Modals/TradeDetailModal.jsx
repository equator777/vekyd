import React from 'react';
import { 
  X, 
  Wrench, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';

export default function TradeDetailModal({
  tradesman,
  onClose,
  onRequestQuote
}) {
  if (!tradesman) return null;

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

        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/50 to-slate-950 border border-white/10 mb-6">
          <img
            src={tradesman.avatar}
            alt={tradesman.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {tradesman.tradeCategory}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {tradesman.verificationStatus}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{tradesman.name}</h2>
            <p className="text-xs font-semibold text-cyan-200">{tradesman.title}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {tradesman.experienceYears} Years Exp
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {tradesman.location}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
            <div className="text-2xl font-extrabold text-white">
              ₹{tradesman.hourlyRate}<span className="text-xs font-normal text-gray-400">/hr</span>
            </div>
            <div className="flex items-center text-sm font-bold text-amber-400 mt-1">
              <Star className="w-4 h-4 fill-amber-400 mr-1" />
              {tradesman.rating} <span className="text-xs text-gray-400 ml-1">({tradesman.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a href={`tel:${tradesman.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Phone className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Direct Phone</span>
              <span className="text-xs font-bold text-white">{tradesman.phone}</span>
            </div>
          </a>

          <a href={`mailto:${tradesman.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Mail className="w-4 h-4 text-indigo-400" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Official Email</span>
              <span className="text-xs font-bold text-white truncate max-w-[200px] block">{tradesman.email}</span>
            </div>
          </a>
        </div>

        {/* Biography */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Professional Bio &amp; Specialty</h3>
          <p className="text-xs text-gray-300 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5">
            {tradesman.bio}
          </p>
        </div>

        {/* Skills & Certifications */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Verified Skills &amp; Equipment</h3>
          <div className="flex flex-wrap gap-2">
            {tradesman.skills.map((skill, idx) => (
              <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Gallery */}
        {tradesman.portfolio && tradesman.portfolio.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Featured Work Portfolio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tradesman.portfolio.map((imgUrl, i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/10 group relative">
                  <img src={imgUrl} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button onClick={onClose} className="btn btn-secondary text-xs font-bold">
            Close Profile
          </button>
          
          <button
            onClick={() => {
              onClose();
              onRequestQuote(tradesman);
            }}
            className="btn btn-emerald px-6 py-2.5 text-xs font-bold shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Job Quote Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}
