# Screen: Dashboard

## Purpose

Displays an overview of commission payment metrics, charts, and agency summary for quick operational insight.

## Wireframe

```
+------------------------------------------------------------------------+
|  Logo / App Name            [Dashboard]  [Payments]  [Payments Made]   |
+------------------------------------------------------------------------+
|                                                                        |
|  Commission Payments Dashboard                                         |
|  ===================================================================== |
|                                                                        |
|  +---------------------------+  +---------------------------+          |
|  | Payments Ready (Bar Chart)|  | Parked Payments (Bar Chart)|         |
|  |                           |  |                           |          |
|  |   Bond    Manual          |  |   Bond    Manual          |          |
|  |   Comm    Payments        |  |   Comm    Payments        |          |
|  |   |||      ||             |  |   |||      ||             |          |
|  |   |||      ||             |  |   |||      ||             |          |
|  |   |||      ||             |  |   |||      ||             |          |
|  +---------------------------+  +---------------------------+          |
|                                                                        |
|  +---------------------------+  +---------------------------+          |
|  | Total Ready for Payment   |  | Total Parked Payments     |          |
|  |                           |  |                           |          |
|  |   R 1 234 567,89          |  |   R 234 567,89            |          |
|  +---------------------------+  +---------------------------+          |
|                                                                        |
|  +---------------------------+  +---------------------------+          |
|  | Parked Aging Report       |  | Payments Made (14 Days)   |          |
|  |                           |  |                           |          |
|  |  1-3d  4-7d  >7d         |  |   42 payments             |          |
|  |  |||   ||    |            |  |                           |          |
|  |  |||   ||    |            |  |                           |          |
|  +---------------------------+  +---------------------------+          |
|                                                                        |
|  Agency Summary                                                        |
|  --------------------------------------------------------------------- |
|  | Agency Name      | Count | Commission (ZAR) | VAT (ZAR) |  Action ||
|  |------------------|-------|------------------|-----------|---------|  |
|  | *Pam Golding*    |  12   | R 123 456,78     | R 18 518  | [View] |  |
|  | Remax SA         |   8   | R 98 765,43      | R 14 814  | [View] |  |
|  | Lew Geffen       |  15   | R 201 234,56     | R 30 185  | [View] |  |
|  | ...              |  ...  | ...              | ...       |  ...   |  |
|  --------------------------------------------------------------------- |
|  * Highlighted row = selected agency (charts update)                   |
|                                                                        |
+------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Payments Ready Bar Chart | Chart (Bar) | Shows READY payment counts grouped by Commission Type (Bond Comm / Manual Payments) |
| Parked Payments Bar Chart | Chart (Bar) | Shows PARKED payment counts grouped by Commission Type |
| Total Ready for Payment | Metric Card | Sum of TotalPaymentAmount for READY status, formatted as ZAR |
| Total Parked Payments | Metric Card | Sum of TotalPaymentAmount for PARKED status, formatted as ZAR |
| Parked Aging Report | Chart (Bar) | Parked payment counts by aging range: 1-3 days, 4-7 days, >7 days |
| Payments Made (14 Days) | Metric Card | Count of payments processed in last 14 days (TotalPaymentCountInLast14Days) |
| Agency Summary Grid | Data Table | Lists agencies with payment count, commission total, and VAT |
| [View] button | Button | Navigates to Payment Management screen filtered by that agency |
| Agency row | Clickable Row | Selecting a row highlights it and updates all dashboard charts for that agency |
| Navigation tabs | Navigation | Top-level links: Dashboard, Payments, Payments Made |

## User Actions

- **Select agency row:** Highlights the row and updates all 6 metric/chart components to reflect only that agency's data
- **Click [View] on agency row:** Navigates to Payment Management (Screen 2) filtered by the selected agency
- **Navigate away:** Agency filter selection resets (does not persist across page navigation)

## Navigation

- **From:** App entry point (default landing page); navigation from other screens via top nav
- **To:** Payment Management (via [View] button on agency row); Payments Made (via top nav)

## Data Flow

- **Endpoint:** `GET /v1/payments/dashboard`
- **Response:** `PaymentsDashboardRead` containing `PaymentStatusReport`, `ParkedPaymentsAgingReport`, `TotalPaymentCountInLast14Days`, `PaymentsByAgency`
- **Filtering:** Client-side filtering of dashboard arrays when an agency is selected
