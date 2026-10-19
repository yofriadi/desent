'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import {
  BookingDetails,
  BookingConfirmation,
  LeaseDuration,
  BaliZoneId,
} from '@/types/workspace';
import {
  getItemById,
  DELIVERY_ZONES,
  getDeliveryZoneById,
  formatCurrency,
  REFUNDABLE_DEPOSIT_USD,
  REFUNDABLE_DEPOSIT_IDR,
} from '@/data/catalog';
import { ConfirmationModal } from './ConfirmationModal';
import {
  X,
  Trash2,
  RefreshCw,
  Lock,
  Truck,
  Sparkles,
  Calendar,
  Share2,
  Check,
  ShieldCheck,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCatalogCategory: (category: any) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  onOpenCatalogCategory,
}) => {
  const {
    state,
    pricing,
    setRentalDuration,
    setDeliveryZone,
    removeItem,
    getShareableLink,
  } = useWorkspace();

  const [bookingForm, setBookingForm] = useState<BookingDetails>({
    fullName: '',
    whatsapp: '',
    email: '',
    villaAddress: '',
    deliveryZone: state.deliveryZone,
    startDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen && !confirmation) return null;

  const curr = state.currency;
  const activeZone = getDeliveryZoneById(state.deliveryZone);

  // Active items
  const deskItem = getItemById(state.desk);
  const chairItem = getItemById(state.chair);
  const monitorItem = getItemById(state.monitors);
  const accessoryItems = state.accessories.map((id) => getItemById(id)).filter((it): it is NonNullable<typeof it> => Boolean(it));
  const lifestyleItems = state.lifestyle.map((id) => getItemById(id)).filter((it): it is NonNullable<typeof it> => Boolean(it));

  const handleCopyLink = () => {
    const link = getShareableLink();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'deliveryZone') {
      setDeliveryZone(value as BaliZoneId);
    }
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!bookingForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!bookingForm.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required';
    if (!bookingForm.email.trim() || !bookingForm.email.includes('@')) {
      errors.email = 'Valid email is required';
    }
    if (!bookingForm.villaAddress.trim()) {
      errors.villaAddress = 'Villa or coworking address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate MONIS-YYMMDD-XXXX reference code
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randAlpha = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `MONIS-${yy}${mm}${dd}-${randAlpha}`;

    const newConfirmation: BookingConfirmation = {
      referenceCode,
      timestamp: new Date().toISOString(),
      details: {
        ...bookingForm,
        deliveryZone: state.deliveryZone,
      },
      state,
      totals: pricing,
    };

    setConfirmation(newConfirmation);
  };

  return (
    <>
      {/* Sliding Drawer Container */}
      <div className="fixed inset-0 z-40 flex justify-end">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Drawer Body */}
        <div className="relative w-full max-w-xl h-full bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>Rental Summary & Checkout</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Bali Direct Delivery
                </span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Review your configured workstation and schedule villa delivery
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* 1. Itemized Equipment Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Itemized Setup Breakdown
                </h3>
                <span className="text-xs text-stone-400">
                  {[deskItem, chairItem, monitorItem, ...accessoryItems, ...lifestyleItems].length} items active
                </span>
              </div>

              <div className="space-y-2">
                {/* Desk (Required) */}
                {deskItem && (
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white truncate">
                          {deskItem.name}
                        </span>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-800 text-stone-400 font-medium">
                          <Lock className="w-2.5 h-2.5 text-emerald-400" />
                          Required
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        Height: {state.deskHeight} • {deskItem.specs[0]}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-xs text-emerald-400">
                          {formatCurrency(curr === 'USD' ? deskItem.monthlyRateUSD : deskItem.monthlyRateIDR, curr)}
                        </div>
                        <div className="text-[10px] text-stone-500">/mo</div>
                      </div>
                      <button
                        onClick={() => {
                          onOpenCatalogCategory('desks');
                          onClose();
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs"
                        title="Swap desk model"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Chair (Required) */}
                {chairItem && (
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white truncate">
                          {chairItem.name}
                        </span>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-800 text-stone-400 font-medium">
                          <Lock className="w-2.5 h-2.5 text-emerald-400" />
                          Required
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        {chairItem.specs[0]}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-xs text-emerald-400">
                          {formatCurrency(curr === 'USD' ? chairItem.monthlyRateUSD : chairItem.monthlyRateIDR, curr)}
                        </div>
                        <div className="text-[10px] text-stone-500">/mo</div>
                      </div>
                      <button
                        onClick={() => {
                          onOpenCatalogCategory('chairs');
                          onClose();
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs"
                        title="Swap chair model"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Monitor Array */}
                {monitorItem && (
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-white truncate">
                        {monitorItem.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        {monitorItem.specs[0]}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-xs text-emerald-400">
                          {formatCurrency(curr === 'USD' ? monitorItem.monthlyRateUSD : monitorItem.monthlyRateIDR, curr)}
                        </div>
                        <div className="text-[10px] text-stone-500">/mo</div>
                      </div>
                      <button
                        onClick={() => {
                          onOpenCatalogCategory('monitors');
                          onClose();
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs"
                        title="Swap monitor arrangement"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Optional Tabletop Accessories */}
                {accessoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-stone-950/40 border border-stone-800/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-stone-200 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        Tabletop Accessory
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-xs text-stone-300">
                          {formatCurrency(curr === 'USD' ? item.monthlyRateUSD : item.monthlyRateIDR, curr)}
                        </div>
                        <div className="text-[10px] text-stone-500">/mo</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-rose-950/70 hover:text-rose-400 text-stone-400 transition-colors"
                        title="Remove accessory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Optional Bali Lifestyle Items */}
                {lifestyleItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-stone-950/40 border border-stone-800/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-stone-200 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        Bali Nomad Lifestyle Add-on
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-xs text-stone-300">
                          {formatCurrency(curr === 'USD' ? item.monthlyRateUSD : item.monthlyRateIDR, curr)}
                        </div>
                        <div className="text-[10px] text-stone-500">/mo</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-rose-950/70 hover:text-rose-400 text-stone-400 transition-colors"
                        title="Remove lifestyle item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Flexible Lease Duration Selector */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Select Lease Duration
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {pricing.durationDiscountPercent > 0
                    ? `Save ${pricing.durationDiscountPercent}% with multi-month lease`
                    : 'Flexible monthly'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { duration: 1 as LeaseDuration, label: '1 Month', discount: '0% off', perk: 'Standard delivery' },
                  { duration: 3 as LeaseDuration, label: '3 Months', discount: '10% off', perk: 'FREE delivery' },
                  { duration: 6 as LeaseDuration, label: '6+ Months', discount: '20% off', perk: 'FREE delivery' },
                ].map((tier) => {
                  const isSelected = state.rentalDuration === tier.duration;
                  return (
                    <button
                      key={tier.duration}
                      type="button"
                      onClick={() => setRentalDuration(tier.duration)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md shadow-emerald-950/50'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                    >
                      <div className="font-extrabold text-sm">{tier.label}</div>
                      <div className={`text-xs font-bold mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-stone-300'}`}>
                        {tier.discount}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1 truncate">
                        {tier.perk}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Bali Nomad Delivery Zone Selector */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Bali Nomad Delivery Hub
                </span>
                {pricing.isDeliveryFree && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                    Free Villa Delivery & Assembly
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {DELIVERY_ZONES.map((zone) => {
                  const isSelected = state.deliveryZone === zone.id;
                  const fee = curr === 'USD' ? zone.feeUSD : zone.feeIDR;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setDeliveryZone(zone.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-500 text-white'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{zone.name}</div>
                      <div className="text-[10px] text-stone-400 truncate mt-0.5">{zone.areas}</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-stone-400">{zone.estimateDays}</span>
                        <span className={`text-xs font-bold ${pricing.isDeliveryFree ? 'text-emerald-400' : 'text-stone-200'}`}>
                          {pricing.isDeliveryFree ? 'FREE' : formatCurrency(fee, curr)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Complete Cost Breakdown Table */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>Original Monthly Subtotal:</span>
                <span className="text-stone-200">
                  {formatCurrency(curr === 'USD' ? pricing.subtotalMonthlyUSD : pricing.subtotalMonthlyIDR, curr)}/mo
                </span>
              </div>

              {pricing.durationDiscountPercent > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-medium">
                  <span>Lease Discount ({pricing.durationDiscountPercent}%):</span>
                  <span>
                    -{formatCurrency(curr === 'USD' ? pricing.discountMonthlyUSD : pricing.discountMonthlyIDR, curr)}/mo
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-stone-300 font-semibold pt-1 border-t border-stone-800/80">
                <span>Adjusted Monthly Rate:</span>
                <span className="text-emerald-400 text-sm font-bold">
                  {formatCurrency(curr === 'USD' ? pricing.netMonthlyUSD : pricing.netMonthlyIDR, curr)}/mo
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-400">
                <span>Delivery & Setup ({activeZone.name}):</span>
                <span className={pricing.isDeliveryFree ? 'text-emerald-400 font-bold' : 'text-stone-200'}>
                  {pricing.isDeliveryFree ? 'FREE ($0)' : formatCurrency(curr === 'USD' ? pricing.deliveryFeeUSD : pricing.deliveryFeeIDR, curr)}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-400">
                <span className="flex items-center gap-1">
                  Refundable Security Deposit
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                </span>
                <span className="text-stone-200">
                  {formatCurrency(curr === 'USD' ? REFUNDABLE_DEPOSIT_USD : REFUNDABLE_DEPOSIT_IDR, curr)}
                </span>
              </div>

              <div className="flex items-center justify-between text-white font-extrabold text-sm pt-2.5 border-t border-stone-800">
                <span>Total Commitment ({state.rentalDuration} mo):</span>
                <span className="text-emerald-400">
                  {formatCurrency(curr === 'USD' ? pricing.totalLeaseUSD : pricing.totalLeaseIDR, curr)}
                </span>
              </div>
            </div>

            {/* 5. Booking Inquiry Form */}
            <form id="booking-form" onSubmit={handleBookingSubmit} className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Renter & Delivery Information
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={bookingForm.fullName}
                  onChange={handleFormChange}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-rose-400 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              {/* WhatsApp & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={bookingForm.whatsapp}
                    onChange={handleFormChange}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {formErrors.whatsapp && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.whatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleFormChange}
                    placeholder="alex@nomadstartup.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Villa / Coworking Address */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Villa / Coworking Address *
                </label>
                <input
                  type="text"
                  name="villaAddress"
                  value={bookingForm.villaAddress}
                  onChange={handleFormChange}
                  placeholder="e.g. Villa Lotus, Jl. Pantai Batu Bolong No. 42"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {formErrors.villaAddress && (
                  <p className="text-[11px] text-rose-400 mt-1">{formErrors.villaAddress}</p>
                )}
              </div>

              {/* Delivery Start Date */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Preferred Delivery Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingForm.startDate}
                  onChange={handleFormChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Share Permalink Box */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="flex-1 truncate text-[11px] text-stone-400">
                    <span className="font-semibold text-stone-300">Shareable Setup Link:</span>
                    <div className="truncate font-mono text-[10px] text-stone-500 mt-0.5">
                      {getShareableLink()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors whitespace-nowrap"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950/90 flex items-center gap-3">
            <button
              type="submit"
              form="booking-form"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all transform active:scale-95"
            >
              <span>Confirm & Rent Your Setup!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal upon booking inquiry submission */}
      {confirmation && (
        <ConfirmationModal
          confirmation={confirmation}
          onClose={() => {
            setConfirmation(null);
            onClose();
          }}
        />
      )}
    </>
  );
};
