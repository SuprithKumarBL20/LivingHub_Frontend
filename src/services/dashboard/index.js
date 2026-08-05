import { useAuthStore } from '../../store/authStore';
import { dashboardMapper } from './mappers/dashboardMapper';
import { dashboardApi } from './api/dashboardApi';

// Mock datasets matching role configurations
const MOCK_WIDGET_DATA = {
  SUPER_ADMIN: {
    communities: { active: 14, total: 15 },
    users: { online: 312, total: 4902 },
    health: { apiStatus: 'OPERATIONAL', socketStatus: 'OPERATIONAL' },
    storage: { used: '1.4 TB', limit: '10 TB' },
    subscription: { licenses: 12, billingDue: '2026-08-15' }
  },
  COMMUNITY_ADMIN: {
    residentsCount: { total: 420, active: 410, pendingApprovals: 4 },
    complaintStats: { pending: 3, assigned: 5, resolved: 32 },
    visitorQueue: { totalToday: 12, checkedIn: 8 },
    revenue: { monthlyGoal: 15000, currentCollected: 12400 },
    facilityBookings: { scheduledToday: 5, activeSlots: 3 },
    activities: [
      { id: '1', action: 'Approved family member', actor: 'Evelyn Carter', time: '10 mins ago' },
      { id: '2', action: 'Resolved plumbing ticket comp-1', actor: 'Gary Vance', time: '1 hr ago' }
    ]
  },
  RESIDENT: {
    bills: { pendingCount: 2, totalAmount: 195.50 },
    complaints: { activeCount: 1 },
    visitors: { expectedToday: 3 },
    events: [
      { id: 'ev-1', title: 'Community Pool Party', date: 'Aug 01, 2026', time: '04:00 PM' }
    ],
    notices: [
      { id: 'note-1', title: 'Scheduled Water Outage - North Wing', importance: 'HIGH', category: 'Maintenance' },
      { id: 'note-2', title: 'Annual General Meeting Scheduled', importance: 'MEDIUM', category: 'Event' }
    ]
  },
  OWNER: {
    bills: { pendingCount: 2, totalAmount: 195.50 },
    complaints: { activeCount: 1 },
    visitors: { expectedToday: 3 },
    events: [],
    notices: []
  },
  TENANT: {
    bills: { pendingCount: 1, totalAmount: 150.00 },
    complaints: { activeCount: 0 },
    visitors: { expectedToday: 1 },
    events: [],
    notices: []
  },
  SECURITY: {
    visitorsToday: { expected: 15, scanned: 9 },
    emergencyAlerts: { active: false, latestMessage: 'None' },
    visitorQueue: [
      { id: 'vis-1', name: 'Emily Davis', purpose: 'Guest', status: 'CHECKED_IN' },
      { id: 'vis-2', name: 'FedEx Driver', purpose: 'Courier', status: 'CHECKED_IN' }
    ]
  },
  MAINTENANCE: {
    assignedComplaints: { count: 3 },
    workOrders: { active: 2, completedToday: 4 },
    completionRate: { percentage: 92 }
  },
  ACCOUNTANT: {
    outstandingBills: { total: 4950.00, count: 18 },
    paymentsToday: { count: 6, collected: 875.00 },
    monthlyCollection: { percentage: 84 },
    revenueChart: [
      { name: 'May', collected: 12000 },
      { name: 'Jun', collected: 14500 },
      { name: 'Jul', collected: 12400 }
    ]
  }
};

export const dashboardService = {
  getSummary: async () => {
    // Artificial latency
    await new Promise(resolve => setTimeout(resolve, 600));

    const user = useAuthStore.getState().user;
    const role = user?.role || 'RESIDENT';
    const widgets = MOCK_WIDGET_DATA[role] || MOCK_WIDGET_DATA.RESIDENT;

    return Promise.resolve({
      success: true,
      message: 'Dashboard summary resolved',
      data: dashboardMapper.toSummary({
        role,
        widgets
      }),
      errors: [],
      meta: null
    });
  }
};

export { dashboardApi, dashboardMapper };
