## ADDED Requirements

### Requirement: Interactive Workspace Stage Rendering
The system SHALL render an interactive visual stage depicting the user's workspace setup, including the room background, the selected desk, the selected chair, mounted monitor displays, tabletop accessories anchored to dedicated geometric slots, and room-level lifestyle equipment.

#### Scenario: Initial workspace load
- **WHEN** the user opens the application without query parameters
- **THEN** the system SHALL render a default workspace featuring a starter desk, ergonomic chair, primary monitor, input peripherals, and active visual hotspots for customizable items.

#### Scenario: Swapping desk model
- **WHEN** the user selects an alternative desk model
- **THEN** the canvas SHALL update the desk graphic to the newly selected model while maintaining currently positioned tabletop items and chair alignment.

#### Scenario: Swapping chair model
- **WHEN** the user selects an alternative chair model
- **THEN** the canvas SHALL update the chair visual in front of or paired with the desk with the corresponding texture and ergonomics.

### Requirement: Tabletop Slot Anchoring and Multi-Monitor Display
The system SHALL anchor all tabletop items and monitor displays to defined normalized coordinate slots on the desk surface (`slot-plant` at left, `slot-display` at center-rear, `slot-peripherals` at center-front, `slot-lamp` at right, `slot-headset` at desk edge).

#### Scenario: Configuring monitor display arrangement
- **WHEN** the user selects Single 27" 4K, Dual 27" 4K, or 34" Curved Ultrawide
- **THEN** the canvas SHALL render the selected display configuration anchored at `slot-display` with glowing screens and ergonomic mounting arms.

#### Scenario: Placing desk accessories into dedicated slots
- **WHEN** the user selects or enables desk accessories such as a designer task lamp, desk mat, or tropical desk plant
- **THEN** the system SHALL render the corresponding accessory at its designated tabletop slot (`slot-lamp`, `slot-peripherals`, or `slot-plant`) with drop-shadows.

### Requirement: Interactive Hotspots on Canvas
The system SHALL display interactive canvas hotspots positioned at empty or upgradeable zones allowing users to directly interact with the scene.

#### Scenario: Clicking monitor hotspot
- **WHEN** the user clicks the "+ Add Monitor!" canvas hotspot
- **THEN** the system SHALL toggle from single display to dual 27" 4K display (or default to single display if none active), select the Monitors tab in the catalog, and update the rental total.

#### Scenario: Clicking plant hotspot
- **WHEN** the user clicks the "+ Place a Plant!" canvas hotspot
- **THEN** the system SHALL toggle the Monstera Tropical Plant on the canvas, select the Accessories tab in the catalog, and update the rental total.

#### Scenario: Selecting an active canvas object
- **WHEN** the user clicks directly on an already-placed equipment item (e.g., desk, chair, lamp)
- **THEN** the system SHALL highlight the item on the canvas and automatically focus its category and options in the catalog drawer.

### Requirement: Bali Lifestyle Expansion Zones
The system SHALL provide visual zones surrounding the primary desk representing Bali lifestyle amenities: Coffee Station (`zone-coffee`), Outdoor Gear (`zone-outdoor`), Relax Zone (`zone-relax`), and Garage Space (`zone-garage`).

#### Scenario: Adding a Bali lifestyle add-on
- **WHEN** the user enables the Coffee Machine or Surfboard & Motorcycle Rack
- **THEN** the system SHALL render the lifestyle item in its corresponding perimeter zone adjacent to the workspace.

#### Scenario: Day and sunset ambient lighting modes
- **WHEN** the user toggles between Tropical Daylight and Golden Hour / Sunset mode
- **THEN** the canvas lighting overlay, window backdrop, and lamp glow SHALL transition smoothly to reflect the ambient lighting conditions.
