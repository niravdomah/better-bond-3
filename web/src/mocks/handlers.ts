/**
 * MSW Mock Handlers
 *
 * AUTO-GENERATED from generated-docs/specs/api-spec.yaml
 * by mock-setup-agent. Editable — /api-mock-refresh does smart
 * partial updates and will not overwrite handlers you have
 * customised, as long as the endpoint signature is unchanged.
 *
 * Regenerate with: /api-mock-refresh
 */

import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/lib/utils/constants';
import type {
  PaymentRead,
  PaymentReadList,
  PaymentBatchRead,
  PaymentBatchReadList,
  PaymentsDashboardRead,
} from '@/types/api-generated';
import type { DefaultResponse } from '@/types/api';

// --- Sample Payment Data (from dataset) ---

const readyPayments: PaymentRead[] = [
  {
    Id: 10001,
    Reference: 'PAY-10001',
    AgencyName: 'RE/MAX',
    ClaimDate: '2025-11-10',
    AgentName: 'Johan',
    AgentSurname: 'Molefe',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-10',
    BondAmount: 1402808.47,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-10-21',
    RegistrationDate: '2025-10-22',
    Bank: 'ABSA',
    CommissionAmount: 14575.18,
    VAT: 2186.28,
    Status: 'REG',
    BatchId: null,
  },
  {
    Id: 10003,
    Reference: 'PAY-10003',
    AgencyName: 'RE/MAX',
    ClaimDate: '2025-11-06',
    AgentName: 'Ayesha',
    AgentSurname: 'Moore',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-06',
    BondAmount: 3074686.61,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-10-20',
    RegistrationDate: '2025-10-29',
    Bank: 'NED',
    CommissionAmount: 19524.26,
    VAT: 2928.64,
    Status: 'REG',
    BatchId: null,
  },
  {
    Id: 10004,
    Reference: 'PAY-10004',
    AgencyName: 'RE/MAX',
    ClaimDate: '2025-11-04',
    AgentName: 'Ayesha',
    AgentSurname: 'Moore',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-04',
    BondAmount: 1727298.65,
    CommissionType: 'Manual Payments',
    GrantDate: '2025-10-30',
    RegistrationDate: '2025-11-09',
    Bank: 'ABSA',
    CommissionAmount: 16599.34,
    VAT: 2489.9,
    Status: 'MAN-PAY',
    BatchId: null,
  },
  {
    Id: 10015,
    Reference: 'PAY-10015',
    AgencyName: 'Pam Golding',
    ClaimDate: '2025-11-11',
    AgentName: 'Dineo',
    AgentSurname: 'Mthembu',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-11',
    BondAmount: 689606.22,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-11-05',
    RegistrationDate: '2025-11-10',
    Bank: 'ABSA',
    CommissionAmount: 6654.7,
    VAT: 998.2,
    Status: 'REG',
    BatchId: null,
  },
  {
    Id: 10060,
    Reference: 'PAY-10060',
    AgencyName: 'Just Property',
    ClaimDate: '2025-11-09',
    AgentName: 'Jason',
    AgentSurname: 'Meyer',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-09',
    BondAmount: 1852185.42,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-10-31',
    RegistrationDate: '2025-10-31',
    Bank: 'ABSA',
    CommissionAmount: 20077.69,
    VAT: 3011.65,
    Status: 'REG',
    BatchId: null,
  },
];

const parkedPayments: PaymentRead[] = [
  {
    Id: 10009,
    Reference: 'PAY-10009',
    AgencyName: 'RE/MAX',
    ClaimDate: '2025-11-10',
    AgentName: 'Michael',
    AgentSurname: 'Meyer',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-10',
    BondAmount: 1034661.23,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-10-22',
    RegistrationDate: '2025-10-25',
    Bank: 'ABSA',
    CommissionAmount: 8887.74,
    VAT: 1333.16,
    Status: 'REG',
    BatchId: null,
  },
  {
    Id: 10020,
    Reference: 'PAY-10020',
    AgencyName: 'Pam Golding',
    ClaimDate: '2025-11-11',
    AgentName: 'Dineo',
    AgentSurname: 'Mthembu',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-11',
    BondAmount: 1881243.68,
    CommissionType: 'Bond Comm',
    GrantDate: '2025-10-15',
    RegistrationDate: '2025-10-22',
    Bank: 'FNB',
    CommissionAmount: 12660.77,
    VAT: 1899.12,
    Status: 'REG',
    BatchId: null,
  },
  {
    Id: 10097,
    Reference: 'PAY-10097',
    AgencyName: 'Chas Everitt',
    ClaimDate: '2025-11-11',
    AgentName: 'Jason',
    AgentSurname: 'Govender',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-11',
    BondAmount: 1240396.01,
    CommissionType: 'Manual Payments',
    GrantDate: '2025-10-26',
    RegistrationDate: '2025-10-31',
    Bank: 'ABSA',
    CommissionAmount: 9960.38,
    VAT: 1494.06,
    Status: 'MAN-PAY',
    BatchId: null,
  },
];

const processedPayments: PaymentRead[] = [
  {
    Id: 10013,
    Reference: 'PAY-10013',
    AgencyName: 'RE/MAX',
    ClaimDate: '2025-11-06',
    AgentName: 'Michael',
    AgentSurname: 'Meyer',
    LastChangedUser: 'System',
    LastChangedDate: '2025-11-06',
    BondAmount: 1807408.33,
    CommissionType: 'Manual Payments',
    GrantDate: '2025-10-20',
    RegistrationDate: '2025-10-23',
    Bank: 'STD',
    CommissionAmount: 13013.34,
    VAT: 1952.0,
    Status: 'MAN-PAY',
    BatchId: 1,
  },
];

const allPayments: PaymentRead[] = [
  ...readyPayments,
  ...parkedPayments,
  ...processedPayments,
];

// --- Sample Batch Data ---

const paymentBatches: PaymentBatchRead[] = [
  {
    Id: 1,
    CreatedDate: '2025-11-06',
    Status: 'PROCESSED',
    Reference: 'BB202511-165',
    LastChangedUser: 'Admin User',
    AgencyName: 'RE/MAX',
    PaymentCount: 1,
    TotalCommissionAmount: 13013.34,
    TotalVat: 1952.0,
  },
  {
    Id: 2,
    CreatedDate: '2025-11-01',
    Status: 'PROCESSED',
    Reference: 'BB202511-533',
    LastChangedUser: 'Admin User',
    AgencyName: 'RE/MAX',
    PaymentCount: 1,
    TotalCommissionAmount: 10277.69,
    TotalVat: 1541.65,
  },
  {
    Id: 3,
    CreatedDate: '2025-11-09',
    Status: 'PROCESSED',
    Reference: 'BB202511-902',
    LastChangedUser: 'Power User',
    AgencyName: 'Pam Golding',
    PaymentCount: 1,
    TotalCommissionAmount: 6919.81,
    TotalVat: 1037.97,
  },
  {
    Id: 4,
    CreatedDate: '2025-10-31',
    Status: 'PROCESSED',
    Reference: 'BB202511-693',
    LastChangedUser: 'Power User',
    AgencyName: 'Pam Golding',
    PaymentCount: 1,
    TotalCommissionAmount: 20054.31,
    TotalVat: 3008.15,
  },
];

// --- Dashboard Data ---

const dashboardData: PaymentsDashboardRead = {
  PaymentStatusReport: [
    {
      Status: 'READY',
      PaymentCount: 15,
      TotalPaymentAmount: 198543.21,
      CommissionType: 'Bond Comm',
      AgencyName: 'RE/MAX',
    },
    {
      Status: 'READY',
      PaymentCount: 12,
      TotalPaymentAmount: 156234.89,
      CommissionType: 'Manual Payments',
      AgencyName: 'RE/MAX',
    },
    {
      Status: 'PARKED',
      PaymentCount: 8,
      TotalPaymentAmount: 87654.32,
      CommissionType: 'Bond Comm',
      AgencyName: 'RE/MAX',
    },
    {
      Status: 'PARKED',
      PaymentCount: 5,
      TotalPaymentAmount: 45321.67,
      CommissionType: 'Manual Payments',
      AgencyName: 'RE/MAX',
    },
    {
      Status: 'READY',
      PaymentCount: 10,
      TotalPaymentAmount: 145678.45,
      CommissionType: 'Bond Comm',
      AgencyName: 'Pam Golding',
    },
    {
      Status: 'READY',
      PaymentCount: 6,
      TotalPaymentAmount: 89234.56,
      CommissionType: 'Manual Payments',
      AgencyName: 'Pam Golding',
    },
    {
      Status: 'PARKED',
      PaymentCount: 7,
      TotalPaymentAmount: 73503.94,
      CommissionType: 'Bond Comm',
      AgencyName: 'Pam Golding',
    },
    {
      Status: 'READY',
      PaymentCount: 8,
      TotalPaymentAmount: 110453.86,
      CommissionType: 'Bond Comm',
      AgencyName: 'Harcourts',
    },
    {
      Status: 'READY',
      PaymentCount: 4,
      TotalPaymentAmount: 26931.12,
      CommissionType: 'Manual Payments',
      AgencyName: 'Harcourts',
    },
    {
      Status: 'PARKED',
      PaymentCount: 4,
      TotalPaymentAmount: 32879.15,
      CommissionType: 'Bond Comm',
      AgencyName: 'Harcourts',
    },
  ],
  ParkedPaymentsAgingReport: [
    { Range: '1-3', AgencyName: 'RE/MAX', PaymentCount: 3 },
    { Range: '4-7', AgencyName: 'RE/MAX', PaymentCount: 2 },
    { Range: '>7', AgencyName: 'RE/MAX', PaymentCount: 1 },
    { Range: '1-3', AgencyName: 'Pam Golding', PaymentCount: 2 },
    { Range: '4-7', AgencyName: 'Pam Golding', PaymentCount: 3 },
    { Range: '>7', AgencyName: 'Pam Golding', PaymentCount: 2 },
    { Range: '1-3', AgencyName: 'Harcourts', PaymentCount: 1 },
    { Range: '4-7', AgencyName: 'Harcourts', PaymentCount: 2 },
    { Range: '>7', AgencyName: 'Harcourts', PaymentCount: 1 },
    { Range: '1-3', AgencyName: 'Chas Everitt', PaymentCount: 2 },
    { Range: '4-7', AgencyName: 'Chas Everitt', PaymentCount: 1 },
    { Range: '>7', AgencyName: 'Chas Everitt', PaymentCount: 2 },
  ],
  TotalPaymentCountInLast14Days: 12,
  PaymentsByAgency: [
    {
      AgencyName: 'RE/MAX',
      PaymentCount: 6,
      TotalCommissionCount: 99616.22,
      Vat: 14942.39,
    },
    {
      AgencyName: 'Pam Golding',
      PaymentCount: 5,
      TotalCommissionCount: 61475.38,
      Vat: 9222.72,
    },
    {
      AgencyName: 'Seeff',
      PaymentCount: 4,
      TotalCommissionCount: 48234.12,
      Vat: 7235.02,
    },
    {
      AgencyName: 'Rawson',
      PaymentCount: 4,
      TotalCommissionCount: 52345.67,
      Vat: 7851.85,
    },
    {
      AgencyName: 'Just Property',
      PaymentCount: 6,
      TotalCommissionCount: 76996.48,
      Vat: 11549.46,
    },
    {
      AgencyName: 'Harcourts',
      PaymentCount: 8,
      TotalCommissionCount: 110621.84,
      Vat: 16593.11,
    },
    {
      AgencyName: 'Chas Everitt',
      PaymentCount: 6,
      TotalCommissionCount: 82883.92,
      Vat: 12432.55,
    },
    {
      AgencyName: 'Jawitz Properties',
      PaymentCount: 8,
      TotalCommissionCount: 95851.38,
      Vat: 14377.0,
    },
    {
      AgencyName: 'Tyson Properties',
      PaymentCount: 3,
      TotalCommissionCount: 34567.89,
      Vat: 5185.18,
    },
    {
      AgencyName: "Lew Geffen Sotheby's",
      PaymentCount: 8,
      TotalCommissionCount: 72381.61,
      Vat: 10857.23,
    },
  ],
};

// --- Handlers ---

let nextBatchId = 5;

export const handlers = [
  // GET /v1/payments - List all payments
  http.get(`${API_BASE_URL}/v1/payments`, ({ request }) => {
    const url = new URL(request.url);
    const claimDate = url.searchParams.get('ClaimDate');
    const agencyName = url.searchParams.get('AgencyName');
    const status = url.searchParams.get('Status');

    let filtered = [...allPayments];

    if (claimDate) {
      filtered = filtered.filter((p) => p.ClaimDate === claimDate);
    }
    if (agencyName) {
      filtered = filtered.filter((p) =>
        (p.AgencyName ?? '').toLowerCase().includes(agencyName.toLowerCase()),
      );
    }
    if (status) {
      filtered = filtered.filter((p) => p.Status === status);
    }

    const response: PaymentReadList = { PaymentList: filtered };
    return HttpResponse.json(response);
  }),

  // GET /v1/payments/:id - Get single payment
  http.get(`${API_BASE_URL}/v1/payments/:id`, ({ params }) => {
    const id = Number(params.id);
    const payment = allPayments.find((p) => p.Id === id);

    if (!payment) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(payment);
  }),

  // PUT /v1/payments/park - Park payments
  http.put(`${API_BASE_URL}/v1/payments/park`, async ({ request }) => {
    const body = (await request.json()) as { PaymentIds?: number[] };
    if (body.PaymentIds && body.PaymentIds.length > 0) {
      return new HttpResponse(null, { status: 200 });
    }
    return new HttpResponse(null, { status: 200 });
  }),

  // PUT /v1/payments/unpark - Unpark payments
  http.put(`${API_BASE_URL}/v1/payments/unpark`, async ({ request }) => {
    const body = (await request.json()) as { PaymentIds?: number[] };
    if (body.PaymentIds && body.PaymentIds.length > 0) {
      return new HttpResponse(null, { status: 200 });
    }
    return new HttpResponse(null, { status: 200 });
  }),

  // GET /v1/payments/dashboard - Dashboard data
  http.get(`${API_BASE_URL}/v1/payments/dashboard`, () => {
    return HttpResponse.json(dashboardData);
  }),

  // GET /v1/payment-batches - List all batches
  http.get(`${API_BASE_URL}/v1/payment-batches`, ({ request }) => {
    const url = new URL(request.url);
    const reference = url.searchParams.get('Reference');
    const agencyName = url.searchParams.get('AgencyName');

    let filtered = [...paymentBatches];

    if (reference) {
      filtered = filtered.filter((b) =>
        (b.Reference ?? '').toLowerCase().includes(reference.toLowerCase()),
      );
    }
    if (agencyName) {
      filtered = filtered.filter((b) =>
        (b.AgencyName ?? '').toLowerCase().includes(agencyName.toLowerCase()),
      );
    }

    const response: PaymentBatchReadList = { PaymentBatchList: filtered };
    return HttpResponse.json(response);
  }),

  // GET /v1/payment-batches/:id - Get single batch
  http.get(`${API_BASE_URL}/v1/payment-batches/:id`, ({ params }) => {
    const id = Number(params.id);
    const batch = paymentBatches.find((b) => b.Id === id);

    if (!batch) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(batch);
  }),

  // POST /v1/payment-batches - Create batch
  http.post(`${API_BASE_URL}/v1/payment-batches`, async () => {
    const response: DefaultResponse = {
      Id: nextBatchId++,
      MessageType: 'SUCCESS',
      Messages: ['Payment batch created successfully'],
    };
    return HttpResponse.json(response);
  }),

  // POST /v1/payment-batches/:id/download-invoice-pdf - Download invoice
  http.post(
    `${API_BASE_URL}/v1/payment-batches/:id/download-invoice-pdf`,
    () => {
      // Return a minimal PDF-like blob for mock purposes
      const pdfContent = new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34,
      ]);
      return new HttpResponse(pdfContent, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'attachment; filename="invoice.pdf"',
        },
      });
    },
  ),

  // POST /demo/reset-demo - Reset demo data
  http.post(`${API_BASE_URL}/demo/reset-demo`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
