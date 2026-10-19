'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { BookingConfirmation } from '@/types/workspace';
import { getItemById, getDeliveryZoneById, formatCurrency } from '@/data/catalog';
import {
  CheckCircle2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  X,
} from 'lucide-react';

interface ConfirmationModalProps {
  confirmation: BookingConfirmation;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  confirmation,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8', '#f43f5e'],
      });

      const timeout = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);

      return () => clearTimeout(timeout);
    } catch (e) {
      console.warn('Canvas confetti error:', e);
    }
  }, []);

  const { referenceCode, details, state, totals } = confirmation;
  const zone = getDeliveryZoneById(details.deliveryZone);
  const curr = state.currency;

  // Active items list
  const activeItemIds = [
    state.desk,
    state.chair,
    state.monitors,
    ...state.accessories,
    ...state.lifestyle,
  ];
  const items = activeItemIds.map((id) => getItemById(id)).filter((it): it is NonNullable<typeof it> => Boolean(it));

  // Generate WhatsApp pre-populated inquiry text
  const waSummary = `🏝️ *MONIS.RENT WORKSPACE INQUIRY*
━━━━━━━━━━━━━━━━━━━━
*Reservation Code:* ${referenceCode}
*Renter:* ${details.fullName}
*WhatsApp:* ${details.whatsapp}
*Villa Address:* ${details.villaAddress} (${zone.name})
*Start Date:* ${details.startDate}
*Lease Duration:* ${state.rentalDuration} Month(s) (${totals.durationDiscountPercent}% discount)

*Configured Setup:*
${items.map((it) => `• ${it?.name}`).join('\n')}

*Monthly Rate:* ${formatCurrency(curr === 'USD' ? totals.netMonthlyUSD : totals.netMonthlyIDR, curr)}/mo
*Delivery:* ${totals.isDeliveryFree ? 'FREE (3+ Months)' : formatCurrency(curr === 'USD' ? totals.deliveryFeeUSD : totals.deliveryFeeIDR, curr)}
*Initial Due:* ${formatCurrency(curr === 'USD' ? totals.initialDueUSD : totals.initialDueIDR, curr)} (incl. refundable deposit)
━━━━━━━━━━━━━━━━━━━━
Hi Monis team, I have reserved my Bali workstation! Please confirm delivery availability.`;

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waSummary)}`;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon & Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-950/50 mb-4 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Workspace Reserved!
          </h2>
          <p className="text-stone-400 text-sm mt-1 max-w-md mx-auto">
            Your custom Bali workstation is booked. Our team will assemble and deliver it directly to your villa.
          </p>
        </div>

        {/* Reference Code Card */}
        <div className="mt-6 p-4 rounded-2xl bg-stone-950/80 border border-emerald-500/40 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Booking Reservation Reference
            </div>
            <div className="text-xl font-black font-mono tracking-wider text-white mt-0.5">
              {referenceCode}
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Reservation Summary Details */}
        <div className="mt-6 space-y-3 text-xs border-y border-stone-800 py-4">
          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Delivery Start Date:
            </span>
            <span className="font-semibold text-white">{details.startDate}</span>
          </div>

          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Villa Destination:
            </span>
            <span className="font-semibold text-white truncate max-w-[240px]">
              {details.villaAddress} ({zone.name})
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Lease Term:
            </span>
            <span className="font-semibold text-white">
              {state.rentalDuration} Month(s) ({totals.durationDiscountPercent}% discount)
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-300 pt-2 border-t border-stone-800/60">
            <span className="text-stone-400">Monthly Lease Total:</span>
            <span className="font-bold text-sm text-emerald-400">
              {formatCurrency(curr === 'USD' ? totals.netMonthlyUSD : totals.netMonthlyIDR, curr)}/mo
            </span>
          </div>
        </div>

        {/* WhatsApp & Email Actions */}
        <div className="mt-6 space-y-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all transform active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open in WhatsApp & Confirm Delivery</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-medium text-xs transition-colors"
          >
            Done • Return to Workspace Customizer
          </button>
        </div>
      </div>
    </div>
  );
};
