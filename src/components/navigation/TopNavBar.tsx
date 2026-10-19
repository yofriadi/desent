'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { WORKSPACE_PRESETS, formatCurrency } from '@/data/catalog';
import {
  Sun,
  Sunset,
  Share2,
  Check,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';

interface TopNavBarProps {
  onOpenCheckout: () => void;
  onOpenCatalogDrawer?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onOpenCheckout,
  onOpenCatalogDrawer,
}) => {
  const {
    state,
    pricing,
    activePresetId,
    applyPreset,
    toggleLightingMode,
    toggleCurrency,
    getShareableLink,
  } = useWorkspace();

  const [copied, setCopied] = useState(false);
  const isSunset = state.lightingMode === 'sunset';

  const handleShare = () => {
    const link = getShareableLink();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const activeMonthly = state.currency === 'USD' ? pricing.netMonthlyUSD : pricing.netMonthlyIDR;
  const originalMonthly = state.currency === 'USD' ? pricing.subtotalMonthlyUSD : pricing.subtotalMonthlyIDR;

  return (
    <header className="sticky top-0 z-30 w-full bg-stone-900/90 backdrop-blur-xl border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/20 text-white font-black text-xl tracking-tight">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                monis<span className="text-emerald-400">.rent</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 uppercase tracking-wider">
                Bali Nomads
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Interactive Workspace Designer
            </p>
          </div>
        </div>

        {/* Center: Curated Preset Selector */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-stone-950/70 border border-stone-800">
          <span className="flex items-center gap-1 text-[11px] font-medium text-stone-400 px-2 py-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Presets:
          </span>
          {WORKSPACE_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
                title={preset.description}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Right Action Tools: Lighting, Currency, Share, Rate CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Catalog Trigger */}
          {onOpenCatalogDrawer && (
            <button
              onClick={onOpenCatalogDrawer}
              className="lg:hidden p-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 hover:text-white"
              title="Open Equipment Catalog"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Ambient Lighting Toggle */}
          <button
            onClick={toggleLightingMode}
            className={`p-2 rounded-xl border text-xs font-medium transition-all ${
              isSunset
                ? 'bg-amber-950/60 border-amber-700/60 text-amber-300 hover:bg-amber-900/60'
                : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:text-white hover:bg-stone-700/80'
            }`}
            title={`Toggle lighting (Current: ${state.lightingMode})`}
          >
            {isSunset ? (
              <Sunset className="w-4 h-4 text-amber-400" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-400" />
            )}
          </button>

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-xs font-semibold text-stone-200 hover:text-white hover:border-stone-600 transition-all"
            title="Toggle USD / IDR"
          >
            {state.currency === 'USD' ? (
              <span>
                <strong className="text-emerald-400">USD</strong> / IDR
              </span>
            ) : (
              <span>
                USD / <strong className="text-emerald-400">IDR</strong>
              </span>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:text-white hover:bg-stone-700/80'
            }`}
            title="Copy shareable workspace link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>

          {/* Live Monthly Rate Counter & Checkout CTA */}
          <button
            onClick={onOpenCheckout}
            className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-3.5 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/40 transition-all transform active:scale-95 group"
          >
            <div className="text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-sm sm:text-base tracking-tight">
                  {formatCurrency(activeMonthly, state.currency)}
                </span>
                <span className="text-[10px] text-emerald-100 font-medium">/mo</span>
              </div>
              {pricing.durationDiscountPercent > 0 && (
                <div className="text-[9px] text-emerald-200 font-medium leading-none">
                  {pricing.durationDiscountPercent}% OFF ({formatCurrency(originalMonthly, state.currency)})
                </div>
              )}
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
