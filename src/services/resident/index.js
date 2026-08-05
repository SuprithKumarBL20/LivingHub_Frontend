import { residentApi } from './api/residentApi';
import { residentMapper } from './mappers/residentMapper';
import { residentQueries } from './queries/residentQueries';

export const residentService = {
  getProfile: async () => {
    return Promise.resolve({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        id: 'usr-resident',
        name: 'David Miller',
        email: 'resident@livinghub.com',
        phoneNumber: '+1 (555) 200-3000',
        apartmentNumber: 'Apt 12B',
      },
      errors: [],
      meta: null
    });
  },

  getFamilyMembers: async () => {
    return Promise.resolve({
      success: true,
      message: 'Family members list resolved',
      data: [
        { id: '1', name: 'Sarah Smith', relation: 'Spouse', phoneNumber: '+1 (555) 123-4567' },
        { id: '2', name: 'Tommy Smith', relation: 'Son' }
      ],
      errors: [],
      meta: null
    });
  },

  getVehicles: async () => {
    return Promise.resolve({
      success: true,
      message: 'Registered vehicles list resolved',
      data: [
        { id: '1', type: 'Car', model: 'Tesla Model 3', plateNumber: 'LIV-4923', parkingSlot: 'P-12A' }
      ],
      errors: [],
      meta: null
    });
  }
};

export { residentQueries, residentApi, residentMapper };
