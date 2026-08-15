import React, { useState } from 'react';
import { X, UserCheck, Wrench, Sparkles, ShieldCheck, Hammer } from 'lucide-react';
import { TRADE_CATEGORIES } from '../../data/initialData';

export default function RegisterTradeModal({ isOpen, onClose, onRegisterTrade }) {
  const [name, setName] = useState('');
  const [tradeCategory, setTradeCategory] = useState('welder');
  const [title, setTitle] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [location, setLocation] = useState('Denver, CO');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !hourlyRate) return;

    const newTradesman = {
      id: `t-custom-${Date.now()}`,
      name,
      tradeCategory,
      title,
      experienceYears: Number(experienceYears) || 5,
      hourlyRate: Number(hourlyRate),
      location: location || 'Local Service Region',
      rating: 5.0,
      reviewCount: 1,
      verificationStatus: 'Verified Pro',
      avatar: avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      bio: bio || 'Professional skilled trade specialist ready for quality contracts and jobs.',
      skills: skills ? skills.split(',').map(s => s.trim()) : ['Quality Workmanship', 'Licensed Specialist'],
      portfolio: [
        'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
      ],
      phone: phone || '(555) 019-2834',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      availableNow: true
    };

    onRegisterTrade(newTradesman);
    onClose();
    // Reset
    setName('');
    setTitle('');
    setHourlyRate('');
    setExperienceYears('');
    setBio('');
    setSkills('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        
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
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Register as a Trade Professional</h2>
            <p className="text-xs text-gray-400">Join our specialized menu of Craftsmen, Welders, Electricians, Plumbers &amp; Masons</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="label">Specialty Category *</label>
              <select
                value={tradeCategory}
                onChange={(e) => setTradeCategory(e.target.value)}
                className="input-field bg-slate-950 text-white font-bold"
              >
                {TRADE_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Professional Title / Headline *</label>
            <input
              type="text"
              required
              placeholder="e.g., Certified 6G Pipe & Structural Welder"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Hourly Rate ($/hr) *</label>
              <input
                type="number"
                required
                placeholder="85"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Years Experience</label>
              <input
                type="number"
                placeholder="10"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Service Location</label>
              <input
                type="text"
                placeholder="Denver, CO & Surrounding"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Phone Number</label>
              <input
                type="text"
                placeholder="(303) 555-0192"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="marcus@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label">Skills &amp; Specializations (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., TIG Welding, Panel Upgrades, Custom Joinery, Travertine Masonry"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Profile / Bio Summary</label>
            <textarea
              rows={3}
              placeholder="Describe your certifications, tools owned, guarantee, past project highlights..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Avatar Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald text-xs px-6 py-2.5 font-bold shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Create Pro Profile Now</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
