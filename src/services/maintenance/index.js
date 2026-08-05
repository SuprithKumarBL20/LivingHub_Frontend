import { maintenanceApi } from './api/maintenanceApi';
import { maintenanceMapper } from './mappers/maintenanceMapper';
import { maintenanceQueries } from './queries/maintenanceQueries';

export const maintenanceService = {
  getComplaints: async () => {
    return Promise.resolve({
      success: true,
      message: 'Complaints list retrieved',
      data: [
        {
          id: 'comp-1',
          title: 'Kitchen Sink Leakage',
          description: 'The pipes underneath the kitchen sink are leaking heavily. Water is spilling onto the cabinet floor, causing wood damage.',
          category: 'Plumbing',
          priority: 'HIGH',
          status: 'ASSIGNED',
          createdAt: '2026-07-28T09:30:00Z',
          updatedAt: '2026-07-28T14:22:00Z',
          images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400'],
          comments: [
            { id: 'c-1', author: 'David Miller', authorRole: 'RESIDENT', content: 'Please bring a spare gasket, it seems the rubber ring is completely worn out.', timestamp: '2026-07-28T09:35:00Z' }
          ],
          timeline: [
            { id: 't-1', status: 'PENDING', description: 'Complaint created by resident.', timestamp: '2026-07-28T09:30:00Z', actor: 'David Miller' }
          ]
        },
        {
          id: 'comp-2',
          title: 'Corridor Elevator Not Working',
          description: 'Elevator B on the North wing is making loud rattling noises and getting stuck on Floor 4.',
          category: 'Electrical',
          priority: 'CRITICAL',
          status: 'PENDING',
          createdAt: '2026-07-29T08:00:00Z',
          updatedAt: '2026-07-29T08:00:00Z',
          images: [],
          comments: [],
          timeline: [
            { id: 't-1', status: 'PENDING', description: 'Elevator power-off reported by security.', timestamp: '2026-07-29T08:00:00Z', actor: 'Officer Marcus' }
          ]
        }
      ],
      errors: [],
      meta: null
    });
  },

  createComplaint: async (title, description, category, priority) => {
    return Promise.resolve({
      success: true,
      message: 'Complaint created successfully',
      data: {
        id: `comp-${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        category,
        priority,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [],
        comments: [],
        timeline: []
      },
      errors: [],
      meta: null
    });
  }
};

export { maintenanceQueries, maintenanceApi, maintenanceMapper };
