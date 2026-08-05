import React from 'react';
import { Users, Wrench, QrCode, Calendar, TrendingUp } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { ActivityFeed } from '../../../widgets/ActivityFeed';
import { QuickActions } from '../../../widgets/QuickActions';
import { FacilityBookings } from '../../../widgets/FacilityBookings';

export const AdminDashboardGrid = ({ widgets = {} }) => {
  const residents = widgets.residentsCount || { total: 0, pendingApprovals: 0 };
  const complaints = widgets.complaintStats || { pending: 0, assigned: 0 };
  const visitors = widgets.visitorQueue || { totalToday: 0 };
  const activities = widgets.activities || [];

  const shortcuts = [
    { label: 'Notices Board', path: '/community', icon: Calendar },
    { label: 'Security Gate', path: '/visitors', icon: QrCode },
    { label: 'Complaints Portal', path: '/complaints', icon: Wrench },
    { label: 'Residents Register', path: '/profile', icon: Users },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard 
          title="Total Residents Registered" 
          value={residents.total} 
          icon={Users} 
          trendText={`${residents.pendingApprovals} pending approval approvals`}
          trendType={residents.pendingApprovals > 0 ? 'warning' : 'success'}
        />
        <KpiCard 
          title="Open Complaints Tickets" 
          value={complaints.pending + complaints.assigned} 
          icon={Wrench} 
          trendText={`${complaints.pending} unassigned`}
          trendType={complaints.pending > 0 ? 'danger' : 'warning'}
        />
        <KpiCard 
          title="Visitors Handled Today" 
          value={visitors.totalToday} 
          icon={QrCode} 
          trendText="Verified check-ins"
        />
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions shortcuts={shortcuts} title="Admin Shortcuts" />
        <ActivityFeed activities={activities} title="Recent Administrative Action Feed" />
        <FacilityBookings bookings={[]} title="Clubhouse Reservational Logs" />
      </div>
    </div>
  );
};

export default AdminDashboardGrid;
