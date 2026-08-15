import React, { useState } from 'react';
import { X, MessageSquare, Send, Calendar, DollarSign, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuoteModal({ isOpen, onClose, tradesman }) {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !tradesman) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      // Reset
      setProjectTitle('');
      setDescription('');
      setBudget('');
      setPreferredDate('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Request Quote from {tradesman.name}</h2>
                <p className="text-xs text-gray-400">
                  <span className="text-cyan-300 font-semibold">{tradesman.tradeCategory} Pro</span> • Rate: ${tradesman.hourlyRate}/hr
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="label">Project Title / Job Scope *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Custom Iron Entry Gate Welding or 200A Electrical Upgrade"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Estimated Budget ($)</label>
                  <input
                    type="number"
                    placeholder="e.g., 500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Target Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="input-field bg-slate-950 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Your Phone / Email *</label>
                  <input
                    type="text"
                    required
                    placeholder="(555) 123-4567"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label">Job Details &amp; Location</label>
                <textarea
                  rows={3}
                  placeholder="Describe dimensions, materials, site conditions, or special requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Submit button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button type="button" onClick={onClose} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald text-xs px-6 py-2.5 font-bold shadow-lg shadow-emerald-500/20">
                  <Send className="w-4 h-4" />
                  <span>Send Quote Request</span>
                </button>
              </div>

            </form>
          </>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Quote Request Sent!</h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              Your job proposal has been delivered to <strong className="text-cyan-300">{tradesman.name}</strong>. They will review your requirements and reach out via phone or email shortly!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
