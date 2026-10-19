'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { RoomBackground } from './RoomBackground';
import { DeskGraphic } from './DeskGraphic';
import { ChairGraphic } from './ChairGraphic';
import { MonitorGraphic } from './MonitorGraphic';
import { AccessoryGraphic } from './AccessoryGraphic';
import { LifestyleGraphic } from './LifestyleGraphic';
import { HotspotMarker } from './HotspotMarker';
import { getItemById, formatCurrency } from '@/data/catalog';
import { Sun, Sunset, ArrowUpDown } from 'lucide-react';

export const WorkspaceCanvas: React.FC = () => {
  const {
    state,
    setDeskHeight,
    toggleDeskHeight,
    setMonitors,
    toggleAccessory,
    toggleLifestyle,
    toggleLightingMode,
    selectItemAndFocusCategory,
  } = useWorkspace();

  const isStanding = state.deskHeight === 'standing';
  const isSunset = state.lightingMode === 'sunset';
  const deskTopY = isStanding ? 265 : 325;

  const plantItem = getItemById('plant');
  const lampItem = getItemById('lamp');
  const headsetItem = getItemById('headset');
  const dualMonitorItem = getItemById('dual-4k');
  const coffeeItem = getItemById('coffee-station');
  const surfItem = getItemById('surf-moto');
  const beanbagItem = getItemById('relax-beanbag');
  const garageItem = getItemById('garage-shelf');

  const curr = state.currency;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl">
      {/* Floating Canvas Quick-Controls Bar (Top-left & Top-right) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        {/* Sit/Stand Height Toggle */}
        <button
          onClick={toggleDeskHeight}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-xs font-medium text-stone-200 hover:text-white hover:border-emerald-500/50 transition-all shadow-lg active:scale-95"
          title="Toggle Standing vs Sitting desk height"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
          <span>Desk: <strong className="text-white capitalize">{state.deskHeight}</strong></span>
        </button>

        {/* Ambient Lighting Mode Toggle */}
        <button
          onClick={toggleLightingMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-medium transition-all shadow-lg active:scale-95 ${
            isSunset
              ? 'bg-amber-950/70 border-amber-600/50 text-amber-200 hover:text-amber-100'
              : 'bg-stone-900/80 border-stone-700/60 text-stone-200 hover:text-white'
          }`}
          title="Toggle Daylight / Sunset Golden Hour"
        >
          {isSunset ? (
            <>
              <Sunset className="w-3.5 h-3.5 text-amber-400" />
              <span>Bali Sunset</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span>Daylight</span>
            </>
          )}
        </button>
      </div>

      {/* Selected Item Notification Overlay Badge */}
      {state.selectedItemId && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 backdrop-blur-md border border-emerald-500/40 text-xs text-stone-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Focused: <strong className="text-white">{getItemById(state.selectedItemId)?.name}</strong></span>
        </div>
      )}

      {/* Main Vector SVG Stage */}
      <svg
        viewBox="0 0 1000 640"
        className="w-full h-full max-h-[75vh] select-none touch-pan-x touch-pan-y"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. ROOM BACKGROUND & AMBIENT LIGHTING */}
        <RoomBackground lightingMode={state.lightingMode} />

        {/* 2. LIFESTYLE PERIMETER ADD-ONS (Background Layer) */}
        {state.lifestyle.includes('surf-moto') && (
          <LifestyleGraphic
            lifestyleId="surf-moto"
            isSelected={state.selectedItemId === 'surf-moto'}
            onClick={() => selectItemAndFocusCategory('surf-moto', 'lifestyle')}
          />
        )}
        {state.lifestyle.includes('coffee-station') && (
          <LifestyleGraphic
            lifestyleId="coffee-station"
            isSelected={state.selectedItemId === 'coffee-station'}
            onClick={() => selectItemAndFocusCategory('coffee-station', 'lifestyle')}
          />
        )}
        {state.lifestyle.includes('garage-shelf') && (
          <LifestyleGraphic
            lifestyleId="garage-shelf"
            isSelected={state.selectedItemId === 'garage-shelf'}
            onClick={() => selectItemAndFocusCategory('garage-shelf', 'lifestyle')}
          />
        )}
        {state.lifestyle.includes('relax-beanbag') && (
          <LifestyleGraphic
            lifestyleId="relax-beanbag"
            isSelected={state.selectedItemId === 'relax-beanbag'}
            onClick={() => selectItemAndFocusCategory('relax-beanbag', 'lifestyle')}
          />
        )}

        {/* 3. DESK & UNDERCARRIAGE */}
        <DeskGraphic
          deskId={state.desk}
          deskHeight={state.deskHeight}
          isSelected={state.selectedItemId === state.desk}
          onClick={() => selectItemAndFocusCategory(state.desk, 'desks')}
        />

        {/* 4. MONITORS & MOUNTING ARMS (Anchored to rear desk slot) */}
        <MonitorGraphic
          monitorId={state.monitors}
          deskHeight={state.deskHeight}
          isSelected={state.selectedItemId === state.monitors}
          onClick={() => selectItemAndFocusCategory(state.monitors, 'monitors')}
        />

        {/* 5. TABLETOP ACCESSORIES (Anchored to coordinate slots) */}
        {state.accessories.includes('plant') && (
          <AccessoryGraphic
            accessoryId="plant"
            deskHeight={state.deskHeight}
            lightingMode={state.lightingMode}
            isSelected={state.selectedItemId === 'plant'}
            onClick={() => selectItemAndFocusCategory('plant', 'accessories')}
          />
        )}
        {state.accessories.includes('peripherals') && (
          <AccessoryGraphic
            accessoryId="peripherals"
            deskHeight={state.deskHeight}
            lightingMode={state.lightingMode}
            isSelected={state.selectedItemId === 'peripherals'}
            onClick={() => selectItemAndFocusCategory('peripherals', 'accessories')}
          />
        )}
        {state.accessories.includes('lamp') && (
          <AccessoryGraphic
            accessoryId="lamp"
            deskHeight={state.deskHeight}
            lightingMode={state.lightingMode}
            isSelected={state.selectedItemId === 'lamp'}
            onClick={() => selectItemAndFocusCategory('lamp', 'accessories')}
          />
        )}
        {state.accessories.includes('headset') && (
          <AccessoryGraphic
            accessoryId="headset"
            deskHeight={state.deskHeight}
            lightingMode={state.lightingMode}
            isSelected={state.selectedItemId === 'headset'}
            onClick={() => selectItemAndFocusCategory('headset', 'accessories')}
          />
        )}

        {/* 6. ERGONOMIC CHAIR (Front and center) */}
        <ChairGraphic
          chairId={state.chair}
          isSelected={state.selectedItemId === state.chair}
          onClick={() => selectItemAndFocusCategory(state.chair, 'chairs')}
        />

        {/* 7. INTERACTIVE CANVAS HOTSPOTS (Direct Scene Manipulation) */}
        <g id="canvas-hotspots">
          {/* Empty Plant Slot Hotspot */}
          {!state.accessories.includes('plant') && (
            <HotspotMarker
              x={325}
              y={deskTopY - 20}
              label="+ Place a Plant!"
              sublabel="Live Bali Monstera in terracotta pot"
              price={plantItem ? `+${formatCurrency(curr === 'USD' ? plantItem.monthlyRateUSD : plantItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#10b981"
              onClick={() => toggleAccessory('plant')}
            />
          )}

          {/* Single Monitor -> Dual Monitor Upgrade Hotspot */}
          {state.monitors === 'single-4k' && (
            <HotspotMarker
              x={500}
              y={deskTopY - 148}
              label="+ Add Second Screen!"
              sublabel="Upgrade to Dual 27' 4K Pro Array"
              price={dualMonitorItem ? `+${formatCurrency(curr === 'USD' ? 30 : 480000, curr)}/mo` : undefined}
              accentColor="#38bdf8"
              onClick={() => setMonitors('dual-4k')}
            />
          )}

          {/* Empty Task Lamp Hotspot */}
          {!state.accessories.includes('lamp') && (
            <HotspotMarker
              x={675}
              y={deskTopY - 25}
              label="+ Add Task Lamp!"
              sublabel="Warm architect swing-arm lamp"
              price={lampItem ? `+${formatCurrency(curr === 'USD' ? lampItem.monthlyRateUSD : lampItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#f59e0b"
              onClick={() => toggleAccessory('lamp')}
            />
          )}

          {/* Empty Headset Stand Hotspot */}
          {!state.accessories.includes('headset') && (
            <HotspotMarker
              x={715}
              y={deskTopY - 15}
              label="+ Add ANC Headset!"
              sublabel="Studio noise-cancelling headset & stand"
              price={headsetItem ? `+${formatCurrency(curr === 'USD' ? headsetItem.monthlyRateUSD : headsetItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#a855f7"
              onClick={() => toggleAccessory('headset')}
            />
          )}

          {/* Empty Coffee Station Hotspot */}
          {!state.lifestyle.includes('coffee-station') && (
            <HotspotMarker
              x={175}
              y={440}
              label="+ Espresso Bar!"
              sublabel="Italian espresso machine & grinder"
              price={coffeeItem ? `+${formatCurrency(curr === 'USD' ? coffeeItem.monthlyRateUSD : coffeeItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#ea580c"
              onClick={() => toggleLifestyle('coffee-station')}
            />
          )}

          {/* Empty Surf & Moto Rack Hotspot */}
          {!state.lifestyle.includes('surf-moto') && (
            <HotspotMarker
              x={68}
              y={420}
              label="+ Surfboard Rack!"
              sublabel="Bamboo surfboard & scooter helmet rack"
              price={surfItem ? `+${formatCurrency(curr === 'USD' ? surfItem.monthlyRateUSD : surfItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#06b6d4"
              onClick={() => toggleLifestyle('surf-moto')}
            />
          )}

          {/* Empty Relax Beanbag Hotspot */}
          {!state.lifestyle.includes('relax-beanbag') && (
            <HotspotMarker
              x={820}
              y={470}
              label="+ Chill Beanbag!"
              sublabel="Tropical outdoor lounge beanbag & yoga mat"
              price={beanbagItem ? `+${formatCurrency(curr === 'USD' ? beanbagItem.monthlyRateUSD : beanbagItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#10b981"
              onClick={() => toggleLifestyle('relax-beanbag')}
            />
          )}

          {/* Empty Garage Shelf Hotspot */}
          {!state.lifestyle.includes('garage-shelf') && (
            <HotspotMarker
              x={935}
              y={420}
              label="+ Gear Shelf!"
              sublabel="Industrial 4-tier storage shelf"
              price={garageItem ? `+${formatCurrency(curr === 'USD' ? garageItem.monthlyRateUSD : garageItem.monthlyRateIDR, curr)}/mo` : undefined}
              accentColor="#64748b"
              onClick={() => toggleLifestyle('garage-shelf')}
            />
          )}
        </g>
      </svg>
    </div>
  );
};
