## Context

Monis.rent is an innovative workspace rental service operating in Bali, equipping remote engineers, digital nomads, and startup founders with premium office setups delivered directly to their villas or coworking spaces. 

Instead of an uninspired product catalog or a rigid tabular checkout, users expect an engaging, visual, direct-manipulation workspace customizer. Users want to see their setup materialize before their eyes: choosing standing desks, ergonomic seating, multi-display arrangements, accessories, and iconic Bali nomad essentials (espresso bar, surfboard & motorcycle rack, chillout beanbag).

This design document specifies the architecture, graphics rendering pipeline, reactive state model, catalog taxonomy, and deployment strategy for the interactive workspace designer application.

## Goals / Non-Goals

**Goals:**
- Deliver a visually captivating, responsive interactive workspace canvas with real-time visual updates for desks, chairs, monitors, tabletop items, and peripheral Bali lifestyle zones.
- Support direct canvas interactions via pulsating "+ Add / Upgrade" hotspots and clickable scene items.
- Provide a curated catalog offering multiple desk options (at least 2, providing 3+), multiple ergonomic chairs (at least 2, providing 3+), monitor arrays (single, dual, ultrawide), tabletop accessories, and lifestyle add-ons.
- Offer curated one-click presets ("The Bali Founder", "The 10x Developer Dual-Screen", "Minimalist Nomad", "Executive Teak").
- Implement dynamic rental pricing calculations with tiered lease discounts (1 Month: 0%, 3 Months: 10%, 6+ Months: 20%), refundable deposit, and Bali regional delivery selection (Canggu/Pererenan: $15, Seminyak/Sanur: $20, Ubud: $25, Uluwatu: $35; free on 3+ month leases).
- Support dual-currency display (USD base with instant Indonesian Rupiah IDR toggle at 1 USD = 16,000 IDR).
- Deliver a polished checkout summary drawer with order confirmation, celebratory confetti, and shareable setup URLs via query parameter (`?setup=...`).
- Performance & Deployment: Next.js App Router application optimized for sub-second page loads, responsive styling via Tailwind CSS, and zero-config automated deployment to Vercel with global CDN edge delivery.

**Non-Goals:**
- Heavy 3D WebGL / Blender rendering pipelines that balloon bundle size and lag on mobile or spotty Bali connections.
- Live payment processor integrations (e.g. real credit card capture); the tool submits complete rental reservation inquiries directly to monis.rent booking channels (WhatsApp / email).
- Persistent multi-tenant database infrastructure; workspace configurations are client-persisted via localStorage and encoded into permalink URLs.

## Decisions

### 1. Vector SVG & Dynamic Canvas Compositing Engine over Heavy 3D WebGL
- **Decision**: Build the workspace visualizer using layered, precision-crafted SVG vector graphics and CSS transform animations, supplemented by ambient lighting overlays (Daylight / Sunset Golden Hour) and dynamic drop shadows.
- **Rationale**: 
  - Standard 3D WebGL (Three.js/GLTF) introduces 5MB–15MB bundle overhead, requires complex 3D asset modeling, drains mobile battery, and stutters on non-flagship devices.
  - Layered isometric/orthographic vector SVG assets weigh less than 50KB total, render tack-sharp on all Retina displays, support seamless color/texture variations, allow effortless SVG filter glows, and provide precise DOM-level hotspot hit testing.
- **Alternatives Considered**: 
  - *Three.js / React Three Fiber*: High engineering overhead, asset weight, and brittle mobile shader support.
  - *Static PNG collage*: Lacks crisp resolution on zoom, rigid scaling, and poor color customization.

### 2. Tabletop and Peripheral Slot Coordinate Mapping
- **Decision**: Anchor all accessories and monitors to fixed relative percentage coordinates on the desk stage:
  - `slot-plant` (x: 14%, y: 46%): Tropical Monstera / Desk Succulent
  - `slot-display` (x: 50%, y: 28%): Single 27" 4K, Dual 27" 4K Array, or 34" Curved Ultrawide
  - `slot-peripherals` (x: 50%, y: 55%): Desk mat, mechanical keyboard & precision mouse
  - `slot-lamp` (x: 82%, y: 38%): Architect LED task lamp with ambient light cone
  - `slot-headset` (x: 90%, y: 56%): Studio headset with aluminum stand
  - Perimeter zones:
    - `zone-coffee` (stage left): Coffee Station & Espresso Machine
    - `zone-outdoor` (stage far-left): Outdoor Surfboard & Motorcycle Rack
    - `zone-relax` (stage right): Relax Zone Beanbag & Yoga Mat
    - `zone-garage` (stage far-right): Garage Space Tool Shelf
- **Rationale**: When users switch between bamboo, teak, or minimalist desks, accessories remain perfectly aligned to the desktop surface without manual repositioning.

### 3. Framework & Deployment: Next.js + Tailwind CSS + Vercel
- **Decision**: Build the application using Next.js (App Router), React, TypeScript, and Tailwind CSS, deploying directly to Vercel.
- **Rationale**: 
  - Next.js provides modern React primitives, SEO and Open Graph metadata generation (critical for digital nomad shareable links), image optimization, and tight integration with Vercel's global edge network.
  - Tailwind CSS enables rapid, utility-first styling with consistent design tokens (warm Bali teak hues, jungle greens, crisp slate grays) without stylesheet bloat.
  - Vercel offers instant static/SSR deployment, automated preview URLs, edge CDN acceleration across Southeast Asia, and direct GitHub CI/CD integration.
- **Alternatives Considered**:
  - *Plain Vite SPA*: Lacks built-in Next.js metadata/OG capabilities and requires separate hosting routing configuration.
  - *Create React App / Legacy CRA*: Deprecated and unmaintained.

### 4. Centralized Workspace State, Priority Resolution & URL Query Sharing
- **Decision**: Single-source-of-truth state container managing the active configuration:
  - `desk`: selected desk model ID (`desk-bamboo` | `desk-teak` | `desk-minimalist`).
  - `chair`: selected chair model ID (`chair-mesh` | `chair-leather` | `chair-active`).
  - `monitors`: display arrangement (`single-4k` | `dual-4k` | `ultrawide-curved`).
  - `accessories`: set of active item IDs (`lamp`, `plant`, `mat`, `keyboard`, `headset`).
  - `lifestyle`: set of active add-on IDs (`coffee-station`, `surf-moto`, `relax-beanbag`, `garage-shelf`).
  - `lightingMode`: ambient scene lighting (`daylight` | `sunset`).
  - `rentalDuration`: `1` | `3` | `6` (months).
  - `currency`: `USD` | `IDR`.
  - `deliveryZone`: Bali location ID (`canggu`, `seminyak`, `ubud`, `uluwatu`, `sanur`).
- **Precedence Order**:
  1. URL query parameter (`?setup=<encoded-state>`) if present.
  2. LocalStorage (`monis_workspace_setup`) if saved.
  3. Default preset ("The Bali Founder").
- **Rationale**: Guarantees reproducible permalinks while retaining user drafts locally.

### 5. Direct Canvas Hotspots & Bidirectional Interaction
- **Decision**: Render interactive pulsating badges directly over canvas slots (e.g., above the desk for "+ Add Monitor!", beside the desk for "+ Place a Plant!", perimeter zones for lifestyle add-ons). Clicking a hotspot activates or upgrades the item and focuses the corresponding catalog category. Clicking a placed item highlights it and opens its catalog tab.
- **Rationale**: Directly satisfies the user-centric visual experience requested in the client sketch (`@monis-workspace-sketch.webp`).

## Risks / Trade-offs

- **[Risk] Layered SVG complexity across different monitor and desk width variations**  
  → *Mitigation*: Anchor all tabletop components relative to fixed desk attachment slots with normalized percentage coordinates.

- **[Risk] Mobile screen real estate vs. large workspace canvas**  
  → *Mitigation*: Provide sticky mobile bottom action bar with quick drawer toggles, pinch/drag canvas pan, and a compact canvas view mode that prioritizes the desk and immediate accessories.

- **[Risk] URL state length exceeding browser query limits**  
  → *Mitigation*: Encode state as a compact URL-safe base64 string or URI-encoded JSON string under 250 characters.
