# Story 1: App Shell with Navigation and Home Page Setup

## Epic
Epic 1: Foundation & Shared Infrastructure

## Description
As a user I want to see a navigation bar with links to all screens so that I can move between Dashboard, Payments, and Payments Made.

## Route
/ (home page)

## Target Files
- `app/page.tsx` (modify existing)
- `app/layout.tsx` (modify existing)

## Page Action
modify_existing

## Acceptance Criteria

### Navigation Bar
- **AC-1:** Given I visit the home page, I see the application name ("BetterBond") and a navigation bar.
- **AC-2:** Given I am on any page, I see navigation links for Dashboard, Payments, and Payments Made.
- **AC-3:** Given I click the Payments link, I navigate to /payments.
- **AC-4:** Given I click the Payments Made link, I navigate to /payments-made.
- **AC-5:** Given I click the Dashboard link, I return to the home page (/).

### Active Link State
- **AC-6:** Given I am on the home page, the Dashboard link appears highlighted/active.

### Authentication
- **AC-7:** Given I am not logged in, I am redirected to a login page.
- **AC-8:** Given I log in, I can select a role (READ_ONLY, STANDARD_USER, POWER_USER, ADMIN).
- **AC-9:** Given I am logged in, I see my name in the navigation area.

### Loading and Error States
- **AC-10:** Loading and error states for the layout are handled gracefully (skeleton/spinner during load, error boundary for failures).

### Responsive Design
- **AC-11:** The navigation is responsive and works on different screen sizes (mobile hamburger menu or collapsible nav on small screens).

## Dependencies
None (first story in the epic)

## Technical Notes
- Use the existing auth system in `web/src/lib/auth/`
- Use Shadcn UI components for navigation (NavigationMenu, Button, etc.)
- App Router layout pattern — navigation lives in `app/layout.tsx`
- Active link detection uses `usePathname()` from `next/navigation`
- Roles: READ_ONLY, STANDARD_USER, POWER_USER, ADMIN (frontend-only enforcement)
