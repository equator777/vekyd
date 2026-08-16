import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  UserPlus, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  Sparkles,
  BarChart3,
  Globe,
  Upload,
  Download,
  AlertCircle,
  TrendingUp,
  Key
} from 'lucide-react';
import { commitDataToGitHub } from '../../utils/githubSync';
import { GOODS_CATEGORIES } from '../../data/initialData';

export default function AdminPanel({
  isOpen,
  onClose,
  users,
  onAddUser,
  onDeleteUser,
  onToggleBusinessTier,
  goods,
  onAddGoods,
  onDeleteGoods,
  onRenewGoodsExpiry,
  ads,
  onAddAd,
  onDeleteAd
}) {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'listings' | 'ads' | 'github'
  const [userSearch, setUserSearch] = useState('');
  
  // GitHub Settings State (persisted in localStorage)
  const [ghOwner, setGhOwner] = useState(() => localStorage.getItem('vekyd_gh_owner') || 'vekyd-org');
  const [ghRepo, setGhRepo] = useState(() => localStorage.getItem('vekyd_gh_repo') || 'vekyd');
  const [ghToken, setGhToken] = useState(() => localStorage.getItem('vekyd_gh_token') || '');
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);

  // Save GitHub credentials to local storage
  useEffect(() => {
    localStorage.setItem('vekyd_gh_owner', ghOwner);
    localStorage.setItem('vekyd_gh_repo', ghRepo);
    localStorage.setItem('vekyd_gh_token', ghToken);
  }, [ghOwner, ghRepo, ghToken]);

  // New User Form State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserType, setNewUserType] = useState('business');

  // New Product Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('tools');
  const [prodCondition, setProdCondition] = useState('Like New');
  const [prodImage, setProdImage] = useState('');
  const [prodSeller, setProdSeller] = useState('');
  const [prodContact, setProdContact] = useState('');
  const [prodLocation, setProdLocation] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // New Ad Banner Form State
  const [isAddAdOpen, setIsAddAdOpen] = useState(false);
  const [adTitle, setAdTitle] = useState('');
  const [adSubtitle, setAdSubtitle] = useState('');
  const [adSponsorName, setAdSponsorName] = useState('');
  const [adImage, setAdImage] = useState('');
  const [adDiscountCode, setAdDiscountCode] = useState('');

  if (!isOpen) return null;

  // Revenue math: $500 per business subscriber
  const businessCount = users.filter(u => u.userType === 'business').length;
  const estimatedMonthlyRevenue = businessCount * 500;

  // Commit changes to GitHub Repository
  const handleDeployToGitHub = async () => {
    if (!ghOwner || !ghRepo || !ghToken) {
      setDeployStatus({ type: 'error', message: 'Please enter GitHub Username, Repo Name, and Personal Access Token.' });
      return;
    }

    setIsDeploying(true);
    setDeployStatus({ type: 'info', message: 'Connecting to GitHub REST API and building commit...' });

    try {
      const fullSiteData = {
        updatedAt: new Date().toISOString(),
        users,
        goods,
        ads
      };

      await commitDataToGitHub({
        owner: ghOwner,
        repo: ghRepo,
        token: ghToken,
        filePath: 'src/data/initialData.json',
        data: fullSiteData,
        commitMessage: `admin: update Vekyd marketplace users (${users.length}), products (${goods.length}), and sponsor ads (${ads.length})`
      });

      setDeployStatus({
        type: 'success',
        message: `✓ Successfully committed changes to GitHub repository "${ghOwner}/${ghRepo}"! GitHub Pages/Netlify will auto-deploy the updated live site for all users in ~30 seconds.`
      });
    } catch (err) {
      setDeployStatus({
        type: 'error',
        message: `Deployment Error: ${err.message}`
      });
    } finally {
      setIsDeploying(false);
    }
  };

  // Download updated JSON data
  const handleDownloadJSON = () => {
    const fullSiteData = {
      updatedAt: new Date().toISOString(),
      users,
      goods,
      ads
    };
    const blob = new Blob([JSON.stringify(fullSiteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vekyd_site_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const createdUser = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      userType: newUserType,
      role: newUserType === 'business' ? 'Pro Business Member (₹500/mo)' : newUserType === 'general' ? 'General Seller' : 'Skilled Trade Pro',
      subscriptionExpiresAt: newUserType === 'business' ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      registeredDate: new Date().toISOString().split('T')[0]
    };

    onAddUser(createdUser);
    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice) return;

    const newItem = {
      id: `g-${Date.now()}`,
      title: prodTitle,
      price: Number(prodPrice),
      originalPrice: Number(prodPrice) * 1.2,
      category: prodCategory,
      condition: prodCondition,
      image: prodImage || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
      sellerId: 'admin-1',
      sellerName: prodSeller || 'Vekyd Verified Seller',
      sellerType: 'business',
      sellerContact: prodContact || 'sales@vekyd.com',
      location: prodLocation || 'United States',
      description: prodDesc || 'Product added via Vekyd Admin Control Console.',
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
    };

    if (onAddGoods) {
      onAddGoods(newItem);
    }

    setIsAddProductOpen(false);
    setProdTitle('');
    setProdPrice('');
    setProdImage('');
    setProdSeller('');
    setProdContact('');
    setProdLocation('');
    setProdDesc('');
  };

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!adTitle || !adSponsorName) return;

    const newAd = {
      id: `ad-${Date.now()}`,
      title: adTitle,
      subtitle: adSubtitle || 'Featured Business Partner',
      image: adImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      sponsorName: adSponsorName,
      sponsorTier: 'Verified Business ($500/mo)',
      commissionTag: 'Platform Commission Partner',
      ctaText: 'Shop Business Shop',
      discountCode: adDiscountCode || 'DEAL10',
      clicks: 0
    };

    onAddAd(newAd);
    setIsAddAdOpen(false);
    setAdTitle('');
    setAdSubtitle('');
    setAdSponsorName('');
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.userType.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-5xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">Vekyd Admin Control Console</h2>
                <span className="badge badge-rose text-[10px]">Site Owner Portal</span>
              </div>
              <p className="text-xs text-gray-400">Manage users, 30-day listing timers, ₹500/mo subscriptions &amp; GitHub live deployment</p>
            </div>
          </div>

          {/* Revenue Stat Widget */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-emerald-500/30">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Est. Monthly Ad &amp; Sub Revenue</span>
              <span className="text-lg font-extrabold text-emerald-400">₹{estimatedMonthlyRevenue} <span className="text-xs text-gray-400 font-normal">/mo</span></span>
            </div>
          </div>
        </div>

        {/* Console Nav Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Accounts ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'listings'
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Listings &amp; 30d Timers ({goods.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'ads'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Ad Banners &amp; Commissions ({ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'github'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-300" />
            <span>GitHub Live Sync &amp; Host</span>
          </button>
        </div>

        {/* TAB 4: GITHUB LIVE DEPLOYMENT & AUTO-SYNC */}
        {activeTab === 'github' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">GitHub Pages Live Sync Engine</h3>
                  <p className="text-xs text-gray-400">Commit admin modifications directly to your GitHub repository. GitHub Pages will auto-deploy the site live for everyone in ~30s!</p>
                </div>
              </div>

              {/* Input Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label text-xs">GitHub Username / Owner</label>
                  <input
                    type="text"
                    placeholder="e.g., your-username"
                    value={ghOwner}
                    onChange={(e) => setGhOwner(e.target.value)}
                    className="input-field text-xs bg-slate-900 border-white/10"
                  />
                </div>

                <div>
                  <label className="label text-xs">Repository Name</label>
                  <input
                    type="text"
                    placeholder="e.g., vekyd-marketplace"
                    value={ghRepo}
                    onChange={(e) => setGhRepo(e.target.value)}
                    className="input-field text-xs bg-slate-900 border-white/10"
                  />
                </div>

                <div>
                  <label className="label text-xs flex items-center justify-between">
                    <span>Personal Access Token (PAT)</span>
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      Get Token ↗
                    </a>
                  </label>
                  <input
                    type="password"
                    placeholder="ghp_..."
                    value={ghToken}
                    onChange={(e) => setGhToken(e.target.value)}
                    className="input-field text-xs bg-slate-900 border-amber-500/40 text-amber-200"
                  />
                </div>
              </div>

              {/* Status Banner */}
              {deployStatus && (
                <div className={`p-4 rounded-xl text-xs font-bold mb-4 border flex items-center gap-2 ${
                  deployStatus.type === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : deployStatus.type === 'error'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{deployStatus.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={handleDownloadJSON}
                  className="btn btn-secondary text-xs font-bold py-2.5 px-4 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON File</span>
                </button>

                <button
                  onClick={handleDeployToGitHub}
                  disabled={isDeploying}
                  className="btn btn-emerald text-xs font-extrabold py-2.5 px-6 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  {isDeploying ? (
                    <span>Committing to GitHub...</span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Commit to GitHub &amp; Auto-Deploy Live Site</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Workflow Guide */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-400" />
                How Live GitHub Sync Works for Vekyd
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-300 leading-relaxed">
                <li>When you add/delete users, renew 30-day listings, or add $500/mo business ads in the Admin Panel, click <strong>"Commit to GitHub &amp; Auto-Deploy"</strong> above.</li>
                <li>The Admin Console connects securely to GitHub API and updates <code className="text-cyan-300 font-mono">src/data/initialData.json</code> in your repository.</li>
                <li>GitHub Pages (or Netlify / Vercel) automatically rebuilds the site in ~30s so all visitors globally see the updated listings!</li>
              </ol>
            </div>

          </div>
        )}

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user accounts by name, email, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="input-field text-xs pl-9 py-2 bg-slate-950"
                />
              </div>

              <button
                onClick={() => setIsAddUserOpen(true)}
                className="btn btn-primary text-xs py-2 px-4 font-bold shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>

            {/* Add User Form */}
            {isAddUserOpen && (
              <form onSubmit={handleCreateUser} className="p-4 mb-4 rounded-2xl bg-white/5 border border-indigo-500/30 space-y-3 animate-fade-in">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Create User Account</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="User Full Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="input-field text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="input-field text-xs"
                  />
                  <select
                    value={newUserType}
                    onChange={(e) => setNewUserType(e.target.value)}
                    className="input-field text-xs bg-slate-950 text-white font-bold"
                  >
                    <option value="general">General Seller (1 Item Max / 30 Days)</option>
                    <option value="business">Business User (₹500/mo Sub - Unlimited Items)</option>
                    <option value="tradesman">Skilled Trade Professional</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddUserOpen(false)} className="btn btn-secondary text-xs py-1.5">Cancel</button>
                  <button type="submit" className="btn btn-primary text-xs py-1.5 font-bold">Save User Account</button>
                </div>
              </form>
            )}

            {/* Users Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Account Tier</th>
                    <th className="p-3">30-Day Sub Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-white block">{u.name}</span>
                            <span className="text-[11px] text-gray-400 block">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`badge ${
                          u.userType === 'admin' ? 'badge-rose' :
                          u.userType === 'business' ? 'badge-amber' :
                          u.userType === 'tradesman' ? 'badge-cyan' : 'badge-indigo'
                        }`}>
                          {u.userType === 'business' ? 'Business (₹500/mo)' : u.userType.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        {u.userType === 'business' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Active ₹500/mo Sub
                          </span>
                        ) : u.userType === 'general' ? (
                          <span className="text-gray-400">1 Item / 30-Day Limit</span>
                        ) : (
                          <span className="text-cyan-400 font-medium">Trade Professional</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => onToggleBusinessTier(u.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold transition-all"
                        >
                          {u.userType === 'business' ? 'Downgrade to General' : 'Upgrade to Business (₹500)'}
                        </button>
                        {u.userType !== 'admin' && (
                          <button
                            onClick={() => onDeleteUser(u.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LISTINGS CONTROL & 30-DAY TIMERS */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product Listings &amp; 30-Day Timers</h4>
                <p className="text-xs text-gray-400">Add real products or delete initial demo products directly</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="btn btn-primary text-xs py-2 px-4 font-bold shrink-0 flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Real Product</span>
              </button>
            </div>

            {/* Form for adding a new product */}
            {isAddProductOpen && (
              <form onSubmit={handleCreateProduct} className="p-4 mb-4 rounded-2xl bg-white/5 border border-indigo-500/30 space-y-3 animate-fade-in">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Add New Product for Sale</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label text-xs">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., DeWalt 20V Cordless Drill Combo"
                      value={prodTitle}
                      onChange={(e) => setProdTitle(e.target.value)}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 185"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Category *</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="input-field text-xs bg-slate-950 text-white font-bold"
                    >
                      {GOODS_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label text-xs">Condition</label>
                    <select
                      value={prodCondition}
                      onChange={(e) => setProdCondition(e.target.value)}
                      className="input-field text-xs bg-slate-950 text-white font-bold"
                    >
                      <option value="Brand New / Fresh">Brand New / Fresh Pantry</option>
                      <option value="Like New">Like New</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                  <div>
                    <label className="label text-xs">Seller Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Apex Hardware & Supply"
                      value={prodSeller}
                      onChange={(e) => setProdSeller(e.target.value)}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Contact Email / Phone</label>
                    <input
                      type="text"
                      placeholder="e.g., (555) 019-2831"
                      value={prodContact}
                      onChange={(e) => setProdContact(e.target.value)}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="label text-xs">Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div>
                  <label className="label text-xs">Description &amp; Location</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on product condition, specs, location, and delivery..."
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddProductOpen(false)} className="btn btn-secondary text-xs py-1.5">Cancel</button>
                  <button type="submit" className="btn btn-primary text-xs py-1.5 font-bold">Publish Product Listing</button>
                </div>
              </form>
            )}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Seller</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">30-Day Expiry Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {goods.map((item) => {
                    const daysLeft = item.expiresAt 
                      ? Math.ceil((item.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))
                      : 30;
                    const isExpired = daysLeft <= 0;

                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                            <div className="max-w-xs">
                              <span className="font-bold text-white block truncate">{item.title}</span>
                              <span className="text-[10px] text-indigo-400 uppercase font-semibold">{item.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-white block">{item.sellerName}</span>
                          <span className={`text-[10px] ${item.sellerType === 'business' ? 'text-amber-400 font-bold' : 'text-gray-400'}`}>
                            {item.sellerType === 'business' ? 'Verified Business' : 'General Seller'}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-white">₹{item.price}</td>
                        <td className="p-3">
                          {isExpired ? (
                            <span className="badge badge-rose flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              EXPIRED
                            </span>
                          ) : (
                            <span className="badge badge-cyan">
                              Expires in {daysLeft} Days
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => onRenewGoodsExpiry(item.id)}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold transition-all"
                            title="Reset 30-Day Timer"
                          >
                            <RotateCcw className="w-3 h-3 inline mr-1" />
                            +30 Days
                          </button>
                          <button
                            onClick={() => onDeleteGoods(item.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all"
                            title="Remove Listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AD BANNERS & MONETIZATION */}
        {activeTab === 'ads' && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Sponsored Business Ad Banners</h4>
              <button
                onClick={() => setIsAddAdOpen(true)}
                className="btn btn-warm text-xs py-2 px-4 font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Sponsor Ad (₹500/mo)</span>
              </button>
            </div>

            {/* Create Ad Form */}
            {isAddAdOpen && (
              <form onSubmit={handleCreateAd} className="p-4 mb-4 rounded-2xl bg-white/5 border border-amber-500/30 space-y-3 animate-fade-in">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">New Business Sponsor Ad Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ad Headline Title"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    className="input-field text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Sponsor Business Name"
                    value={adSponsorName}
                    onChange={(e) => setAdSponsorName(e.target.value)}
                    className="input-field text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle Offer Details"
                    value={adSubtitle}
                    onChange={(e) => setAdSubtitle(e.target.value)}
                    className="input-field text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Discount Promo Code (e.g. APEX15)"
                    value={adDiscountCode}
                    onChange={(e) => setAdDiscountCode(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Banner Image URL"
                    value={adImage}
                    onChange={(e) => setAdImage(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddAdOpen(false)} className="btn btn-secondary text-xs py-1.5">Cancel</button>
                  <button type="submit" className="btn btn-warm text-xs py-1.5 font-bold">Publish Business Ad</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ads.map((ad) => (
                <div key={ad.id} className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col justify-between">
                  <div>
                    <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                    <span className="badge badge-amber text-[10px] mb-2">{ad.sponsorName}</span>
                    <h4 className="text-sm font-bold text-white mb-1">{ad.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">{ad.subtitle}</p>
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                      <span>Recorded Clicks: {ad.clicks}</span>
                      <span className="text-amber-300">Revenue: ₹500/mo</span>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => onDeleteAd(ad.id)}
                      className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold"
                    >
                      Delete Ad Banner
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
