## ADDED Requirements

### Requirement: Categorized Equipment Selection
The system SHALL provide a structured catalog allowing users to browse and configure workspace items across categorized tabs: Desks, Chairs, Monitors, Accessories, and Lifestyle Add-ons.

#### Scenario: Switching categories
- **WHEN** the user selects a category tab (e.g., "Chairs", "Desks", "Monitors", "Accessories", "Lifestyle")
- **THEN** the system SHALL display the relevant items for that category with their titles, visual previews, key ergonomic specifications, and monthly rental rates in USD and IDR.

### Requirement: Desk Selection with Multiple Options
The system SHALL support selecting from at least two distinct desk models (Electric Bamboo Standing Desk, Bali Teak Solid Wood Desk, Minimalist Compact Studio Desk).

#### Scenario: Selecting a desk model
- **WHEN** the user chooses an alternative desk model from the catalog
- **THEN** the system SHALL designate that desk as active, deselect any previously active single-select desk, recalculate the rental subtotal, and notify the canvas to render the chosen model.

### Requirement: Chair Selection with Multiple Options
The system SHALL support selecting from at least two distinct chair models (Ergonomic Breathable Mesh Pro, Executive Vegan Leather Swivel, Active Ergonomic Saddle Stool).

#### Scenario: Selecting a chair model
- **WHEN** the user chooses an alternative chair model from the catalog
- **THEN** the system SHALL designate the chosen chair as active, update the active configuration, and trigger the canvas chair asset update.

### Requirement: Monitor Selection Options
The system SHALL support choosing display arrangements from Single 27" 4K IPS, Dual 27" 4K Pro Array, or 34" Curved Ultrawide.

#### Scenario: Choosing monitor configuration
- **WHEN** the user selects a monitor configuration in the catalog
- **THEN** the system SHALL switch the active monitor arrangement, update the rental monthly rate, and notify the canvas to update the screen arrangement.

### Requirement: Accessories and Lifestyle Item Multi-Select Toggles
The system SHALL support adding and removing multi-select workspace accessories (Monstera Plant, Architect LED Lamp, Mechanical Keyboard & Mat, Studio Headset) and Bali nomad lifestyle add-ons (Coffee Station, Outdoor Surfboard & Motorcycle Rack, Relax Beanbag, Garage Tool Shelf).

#### Scenario: Toggling an accessory on and off
- **WHEN** the user clicks an unselected accessory or lifestyle card
- **THEN** the system SHALL add the item to the active workspace inventory, update the monthly total, and display an active checkmark badge.
- **WHEN** the user clicks an already-selected accessory or lifestyle card
- **THEN** the system SHALL remove the item from the active workspace inventory and subtract its rate from the monthly total.

### Requirement: Preset Templates for Fast Configuration
The system SHALL provide pre-configured workspace presets tailored for Bali digital nomads ("The Bali Founder", "The 10x Developer Dual-Screen", "Minimalist Nomad", "Executive Teak").

#### Scenario: Applying a workspace preset
- **WHEN** the user selects a preset setup template
- **THEN** the system SHALL batch-update the desk, chair, monitors, accessories, and lifestyle items to match the preset configuration and immediately render the complete scene.
