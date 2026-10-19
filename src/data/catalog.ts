import {
  EquipmentItem,
  DeliveryZone,
  WorkspacePreset,
  WorkspaceState,
  PricingSummary,
  BaliZoneId,
  LeaseDuration,
} from '@/types/workspace';

export const IDR_EXCHANGE_RATE = 16000;

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  // DESKS
  {
    id: 'desk-bamboo',
    name: 'Electric Bamboo Standing Desk',
    category: 'desks',
    monthlyRateUSD: 45,
    monthlyRateIDR: 720000,
    description: 'Dual whisper-quiet electric motors, 4 programmable height presets, organic bamboo desktop (140x70cm).',
    specs: ['Height range 68-125cm', 'Anti-collision sensor', 'Dual whisper motors', '100kg load capacity'],
    badge: 'Nomad Favorite',
    required: true,
    modelType: 'desk-bamboo',
  },
  {
    id: 'desk-teak',
    name: 'Bali Teak Solid Wood Desk',
    category: 'desks',
    monthlyRateUSD: 55,
    monthlyRateIDR: 880000,
    description: 'Artisanal desk handcrafted from reclaimed Indonesian teak wood with hand-rubbed matte organic oil finish (150x75cm).',
    specs: ['Reclaimed solid teak', 'Handmade in Gianyar', 'Integrated cable channel', 'Satin matte oil finish'],
    badge: 'Artisan Teak',
    required: true,
    modelType: 'desk-teak',
  },
  {
    id: 'desk-minimalist',
    name: 'Minimalist Studio Desk',
    category: 'desks',
    monthlyRateUSD: 35,
    monthlyRateIDR: 560000,
    description: 'Matte black heavy-gauge steel frame with high-pressure laminate oak surface (120x60cm).',
    specs: ['Compact villa footprint', 'Scratch-resistant oak top', 'Cable management clip', 'Rigid steel frame'],
    badge: 'Compact & Clean',
    required: true,
    modelType: 'desk-minimalist',
  },

  // CHAIRS
  {
    id: 'chair-mesh',
    name: 'Ergonomic Breathable Mesh Pro',
    category: 'chairs',
    monthlyRateUSD: 38,
    monthlyRateIDR: 608000,
    description: 'High-tension breathable mesh back designed specifically for humid tropical climates with 3D adaptive lumbar support.',
    specs: ['Tropical cooling mesh', '3D adjustable armrests', 'Adaptive dynamic lumbar', 'Multi-tilt lock'],
    badge: 'Best for Bali Heat',
    required: true,
    modelType: 'chair-mesh',
  },
  {
    id: 'chair-leather',
    name: 'Executive Vegan Leather Swivel',
    category: 'chairs',
    monthlyRateUSD: 45,
    monthlyRateIDR: 720000,
    description: 'Supple perforated vegan saddle leather with dual-density high-resilience foam and brushed aluminum star-base.',
    specs: ['Perforated vegan leather', 'Brushed aluminum base', 'Class 4 pneumatic cylinder', 'Waterfall seat edge'],
    badge: 'Premium Comfort',
    required: true,
    modelType: 'chair-leather',
  },
  {
    id: 'chair-active',
    name: 'Active Ergonomic Saddle Stool',
    category: 'chairs',
    monthlyRateUSD: 25,
    monthlyRateIDR: 400000,
    description: 'Dynamic posture saddle stool promoting open hip angle, core engagement, and upright spine posture.',
    specs: ['Core muscle engagement', '360° fluid swivel', 'Compact villa storage', 'Encourages standing'],
    badge: 'Active Posture',
    required: true,
    modelType: 'chair-active',
  },

  // MONITORS
  {
    id: 'single-4k',
    name: 'Single 27" 4K IPS Display',
    category: 'monitors',
    monthlyRateUSD: 35,
    monthlyRateIDR: 560000,
    description: '27-inch 4K UHD IPS panel (3840x2160) with 65W USB-C single-cable power delivery and full-motion gas spring desk arm.',
    specs: ['4K UHD 3840x2160 IPS', '65W USB-C Power Delivery', 'Gas-spring counterbalanced arm', '99% sRGB color'],
    badge: 'Single 4K',
    slot: 'slot-display',
    modelType: 'single-4k',
  },
  {
    id: 'dual-4k',
    name: 'Dual 27" 4K Pro Array',
    category: 'monitors',
    monthlyRateUSD: 65,
    monthlyRateIDR: 1040000,
    description: 'Two color-matched 27-inch 4K UHD displays on a dual gas-spring articulating mount with Thunderbolt/USB-C daisy-chaining.',
    specs: ['2x 27" 4K Displays', 'Dual gas-spring arm', '130W combined charging', 'Bezel-to-bezel span'],
    badge: '10x Dev Setup',
    slot: 'slot-display',
    modelType: 'dual-4k',
  },
  {
    id: 'ultrawide-curved',
    name: '34" Curved Ultrawide 144Hz',
    category: 'monitors',
    monthlyRateUSD: 55,
    monthlyRateIDR: 880000,
    description: '34-inch 21:9 WQHD (3440x1440) panoramic curved display with 1500R curvature, 144Hz refresh, and integrated USB hub.',
    specs: ['34" 3440x1440 WQHD', '1500R Immersive Curve', '144Hz high refresh rate', 'Picture-by-Picture support'],
    badge: 'Panoramic Widescreen',
    slot: 'slot-display',
    modelType: 'ultrawide-curved',
  },

  // ACCESSORIES
  {
    id: 'plant',
    name: 'Tropical Desk Monstera',
    category: 'accessories',
    monthlyRateUSD: 8,
    monthlyRateIDR: 128000,
    description: 'Thriving live Monstera Deliciosa in a handcrafted terracotta clay planter from Tabanan, Bali.',
    specs: ['Air purifying live foliage', 'Handmade terracotta pot', 'Care manual included', 'Potted in coconut husk'],
    badge: 'Tropical Vibe',
    slot: 'slot-plant',
    modelType: 'plant',
  },
  {
    id: 'peripherals',
    name: 'Mechanical Keyboard & Felt Mat',
    category: 'accessories',
    monthlyRateUSD: 18,
    monthlyRateIDR: 288000,
    description: 'Compact wireless mechanical keyboard (tactile quiet switches), precision ergonomic mouse, and large wool-felt desk mat.',
    specs: ['Wireless Bluetooth 5.2 / 2.4G', 'Tactile quiet switches', 'Extra large felt desk pad', 'Long-lasting battery'],
    badge: 'Tactile Input',
    slot: 'slot-peripherals',
    modelType: 'peripherals',
  },
  {
    id: 'lamp',
    name: 'Architect LED Task Lamp',
    category: 'accessories',
    monthlyRateUSD: 12,
    monthlyRateIDR: 192000,
    description: 'Dual-pivot articulated aluminum clamp lamp with stepless dimming and 3 color temperature presets (warm golden to daylight).',
    specs: ['Articulated metal arm', 'Warm & daylight color temps', 'Stepless rotary dimming', 'USB output charging port'],
    badge: 'Warm Lighting',
    slot: 'slot-lamp',
    modelType: 'lamp',
  },
  {
    id: 'headset',
    name: 'Studio Wireless ANC Headset',
    category: 'accessories',
    monthlyRateUSD: 16,
    monthlyRateIDR: 256000,
    description: 'Hybrid active noise-cancelling studio over-ear headphones with custom solid aluminum desk stand.',
    specs: ['Hybrid Active Noise Cancelling', '35hr battery life', 'Solid aluminum desk stand', 'Memory foam earcups'],
    badge: 'Deep Focus',
    slot: 'slot-headset',
    modelType: 'headset',
  },

  // LIFESTYLE ADD-ONS
  {
    id: 'coffee-station',
    name: 'Artisan Espresso Bar & Grinder',
    category: 'lifestyle',
    monthlyRateUSD: 28,
    monthlyRateIDR: 448000,
    description: 'Compact 15-bar Italian espresso machine, stepless conical burr grinder, stainless milk pitcher, and 2 handmade ceramic cups.',
    specs: ['15-bar Italian pump', 'Conical burr grinder', 'Stainless steel milk wand', 'Includes 250g Kintamani beans'],
    badge: 'Nomad Fuel',
    zone: 'zone-coffee',
    modelType: 'coffee-station',
  },
  {
    id: 'surf-moto',
    name: 'Surfboard & Motorcycle Rack',
    category: 'lifestyle',
    monthlyRateUSD: 22,
    monthlyRateIDR: 352000,
    description: 'Freestanding solid bamboo surfboard quiver rack (holds 2 boards) plus dual helmet and jacket organizer for your Bali scooter.',
    specs: ['Holds 2 surfboards safely', 'Dual helmet hooks', 'Padded board slots', 'Weather-treated bamboo'],
    badge: 'Bali Essential',
    zone: 'zone-outdoor',
    modelType: 'surf-moto',
  },
  {
    id: 'relax-beanbag',
    name: 'Relax Beanbag & Yoga Mat',
    category: 'lifestyle',
    monthlyRateUSD: 15,
    monthlyRateIDR: 240000,
    description: 'Water-resistant outdoor sun lounger beanbag with high-density EPS bead filling, paired with a natural tree-rubber yoga mat.',
    specs: ['Water-resistant Sunbrella fabric', 'Eco natural tree rubber mat', 'Villa terrace approved', 'Removable washable cover'],
    badge: 'Chill Zone',
    zone: 'zone-relax',
    modelType: 'relax-beanbag',
  },
  {
    id: 'garage-shelf',
    name: 'Garage Tool & Gear Shelf',
    category: 'lifestyle',
    monthlyRateUSD: 18,
    monthlyRateIDR: 288000,
    description: 'Heavy-duty 4-tier matte black industrial shelf for storing surfboard wax, fins, tools, extra luggage, and villa supplies.',
    specs: ['4 adjustable steel shelves', '200kg total weight rating', 'Rust-inhibiting matte coat', 'Leveling feet'],
    badge: 'Gear Storage',
    zone: 'zone-garage',
    modelType: 'garage-shelf',
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'canggu',
    name: 'Canggu & Pererenan',
    areas: 'Echo Beach, Batu Bolong, Berawa, Pererenan',
    feeUSD: 15,
    feeIDR: 240000,
    estimateDays: 'Same-Day / Next-Day',
  },
  {
    id: 'seminyak',
    name: 'Seminyak & Sanur',
    areas: 'Seminyak, Kerobokan, Legian, Sanur Hub',
    feeUSD: 20,
    feeIDR: 320000,
    estimateDays: 'Next-Day Delivery',
  },
  {
    id: 'ubud',
    name: 'Ubud Cultural Hub',
    areas: 'Central Ubud, Penestanan, Sayan, Tegallalang',
    feeUSD: 25,
    feeIDR: 400000,
    estimateDays: '1–2 Days Delivery',
  },
  {
    id: 'uluwatu',
    name: 'Uluwatu & Bukit',
    areas: 'Bingin, Padang Padang, Uluwatu Cliffs, Balangan',
    feeUSD: 35,
    feeIDR: 550000,
    estimateDays: '1–2 Days Delivery',
  },
];

export const WORKSPACE_PRESETS: WorkspacePreset[] = [
  {
    id: 'bali-founder',
    name: 'The Bali Founder',
    tagline: 'The complete villa workstation for startup founders',
    description: 'Electric bamboo standing desk, ergonomic cooling mesh chair, dual 4K monitors, ambient task lighting, plant, and artisan espresso bar.',
    config: {
      desk: 'desk-bamboo',
      deskHeight: 'standing',
      chair: 'chair-mesh',
      monitors: 'dual-4k',
      accessories: ['plant', 'peripherals', 'lamp'],
      lifestyle: ['coffee-station', 'surf-moto'],
      lightingMode: 'daylight',
    },
  },
  {
    id: '10x-developer',
    name: 'The 10x Developer Dual-Screen',
    tagline: 'Engineered for deep-focus software development',
    description: 'Electric bamboo desk, breathable mesh chair, dual 4K monitors, mechanical keyboard, studio ANC headset, and espresso machine.',
    config: {
      desk: 'desk-bamboo',
      deskHeight: 'sitting',
      chair: 'chair-mesh',
      monitors: 'dual-4k',
      accessories: ['peripherals', 'lamp', 'headset'],
      lifestyle: ['coffee-station'],
      lightingMode: 'sunset',
    },
  },
  {
    id: 'minimalist-nomad',
    name: 'Minimalist Nomad',
    tagline: 'Clean, light, and focused for high-mobility nomads',
    description: 'Compact studio desk, active saddle stool, single 4K display with USB-C charging, succulent, and relax beanbag.',
    config: {
      desk: 'desk-minimalist',
      deskHeight: 'sitting',
      chair: 'chair-active',
      monitors: 'single-4k',
      accessories: ['plant', 'peripherals'],
      lifestyle: ['relax-beanbag'],
      lightingMode: 'daylight',
    },
  },
  {
    id: 'executive-teak',
    name: 'Executive Teak',
    tagline: 'Organic Indonesian luxury and commanding presence',
    description: 'Solid reclaimed Bali teak desk, executive vegan leather swivel, 34" curved ultrawide display, brass task lamp, and gear shelf.',
    config: {
      desk: 'desk-teak',
      deskHeight: 'sitting',
      chair: 'chair-leather',
      monitors: 'ultrawide-curved',
      accessories: ['lamp', 'peripherals', 'headset', 'plant'],
      lifestyle: ['coffee-station', 'garage-shelf'],
      lightingMode: 'sunset',
    },
  },
];

export const REFUNDABLE_DEPOSIT_USD = 50;
export const REFUNDABLE_DEPOSIT_IDR = 800000;

export function getItemById(id: string): EquipmentItem | undefined {
  return EQUIPMENT_CATALOG.find((item) => item.id === id);
}

export function getDeliveryZoneById(id: BaliZoneId): DeliveryZone {
  return DELIVERY_ZONES.find((z) => z.id === id) || DELIVERY_ZONES[0];
}

export function calculatePricing(
  state: Pick<WorkspaceState, 'desk' | 'chair' | 'monitors' | 'accessories' | 'lifestyle' | 'rentalDuration' | 'deliveryZone'>
): PricingSummary {
  // Collect all active item IDs
  const activeIds: string[] = [state.desk, state.chair, state.monitors, ...state.accessories, ...state.lifestyle];

  let subtotalMonthlyUSD = 0;
  for (const id of activeIds) {
    const item = getItemById(id);
    if (item) {
      subtotalMonthlyUSD += item.monthlyRateUSD;
    }
  }

  const subtotalMonthlyIDR = subtotalMonthlyUSD * IDR_EXCHANGE_RATE;

  // Duration discounts: 1 month: 0%, 3 months: 10%, 6 months: 20%
  let discountPercent = 0;
  if (state.rentalDuration === 3) {
    discountPercent = 10;
  } else if (state.rentalDuration === 6) {
    discountPercent = 20;
  }

  const discountMonthlyUSD = Math.round((subtotalMonthlyUSD * discountPercent) / 100);
  const discountMonthlyIDR = discountMonthlyUSD * IDR_EXCHANGE_RATE;

  const netMonthlyUSD = subtotalMonthlyUSD - discountMonthlyUSD;
  const netMonthlyIDR = netMonthlyUSD * IDR_EXCHANGE_RATE;

  const totalLeaseUSD = netMonthlyUSD * state.rentalDuration;
  const totalLeaseIDR = netMonthlyIDR * state.rentalDuration;

  // Delivery fee waived for 3+ months
  const zone = getDeliveryZoneById(state.deliveryZone);
  const isDeliveryFree = state.rentalDuration >= 3;
  const deliveryFeeUSD = isDeliveryFree ? 0 : zone.feeUSD;
  const deliveryFeeIDR = isDeliveryFree ? 0 : zone.feeIDR;

  const initialDueUSD = totalLeaseUSD + deliveryFeeUSD + REFUNDABLE_DEPOSIT_USD;
  const initialDueIDR = totalLeaseIDR + deliveryFeeIDR + REFUNDABLE_DEPOSIT_IDR;

  return {
    subtotalMonthlyUSD,
    subtotalMonthlyIDR,
    durationDiscountPercent: discountPercent,
    discountMonthlyUSD,
    discountMonthlyIDR,
    netMonthlyUSD,
    netMonthlyIDR,
    totalLeaseUSD,
    totalLeaseIDR,
    deliveryFeeUSD,
    deliveryFeeIDR,
    isDeliveryFree,
    depositRefundableUSD: REFUNDABLE_DEPOSIT_USD,
    depositRefundableIDR: REFUNDABLE_DEPOSIT_IDR,
    initialDueUSD,
    initialDueIDR,
  };
}

export function formatCurrency(amount: number, currency: 'USD' | 'IDR'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  return `IDR ${amount.toLocaleString('id-ID')}`;
}
