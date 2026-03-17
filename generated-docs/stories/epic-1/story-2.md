# Story 2: Shared UI Components — DataTable, Currency Formatting, Confirmation Modal, Error Handling

## Epic
Epic 1: Foundation & Shared Infrastructure

## Description
As a developer I want reusable shared components so that all screens use consistent patterns.

Delivers: Sortable DataTable, ZAR Currency Formatter (R 1 234 567,89), Confirmation Modal, Error Handling with Toasts and retry.

## Route
N/A (component only)

## Target Files
- `components/DataTable.tsx` (create new)
- `lib/format/currency.ts` (create new)
- `components/ConfirmationModal.tsx` (create new)
- `components/ErrorToast.tsx` (create new)
- `lib/api/error-handler.ts` (create new)

## Page Action
create_new

## Acceptance Criteria

### DataTable
- **AC-1:** DataTable renders data with correct column values.
- **AC-2:** Column header click sorts ascending; second click toggles to descending.
- **AC-3:** Empty state message is displayed when no data is provided.
- **AC-4:** Checkbox row selection and select-all functionality works correctly.

### Currency Formatting
- **AC-5:** ZAR currency values are formatted as R 1 234 567,89 (space thousand separator, comma decimal).

### Confirmation Modal
- **AC-6:** Confirmation modal displays with title, description, Cancel button, and Confirm button.
- **AC-7:** Cancel button closes the modal without performing the action.
- **AC-8:** Confirm button proceeds with the action.

### Error Handling
- **AC-9:** Network error shows a toast notification with a Retry button.
- **AC-10:** 500 error shows a server error message in a toast notification.
- **AC-11:** 400 error shows validation messages in a toast notification.
- **AC-12:** Retry button re-attempts the failed request.
- **AC-13:** Toast auto-dismisses after a timeout (unless an action button like Retry is present).

## Dependencies
- Story 1 (app shell must exist for layout context)

## Technical Notes
- DataTable: use Shadcn Table with custom sort logic, checkbox selection via Shadcn Checkbox
- Currency: use `Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })` with custom formatting to match R 1 234 567,89
- Confirmation Modal: use Shadcn AlertDialog
- Error Handling: use Shadcn Toast (Sonner) for notifications
- All components must be properly typed with TypeScript generics where applicable
