import { SlotCoordinate, SlotId, LifestyleZoneConfig, LifestyleZoneId } from '@/types/workspace';

export const TABLETOP_SLOTS: Record<SlotId, SlotCoordinate> = {
  'slot-plant': {
    id: 'slot-plant',
    name: 'Tabletop Plant',
    x: 14,
    y: 46,
    description: 'Left desk corner for tropical monstera or succulent',
  },
  'slot-display': {
    id: 'slot-display',
    name: 'Workspace Display Array',
    x: 50,
    y: 28,
    description: 'Center rear ergonomic heavy-duty monitor arm mount',
  },
  'slot-peripherals': {
    id: 'slot-peripherals',
    name: 'Input Peripherals & Desk Mat',
    x: 50,
    y: 55,
    description: 'Center working zone for desk mat, mechanical keyboard & mouse',
  },
  'slot-lamp': {
    id: 'slot-lamp',
    name: 'Architect Task Lamp',
    x: 82,
    y: 38,
    description: 'Right desk corner for warm architect LED task lighting',
  },
  'slot-headset': {
    id: 'slot-headset',
    name: 'Studio Headset Stand',
    x: 90,
    y: 56,
    description: 'Far right desk edge for aluminum headphone stand',
  },
};

export const LIFESTYLE_ZONES: Record<LifestyleZoneId, LifestyleZoneConfig> = {
  'zone-coffee': {
    id: 'zone-coffee',
    name: 'Coffee Station & Espresso Bar',
    side: 'left',
    x: 18,
    y: 72,
    description: 'Artisan espresso machine with manual grinder and ceramic cups',
  },
  'zone-outdoor': {
    id: 'zone-outdoor',
    name: 'Outdoor Surfboard & Moto Rack',
    side: 'far-left',
    x: 7,
    y: 62,
    description: 'Balinese surf quiver and scooter helmet organizer',
  },
  'zone-relax': {
    id: 'zone-relax',
    name: 'Relax Zone Beanbag & Mat',
    side: 'right',
    x: 82,
    y: 72,
    description: 'Waterproof outdoor lounge beanbag & yoga stretching mat',
  },
  'zone-garage': {
    id: 'zone-garage',
    name: 'Garage Tool Shelf & Storage',
    side: 'far-right',
    x: 93,
    y: 62,
    description: 'Modular metal shelf for surfboard wax, tools, and villa gear',
  },
};
