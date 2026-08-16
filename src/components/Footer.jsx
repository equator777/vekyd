import React, { useState } from 'react';
import { Hammer, Wrench, ShieldCheck, Heart, Share2, Globe, Sparkles, Mail, Send, User, Phone, MessageSquare } from 'lucide-react';
import { TRADE_CATEGORIES } from '../data/initialData';

export default function Footer({ setSelectedTrade, setActiveTab, openContactModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleFooterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Save message locally
    const newContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || 'Not provided',
      message,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    
    const existingMsgs = JSON.parse(localStorage.getItem('tc_contact_messages_v1') || '[]');
    localStorage.setItem('tc_contact_messages_v1', JSON.stringify([newContactMessage, ...existingMsgs]));

    const subject = encodeURIComponent(`Vekyd Market Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
    );
    window.open(`mailto:vekyd.one@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-12 pb-8 text-gray-400">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Hammer className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">Vekyd</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Vekyd is a dynamic marketplace for buying, selling goods, and hiring certified trade specialists.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold">
              <Mail className="w-3.5 h-3.5" />
              <span>vekyd.one@gmail.com</span>
            </div>
          </div>

          {/* Trade Categories Menu */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Specialized Trades</h4>
            <ul className="space-y-1.5 text-xs">
              {TRADE_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveTab('trades');
                      setSelectedTrade(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>• {cat.name} Directory</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">More Services</h4>
            <ul className="space-y-1.5 text-xs">
              {TRADE_CATEGORIES.slice(6, 11).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveTab('trades');
                      setSelectedTrade(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>• {cat.name} Directory</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section Form */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact Us</span>
            </h4>
            
            <form onSubmit={handleFooterSubmit} className="space-y-2">
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <textarea
                required
                rows={2}
                placeholder="Message inquiry *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
              />

              <button
                type="submit"
                className="w-full btn btn-primary py-2 text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to vekyd.one@gmail.com</span>
              </button>
            </form>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Vekyd. Designed with vibrant aesthetics.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.openAdminPrompt) {
                  window.openAdminPrompt();
                }
              }}
              className="text-[11px] text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal Login</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Craftsmen &amp; Traders
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
