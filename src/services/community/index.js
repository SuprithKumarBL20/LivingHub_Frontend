import { communityApi } from './api/communityApi';
import { communityMapper } from './mappers/communityMapper';
import { communityQueries } from './queries/communityQueries';

export const communityService = {
  getNotices: async () => {
    return Promise.resolve({
      success: true,
      message: 'Notice board items resolved',
      data: [
        {
          id: 'note-1',
          title: 'Scheduled Water Outage - North Wing',
          content: 'Please note that water supply will be temporarily shut down on Friday, July 31st, from 10:00 AM to 02:00 PM for pipeline replacement.',
          author: 'Property Operations Team',
          date: '2026-07-28',
          importance: 'HIGH',
          category: 'Maintenance'
        },
        {
          id: 'note-2',
          title: 'Annual General Meeting Scheduled',
          content: 'The yearly owners and tenants committee meeting will take place at Clubhouse Hall B on Sunday, August 9th at 04:00 PM. High attendance requested.',
          author: 'Sterling Association Committee',
          date: '2026-07-25',
          importance: 'MEDIUM',
          category: 'Event'
        },
        {
          id: 'note-3',
          title: 'Garbage Disposal Guidelines Reminder',
          content: 'Please ensure wet garbage and dry recyclables are separated correctly before dumping in the collection chutes.',
          author: 'Sanitation Lead',
          date: '2026-07-20',
          importance: 'LOW',
          category: 'Guidelines'
        }
      ],
      errors: [],
      meta: null
    });
  },

  getMarketplaceItems: async () => {
    return Promise.resolve({
      success: true,
      message: 'Marketplace items resolved',
      data: [
        { id: 'item-1', title: 'Wooden Study Table', price: 40.00, contact: '+1 (555) 300-4000', location: 'Tower C, Floor 14', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200' },
        { id: 'item-2', title: 'Baby Stroller (Nearly New)', price: 95.00, contact: '+1 (555) 789-0123', location: 'Tower A, Floor 2', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200' }
      ],
      errors: [],
      meta: null
    });
  }
};

export { communityQueries, communityApi, communityMapper };
