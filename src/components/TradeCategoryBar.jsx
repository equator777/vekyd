import React, { useRef } from 'react';
import { 
  Wrench, 
  Hammer, 
  Flame, 
  Zap, 
  Droplets, 
  Boxes, 
  Ruler, 
  Paintbrush, 
  Wind, 
  Trees, 
  Grid,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TRADE_CATEGORIES } from '../data/initialData';

const iconMap = {
  Wrench,
  Hammer,
  Flame,
  Zap,
  Droplets,
  Boxes,
  Ruler,
  Paintbrush,
  Wind,
  Trees,
  Grid
};

export default function TradeCategoryBar({ selectedTrade, setSelectedTrade }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 border-b border-white/5 bg-slate-950/40">
      <div className="container mx-auto px-4">
        
        {/* Category Bar Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Hammer className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Skilled Trade Categories
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
              ScrollABLE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:inline">Use arrows or scroll bar to browse all trades</span>
            
            {/* Scroll Control Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleScroll('left')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-300 border border-white/10 transition-all"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-300 border border-white/10 transition-all"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Horizontal Category Bar with Custom Visible Cyan Scrollbar */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-3 custom-scrollbar-x transition-all"
        >
          {TRADE_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Wrench;
            const isSelected = selectedTrade === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTrade(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-white/5'}`}>
                  <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                </div>
                <span className="whitespace-nowrap">{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/40 text-cyan-300 font-extrabold'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
