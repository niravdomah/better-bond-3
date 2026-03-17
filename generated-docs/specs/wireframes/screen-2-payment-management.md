# Screen: Payment Management

## Purpose

Allows users to view, filter, park/unpark individual or bulk payments, and initiate payment batches for processing.

## Wireframe

```
+------------------------------------------------------------------------+
|  Logo / App Name            [Dashboard]  [Payments]  [Payments Made]   |
+------------------------------------------------------------------------+
|                                                                        |
|  Payment Management                                                    |
|  ===================================================================== |
|                                                                        |
|  Filter Bar                                                            |
|  +--------------------+ +--------------------+ +----------------+      |
|  | [Claim Date ...]   | | [Agency Name...]   | | [Status    v]  |      |
|  +--------------------+ +--------------------+ +----------------+      |
|                                                                        |
|  Ready Payments                                    [Park Selected]     |
|  ------------------------------------------------------------------    |
|  |[ ]| Agency    | Batch| Claim  | Agent Name | Bond Amt  | Comm  |   |
|  |   |           | ID   | Date   |            | (ZAR)     | Type  |   |
|  |---|-----------|------|--------|------------|-----------|-------|   |
|  |   | Comm% | Grant  | Reg    | Bank | Comm Amt  | VAT     |Status|  |
|  |   |       | Date   | Date   |      | (ZAR)     | (ZAR)   |      |  |
|  |---|-------|--------|--------|------|-----------|---------|------|  |
|  |[x]| Pam   |  --    | 2025-  | J.   | R 1 200   | Bond   |      |  |
|  |   | Golding|       | 11-06  | Smith | 000,00   | Comm   |      |  |
|  |   | 0.945%| 2025-  | 2025-  | ABSA | R 11 340  | R 1 701| REG  |  |
|  |   |       | 10-15  | 11-01  |      |           |        |      |  |
|  |---|-------|--------|--------|------|-----------|---------|------|  |
|  |[ ]| Remax |  --    | 2025-  | A.   | R 950    | Manual |      |  |
|  |   | SA    |        | 11-05  | Jones | 000,00   | Pay    |      |  |
|  |   |  --   | 2025-  | 2025-  | FNB  | R 4 750   | R 712  |MAN-  |  |
|  |   |       | 10-20  | 10-28  |      |           |        |PAY   |  |
|  |---|-------|--------|--------|------|-----------|---------|------|  |
|  |   | ...   |        |        |      |           |        |      |  |
|  ------------------------------------------------------------------    |
|  Selected: 1 payment(s)                                                |
|                                                  [Initiate Payment]    |
|                                                                        |
|  ===================================================================== |
|                                                                        |
|  Parked Payments                                 [Unpark Selected]     |
|  ------------------------------------------------------------------    |
|  |[ ]| Agency    | Batch| Claim  | Agent Name | Bond Amt  | Comm  |   |
|  |   |           | ID   | Date   |            | (ZAR)     | Type  |   |
|  |---|-----------|------|--------|------------|-----------|-------|   |
|  |   | Comm% | Grant  | Reg    | Bank | Comm Amt  | VAT     |Status|  |
|  |---|-------|--------|--------|------|-----------|---------|------|  |
|  |[ ]| Lew   |  --    | 2025-  | B.   | R 800    | Bond   |      |  |
|  |   | Geffen|        | 11-04  | Lee  | 000,00   | Comm   |      |  |
|  |   | 0.945%| 2025-  | 2025-  | STD  | R 7 560   | R 1 134| REG  |  |
|  |   |       | 10-10  | 10-25  |      |           |        |      |  |
|  ------------------------------------------------------------------    |
|                                                                        |
+------------------------------------------------------------------------+

+-- Confirmation Modal (Park / Unpark / Initiate) -----------------------+
|                                                                        |
|  Are you sure you want to [park/unpark/initiate] this payment?         |
|                                                                        |
|  (Single) Agent: J. Smith | Claim Date: 2025-11-06                     |
|           Commission Amount: R 11 340,00                               |
|                                                                        |
|  (Bulk)   Number of payments: 5                                        |
|           Total commission: R 45 670,00                                 |
|                                                                        |
|  (Initiate) Number of payments: 12                                     |
|             Total value: R 123 456,78                                   |
|                                                                        |
|                              [Cancel]    [Confirm]                      |
+------------------------------------------------------------------------+

+-- Success Modal (after batch creation) --------------------------------+
|                                                                        |
|  Payment batch created successfully!                                   |
|  Batch ID: 42                                                          |
|  12 payments processed.                                                |
|                                                                        |
|                                     [OK]                               |
+------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Claim Date filter | Date Picker | Filters payments by claim date (ISO 8601 format sent to API) |
| Agency Name filter | Text Input | Case-insensitive substring search, 300ms debounce |
| Status filter | Dropdown | Options: REG, MAN-PAY; exact match |
| Ready Payments grid | Data Table | Shows payments in READY state with checkbox selection |
| Parked Payments grid | Data Table | Shows payments in PARKED state with checkbox selection |
| Checkbox (per row) | Checkbox | Selects individual payment for bulk operations |
| [Park] (per row) | Button | Parks a single payment (hidden for READ_ONLY) |
| [Unpark] (per row) | Button | Unparks a single payment (hidden for READ_ONLY) |
| [Park Selected] | Button | Bulk parks all selected payments (hidden for READ_ONLY) |
| [Unpark Selected] | Button | Bulk unparks all selected payments (hidden for READ_ONLY) |
| [Initiate Payment] | Button | Creates a payment batch from all READY payments (hidden for READ_ONLY and STANDARD_USER) |
| Confirmation Modal | Dialog | Shows details before park/unpark/initiate actions |
| Success Modal | Dialog | Confirms batch creation with batch ID |

## User Actions

- **Filter payments:** Enter claim date, agency name, or select status to filter via API query parameters
- **Sort columns:** Click any column header for client-side ascending/descending sort (default: ClaimDate descending)
- **Park single payment:** Click [Park] on a row, review confirmation modal, confirm to move payment to Parked grid
- **Bulk park:** Select multiple checkboxes, click [Park Selected], review count and total, confirm
- **Unpark single payment:** Click [Unpark] on a parked row, review confirmation modal, confirm to move back to Ready grid
- **Bulk unpark:** Select multiple checkboxes in Parked grid, click [Unpark Selected], confirm
- **Initiate payment batch:** Click [Initiate Payment], review payment count and total value, confirm to create batch via API
- **After any mutation:** Data is re-fetched from API (no optimistic updates)

## Navigation

- **From:** Dashboard (via [View] button on agency row, pre-filtered by agency); top navigation
- **To:** Dashboard (via top nav); Payments Made (via top nav)

## Data Flow

- **Endpoint:** `GET /v1/payments` with optional query params: `ClaimDate`, `AgencyName`, `Status`
- **Park:** `PUT /v1/payments/park` with `{ PaymentIds: [id] }` or `{ PaymentIds: [id1, id2, ...] }`
- **Unpark:** `PUT /v1/payments/unpark` with `{ PaymentIds: [id] }` or `{ PaymentIds: [id1, id2, ...] }`
- **Initiate batch:** `POST /v1/payment-batches` with `{ PaymentIds: [...] }` and `LastChangedUser` header
- **Response:** `PaymentReadList` containing `PaymentList` array of `PaymentRead`

## Role-Based Visibility

| Element | READ_ONLY | STANDARD_USER | POWER_USER | ADMIN |
|---------|-----------|---------------|------------|-------|
| Park/Unpark buttons | Hidden | Visible | Visible | Visible |
| Park/Unpark Selected | Hidden | Visible | Visible | Visible |
| Checkboxes | Hidden | Visible | Visible | Visible |
| Initiate Payment | Hidden | Hidden | Visible | Visible |
