'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { CategoryId, DeskId, ChairId, MonitorId, AccessoryId, LifestyleId } from '@/types/workspace';
import { EQUIPMENT_CATALOG, formatCurrency } from '@/data/catalog';
import {
  Armchair,
  Table,
  Monitor,
  Sparkles,
  Palmtree,
  Check,
  CheckCircle2,
  Plus,
} from 'lucide-react';

const CATEGORIES: { id: CategoryId; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'desks', name: 'Desks', icon: Table },
  { id: 'chairs', name: 'Chairs', icon: Armchair },
  { id: 'monitors', name: 'Monitors', icon: Monitor },
  { id: 'accessories', name: 'Accessories', icon: Sparkles },
  { id: 'lifestyle', name: 'Bali Lifestyle', icon: Palmtree },
];

export const CatalogPanel: React.FC = () => {
  const {
    state,
    setFocusedCategory,
    setDesk,
    setChair,
    setMonitors,
    toggleAccessory,
    toggleLifestyle,
    isItemActive,
  } = useWorkspace();

  const currentCategory = state.focusedCategory;
  const items = EQUIPMENT_CATALOG.filter((item) => item.category === currentCategory);

  const handleItemSelect = (id: string, category: CategoryId) => {
    if (category === 'desks') {
      setDesk(id as DeskId);
    } else if (category === 'chairs') {
      setChair(id as ChairId);
    } else if (category === 'monitors') {
      setMonitors(id as MonitorId);
    } else if (category === 'accessories') {
      toggleAccessory(id as AccessoryId);
    } else if (category === 'lifestyle') {
      toggleLifestyle(id as LifestyleId);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-900 border-l border-stone-800 text-stone-100 overflow-hidden shadow-2xl">
      {/* Category Tabs Header */}
      <div className="p-3 border-b border-stone-800 bg-stone-950/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isTabActive = currentCategory === cat.id;

            // Compute active count in this category
            let count = 0;
            if (cat.id === 'desks' && state.desk) count = 1;
            if (cat.id === 'chairs' && state.chair) count = 1;
            if (cat.id === 'monitors' && state.monitors) count = 1;
            if (cat.id === 'accessories') count = state.accessories.length;
            if (cat.id === 'lifestyle') count = state.lifestyle.length;

            return (
              <button
                key={cat.id}
                onClick={() => setFocusedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isTabActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isTabActive
                        ? 'bg-emerald-950/90 text-emerald-200'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Equipment Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-stone-400 px-1 pb-1">
          <span>{CATEGORIES.find((c) => c.id === currentCategory)?.name} Catalog</span>
          <span>
            {currentCategory === 'accessories' || currentCategory === 'lifestyle'
              ? 'Multi-select add-ons'
              : 'Choose 1 active model'}
          </span>
        </div>

        {items.map((item) => {
          const isActive = isItemActive(item.id);
          const isFocused = state.selectedItemId === item.id;
          const rate = state.currency === 'USD' ? item.monthlyRateUSD : item.monthlyRateIDR;

          return (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item.id, item.category)}
              className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-stone-850/90 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-850/60'
              } ${isFocused ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-stone-900' : ''}`}
            >
              {/* Header: Title, Badge, Price */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-sm text-emerald-400">
                    {formatCurrency(rate, state.currency)}
                  </div>
                  <div className="text-[10px] text-stone-400">/month</div>
                </div>
              </div>

              {/* Specs Bullet Points */}
              <div className="mt-3 pt-3 border-t border-stone-800/80 grid grid-cols-2 gap-1.5 text-[11px] text-stone-300">
                {item.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Action State Footer */}
              <div className="mt-3.5 flex items-center justify-between">
                <span className="text-[11px] font-medium text-stone-400">
                  {item.category === 'accessories' || item.category === 'lifestyle'
                    ? isActive
                      ? 'Included in setup'
                      : 'Optional add-on'
                    : isActive
                    ? 'Active model'
                    : 'Click to equip'}
                </span>

                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{item.category === 'accessories' || item.category === 'lifestyle' ? 'Equipped' : 'Selected'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.category === 'accessories' || item.category === 'lifestyle' ? 'Add' : 'Select'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
