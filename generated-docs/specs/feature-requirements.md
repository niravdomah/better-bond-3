# Feature Requirements Specification (FRS)

## BetterBond Commission Payments POC

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Date | 2026-03-17 |
| Domain | FinTech / Commission Management |
| API Base URL | http://localhost:8042 |
| Locale | en-ZA (South African) |

---

## 1. Overview & Success Criteria

### 1.1 Purpose

This FRS details the functional requirements for the BetterBond Commission Payments POC frontend application. The system provides a commission payment management interface with three primary screens: Dashboard, Payment Management, and Payments Made. It integrates with an existing backend API to display, manage, and process bond agency commission payments.

> **Source:** BRD Section "Overview" (BetterBond-Commission-Payments-POC-002.md)

### 1.2 Success Criteria

| ID | Criterion | Source |
|----|-----------|--------|
| SC-01 | All three screens render correctly with live API data | BRD Overview |
| SC-02 | Users can park and unpark individual and bulk payments with confirmation flows | BRD Screen 2 |
| SC-03 | Users can initiate payment batches that create backend batch records | BRD Screen 2 |
| SC-04 | Invoice PDFs can be downloaded for processed payment batches | BRD Screen 2 + Screen 3 |
| SC-05 | Dashboard metrics update dynamically when an agency is selected | BRD Screen 1 |
| SC-06 | Role-based access controls hide unauthorized actions from the UI | Orchestrator assumption |
| SC-07 | All monetary values display in South African format (R 1 234 567,89) | BRD + Dataset |
| SC-08 | Invoice totals match the sum of individual payment amounts in the batch | Orchestrator assumption |

---

## 2. User Personas & Roles

### 2.1 Role Definitions

| Role | Description | Source |
|------|-------------|--------|
| READ_ONLY | View-only access to all screens; no mutation actions | Orchestrator assumption |
| STANDARD_USER | Operational user who can view screens and park/unpark payments | Orchestrator assumption |
| POWER_USER | Extended permissions: all STANDARD_USER actions + batch creation + invoice download | Orchestrator assumption |
| ADMIN | Full unrestricted access to all features | Orchestrator assumption |

### 2.2 Permission Matrix

| Action | READ_ONLY | STANDARD_USER | POWER_USER | ADMIN |
|--------|-----------|---------------|------------|-------|
| View Dashboard | Yes | Yes | Yes | Yes |
| View Payment Management | Yes | Yes | Yes | Yes |
| View Payments Made | Yes | Yes | Yes | Yes |
| Click agency row (navigate to Screen 2) | Yes | Yes | Yes | Yes |
| Filter / search | Yes | Yes | Yes | Yes |
| Sort columns | Yes | Yes | Yes | Yes |
| Park individual payment | No | Yes | Yes | Yes |
| Unpark individual payment | No | Yes | Yes | Yes |
| Bulk park payments | No | Yes | Yes | Yes |
| Bulk unpark payments | No | Yes | Yes | Yes |
| Initiate payment batch | No | No | Yes | Yes |
| Download invoice PDF | No | No | Yes | Yes |
| Reset demo data | No | No | No | Yes |

### 2.3 UI Treatment for Unauthorized Actions

**Rule (BR-01):** Action buttons for which the current user lacks permission MUST be hidden entirely (not rendered). They must NOT appear in a disabled state.

> **Source:** Orchestrator assumption

### 2.4 Authentication

- **Method:** Frontend-only role management via NextAuth.js
- **Backend interaction:** Backend does not require user context; all authenticated API calls succeed
- **Header requirement:** `POST /v1/payment-batches` requires `LastChangedUser` header with the user's name

> **Source:** Intake manifest, API spec

---

## 3. Functional Requirements

### 3.1 Screen 1: Dashboard

#### FR-DASH-01: Dashboard Data Fetching

| Field | Value |
|-------|-------|
| Endpoint | `GET /v1/payments/dashboard` |
| Response schema | `PaymentsDashboardRead` |
| Trigger | Page load; agency selection |
| Source | API spec, BRD Screen 1 |

The dashboard fetches all metrics from a single endpoint. When an agency is selected, the dashboard components update to reflect that agency's data (filtered from the `PaymentStatusReport`, `ParkedPaymentsAgingReport`, and `PaymentsByAgency` arrays).

#### FR-DASH-02: Payments Ready for Payment (Bar Chart)

| Field | Value |
|-------|-------|
| Data source | `PaymentStatusReport` items where payments are in READY state |
| Grouping | By `CommissionType` ("Bond Comm" and "Manual Payments") |
| Display | Bar chart showing payment counts per commission type |
| Source | BRD Screen 1, Component 1 |

#### FR-DASH-03: Parked Payments (Bar Chart)

| Field | Value |
|-------|-------|
| Data source | `PaymentStatusReport` items where payments are in PARKED state |
| Grouping | By `CommissionType` |
| Display | Bar chart showing payment counts per commission type |
| Source | BRD Screen 1, Component 2 |

#### FR-DASH-04: Total Value Ready for Payment

| Field | Value |
|-------|-------|
| Data source | `PaymentStatusReport` READY items |
| Calculation | Sum of `TotalPaymentAmount` for READY status items |
| Display | Single currency value formatted as ZAR |
| Source | BRD Screen 1, Component 3 |

#### FR-DASH-05: Total Value of Parked Payments

| Field | Value |
|-------|-------|
| Data source | `PaymentStatusReport` PARKED items |
| Calculation | Sum of `TotalPaymentAmount` for PARKED status items |
| Display | Single currency value formatted as ZAR |
| Source | BRD Screen 1, Component 4 |

#### FR-DASH-06: Parked Payments Aging Report

| Field | Value |
|-------|-------|
| Data source | `ParkedPaymentsAgingReport` array |
| Ranges | Hardcoded from backend: "1-3", "4-7", ">7" days |
| Display | Chart showing payment counts per aging range |
| Filtering | When agency selected, show only that agency's aging data |
| Source | BRD Screen 1, Component 5; Orchestrator assumption (ranges) |

#### FR-DASH-07: Total Value of Payments Made (Last 14 Days)

| Field | Value |
|-------|-------|
| Data source | `TotalPaymentCountInLast14Days` from dashboard response |
| Display | Single numeric value (payment count, not monetary) |
| Source | BRD Screen 1, Component 6 |

**Note:** The API field name says "Count" not "Value". The BRD says "Total Value" but the API returns a count. Display the count from the API. If the BRD intent was monetary value, this is an API limitation to flag.

#### FR-DASH-08: Agency Summary Grid

| Field | Value |
|-------|-------|
| Data source | `PaymentsByAgency` array from dashboard response |
| Columns | Agency Name, Payment Count, Total Commission Amount (ZAR), VAT (ZAR) |
| Row action | Clickable row navigates to Payment Management (Screen 2) filtered by that agency |
| Selection | Clicking a row also updates all dashboard charts for that agency |
| Default sort | By Agency Name ascending |
| Source | BRD Screen 1, "Dashboard Grid" section |

**Business Rule (BR-02):** Selecting an agency row updates the dashboard charts AND navigates on button/link click. The selection highlights the row. Navigation happens via an explicit button/link on the row.

> **Source:** BRD: "Each record is clickable (button on row), navigates to Screen 2"

#### FR-DASH-09: Agency Filter Reset

**Business Rule (BR-03):** The agency filter selection resets on page navigation. It does not persist when the user leaves the Dashboard and returns.

> **Source:** Orchestrator assumption

---

### 3.2 Screen 2: Payment Management

#### FR-PAY-01: Payment List Fetching

| Field | Value |
|-------|-------|
| Endpoint | `GET /v1/payments` |
| Query parameters | `ClaimDate` (ISO 8601: YYYY-MM-DD), `AgencyName` (case-insensitive substring), `Status` |
| Response schema | `PaymentReadList` (contains `PaymentList` array of `PaymentRead`) |
| Source | API spec, BRD Screen 2 |

#### FR-PAY-02: Main Grid (Ready Payments)

| Field | Value |
|-------|-------|
| Filter | Show only payments where `PaymentState` is not PARKED and not PROCESSED (i.e., READY state) |
| Columns | See column list below |
| Source | BRD Screen 2, "Main Grid" section |

**Main Grid Columns:**

| Column | API Field | Format | Source |
|--------|-----------|--------|--------|
| Agency Name | `AgencyName` | Text | BRD |
| Batch ID | `BatchId` | Integer (nullable) | BRD |
| Claim Date | `ClaimDate` | Date (YYYY-MM-DD) | BRD |
| Agent Name & Surname | `AgentName` + `AgentSurname` | Concatenated text | BRD, API schema |
| Bond Amount | `BondAmount` | ZAR currency | BRD |
| Commission Type | `CommissionType` | Text (Bond Comm, Manual Payments) | BRD |
| Commission % | Derived or displayed from data | Percentage format (e.g., 0.945%) | BRD |
| Grant Date | `GrantDate` | Date | BRD |
| Reg Date | `RegistrationDate` | Date | BRD |
| Bank | `Bank` | Text (ABSA, FNB, STD, NED) | BRD |
| Commission Amount | `CommissionAmount` | ZAR currency | BRD |
| VAT | `VAT` | ZAR currency | BRD |
| Status | `Status` | Text (REG, MAN-PAY) | BRD |

**Note:** The API schema for `PaymentRead` does not include a `CommissionPct` field. The dataset includes `CommissionPct` values. If the API does not return this field, the column should show "N/A" or be omitted. Implementation should check actual API response.

#### FR-PAY-03: Search / Filter Bar

| Field | Value |
|-------|-------|
| Filter fields | Claim Date (date picker), Agency Name (text input), Status (dropdown: REG, MAN-PAY) |
| Debounce | 300ms on text inputs |
| Behavior | Filters apply to API query parameters; re-fetches data from backend |
| Source | BRD Screen 2, "Search Bar"; Orchestrator assumption (debounce) |

**Business Rule (BR-04):** Filters trigger an API call with query parameters. ClaimDate is sent as ISO 8601 (YYYY-MM-DD). AgencyName is case-insensitive substring match (server-side). Status is exact match.

#### FR-PAY-04: Column Sorting

**Business Rule (BR-05):** All grid columns support client-side sorting. Default sort order is ClaimDate descending.

> **Source:** Orchestrator assumption

#### FR-PAY-05: Single Payment Parking

| Field | Value |
|-------|-------|
| Action | "Park" button on each row in Main Grid |
| Permission | STANDARD_USER, POWER_USER, ADMIN (hidden for READ_ONLY per BR-01) |
| Confirmation modal | Shows: Agent Name, Claim Date, Commission Amount |
| Modal text | "Are you sure you want to park this payment?" |
| API call | `PUT /v1/payments/park` with body `{ "PaymentIds": [id] }` |
| On success | Re-fetch payment list; payment moves to Parked Grid |
| Source | BRD Screen 2, "Single Payment Parking" |

#### FR-PAY-06: Bulk Payment Parking

| Field | Value |
|-------|-------|
| Action | Checkbox selection + "Park Selected" button |
| Permission | STANDARD_USER, POWER_USER, ADMIN |
| Confirmation modal | Shows: Number of payments, Total combined commission amount |
| API call | `PUT /v1/payments/park` with body `{ "PaymentIds": [id1, id2, ...] }` |
| On success | Re-fetch payment list |
| Source | BRD Screen 2, "Bulk Parking" |

#### FR-PAY-07: Parked Grid

| Field | Value |
|-------|-------|
| Filter | Show only payments where `PaymentState` is PARKED |
| Columns | Identical to Main Grid (FR-PAY-02) |
| Source | BRD Screen 2, "Parked Grid" |

#### FR-PAY-08: Single Payment Unparking

| Field | Value |
|-------|-------|
| Action | "Unpark" button on each row in Parked Grid |
| Permission | STANDARD_USER, POWER_USER, ADMIN |
| Confirmation modal | Shows: Agent Name, Claim Date, Commission Amount |
| Modal text | "Are you sure you want to unpark this payment?" |
| API call | `PUT /v1/payments/unpark` with body `{ "PaymentIds": [id] }` |
| On success | Re-fetch payment list; payment moves back to Main Grid |
| Source | BRD Screen 2, "Parked Grid Functions" |

#### FR-PAY-09: Bulk Payment Unparking

| Field | Value |
|-------|-------|
| Action | Checkbox selection + "Unpark Selected" button in Parked Grid |
| Permission | STANDARD_USER, POWER_USER, ADMIN |
| Confirmation modal | Shows: Number of payments, Total combined commission amount |
| API call | `PUT /v1/payments/unpark` with body `{ "PaymentIds": [id1, id2, ...] }` |
| On success | Re-fetch payment list |
| Source | BRD Screen 2, "Parked Grid Functions" |

#### FR-PAY-10: Partial Failure Handling for Park/Unpark

**Business Rule (BR-06):** If a bulk park or unpark operation partially fails, the UI must display an error message listing which specific payments failed. Payments that succeeded are still updated (moved). The UI must re-fetch data after the operation to reflect the current state.

> **Source:** Orchestrator assumption

#### FR-PAY-11: Initiate Payment Batch

| Field | Value |
|-------|-------|
| Action | "Initiate Payment" button |
| Permission | POWER_USER, ADMIN only (hidden for READ_ONLY and STANDARD_USER per BR-01) |
| Scope | All payments currently in the Main Grid (READY state) for the selected agency |
| Confirmation modal | Shows: Number of payments, Total value of payments (sum of CommissionAmount) |
| API call | `POST /v1/payment-batches` with body `{ "PaymentIds": [...] }` and header `LastChangedUser: <username>` |
| Response | `DefaultResponse` (contains batch ID in `Id` field) |
| On success | Show success confirmation modal, then re-fetch payment list (processed payments removed from Main Grid) |
| Source | BRD Screen 2, "Initiate Payment" |

**Business Rule (BR-07):** After batch creation, an invoice is generated server-side. The frontend shows a success modal confirming the payment has been processed. Processed payments are removed from the Main Grid on re-fetch.

**Business Rule (BR-08):** There is no maximum batch size limit for the POC.

> **Source:** Orchestrator assumption

#### FR-PAY-12: Post-Mutation Data Refresh

**Business Rule (BR-09):** After any mutation operation (park, unpark, batch creation), the frontend must re-fetch data from the API to ensure the UI reflects the current state. Do not optimistically update local state.

> **Source:** Orchestrator assumption

#### FR-PAY-13: No Pagination

**Business Rule (BR-10):** No pagination is required for the POC. All records (~100) are loaded in a single API call.

> **Source:** Orchestrator assumption

---

### 3.3 Screen 3: Payments Made

#### FR-MADE-01: Payment Batches List Fetching

| Field | Value |
|-------|-------|
| Endpoint | `GET /v1/payment-batches` |
| Query parameters | `Reference` (batch reference string), `AgencyName` (case-insensitive substring) |
| Response schema | `PaymentBatchReadList` (contains `PaymentBatchList` array of `PaymentBatchRead`) |
| Source | API spec, BRD Screen 3 |

#### FR-MADE-02: Payments Made Grid

| Field | Value |
|-------|-------|
| Columns | See column list below |
| Default sort | CreatedDate descending |
| Source | BRD Screen 3 |

**Grid Columns:**

| Column | API Field | Format | Source |
|--------|-----------|--------|--------|
| Agency Name | `AgencyName` | Text | BRD |
| Batch Reference | `Reference` | Text | API schema |
| Number of Payments | `PaymentCount` | Integer | BRD |
| Total Commission Amount | `TotalCommissionAmount` | ZAR currency | BRD |
| VAT | `TotalVat` | ZAR currency | BRD |
| Created Date | `CreatedDate` | Date | API schema |
| Created By | `LastChangedUser` | Text | API schema |
| Invoice Link | Action button | Download PDF | BRD |

#### FR-MADE-03: Search / Filter Bar

| Field | Value |
|-------|-------|
| Filter fields | Agency Name (text input), Batch Reference (text input) |
| Debounce | 300ms on text inputs |
| Behavior | Filters apply to API query parameters; re-fetches data from backend |
| Source | BRD Screen 3, "Search bar for filtering by Agency Name or Batch ID" |

**Note:** BRD says "Batch ID" but the API query parameter is `Reference` (string). Use the `Reference` parameter.

#### FR-MADE-04: Invoice Download

| Field | Value |
|-------|-------|
| Action | "Download Invoice" / "View Invoice" link per batch row |
| Permission | POWER_USER, ADMIN only (hidden for others per BR-01) |
| API call | `POST /v1/payment-batches/{Id}/download-invoice-pdf` |
| Response | `application/octet-stream` (PDF binary data, returned immediately) |
| Behavior | Trigger browser file download with filename derived from batch reference |
| Source | BRD Screen 3; API spec |

#### FR-MADE-05: Column Sorting

All grid columns support client-side sorting. Default sort by CreatedDate descending.

> **Source:** Orchestrator assumption (consistent with FR-PAY-04)

---

## 4. Data Model & Relationships

### 4.1 Core Entities

#### PaymentRead

| Field | Type | Nullable | Description | Source |
|-------|------|----------|-------------|--------|
| Id | integer | No | Unique payment identifier | API spec |
| Reference | string | Yes | Payment reference | API spec |
| AgencyName | string | No | Name of the bond agency | API spec |
| ClaimDate | string | No | Date of claim (ISO 8601) | API spec |
| AgentName | string | No | Agent first name | API spec |
| AgentSurname | string | Yes | Agent surname | API spec |
| LastChangedUser | string | Yes | Last user to modify | API spec |
| LastChangedDate | string | Yes | Last modification date | API spec |
| BondAmount | number | No | Bond amount in ZAR | API spec |
| CommissionType | string | No | "Bond Comm" or "Manual Payments" | API spec, Dataset |
| GrantDate | string | Yes | Grant date | API spec |
| RegistrationDate | string | Yes | Registration date | API spec |
| Bank | string | No | Bank code (ABSA, FNB, STD, NED) | API spec, Dataset |
| CommissionAmount | number | No | Commission amount in ZAR | API spec |
| VAT | number | No | VAT amount in ZAR | API spec |
| Status | string | No | Status code: REG or MAN-PAY | API spec, Dataset |
| BatchId | integer | Yes | Associated batch ID (null if not processed) | API spec |

**Note:** The `PaymentState` field (READY, PARKED, PROCESSED) is present in the dataset but NOT in the API `PaymentRead` schema. The API uses `Status` for the status code (REG/MAN-PAY). Filtering by payment state may need to rely on the `Status` query parameter or a separate mechanism. Implementation must verify how the backend differentiates READY vs PARKED vs PROCESSED payments.

> **Source:** API spec `PaymentRead` schema; Dataset "Payments" table

#### PaymentBatchRead

| Field | Type | Nullable | Description | Source |
|-------|------|----------|-------------|--------|
| Id | integer | No | Unique batch identifier | API spec |
| CreatedDate | string | No | Batch creation date | API spec |
| Status | string | No | Batch status | API spec |
| Reference | string | No | Batch reference (e.g., BB202511-391) | API spec, Dataset |
| LastChangedUser | string | No | User who created the batch | API spec |
| AgencyName | string | No | Agency name | API spec |
| PaymentCount | integer | No | Number of payments in batch | API spec |
| TotalCommissionAmount | number | No | Total commission in ZAR | API spec |
| TotalVat | number | No | Total VAT in ZAR | API spec |

> **Source:** API spec `PaymentBatchRead` schema

#### PaymentsDashboardRead

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| PaymentStatusReport | PaymentStatusReportItem[] | Payment counts and amounts by status/agency/type | API spec |
| ParkedPaymentsAgingReport | ParkedPaymentsAgingReportItem[] | Aging ranges for parked payments | API spec |
| TotalPaymentCountInLast14Days | integer | Count of payments processed in last 14 days | API spec |
| PaymentsByAgency | PaymentsByAgencyReportItem[] | Aggregated data per agency | API spec |

### 4.2 Relationships

**Business Rule (BR-11):** A payment belongs to at most one batch (one-to-one). The `BatchId` field on `PaymentRead` is null for unpaid payments (READY or PARKED state) and populated for PROCESSED payments.

> **Source:** Orchestrator assumption

### 4.3 Payment State Model

| State | Description | BatchId | Visible On |
|-------|-------------|---------|------------|
| READY | Awaiting processing | null | Dashboard, Payment Management (Main Grid) |
| PARKED | Temporarily held | null | Dashboard (parked metrics), Payment Management (Parked Grid) |
| PROCESSED | Payment batch created | non-null | Payments Made |

> **Source:** BRD (all screens), Dataset (PaymentState column)

### 4.4 Currency Formatting

**Business Rule (BR-12):** All monetary values must be formatted using South African locale (en-ZA):
- Symbol: R (Rand)
- Thousands separator: Space
- Decimal separator: Comma
- Format example: R 1 234 567,89
- Implementation: Use `Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })`

> **Source:** Dataset header, Intake manifest

---

## 5. API Contracts & Integration Points

### 5.1 Base Configuration

| Setting | Value | Source |
|---------|-------|--------|
| Base URL | `http://localhost:8042` | API spec `servers` block |
| Authentication | Bearer token via NextAuth.js | Intake manifest |
| Content-Type | `application/json` (except PDF download) | API spec |
| CORS | Backend supports CORS for localhost | Orchestrator assumption |

### 5.2 Endpoint Summary

#### Payments

| Operation | Method | Path | Query Params | Request Body | Response | Source |
|-----------|--------|------|-------------|--------------|----------|--------|
| List payments | GET | `/v1/payments` | ClaimDate, AgencyName, Status | - | `PaymentReadList` | API spec |
| Get payment | GET | `/v1/payments/{Id}` | - | - | `PaymentRead` | API spec |
| Park payments | PUT | `/v1/payments/park` | - | `{ PaymentIds: int[] }` | 200 (empty) | API spec |
| Unpark payments | PUT | `/v1/payments/unpark` | - | `{ PaymentIds: int[] }` | 200 (empty) | API spec |
| Dashboard | GET | `/v1/payments/dashboard` | - | - | `PaymentsDashboardRead` | API spec |

#### Payment Batches

| Operation | Method | Path | Query Params | Request Body | Headers | Response | Source |
|-----------|--------|------|-------------|--------------|---------|----------|--------|
| List batches | GET | `/v1/payment-batches` | Reference, AgencyName | - | - | `PaymentBatchReadList` | API spec |
| Get batch | GET | `/v1/payment-batches/{Id}` | - | - | - | `PaymentBatchRead` | API spec |
| Create batch | POST | `/v1/payment-batches` | - | `{ PaymentIds: int[] }` | `LastChangedUser: string` (required) | `DefaultResponse` | API spec |
| Download invoice | POST | `/v1/payment-batches/{Id}/download-invoice-pdf` | - | - | - | `application/octet-stream` (PDF) | API spec |

#### Demo

| Operation | Method | Path | Response | Source |
|-----------|--------|------|----------|--------|
| Reset demo | POST | `/demo/reset-demo` | 200 (empty) | API spec |

### 5.3 Query Parameter Formats

| Parameter | Format | Example | Source |
|-----------|--------|---------|--------|
| ClaimDate | ISO 8601 date | `2025-11-06` | Orchestrator assumption |
| AgencyName | Case-insensitive substring | `pam` matches "Pam Golding" | Orchestrator assumption |
| Status | Exact match string | `REG` or `MAN-PAY` | Dataset |
| Reference | String match | `BB202511-391` | API spec |

### 5.4 Error Response Schema

The `DefaultResponse` schema is used for error responses:

```
{
  "Id": integer,
  "MessageType": string,
  "Messages": string[]
}
```

### 5.5 HTTP Status Codes

| Code | Meaning | Source |
|------|---------|--------|
| 200 | Success | API spec |
| 400 | Bad Request (validation errors) | Orchestrator assumption |
| 401 | Unauthorized | API spec |
| 404 | Not Found | API spec |
| 500 | Internal Server Error | API spec |

---

## 6. Error Handling & Edge Cases

### 6.1 Network Errors

**Business Rule (BR-13):** Network failures (connection refused, timeout, etc.) display an error toast notification with a "Retry" action button. The toast should include a human-readable message such as "Unable to connect to server. Please try again."

> **Source:** Orchestrator assumption

### 6.2 API Error Responses

| Scenario | Handling | Source |
|----------|----------|--------|
| 400 Bad Request | Display validation error messages from `DefaultResponse.Messages` array | Orchestrator assumption |
| 401 Unauthorized | Redirect to login / show authentication error | API spec |
| 404 Not Found | Display "Resource not found" toast | Orchestrator assumption |
| 500 Internal Server Error | Display error toast with "Retry" action; show message from `DefaultResponse.Messages` if available | API spec, Orchestrator assumption |

### 6.3 Partial Failure (Park/Unpark)

**Covered by BR-06 (FR-PAY-10):** Show error listing failed payments; successful ones still update. Re-fetch data after operation.

### 6.4 Invoice Download Failure

**Business Rule (BR-14):** If invoice PDF download fails (non-200 response), display an error toast notification with a "Retry" button that re-attempts the download.

> **Source:** Orchestrator assumption

### 6.5 Empty States

| Screen | Empty State | Source |
|--------|-------------|--------|
| Dashboard - No data | Show dashboard structure with zero values and empty grid | Implied |
| Payment Management - No READY payments | Show empty Main Grid with message "No payments ready for processing" | Implied |
| Payment Management - No PARKED payments | Show empty Parked Grid with message "No parked payments" | Implied |
| Payments Made - No batches | Show empty grid with message "No payment batches found" | Implied |
| Search returns no results | Show empty grid with message "No results match your filter criteria" | Implied |

### 6.6 Concurrent Operations

**Business Rule (BR-15):** Concurrent editing is not handled in the POC. Last-write-wins semantics apply. If two users modify the same payment simultaneously, the last operation persisted by the backend takes effect.

> **Source:** Orchestrator assumption

### 6.7 Stale State Prevention

**Covered by BR-09 (FR-PAY-12):** Always re-fetch data after mutations. Do not rely on optimistic updates.

---

## 7. Performance & Security Considerations

### 7.1 Performance

| Consideration | Requirement | Source |
|---------------|-------------|--------|
| Performance targets | None specified for POC | Orchestrator assumption |
| Data volume | ~100 payment records; all loaded at once | Orchestrator assumption, Dataset |
| Pagination | Not required | Orchestrator assumption (BR-10) |
| Input debouncing | 300ms delay on search/filter text inputs | Orchestrator assumption |
| Client-side sorting | All grid columns sortable locally (no API call) | Orchestrator assumption (BR-05) |

### 7.2 Security

| Consideration | Requirement | Source |
|---------------|-------------|--------|
| Authentication | Bearer token via NextAuth.js | Intake manifest |
| Authorization | Frontend-only role enforcement; backend does not validate roles | Intake manifest |
| CORS | Backend supports CORS for localhost development | Orchestrator assumption |
| Audit logging | Backend responsibility; not implemented in frontend | Orchestrator assumption |
| Input sanitization | No frontend validation beyond what API enforces | Orchestrator assumption |
| Sensitive data | Banking details visible in dataset but not exposed in payment API responses | API spec review |

### 7.3 Browser Support

Modern browsers only (Chrome, Firefox, Safari, Edge latest). No specific version requirements.

> **Source:** Orchestrator assumption

---

## 8. Acceptance Criteria

### 8.1 Dashboard Screen

| ID | Criterion | Source |
|----|-----------|--------|
| AC-DASH-01 | Dashboard loads and displays all 6 metric components with data from `/v1/payments/dashboard` | BRD Screen 1 |
| AC-DASH-02 | Agency Summary Grid shows all agencies with payment count, commission total, and VAT | BRD Screen 1 |
| AC-DASH-03 | Clicking an agency row updates all dashboard charts to reflect that agency's metrics | BRD Screen 1 |
| AC-DASH-04 | Clicking the navigate button on an agency row navigates to Payment Management filtered for that agency | BRD Screen 1 |
| AC-DASH-05 | Bar charts correctly split data by Commission Type (Bond Comm / Manual Payments) | BRD Screen 1 |
| AC-DASH-06 | Aging report shows data in ranges: 1-3, 4-7, >7 days | BRD Screen 1, Orchestrator assumption |
| AC-DASH-07 | All monetary values display in ZAR format (R x xxx,xx) | BR-12 |

### 8.2 Payment Management Screen

| ID | Criterion | Source |
|----|-----------|--------|
| AC-PAY-01 | Main Grid displays all READY payments with correct columns | BRD Screen 2 |
| AC-PAY-02 | Parked Grid displays all PARKED payments with identical columns | BRD Screen 2 |
| AC-PAY-03 | Search filters (Claim Date, Agency Name, Status) filter payments via API query parameters | BRD Screen 2 |
| AC-PAY-04 | Single park: clicking "Park" shows confirmation modal with agent details, confirming calls API and moves payment to Parked Grid | BRD Screen 2 |
| AC-PAY-05 | Bulk park: selecting multiple payments and clicking "Park Selected" shows count and total, confirming calls API | BRD Screen 2 |
| AC-PAY-06 | Single unpark: clicking "Unpark" shows confirmation, confirming calls API and moves payment to Main Grid | BRD Screen 2 |
| AC-PAY-07 | Bulk unpark: selecting and confirming moves payments back to Main Grid | BRD Screen 2 |
| AC-PAY-08 | "Initiate Payment" creates a batch via API with all READY payments, shows success confirmation | BRD Screen 2 |
| AC-PAY-09 | After batch creation, processed payments no longer appear in Main Grid | BRD Screen 2 |
| AC-PAY-10 | Partial park/unpark failure shows error listing which payments failed | BR-06 |
| AC-PAY-11 | Default sort is ClaimDate descending; all columns are sortable | BR-05 |
| AC-PAY-12 | READ_ONLY users cannot see Park/Unpark/Initiate Payment buttons | BR-01 |
| AC-PAY-13 | STANDARD_USER cannot see Initiate Payment button | Permission matrix |

### 8.3 Payments Made Screen

| ID | Criterion | Source |
|----|-----------|--------|
| AC-MADE-01 | Grid displays all payment batches with agency, reference, count, total, VAT, date, creator | BRD Screen 3 |
| AC-MADE-02 | Search filters by Agency Name and Batch Reference via API query parameters | BRD Screen 3 |
| AC-MADE-03 | Invoice download link triggers PDF download from API | BRD Screen 3 |
| AC-MADE-04 | Invoice download failure shows error toast with retry button | BR-14 |
| AC-MADE-05 | Invoice totals match sum of individual payment amounts in the batch | SC-08 |
| AC-MADE-06 | READ_ONLY and STANDARD_USER cannot see invoice download links | Permission matrix |

### 8.4 Cross-Cutting

| ID | Criterion | Source |
|----|-----------|--------|
| AC-CROSS-01 | All API calls use the centralized API client (`@/lib/api/client.ts`), never raw `fetch()` | CLAUDE.md |
| AC-CROSS-02 | All monetary values formatted in en-ZA locale (R x xxx,xx) | BR-12 |
| AC-CROSS-03 | Network errors show toast with retry action | BR-13 |
| AC-CROSS-04 | Data refreshes after every mutation | BR-09 |
| AC-CROSS-05 | Filter state resets on page navigation | BR-03 |
| AC-CROSS-06 | 300ms debounce on all text filter inputs | Orchestrator assumption |
| AC-CROSS-07 | Unauthorized action buttons are hidden, not disabled | BR-01 |

---

## 9. Appendix: Traceability Matrix

### 9.1 Source Documents

| Abbreviation | Document | Path |
|--------------|----------|------|
| BRD | BetterBond Commission Payments POC | `/c/git/better-bond-3/documentation/BetterBond-Commission-Payments-POC-002.md` |
| API | OpenAPI 3.0.3 Specification | `/c/git/better-bond-3/documentation/Api Definition.yaml` |
| DS | Sample Dataset | `/c/git/better-bond-3/documentation/dataset.md` |
| IM | Intake Manifest | `/c/git/better-bond-3/generated-docs/context/intake-manifest.json` |
| OA | Orchestrator Assumptions | User answers provided during BRD review |

### 9.2 Business Rules Summary

| Rule ID | Description | Source |
|---------|-------------|--------|
| BR-01 | Unauthorized action buttons hidden entirely (not disabled) | OA |
| BR-02 | Agency row selection updates charts; explicit button navigates to Screen 2 | BRD Screen 1 |
| BR-03 | Agency filter resets on page navigation | OA |
| BR-04 | Filters trigger API calls with formatted query parameters | BRD Screen 2, OA |
| BR-05 | Client-side sorting on all columns; default ClaimDate descending | OA |
| BR-06 | Partial park/unpark failure: show error for failed items, successful items still updated | OA |
| BR-07 | Invoice generated server-side after batch creation; show success modal | BRD Screen 2 |
| BR-08 | No maximum batch size limit | OA |
| BR-09 | Re-fetch data after every mutation (no optimistic updates) | OA |
| BR-10 | No pagination; load all records | OA |
| BR-11 | Payment-to-batch: one-to-one (at most one batch per payment) | OA |
| BR-12 | ZAR formatting: R space-separated thousands, comma decimals (en-ZA) | DS, IM |
| BR-13 | Network failures: error toast with retry action | OA |
| BR-14 | Invoice download failure: error toast with retry button | OA |
| BR-15 | Concurrent operations: last-write-wins, not handled in POC | OA |

### 9.3 Open Questions / Implementation Notes

| ID | Item | Status |
|----|------|--------|
| OQ-01 | API `PaymentRead` schema does not include `CommissionPct` field but BRD and dataset reference it. Check if API returns it in practice. | Verify during implementation |
| OQ-02 | API `PaymentRead` schema does not include `PaymentState` field (READY/PARKED/PROCESSED). Determine how backend communicates payment state. Likely via the `Status` query parameter or separate filtering logic. | Verify during implementation |
| OQ-03 | Dashboard `TotalPaymentCountInLast14Days` is a count, but BRD says "Total Value". Clarify intent with stakeholders. | Display count from API |
| OQ-04 | `POST /v1/payment-batches` returns `DefaultResponse` (not `PaymentBatchRead`). The `Id` field in `DefaultResponse` should contain the new batch ID. | Verify during implementation |
