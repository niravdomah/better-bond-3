# Wireframes: BetterBond Commission Payments POC

## Summary

The BetterBond Commission Payments POC consists of three screens: a Dashboard for high-level metrics and agency overview, a Payment Management screen for operational payment handling (park/unpark/batch), and a Payments Made screen for viewing processed batches and downloading invoices.

## Screens

| # | Screen | Description | File |
|---|--------|-------------|------|
| 1 | Dashboard | Metrics overview with charts (ready/parked payments, aging), value summaries, and agency grid with row selection that filters all components | `screen-1-dashboard.md` |
| 2 | Payment Management | Two grids (Ready and Parked) with search/filter bar, single and bulk park/unpark actions, and payment batch initiation with confirmation modals | `screen-2-payment-management.md` |
| 3 | Payments Made | Processed payment batch history with search, sortable grid, and invoice PDF download per batch | `screen-3-payments-made.md` |

## Screen Flow

```
+-------------+         +----------------------+         +---------------+
|  Dashboard  | ------> | Payment Management   | ------> | Payments Made |
|             |  [View] | (filtered by agency) |   nav   |               |
+-------------+         +----------------------+         +---------------+
      ^                         |                               |
      |        nav              |            nav                |
      +-------------------------+-------------------------------+
```

- Dashboard [View] button on agency row navigates to Payment Management pre-filtered by that agency
- All screens are accessible from the top navigation bar
- Agency filter on Dashboard resets when navigating away

## Design Notes

- All monetary values use South African locale: R 1 234 567,89 (space thousands, comma decimals)
- Role-based visibility: unauthorized action buttons are hidden entirely (not disabled)
- All grids support client-side column sorting
- Text filter inputs use 300ms debounce before triggering API calls
- After any mutation (park/unpark/batch), data is re-fetched from the API (no optimistic updates)
- Confirmation modals are required before all destructive/state-changing actions
- Shared top navigation provides consistent access to all three screens
