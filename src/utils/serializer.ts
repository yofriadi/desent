import { WorkspaceState, DeskId, ChairId, MonitorId, AccessoryId, LifestyleId, DeskHeight, LightingMode, LeaseDuration, Currency, BaliZoneId } from '@/types/workspace';

export interface SerializedSetup {
  d: DeskId;
  dh?: DeskHeight;
  c: ChairId;
  m: MonitorId;
  a: AccessoryId[];
  l: LifestyleId[];
  lm?: LightingMode;
  rd?: LeaseDuration;
  cur?: Currency;
  dz?: BaliZoneId;
}

export const DEFAULT_SETUP: WorkspaceState = {
  desk: 'desk-bamboo',
  deskHeight: 'standing',
  chair: 'chair-mesh',
  monitors: 'dual-4k',
  accessories: ['plant', 'peripherals', 'lamp'],
  lifestyle: ['coffee-station'],
  lightingMode: 'daylight',
  rentalDuration: 3,
  currency: 'USD',
  deliveryZone: 'canggu',
  focusedCategory: 'desks',
  selectedItemId: 'desk-bamboo',
};

const VALID_DESKS: DeskId[] = ['desk-bamboo', 'desk-teak', 'desk-minimalist'];
const VALID_CHAIRS: ChairId[] = ['chair-mesh', 'chair-leather', 'chair-active'];
const VALID_MONITORS: MonitorId[] = ['single-4k', 'dual-4k', 'ultrawide-curved'];
const VALID_ACCESSORIES: AccessoryId[] = ['plant', 'peripherals', 'lamp', 'headset'];
const VALID_LIFESTYLE: LifestyleId[] = ['coffee-station', 'surf-moto', 'relax-beanbag', 'garage-shelf'];
const VALID_ZONES: BaliZoneId[] = ['canggu', 'seminyak', 'ubud', 'uluwatu'];
const VALID_DURATIONS: LeaseDuration[] = [1, 3, 6];

export function encodeSetupToQuery(state: Partial<WorkspaceState>): string {
  const compact: SerializedSetup = {
    d: state.desk || DEFAULT_SETUP.desk,
    dh: state.deskHeight || DEFAULT_SETUP.deskHeight,
    c: state.chair || DEFAULT_SETUP.chair,
    m: state.monitors || DEFAULT_SETUP.monitors,
    a: state.accessories || DEFAULT_SETUP.accessories,
    l: state.lifestyle || DEFAULT_SETUP.lifestyle,
    lm: state.lightingMode || DEFAULT_SETUP.lightingMode,
    rd: state.rentalDuration || DEFAULT_SETUP.rentalDuration,
    cur: state.currency || DEFAULT_SETUP.currency,
    dz: state.deliveryZone || DEFAULT_SETUP.deliveryZone,
  };

  try {
    const jsonStr = JSON.stringify(compact);
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return encodeURIComponent(window.btoa(jsonStr));
    }
    return encodeURIComponent(Buffer.from(jsonStr).toString('base64'));
  } catch (e) {
    console.error('Failed to encode setup', e);
    return '';
  }
}

export function decodeSetupFromQuery(param: string | null): Partial<WorkspaceState> | null {
  if (!param) return null;
  try {
    const decodedB64 = decodeURIComponent(param);
    let jsonStr: string;
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      jsonStr = window.atob(decodedB64);
    } else {
      jsonStr = Buffer.from(decodedB64, 'base64').toString('utf-8');
    }
    const parsed = JSON.parse(jsonStr) as Partial<SerializedSetup>;

    const result: Partial<WorkspaceState> = {};

    if (parsed.d && VALID_DESKS.includes(parsed.d)) result.desk = parsed.d;
    if (parsed.dh && (parsed.dh === 'sitting' || parsed.dh === 'standing')) result.deskHeight = parsed.dh;
    if (parsed.c && VALID_CHAIRS.includes(parsed.c)) result.chair = parsed.c;
    if (parsed.m && VALID_MONITORS.includes(parsed.m)) result.monitors = parsed.m;
    if (Array.isArray(parsed.a)) {
      result.accessories = parsed.a.filter((a): a is AccessoryId => VALID_ACCESSORIES.includes(a as AccessoryId));
    }
    if (Array.isArray(parsed.l)) {
      result.lifestyle = parsed.l.filter((l): l is LifestyleId => VALID_LIFESTYLE.includes(l as LifestyleId));
    }
    if (parsed.lm && (parsed.lm === 'daylight' || parsed.lm === 'sunset')) result.lightingMode = parsed.lm;
    if (parsed.rd && VALID_DURATIONS.includes(parsed.rd as LeaseDuration)) result.rentalDuration = parsed.rd as LeaseDuration;
    if (parsed.cur && (parsed.cur === 'USD' || parsed.cur === 'IDR')) result.currency = parsed.cur;
    if (parsed.dz && VALID_ZONES.includes(parsed.dz)) result.deliveryZone = parsed.dz;

    return result;
  } catch (e) {
    console.warn('Invalid ?setup= parameter, ignoring:', e);
    return null;
  }
}

export const LOCAL_STORAGE_KEY = 'monis_workspace_setup';

export function loadSetupFromStorage(): Partial<WorkspaceState> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return decodeSetupFromQuery(raw);
  } catch (e) {
    console.warn('Failed to load setup from localStorage', e);
    return null;
  }
}

export function saveSetupToStorage(state: WorkspaceState): void {
  if (typeof window === 'undefined') return;
  try {
    const query = encodeSetupToQuery(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, query);
  } catch (e) {
    console.warn('Failed to save setup to localStorage', e);
  }
}
