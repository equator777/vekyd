import initialJsonData from './initialData.json';

export const TRADE_CATEGORIES = initialJsonData.TRADE_CATEGORIES || [
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

export const GOODS_CATEGORIES = initialJsonData.GOODS_CATEGORIES || [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'groceries', name: 'Groceries & Pantry', icon: 'Apple' },
  { id: 'tools', name: 'Power & Hand Tools', icon: 'Wrench' },
  { id: 'electronics', name: 'Electronics & Tech', icon: 'Laptop' },
  { id: 'furniture', name: 'Furniture & Decor', icon: 'Armchair' },
  { id: 'vehicles', name: 'Bikes & Vehicles', icon: 'Bike' },
  { id: 'collectibles', name: 'Vintage & Collectibles', icon: 'Sparkles' },
  { id: 'garden', name: 'Home & Outdoor', icon: 'Home' }
];

export const INITIAL_USERS = initialJsonData.users || [];
export const INITIAL_GOODS = initialJsonData.goods || [];
export const INITIAL_ADS = initialJsonData.ads || [];
export const INITIAL_TRADESMEN = initialJsonData.tradesmen || [];
