import { visitorApi } from './api/visitorApi';
import { visitorMapper } from './mappers/visitorMapper';
import { visitorQueries } from './queries/visitorQueries';

export const visitorService = {
  getVisitors: async () => {
    return Promise.resolve({
      success: true,
      message: 'Visitors queue resolved',
      data: [
        {
          id: 'vis-1',
          name: 'Emily Davis',
          purpose: 'Personal Guest',
          apartment: 'Apt 12B',
          checkIn: '2026-07-29T10:15:00Z',
          status: 'CHECKED_IN',
          qrCode: 'LIV-QR-908123',
          passCode: '90812'
        },
        {
          id: 'vis-2',
          name: 'FedEx Delivery Driver',
          purpose: 'Courier Delivery',
          apartment: 'Apt 4A',
          checkIn: '2026-07-29T11:05:00Z',
          status: 'CHECKED_IN',
          qrCode: 'LIV-QR-412789',
          passCode: '41278'
        },
        {
          id: 'vis-3',
          name: 'Michael Chang',
          purpose: 'HVAC Maintenance',
          apartment: 'Apt 15F',
          checkIn: '2026-07-29T13:00:00Z',
          status: 'EXPECTED',
          qrCode: 'LIV-QR-221087',
          passCode: '22108'
        }
      ],
      errors: [],
      meta: null
    });
  },

  generatePass: async (name, purpose, apartment) => {
    const passCode = Math.floor(10000 + Math.random() * 90000).toString();
    return Promise.resolve({
      success: true,
      message: 'Visitor pass created successfully',
      data: {
        id: `vis-${Math.random().toString(36).substr(2, 9)}`,
        name,
        purpose,
        apartment,
        checkIn: new Date().toISOString(),
        status: 'EXPECTED',
        qrCode: `LIV-QR-${passCode}0`,
        passCode
      },
      errors: [],
      meta: null
    });
  }
};

export { visitorQueries, visitorApi, visitorMapper };
