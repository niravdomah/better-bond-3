# Screen: Payments Made

## Purpose

Displays a history of processed payment batches with the ability to search, sort, and download invoice PDFs.

## Wireframe

```
+------------------------------------------------------------------------+
|  Logo / App Name            [Dashboard]  [Payments]  [Payments Made]   |
+------------------------------------------------------------------------+
|                                                                        |
|  Payments Made                                                         |
|  ===================================================================== |
|                                                                        |
|  Filter Bar                                                            |
|  +-------------------------+ +-------------------------+               |
|  | [Agency Name...]        | | [Batch Reference...]    |               |
|  +-------------------------+ +-------------------------+               |
|                                                                        |
|  Payment Batches                                                       |
|  ------------------------------------------------------------------    |
|  | Agency    | Reference    | Count | Commission  | VAT       |        |
|  |           |              |       | (ZAR)       | (ZAR)     |        |
|  |-----------|--------------|-------|-------------|-----------|        |
|  | Created   | Created By   |                     | Invoice   |        |
|  | Date      |              |                     |           |        |
|  |-----------|--------------|---------------------|-----------|        |
|  | Pam       | BB202511-391 |   12  | R 123 456   | R 18 518  |        |
|  | Golding   |              |       |             |           |        |
|  | 2025-     | admin.user   |                     |[Download] |        |
|  | 11-06     |              |                     |           |        |
|  |-----------|--------------|-------|-------------|-----------|        |
|  | Remax SA  | BB202511-392 |    8  | R 98 765    | R 14 814  |        |
|  |           |              |       |             |           |        |
|  | 2025-     | power.user   |                     |[Download] |        |
|  | 11-05     |              |                     |           |        |
|  |-----------|--------------|-------|-------------|-----------|        |
|  | ...       | ...          |  ...  | ...         | ...       |        |
|  ------------------------------------------------------------------    |
|                                                                        |
|  Empty state: "No payment batches found"                               |
|                                                                        |
+------------------------------------------------------------------------+

+-- Error Toast (download failure) --------------------------------------+
|  [!] Invoice download failed. [Retry]                                  |
+------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Agency Name filter | Text Input | Case-insensitive substring search via API, 300ms debounce |
| Batch Reference filter | Text Input | Filters by batch reference string via API, 300ms debounce |
| Payment Batches grid | Data Table | Lists all processed payment batches with sortable columns |
| [Download] link | Button/Link | Downloads invoice PDF for the batch (hidden for READ_ONLY and STANDARD_USER) |
| Error toast | Toast Notification | Shown when invoice download fails, includes [Retry] button |

## User Actions

- **Filter batches:** Enter agency name or batch reference to filter via API query parameters
- **Sort columns:** Click any column header for client-side sort (default: CreatedDate descending)
- **Download invoice:** Click [Download] to trigger PDF download from API
- **Retry failed download:** Click [Retry] on error toast to re-attempt download

## Navigation

- **From:** Dashboard (via top nav); Payment Management (via top nav)
- **To:** Dashboard (via top nav); Payment Management (via top nav)

## Data Flow

- **List endpoint:** `GET /v1/payment-batches` with optional query params: `Reference`, `AgencyName`
- **Response:** `PaymentBatchReadList` containing `PaymentBatchList` array of `PaymentBatchRead`
- **Download endpoint:** `POST /v1/payment-batches/{Id}/download-invoice-pdf`
- **Download response:** `application/octet-stream` (PDF binary)

## Role-Based Visibility

| Element | READ_ONLY | STANDARD_USER | POWER_USER | ADMIN |
|---------|-----------|---------------|------------|-------|
| All grid data | Visible | Visible | Visible | Visible |
| [Download] invoice | Hidden | Hidden | Visible | Visible |
