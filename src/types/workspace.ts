export type CategoryId = 'desks' | 'chairs' | 'monitors' | 'accessories' | 'lifestyle';

export type DeskId = 'desk-bamboo' | 'desk-teak' | 'desk-minimalist';
export type ChairId = 'chair-mesh' | 'chair-leather' | 'chair-active';
export type MonitorId = 'single-4k' | 'dual-4k' | 'ultrawide-curved';
export type AccessoryId = 'plant' | 'peripherals' | 'lamp' | 'headset';
export type LifestyleId = 'coffee-station' | 'surf-moto' | 'relax-beanbag' | 'garage-shelf';

export type DeskHeight = 'sitting' | 'standing';
export type LightingMode = 'daylight' | 'sunset';
export type Currency = 'USD' | 'IDR';
export type LeaseDuration = 1 | 3 | 6;

export type BaliZoneId = 'canggu' | 'seminyak' | 'ubud' | 'uluwatu';

export type SlotId = 'slot-plant' | 'slot-display' | 'slot-peripherals' | 'slot-lamp' | 'slot-headset';
export type LifestyleZoneId = 'zone-coffee' | 'zone-outdoor' | 'zone-relax' | 'zone-garage';

export interface SlotCoordinate {
  id: SlotId;
  name: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  description: string;
}

export interface LifestyleZoneConfig {
  id: LifestyleZoneId;
  name: string;
  side: 'left' | 'far-left' | 'right' | 'far-right';
  x: number;
  y: number;
  description: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: CategoryId;
  monthlyRateUSD: number;
  monthlyRateIDR: number;
  description: string;
  specs: string[];
  badge?: string;
  slot?: SlotId;
  zone?: LifestyleZoneId;
  required?: boolean;
  modelType?: DeskId | ChairId | MonitorId | AccessoryId | LifestyleId;
}

export interface DeliveryZone {
  id: BaliZoneId;
  name: string;
  areas: string;
  feeUSD: number;
  feeIDR: number;
  estimateDays: string;
}

export interface WorkspacePreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  config: {
    desk: DeskId;
    deskHeight?: DeskHeight;
    chair: ChairId;
    monitors: MonitorId;
    accessories: AccessoryId[];
    lifestyle: LifestyleId[];
    lightingMode?: LightingMode;
  };
}

export interface WorkspaceState {
  desk: DeskId;
  deskHeight: DeskHeight;
  chair: ChairId;
  monitors: MonitorId;
  accessories: AccessoryId[];
  lifestyle: LifestyleId[];
  lightingMode: LightingMode;
  rentalDuration: LeaseDuration;
  currency: Currency;
  deliveryZone: BaliZoneId;
  focusedCategory: CategoryId;
  selectedItemId: string | null;
}

export interface BookingDetails {
  fullName: string;
  whatsapp: string;
  email: string;
  villaAddress: string;
  deliveryZone: BaliZoneId;
  startDate: string;
  notes?: string;
}

export interface BookingConfirmation {
  referenceCode: string;
  timestamp: string;
  details: BookingDetails;
  state: WorkspaceState;
  totals: PricingSummary;
}

export interface PricingSummary {
  subtotalMonthlyUSD: number;
  subtotalMonthlyIDR: number;
  durationDiscountPercent: number;
  discountMonthlyUSD: number;
  discountMonthlyIDR: number;
  netMonthlyUSD: number;
  netMonthlyIDR: number;
  totalLeaseUSD: number;
  totalLeaseIDR: number;
  deliveryFeeUSD: number;
  deliveryFeeIDR: number;
  isDeliveryFree: boolean;
  depositRefundableUSD: number;
  depositRefundableIDR: number;
  initialDueUSD: number;
  initialDueIDR: number;
}
