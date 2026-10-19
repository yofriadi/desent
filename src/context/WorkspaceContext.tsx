'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  WorkspaceState,
  DeskId,
  ChairId,
  MonitorId,
  AccessoryId,
  LifestyleId,
  DeskHeight,
  LightingMode,
  LeaseDuration,
  Currency,
  BaliZoneId,
  CategoryId,
  PricingSummary,
} from '@/types/workspace';
import {
  DEFAULT_SETUP,
  encodeSetupToQuery,
  decodeSetupFromQuery,
  loadSetupFromStorage,
  saveSetupToStorage,
} from '@/utils/serializer';
import { calculatePricing, WORKSPACE_PRESETS } from '@/data/catalog';

interface WorkspaceContextValue {
  state: WorkspaceState;
  pricing: PricingSummary;
  isInitialized: boolean;
  activePresetId: string | null;

  setDesk: (id: DeskId) => void;
  setDeskHeight: (height: DeskHeight) => void;
  toggleDeskHeight: () => void;
  setChair: (id: ChairId) => void;
  setMonitors: (id: MonitorId) => void;
  toggleAccessory: (id: AccessoryId) => void;
  toggleLifestyle: (id: LifestyleId) => void;
  setLightingMode: (mode: LightingMode) => void;
  toggleLightingMode: () => void;
  setRentalDuration: (duration: LeaseDuration) => void;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  setDeliveryZone: (zone: BaliZoneId) => void;
  setFocusedCategory: (category: CategoryId) => void;
  setSelectedItemId: (id: string | null) => void;
  selectItemAndFocusCategory: (id: string, category: CategoryId) => void;
  applyPreset: (presetId: string) => void;
  isItemActive: (id: string) => boolean;
  getShareableLink: () => string;
  removeItem: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorkspaceState>(DEFAULT_SETUP);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from 1. URL (?setup=...), 2. LocalStorage, 3. Default preset
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const setupQuery = urlParams.get('setup');
    const fromUrl = decodeSetupFromQuery(setupQuery);

    if (fromUrl) {
      setState((prev) => ({ ...prev, ...fromUrl }));
    } else {
      const fromStorage = loadSetupFromStorage();
      if (fromStorage) {
        setState((prev) => ({ ...prev, ...fromStorage }));
      }
    }

    setIsInitialized(true);
  }, []);

  // Sync state changes to localStorage and URL query (without reloading page)
  useEffect(() => {
    if (!isInitialized) return;

    saveSetupToStorage(state);

    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const query = encodeSetupToQuery(state);
      const newUrl = `${window.location.pathname}?setup=${query}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  }, [state, isInitialized]);

  // Pricing calculations
  const pricing = useMemo(() => calculatePricing(state), [state]);

  // Determine active preset (if current state matches any preset exactly)
  const activePresetId = useMemo(() => {
    const matched = WORKSPACE_PRESETS.find((preset) => {
      const c = preset.config;
      if (c.desk !== state.desk) return false;
      if (c.chair !== state.chair) return false;
      if (c.monitors !== state.monitors) return false;
      if (c.accessories.length !== state.accessories.length) return false;
      if (!c.accessories.every((a) => state.accessories.includes(a))) return false;
      if (c.lifestyle.length !== state.lifestyle.length) return false;
      if (!c.lifestyle.every((l) => state.lifestyle.includes(l))) return false;
      return true;
    });
    return matched ? matched.id : null;
  }, [state]);

  const setDesk = useCallback((id: DeskId) => {
    setState((prev) => ({ ...prev, desk: id, selectedItemId: id, focusedCategory: 'desks' }));
  }, []);

  const setDeskHeight = useCallback((height: DeskHeight) => {
    setState((prev) => ({ ...prev, deskHeight: height }));
  }, []);

  const toggleDeskHeight = useCallback(() => {
    setState((prev) => ({
      ...prev,
      deskHeight: prev.deskHeight === 'sitting' ? 'standing' : 'sitting',
    }));
  }, []);

  const setChair = useCallback((id: ChairId) => {
    setState((prev) => ({ ...prev, chair: id, selectedItemId: id, focusedCategory: 'chairs' }));
  }, []);

  const setMonitors = useCallback((id: MonitorId) => {
    setState((prev) => ({ ...prev, monitors: id, selectedItemId: id, focusedCategory: 'monitors' }));
  }, []);

  const toggleAccessory = useCallback((id: AccessoryId) => {
    setState((prev) => {
      const exists = prev.accessories.includes(id);
      return {
        ...prev,
        accessories: exists
          ? prev.accessories.filter((a) => a !== id)
          : [...prev.accessories, id],
        selectedItemId: id,
        focusedCategory: 'accessories',
      };
    });
  }, []);

  const toggleLifestyle = useCallback((id: LifestyleId) => {
    setState((prev) => {
      const exists = prev.lifestyle.includes(id);
      return {
        ...prev,
        lifestyle: exists
          ? prev.lifestyle.filter((l) => l !== id)
          : [...prev.lifestyle, id],
        selectedItemId: id,
        focusedCategory: 'lifestyle',
      };
    });
  }, []);

  const setLightingMode = useCallback((lightingMode: LightingMode) => {
    setState((prev) => ({ ...prev, lightingMode }));
  }, []);

  const toggleLightingMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lightingMode: prev.lightingMode === 'daylight' ? 'sunset' : 'daylight',
    }));
  }, []);

  const setRentalDuration = useCallback((rentalDuration: LeaseDuration) => {
    setState((prev) => ({ ...prev, rentalDuration }));
  }, []);

  const setCurrency = useCallback((currency: Currency) => {
    setState((prev) => ({ ...prev, currency }));
  }, []);

  const toggleCurrency = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currency: prev.currency === 'USD' ? 'IDR' : 'USD',
    }));
  }, []);

  const setDeliveryZone = useCallback((deliveryZone: BaliZoneId) => {
    setState((prev) => ({ ...prev, deliveryZone }));
  }, []);

  const setFocusedCategory = useCallback((focusedCategory: CategoryId) => {
    setState((prev) => ({ ...prev, focusedCategory }));
  }, []);

  const setSelectedItemId = useCallback((selectedItemId: string | null) => {
    setState((prev) => ({ ...prev, selectedItemId }));
  }, []);

  const selectItemAndFocusCategory = useCallback((id: string, category: CategoryId) => {
    setState((prev) => ({
      ...prev,
      selectedItemId: id,
      focusedCategory: category,
    }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = WORKSPACE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setState((prev) => ({
      ...prev,
      desk: preset.config.desk,
      deskHeight: preset.config.deskHeight || prev.deskHeight,
      chair: preset.config.chair,
      monitors: preset.config.monitors,
      accessories: [...preset.config.accessories],
      lifestyle: [...preset.config.lifestyle],
      lightingMode: preset.config.lightingMode || prev.lightingMode,
      selectedItemId: preset.config.desk,
    }));
  }, []);

  const isItemActive = useCallback(
    (id: string): boolean => {
      if (state.desk === id) return true;
      if (state.chair === id) return true;
      if (state.monitors === id) return true;
      if (state.accessories.includes(id as AccessoryId)) return true;
      if (state.lifestyle.includes(id as LifestyleId)) return true;
      return false;
    },
    [state]
  );

  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      if (prev.accessories.includes(id as AccessoryId)) {
        return {
          ...prev,
          accessories: prev.accessories.filter((a) => a !== id),
        };
      }
      if (prev.lifestyle.includes(id as LifestyleId)) {
        return {
          ...prev,
          lifestyle: prev.lifestyle.filter((l) => l !== id),
        };
      }
      return prev;
    });
  }, []);

  const getShareableLink = useCallback((): string => {
    if (typeof window === 'undefined') return '';
    const query = encodeSetupToQuery(state);
    return `${window.location.origin}${window.location.pathname}?setup=${query}`;
  }, [state]);

  const value: WorkspaceContextValue = {
    state,
    pricing,
    isInitialized,
    activePresetId,
    setDesk,
    setDeskHeight,
    toggleDeskHeight,
    setChair,
    setMonitors,
    toggleAccessory,
    toggleLifestyle,
    setLightingMode,
    toggleLightingMode,
    setRentalDuration,
    setCurrency,
    toggleCurrency,
    setDeliveryZone,
    setFocusedCategory,
    setSelectedItemId,
    selectItemAndFocusCategory,
    applyPreset,
    isItemActive,
    getShareableLink,
    removeItem,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};

export const useWorkspace = (): WorkspaceContextValue => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
