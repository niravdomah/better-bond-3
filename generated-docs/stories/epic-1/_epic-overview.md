# Epic 1: Foundation & Shared Infrastructure

## Summary
App shell with navigation, auth/RBAC system (READ_ONLY, STANDARD_USER, POWER_USER, ADMIN roles), API client config pointing to http://localhost:8042, ZAR currency formatting (R 1 234 567,89), reusable sortable DataTable component, error handling with toast notifications and retry, confirmation modal component.

## Stories
1. **Story 1: App Shell with Navigation and Home Page Setup** — Navigation bar with links to Dashboard, Payments, and Payments Made; auth integration with role selection; responsive layout.
2. **Story 2: Shared UI Components — DataTable, Currency Formatting, Confirmation Modal, Error Handling** — Sortable DataTable, ZAR currency formatter, confirmation modal, error handling with toasts and retry.

## Dependencies
- No external epic dependencies (this is the foundation epic)
- Story 2 depends on Story 1 (app shell must exist before shared components)

## Status
- Story 1: Pending
- Story 2: Pending
