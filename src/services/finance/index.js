import { financeApi } from './api/financeApi';
import { financeMapper } from './mappers/financeMapper';
import { financeQueries } from './queries/financeQueries';

export const financeService = {
  getBills: async () => {
    return Promise.resolve({
      success: true,
      message: 'Ledger invoices resolved',
      data: [
        {
          id: 'bill-1',
          title: 'July Community Maintenance Fee',
          amount: 150.00,
          dueDate: '2026-08-05',
          status: 'PENDING',
          category: 'maintenance',
          billingPeriod: 'July 2026',
          invoiceNumber: 'INV-2026-0792'
        },
        {
          id: 'bill-2',
          title: 'Clubhouse Slot Reservation - Hall B',
          amount: 75.00,
          dueDate: '2026-07-29',
          status: 'PAID',
          category: 'amenity',
          billingPeriod: 'Single Event Reservation',
          invoiceNumber: 'INV-2026-0641'
        },
        {
          id: 'bill-3',
          title: 'Water Utility surcharge - Q2',
          amount: 45.50,
          dueDate: '2026-06-30',
          status: 'OVERDUE',
          category: 'water',
          billingPeriod: 'Apr - Jun 2026',
          invoiceNumber: 'INV-2026-0410'
        }
      ],
      errors: [],
      meta: null
    });
  },

  payBill: async (billId, stripeToken) => {
    return Promise.resolve({
      success: true,
      message: 'Payment completed successfully. Thank you!',
      data: {
        receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: 150.00,
        paidAt: new Date().toISOString(),
        paymentMethod: 'Visa ending in 4242'
      },
      errors: [],
      meta: null
    });
  }
};

export { financeQueries, financeApi, financeMapper };
