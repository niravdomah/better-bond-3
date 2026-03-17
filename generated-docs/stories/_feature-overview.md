# Feature: BetterBond Commission Payments POC

## Summary
A commission payment management system for bond agencies in South Africa. Three primary screens — Dashboard, Payment Management, and Payments Made — allow users to view payment metrics, park/unpark payments, initiate payment batches, and download invoice PDFs. Integrates with a live REST API at http://localhost:8042.

## Epics
1. **Epic 1: Foundation & Shared Infrastructure** - App shell with navigation, auth/RBAC system (READ_ONLY, STANDARD_USER, POWER_USER, ADMIN roles), API client config pointing to http://localhost:8042, ZAR currency formatting (R 1 234 567,89), reusable sortable DataTable component, error handling with toast notifications and retry, confirmation modal component. | Status: Pending | Dir: `epic-1-foundation/`
2. **Epic 2: Dashboard Screen** - Dashboard page at /dashboard (home page), six metric components (Payments Ready bar chart, Parked Payments bar chart, total value cards, aging report, payments made count), agency summary grid with clickable rows, agency selection filtering. | Status: Pending | Dir: `epic-2-dashboard/`
3. **Epic 3: Payment Management Screen** - Payment Management page at /payments, Ready and Parked payment grids, search/filter bar (claim date, agency name, status) with 300ms debounce, single and bulk park/unpark with confirmation modals, partial failure handling, Initiate Payment batch creation (POWER_USER/ADMIN), role-based button visibility. | Status: Pending | Dir: `epic-3-payment-management/`
4. **Epic 4: Payments Made Screen** - Payments Made page at /payments-made, batch grid with all columns, search/filter by agency name and batch reference with 300ms debounce, invoice PDF download via POST endpoint, download failure handling with retry, role-based visibility for invoice links. | Status: Pending | Dir: `epic-4-payments-made/`

## Epic Dependencies
- Epic 1: Foundation & Shared Infrastructure (no dependencies — must be first)
- Epic 2: Dashboard Screen (depends on Epic 1 — uses DataTable, currency formatting, auth/RBAC, API client, error handling)
- Epic 3: Payment Management Screen (depends on Epic 1 — uses DataTable, confirmation modal, currency formatting, auth/RBAC, API client, error handling; independent of Epic 2)
- Epic 4: Payments Made Screen (depends on Epic 1 — uses DataTable, currency formatting, auth/RBAC, API client, error handling; independent of Epics 2 and 3)

**Parallelization note:** Epics 2, 3, and 4 are independent of each other and could theoretically run in parallel, but all depend on Epic 1. In practice, they will be executed sequentially: Epic 1 -> Epic 2 -> Epic 3 -> Epic 4.
