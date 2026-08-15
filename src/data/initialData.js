export const TRADE_CATEGORIES = [
  { id: 'all', name: 'All Trades', icon: 'Wrench', count: '120+' },
  { id: 'craftsman', name: 'Craftsman', icon: 'Hammer', count: '24', gradient: 'from-amber-500 to-orange-600', description: 'Woodworking, metal crafting, custom art & leatherwork' },
  { id: 'welder', name: 'Welder', icon: 'Flame', count: '18', gradient: 'from-cyan-500 to-blue-600', description: 'MIG, TIG, Stick welding, structural metal & gates' },
  { id: 'electrician', name: 'Electrician', icon: 'Zap', count: '32', gradient: 'from-yellow-400 to-amber-500', description: 'Rewiring, EV chargers, panels, smart home setup' },
  { id: 'plumber', name: 'Plumber', icon: 'Droplets', count: '29', gradient: 'from-blue-500 to-indigo-600', description: 'Emergency repairs, water heaters, piping & fixtures' },
  { id: 'mason', name: 'Mason', icon: 'Boxes', count: '15', gradient: 'from-stone-500 to-neutral-700', description: 'Bricklaying, stone patios, chimneys & concrete work' },
  { id: 'carpenter', name: 'Carpenter', icon: 'Ruler', count: '22', gradient: 'from-emerald-500 to-teal-700', description: 'Framing, custom cabinetry, decks & trim carpentry' },
  { id: 'painter', name: 'Painter', icon: 'Paintbrush', count: '20', gradient: 'from-pink-500 to-rose-600', description: 'Interior/exterior, drywall repair, spray finishes' },
  { id: 'hvac', name: 'HVAC Tech', icon: 'Wind', count: '16', gradient: 'from-violet-500 to-purple-700', description: 'Heating, AC repair, heat pumps, air quality' },
  { id: 'landscaper', name: 'Landscaper', icon: 'Trees', count: '19', gradient: 'from-green-500 to-emerald-600', description: 'Hardscaping, sod installation, irrigation & gardens' }
];

export const GOODS_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'groceries', name: 'Groceries & Pantry', icon: 'Apple' },
  { id: 'tools', name: 'Power & Hand Tools', icon: 'Wrench' },
  { id: 'electronics', name: 'Electronics & Tech', icon: 'Laptop' },
  { id: 'furniture', name: 'Furniture & Decor', icon: 'Armchair' },
  { id: 'vehicles', name: 'Bikes & Vehicles', icon: 'Bike' },
  { id: 'collectibles', name: 'Vintage & Collectibles', icon: 'Sparkles' },
  { id: 'garden', name: 'Home & Outdoor', icon: 'Home' }
];

export const INITIAL_USERS = [
  {
    id: 'u-admin',
    name: 'Site Admin',
    email: 'admin@vekyd.com',
    userType: 'admin',
    role: 'Platform Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    subscriptionExpiresAt: null,
    registeredDate: '2026-01-01'
  },
  {
    id: 'u-biz-1',
    name: 'Apex Industrial Supply Co.',
    email: 'contact@apexsupply.com',
    userType: 'business',
    role: 'Pro Business Member ($500/mo)',
    businessName: 'Apex Industrial Supply Co.',
    businessCategory: 'Tools & Groceries',
    subscriptionExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    registeredDate: '2026-02-01'
  },
  {
    id: 'u-gen-1',
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    userType: 'general',
    role: 'General Seller (1 Listing Max / 30 Days)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    subscriptionExpiresAt: null,
    registeredDate: '2026-02-10'
  }
];

export const INITIAL_GOODS = [
  {
    id: 'g-1',
    title: 'DeWalt 20V MAX 5-Tool Cordless Combo Kit (Barely Used)',
    category: 'tools',
    price: 245,
    originalPrice: 429,
    condition: 'Like New',
    location: 'Austin, TX',
    sellerName: 'Marcus Vance',
    sellerId: 'u-gen-1',
    sellerType: 'general',
    sellerRole: 'General Seller',
    sellerRating: 4.9,
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    description: 'Upgraded to 60V FlexVolt system. Includes drill, impact driver, circular saw, reciprocating saw, and LED work light. Comes with two 4Ah batteries and rapid charger in heavy-duty contractor bag.',
    postedDate: '2 days ago',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    expiresAt: Date.now() + 28 * 24 * 60 * 60 * 1000, // Valid for 30 days
    specifications: ['Voltage: 20V MAX', 'Includes 2 Batteries + Charger', '30-Day Listing Validity', 'Condition: 9.5/10'],
    featured: true
  },
  {
    id: 'g-biz-1',
    title: 'Organic Farm-Fresh Pantry Box & Local Artisanal Honey (Bulk Pack)',
    category: 'groceries',
    price: 65,
    originalPrice: 95,
    condition: 'Brand New / Fresh',
    location: 'Denver, CO',
    sellerName: 'Apex Industrial Supply Co.',
    sellerId: 'u-biz-1',
    sellerType: 'business',
    sellerRole: 'Verified Business Member ($500/mo)',
    sellerRating: 5.0,
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    description: 'Fresh farm-to-table organic groceries package directly from certified producers. Includes raw wildflower honey jars, cold-pressed olive oil, organic whole grains, and sourdough loaves.',
    postedDate: 'Today',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    expiresAt: Date.now() + 29 * 24 * 60 * 60 * 1000,
    specifications: ['100% Organic Certified', 'Includes 2x Raw Honey Jars', 'Business Unlimited Listing', 'Express Delivery Available'],
    featured: true
  },
  {
    id: 'g-2',
    title: 'Lincoln Electric Weld-Pak 140 HD Wire Feed Welder',
    category: 'tools',
    price: 310,
    originalPrice: 549,
    condition: 'Good',
    location: 'Denver, CO',
    sellerName: 'Jake "Thor" Miller',
    sellerId: 'u-trade-1',
    sellerType: 'tradesman',
    sellerRole: 'Master Welder',
    sellerRating: 5.0,
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    description: 'Reliable 120V MIG & Flux-Cored welder. Great for household projects, auto body repair, and light structural metalwork. Includes gas regulator, hose, and full spool of .030 flux wire.',
    postedDate: 'Yesterday',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    expiresAt: Date.now() + 27 * 24 * 60 * 60 * 1000,
    specifications: ['Input Power: 120V', 'Welding Output: 30-140 Amps', 'MIG & Flux-Cored Ready', 'Includes Regulator'],
    featured: true
  },
  {
    id: 'g-3',
    title: 'Handmade Reclaimed Oak Dining Table (Seats 6-8)',
    category: 'furniture',
    price: 520,
    originalPrice: 1200,
    condition: 'Excellent',
    location: 'Portland, OR',
    sellerName: 'Elena Rostova',
    sellerId: 't-3',
    sellerType: 'business',
    sellerRole: 'Verified Business Member ($500/mo)',
    sellerRating: 4.95,
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800',
    description: 'Crafted from 100-year-old barn timber. Hand-rubbed wax finish with matte black steel hairpin legs. Super sturdy and full of character. Direct from artisan business studio.',
    postedDate: '3 days ago',
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    expiresAt: Date.now() + 26 * 24 * 60 * 60 * 1000,
    specifications: ['Solid Reclaimed Barn Wood', 'Dimensions: 72"L x 36"W x 30"H', 'Powder-coated Steel Legs'],
    featured: true
  },
  {
    id: 'g-4',
    title: 'Apple MacBook Pro 14" M1 Pro (16GB RAM / 512GB SSD)',
    category: 'electronics',
    price: 890,
    originalPrice: 1999,
    condition: 'Like New',
    location: 'Seattle, WA',
    sellerName: 'David Chen',
    sellerId: 'u-gen-4',
    sellerType: 'general',
    sellerRole: 'General Seller',
    sellerRating: 4.85,
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'Space Gray finish, low battery cycle count (92%). Used primarily indoors for blueprint review and schematics. Pristine Liquid Retina XDR screen with original MagSafe cable and box.',
    postedDate: 'Just now',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    expiresAt: Date.now() + 29 * 24 * 60 * 60 * 1000,
    specifications: ['Apple M1 Pro 8-Core CPU', '16GB Unified Memory', '512GB NVMe SSD', 'Liquid Retina XDR Display'],
    featured: false
  }
];

export const INITIAL_ADS = [
  {
    id: 'ad-1',
    title: 'Apex Industrial Supply Co. - Commercial Power Tools & Groceries',
    subtitle: 'Official Business Sponsor • 15% Off Heavy Duty Gear & Bulk Pantry Deliveries',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    sponsorName: 'Apex Industrial Supply Co.',
    sponsorTier: 'Verified Business ($500/mo)',
    commissionTag: 'Platform Commission Partner',
    ctaText: 'Explore Business Shop',
    discountCode: 'APEX15',
    clicks: 142
  },
  {
    id: 'ad-2',
    title: 'Rostova Custom Woodworking & Resin Furniture Studio',
    subtitle: 'Featured Business Sponsor • Handcrafted Timber Tables & Architectural Decor',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200',
    sponsorName: 'Rostova Artisan Crafts',
    sponsorTier: 'Verified Business ($500/mo)',
    commissionTag: 'Commission Earnings Partner',
    ctaText: 'View Custom Designs',
    discountCode: 'ROSTOVA10',
    clicks: 98
  }
];

export const INITIAL_TRADESMEN = [
  {
    id: 't-1',
    name: 'Jake "Thor" Miller',
    tradeCategory: 'welder',
    title: 'Master Structural & Ornamental Welder',
    experienceYears: 14,
    hourlyRate: 85,
    location: 'Denver, CO & Surrounding',
    rating: 5.0,
    reviewCount: 48,
    verificationStatus: 'Verified Master',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'AWS Certified 6G Pipe & Structural Welder specializing in custom steel staircases, decorative iron gates, structural beam fabrication, and mobile heavy equipment repair. Clean welds, structural integrity guaranteed.',
    skills: ['TIG Stainless/Aluminum', 'MIG Heavy Steel', 'Custom Gate Fabrication', 'Structural Steel Framing', 'Mobile Welding Trailer'],
    portfolio: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
    ],
    phone: '(303) 555-0192',
    email: 'jake.miller.welding@example.com',
    availableNow: true
  },
  {
    id: 't-2',
    name: 'Marcus Vance',
    tradeCategory: 'electrician',
    title: 'Licensed Master Electrician & Smart Home Pro',
    experienceYears: 11,
    hourlyRate: 90,
    location: 'Austin, TX Metro Area',
    rating: 4.9,
    reviewCount: 62,
    verificationStatus: 'State Licensed Master',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    bio: 'Specializing in residential panel upgrades (200A), Level 2 Tesla/EV charger installations, full rewire projects, recessed LED lighting design, and generator interlocks. Up to NEC code guaranteed.',
    skills: ['200A Panel Upgrades', 'EV Charger Install', 'Whole Home Rewiring', 'Solar & Battery Interlock', 'Troubleshooting'],
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600'
    ],
    phone: '(512) 555-0144',
    email: 'marcus.vance.elec@example.com',
    availableNow: true
  },
  {
    id: 't-3',
    name: 'Elena Rostova',
    tradeCategory: 'craftsman',
    title: 'Custom Artisan Craftsman & Furniture Designer',
    experienceYears: 12,
    hourlyRate: 75,
    location: 'Portland, OR',
    rating: 4.98,
    reviewCount: 39,
    verificationStatus: 'Master Artisan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Handcrafting bespoke live-edge dining tables, custom epoxy resin furniture, wall accent art, and fine wood restoration. Every piece is built to heirloom standards using sustainably sourced timber.',
    skills: ['Live Edge Woodworking', 'Epoxy Resin Casting', 'Custom Joinery', 'Furniture Restoration', 'Hand-Carving'],
    portfolio: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600'
    ],
    phone: '(503) 555-0188',
    email: 'elena@rostovacrafts.com',
    availableNow: false
  }
];
