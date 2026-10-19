## ADDED Requirements

### Requirement: Workspace Rental Summary and Breakdown
The system SHALL provide a dedicated summary drawer displaying an itemized breakdown of all currently selected equipment, each item's individual monthly rental rate in USD and IDR, and the aggregate monthly price.

#### Scenario: Opening rental summary
- **WHEN** the user clicks "Rent Your Setup!" or the checkout review trigger
- **THEN** the system SHALL display the itemized summary drawer listing the active desk, chair, monitor arrangement, desk accessories, and lifestyle add-ons with individual pricing and quantity badges.

#### Scenario: Removing optional items from summary
- **WHEN** the user clicks the delete/remove button on an optional accessory or lifestyle add-on within the checkout summary
- **THEN** the item SHALL be removed from the active workspace configuration, reflected immediately on the canvas, and subtracted from the billing totals.

#### Scenario: Attempting to remove required items
- **WHEN** the user views required core items (desk and chair) in the checkout summary
- **THEN** the system SHALL designate them as required, disallow removal to empty, and provide a "Swap Model" action redirecting to that item's catalog category.

### Requirement: Rental Duration and Discount Tier Calculation
The system SHALL allow users to select rental durations of 1 Month, 3 Months, or 6+ Months with tier-based discounting.

#### Scenario: Switching rental durations
- **WHEN** the user selects a rental duration of 1 Month, 3 Months, or 6+ Months
- **THEN** the system SHALL apply a 0% discount for 1 Month, a 10% discount for 3 Months, or a 20% discount for 6+ Months, displaying original monthly subtotal, monthly discount savings, adjusted monthly rate, and total lease commitment.

### Requirement: Bali Delivery and Location Logistics
The system SHALL support selecting common Bali digital nomad hubs with deterministic delivery fees and free-delivery eligibility.

#### Scenario: Calculating delivery fee for 1-month rental
- **WHEN** the user selects a 1-Month rental with a specific Bali hub (Canggu/Pererenan: $15 / IDR 240k; Seminyak/Sanur: $20 / IDR 320k; Ubud: $25 / IDR 400k; Uluwatu: $35 / IDR 550k)
- **THEN** the system SHALL add the specified delivery fee to the initial order invoice.

#### Scenario: Free delivery perk for multi-month leases
- **WHEN** the user selects a rental duration of 3 Months or 6+ Months
- **THEN** the system SHALL waive the delivery fee ($0 / IDR 0) and display a "Free Villa Delivery & Assembly" perk badge.

### Requirement: Booking Submission and Order Confirmation
The system SHALL collect renter delivery contact details and confirm the rental reservation inquiry.

#### Scenario: Submitting booking inquiry
- **WHEN** the user enters their name, WhatsApp number, villa address, preferred start date, and clicks "Confirm Workspace Rental"
- **THEN** the system SHALL validate the required inputs, generate a reference code formatted as `MONIS-YYMMDD-XXXX`, display an interactive confirmation screen with celebratory confetti animation, and provide a direct "Open in WhatsApp" button pre-populating the complete order summary.

### Requirement: Shareable Workspace URL Configuration
The system SHALL encode the current workspace configuration into URL query parameters (`?setup=<encoded-state>`) to enable sharing or bookmarking.

#### Scenario: Sharing workspace setup
- **WHEN** the user clicks "Share Setup" or copies the page link
- **THEN** the system SHALL copy a permalink containing `?setup=...`, and loading that link in a new browser window SHALL restore the exact workspace layout and selected items, taking precedence over local storage defaults.
