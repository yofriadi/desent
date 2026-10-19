# Monis.rent | Interactive Bali Workspace Designer

An interactive, visual 2.5D workspace customizer and rental checkout application designed for digital nomads, remote engineers, and startup founders in Bali. Renters can visually configure their ideal workstation—from electric bamboo standing desks and ergonomic cooling mesh chairs to multi-monitor setups, tropical flora, and Bali lifestyle equipment (espresso bars, surfboard racks)—and schedule direct delivery to their villa.

---

## Short Write-Up

### Approach
Instead of standard static product cards or rigid tabular checkout forms, the application is anchored around an interactive, direct-manipulation visual canvas inspired by nomad villa living. 

All equipment items and accessories are mapped to relative geometric tabletop slots (`slot-plant`, `slot-display`, `slot-peripherals`, `slot-lamp`, `slot-headset`) and lifestyle perimeter zones (`zone-coffee`, `zone-outdoor`, `zone-relax`, `zone-garage`). This architectural slot mapping ensures that when switching between desk models or toggling motorized sit/stand heights, mounted monitors, lamps, and accessories move fluidly with the desktop. 

We established bidirectional synchronization between the canvas and catalog: clicking any canvas hotspot or active item highlights the object and focuses its catalog drawer, while picking items from the catalog immediately renders reactive SVG updates. Pricing calculations dynamically recalculate lease duration discounts (10% for 3 months, 20% for 6+ months), waive delivery fees for multi-month leases, and maintain dual-currency parity (USD and IDR).

### Tech Choices
- **Next.js 16 (App Router) + React 19 + TypeScript**: Provides rapid Turbopack builds, rock-solid type safety across domain models and slot coordinate schemas, and seamless production deployment.
- **Layered Vector SVG & CSS Compositing (over heavy 3D WebGL)**: Rather than bundling 10MB–15MB Three.js/GLTF assets that drain mobile batteries and stutter on spotty island Wi-Fi, layered vector SVG graphics weigh under 50KB total, render tack-sharp on Retina displays, support instantaneous daylight / golden-hour sunset ambient lighting transitions, and offer native DOM hit testing.
- **Tailwind CSS**: Utility-first styling configured with custom Bali design tokens (warm reclaimed teak, jungle foliage greens, sunset corals, and warm slate tones).
- **URL Query Permalinks (`?setup=...`)**: Base64 URL serialization allows nomads to bookmark or share their exact workspace build in a single link with automatic localStorage caching.
- **Lucide Icons & Canvas Confetti**: Polished UI touchpoints with celebratory booking inquiry confirmations and direct WhatsApp dispatch (`MONIS-YYMMDD-XXXX`).

### What I'd Improve with More Time
1. **Interactive 3D / WebXR Mode**: Add an optional Three.js / WebXR AR toggle allowing users on supported mobile devices to project the configured desk directly into their physical villa room.
2. **Multiple Bali Villa Backdrops**: Expand the room visualizer with selectable scenery presets (e.g. *Canggu Rice Terrace*, *Ubud Jungle River*, *Uluwatu Ocean Cliff*).
3. **Live Logistics & Inventory Calendar**: Connect real-time warehouse inventory and courier route optimization for same-day delivery slots in Canggu, Pererenan, Seminyak, Ubud, and Uluwatu.
4. **Indonesian Payment Integration**: Integrate automated IDR/USD checkout with Midtrans or Xendit supporting Indonesian QRIS, bank transfers, and international credit cards for security deposits.
5. **Interactive Cable Management & Cable Routing View**: Add an under-desk toggle showing power strip options, international plug adapters (Type C/F/G), and clean wire routing trays.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested with Node 20 / 22 / 26)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yofriadi/desent.git
cd desent

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```
