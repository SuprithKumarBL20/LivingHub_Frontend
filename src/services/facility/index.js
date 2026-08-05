import { facilityApi } from './api/facilityApi';
import { facilityMapper } from './mappers/facilityMapper';
import { facilityQueries } from './queries/facilityQueries';

export const facilityService = {
  getFacilities: async () => {
    return Promise.resolve({
      success: true,
      message: 'Amenities list resolved',
      data: [
        { id: 'fac-1', name: 'Terrace Swimming Pool', description: 'Heated infinity pool with skyline view.', status: 'AVAILABLE', timings: '06:00 AM - 10:00 PM', capacity: 30 },
        { id: 'fac-2', name: 'Multipurpose Clubhouse Hall', description: 'Party and events space with seating for 100.', status: 'AVAILABLE', timings: '08:00 AM - 11:00 PM', capacity: 100 },
        { id: 'fac-3', name: 'Squash Court A', description: 'Indoor wooden court, reservation required.', status: 'MAINTENANCE', timings: '07:00 AM - 09:00 PM', capacity: 4 }
      ],
      errors: [],
      meta: null
    });
  },

  bookFacility: async (facilityId, date, timeSlot) => {
    return Promise.resolve({
      success: true,
      message: 'Amenity booking requested successfully',
      data: {
        id: `bk-${Math.random().toString(36).substr(2, 9)}`,
        facilityId,
        date,
        timeSlot,
        status: 'CONFIRMED'
      },
      errors: [],
      meta: null
    });
  }
};

export { facilityQueries, facilityApi, facilityMapper };
