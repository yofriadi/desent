## 1. Project Setup & Architecture

- [x] 1.1 Initialize Next.js (App Router) + React + TypeScript application with Tailwind CSS and Lucide icons
- [x] 1.2 Define TypeScript domain models and slot coordinate schema (`slot-plant`, `slot-display`, `slot-peripherals`, `slot-lamp`, `slot-headset`, and lifestyle perimeter zones)
- [x] 1.3 Implement centralized workspace reactive state manager with URL query permalink serializer (`?setup=...`) and localStorage fallback

## 2. Equipment Catalog & Presets

- [x] 2.1 Build catalog dataset with 3+ desks, 3+ ergonomic chairs, 3 monitor setups, desk accessories, Bali lifestyle equipment, delivery fee matrix, and dual-currency pricing (USD & IDR)
- [x] 2.2 Configure one-click workspace presets ("The Bali Founder", "The 10x Developer Dual-Screen", "Minimalist Nomad", "Executive Teak")

## 3. Interactive Visual Canvas Stage

- [x] 3.1 Implement isometric/orthographic room canvas stage with responsive perspective and ambient lighting modes (Tropical Daylight vs Golden Hour Sunset)
- [x] 3.2 Create reactive SVG visual graphics for desk models with sitting and standing height adjustments
- [x] 3.3 Create reactive SVG visual graphics for chair models with directional shadows and ergonomic detailing
- [x] 3.4 Create reactive SVG visual graphics for single, dual, and ultrawide monitor displays with glowing workspace screens
- [x] 3.5 Create tabletop accessory layers anchored to coordinate slots (`slot-plant`, `slot-peripherals`, `slot-lamp`, `slot-headset`)
- [x] 3.6 Create Bali lifestyle expansion zones (Coffee Station espresso machine, Outdoor surfboard & motorcycle rack, Relax beanbag, Garage shelf)
- [x] 3.7 Implement interactive pulsating canvas hotspots ("+ Add Monitor!", "+ Place a Plant!", lifestyle zone toggles) enabling direct-canvas manipulation

## 4. Catalog Configurator & Controls

- [x] 4.1 Build top navigation bar with monis.rent branding, preset selector, ambient lighting toggle, currency switcher, and live monthly rate counter
- [x] 4.2 Build tabbed category drawer/panel (Chairs, Desks, Monitors, Accessories, Lifestyle) with specs, pricing badges, and selection controls
- [x] 4.3 Implement bidirectional canvas-to-catalog synchronization for focused items and instant reactive visual updates

## 5. Rental Checkout & Summary Workflow

- [x] 5.1 Build rental checkout drawer displaying itemized equipment list, quantities, required item swap rules, and monthly rate breakdown
- [x] 5.2 Implement flexible lease duration selector (1 Month: 0%, 3 Months: 10%, 6+ Months: 20%) with live calculation
- [x] 5.3 Implement Bali nomad delivery zone selector (Canggu/Pererenan: $15, Seminyak/Sanur: $20, Ubud: $25, Uluwatu: $35; free on 3+ month leases)
- [x] 5.4 Build rental booking inquiry form with renter contact details and "Rent Your Setup!" action generating `MONIS-YYMMDD-XXXX` reference
- [x] 5.5 Implement celebratory confirmation modal with Canvas Confetti, booking reservation reference, and WhatsApp/email dispatch
- [x] 5.6 Implement one-click setup sharing via serialized URL query permalink

## 6. Verification, Responsive Polish & Deployment

- [x] 6.1 Ensure fluid responsive behavior and touch-friendly controls across mobile, tablet, and desktop screens
- [x] 6.2 Verify error-free production build (`npm run build` / Next.js static/standalone export)
- [ ] 6.3 Run acceptance verification checklist validating all spec scenarios (preset loading, hotspot activation, pricing discounts, URL permalink round-trip)
- [ ] 6.4 Deploy application to Vercel and verify the live public URL
- [x] 6.5 Push project repository to GitHub, invite `desent-bot` as collaborator, and verify collaborator permissions
