# Test Design: Epic 1, Story 1 — App Shell with Navigation and Home Page Setup

## Story Summary
Navigation bar with links to Dashboard (/), Payments (/payments), and Payments Made (/payments-made), auth integration with role selection, user name display, and responsive layout.

## Test Scenarios

### Scenario Group 1: Navigation Bar Rendering
**Context:** Authenticated user visits the application.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1.1 | App name visible | User is logged in | Page renders | "BetterBond" is visible in the navigation area |
| 1.2 | All nav links present | User is logged in | Page renders | Links for "Dashboard", "Payments", and "Payments Made" are visible |
| 1.3 | Navigation bar exists | User is logged in | Page renders | A navigation region is present on the page |

### Scenario Group 2: Navigation Between Routes
**Context:** Authenticated user clicks navigation links.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 2.1 | Navigate to Payments | User is on home page | Clicks "Payments" link | URL changes to /payments |
| 2.2 | Navigate to Payments Made | User is on home page | Clicks "Payments Made" link | URL changes to /payments-made |
| 2.3 | Navigate to Dashboard | User is on /payments | Clicks "Dashboard" link | URL changes to / |

### Scenario Group 3: Active Link Highlighting
**Context:** The current page's link should appear visually distinct.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 3.1 | Dashboard active on home | User is on / | Page renders | Dashboard link has active styling (aria-current="page") |
| 3.2 | Payments active on /payments | User is on /payments | Page renders | Payments link has active styling |
| 3.3 | Payments Made active on /payments-made | User is on /payments-made | Page renders | Payments Made link has active styling |

### Scenario Group 4: Authentication — Unauthenticated Users
**Context:** User is not logged in.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 4.1 | Redirect to login | User is not authenticated | Visits home page | Redirected to /auth/signin |

### Scenario Group 5: Authentication — Logged-In User Display
**Context:** Authenticated user with session data.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 5.1 | User name displayed | User is logged in as "Admin User" | Page renders | "Admin User" is visible in the navigation area |
| 5.2 | User name for different user | User is logged in as "Standard User" | Page renders | "Standard User" is visible in the navigation area |

### Scenario Group 6: Role Selection
**Context:** User authentication includes role assignment.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 6.1 | Role available in session | User logs in with ADMIN role | Session is checked | Session contains role "admin" |
| 6.2 | All roles supported | Demo users exist for each role | Credentials are checked | Each role (admin, power_user, standard_user, read_only) maps correctly |

**Note:** Role selection happens at the login page (existing /auth/signin). The nav bar story verifies that the role is accessible from the session and the user name is displayed. The login page itself is pre-built.

### Scenario Group 7: Loading and Error States
**Context:** Layout handles loading and error conditions gracefully.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 7.1 | Layout renders without error | Valid session exists | Layout mounts | No error boundary is triggered; content renders |
| 7.2 | Children render in layout | Layout receives child content | Layout renders | Child content is visible in the main area |

### Scenario Group 8: Responsive Design
**Context:** Navigation adapts to different screen sizes.

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 8.1 | Nav links accessible | User is on any screen size | Navigation renders | All navigation links are present in the DOM and accessible |

**Note:** True responsive breakpoint testing (mobile hamburger menu) is best verified manually in the browser. The automated test ensures all links remain accessible regardless of viewport.

## Summary
- **Main scenarios:** 14
- **Edge scenarios:** 2 (error states, responsive)
- **BA decisions required:** 0
- **Key ambiguity:** None — the existing auth system provides all needed infrastructure. The login page and role selection are already built; this story adds the navigation shell around the authenticated content.

## Test File Target
`web/src/__tests__/integration/app-shell-navigation.test.tsx`
