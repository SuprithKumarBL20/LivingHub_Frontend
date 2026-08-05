import { auditApi } from './api/auditApi';
import { auditMapper } from './mappers/auditMapper';
import { auditQueries } from './queries/auditQueries';

export const auditService = {
  getLogs: async () => {
    return Promise.resolve({
      success: true,
      message: 'System audit logs retrieved',
      data: [
        { id: '1', action: 'USER_LOGIN', actor: 'David Miller', ip: '192.168.1.50', timestamp: '2026-07-29T11:45:00Z', details: 'Successful authentication' },
        { id: '2', action: 'VISITOR_CHECK_IN', actor: 'Marcus (Security)', ip: '10.0.4.12', timestamp: '2026-07-29T10:15:00Z', details: 'Checked in visitor Emily Davis for Apt 12B' },
        { id: '3', action: 'BILL_PAID', actor: 'David Miller', ip: '192.168.1.50', timestamp: '2026-07-29T09:20:00Z', details: 'Paid Invoice INV-2026-0641 ($75.00)' }
      ],
      errors: [],
      meta: null
    });
  }
};

export { auditQueries, auditApi, auditMapper };
