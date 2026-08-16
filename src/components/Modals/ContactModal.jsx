import React, { useState } from 'react';
import { X, Mail, Send, User, Phone, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, showToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Save message locally for Admin inspection
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

    // Background HTTP POST to FormSubmit API for vekyd.one@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/vekyd.one@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || 'Not provided',
          message,
          _subject: `New Vekyd Market Inquiry from ${name}`
        })
      });
    } catch (err) {
      console.warn('Background mail dispatch notice:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    if (showToast) showToast(`✓ Thank you ${name}! Message sent to vekyd.one@gmail.com`);

    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Contact Vekyd Support</h2>
            <p className="text-xs text-gray-400">Send an inquiry directly to <strong className="text-cyan-300">vekyd.one@gmail.com</strong></p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-gray-300">Your inquiry has been formatted and directed to <strong className="text-cyan-300">vekyd.one@gmail.com</strong>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="label">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="label">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pl-9"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Message Inquiry *</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <textarea
                  required
                  rows={4}
                  placeholder="Type your inquiry, product query, or trade question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field pl-9 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary py-3 font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                  <span>Submitting Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
