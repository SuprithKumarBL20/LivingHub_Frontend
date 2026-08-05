import React from 'react';
import { Wrench, CheckCircle, Clock, Calendar } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { QuickActions } from '../../../widgets/QuickActions';
import { NoticeBoard } from '../../../widgets/NoticeBoard';

export const MaintenanceDashboardGrid = ({ widgets = {} }) => {
  const complaints = widgets.assignedComplaints || { count: 0 };
  const workOrders = widgets.workOrders || { active: 0, completedToday: 0 };
  const completion = widgets.completionRate || { percentage: 100 };

  const shortcuts = [
    { label: 'Pending Jobs', path: '/complaints', icon: Wrench },
    { label: 'Schedules', path: '/community', icon: Calendar },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard 
          title="My Assigned Tickets" 
          value={complaints.count} 
          icon={Wrench} 
          trendText="Action required"
          trendType={complaints.count > 0 ? 'warning' : 'success'}
        />
        <KpiCard 
          title="Active Work Orders" 
          value={`${workOrders.active}/${workOrders.completedToday}`} 
          icon={Clock} 
          trendText="In progress vs completed today"
        />
        <KpiCard 
          title="First-time Fix Rate" 
          value={`${completion.percentage}%`} 
          icon={CheckCircle} 
          trendText="Excellent rating feedback"
          trendType="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions shortcuts={shortcuts} title="Staff Actions Panel" />
        <NoticeBoard notices={[]} title="Facilities Operations Alerts" />
      </div>
    </div>
  );
};

export default MaintenanceDashboardGrid;
