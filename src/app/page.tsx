'use client';

import React, { useState } from 'react';
import { WorkspaceProvider, useWorkspace } from '@/context/WorkspaceContext';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { WorkspaceCanvas } from '@/components/canvas/WorkspaceCanvas';
import { CatalogPanel } from '@/components/catalog/CatalogPanel';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { WORKSPACE_PRESETS, formatCurrency } from '@/data/catalog';
import {
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Palmtree,
  ArrowRight,
} from 'lucide-react';

function WorkspaceDesignerApp() {
  const {
    state,
    pricing,
    setFocusedCategory,
    activePresetId,
    applyPreset,
  } = useWorkspace();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);

  const activeMonthly = state.currency === 'USD' ? pricing.netMonthlyUSD : pricing.netMonthlyIDR;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* 1. Top Navigation Bar */}
      <TopNavBar
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenCatalogDrawer={() => setIsMobileCatalogOpen(true)}
      />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Left Column (Desktop 7 cols / Laptop 8 cols): Interactive Canvas Stage */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          {/* Visual Workspace Canvas Stage */}
          <div className="w-full aspect-[1000/640] min-h-[380px] sm:min-h-[440px] md:min-h-[500px]">
            <WorkspaceCanvas />
          </div>

          {/* Quick Presets Strip (Visible on mobile/tablet under canvas) */}
          <div className="lg:hidden p-3 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nomad Presets:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {WORKSPACE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activePresetId === preset.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Villa Nomad Perks Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-900 to-amber-950/40 border border-emerald-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-400">
                <Palmtree className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  Delivered & Assembled Directly at Your Bali Villa
                </div>
                <div className="text-stone-400 text-xs">
                  Canggu, Seminyak, Ubud & Uluwatu • Free delivery on 3+ month rentals
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold whitespace-nowrap"
            >
              <span>Schedule Delivery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (Desktop 5 cols / Laptop 4 cols): Desktop Equipment Catalog Panel */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-[calc(100vh-100px)] sticky top-20 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
          <CatalogPanel />
        </div>
      </main>

      {/* 3. Mobile Floating Bottom Bar */}
      <div className="lg:hidden sticky bottom-0 z-30 w-full bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={() => setIsMobileCatalogOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold hover:text-white"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span>Customize Equipment</span>
        </button>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Rent ({formatCurrency(activeMonthly, state.currency)}/mo)</span>
        </button>
      </div>

      {/* 4. Mobile Equipment Catalog Drawer */}
      {isMobileCatalogOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileCatalogOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-stone-900 rounded-t-3xl border-t border-stone-700 overflow-hidden flex flex-col shadow-2xl z-50">
            <div className="p-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <span className="font-bold text-sm text-white">Equipment Catalog</span>
              <button
                onClick={() => setIsMobileCatalogOpen(false)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CatalogPanel />
            </div>
          </div>
        </div>
      )}

      {/* 5. Checkout & Summary Drawer */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenCatalogCategory={(cat) => {
          setFocusedCategory(cat);
          setIsMobileCatalogOpen(true);
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <WorkspaceProvider>
      <WorkspaceDesignerApp />
    </WorkspaceProvider>
  );
}
