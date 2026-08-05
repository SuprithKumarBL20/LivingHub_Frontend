import React from 'react';
import { Home, Users, Settings, Database, HardDrive, Terminal } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { QuickActions } from '../../../widgets/QuickActions';
import { ActivityFeed } from '../../../widgets/ActivityFeed';

export const SuperAdminDashboardGrid = ({ widgets = {} }) => {
  const communities = widgets.communities || { active: 0, total: 0 };
  const users = widgets.users || { online: 0, total: 0 };
  const storage = widgets.storage || { used: '0 GB', limit: '0 GB' };
  const subscription = widgets.subscription || { licenses: 0 };

  const shortcuts = [
    { label: 'System status', path: '/developer/system', icon: Settings },
    { label: 'UI Components', path: '/developer/ui', icon: Terminal },
    { label: 'Resident Registry', path: '/profile', icon: Users },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard 
          title="Active Communities licensed" 
          value={`${communities.active}/${communities.total}`} 
          icon={Home} 
          trendText="Across regions instances"
          trendType="success"
        />
        <KpiCard 
          title="Active Users Online" 
          value={users.online} 
          icon={Users} 
          trendText={`Out of ${users.total} registered`}
        />
        <KpiCard 
          title="MinIO Block Storage" 
          value={`${storage.used}/${storage.limit}`} 
          icon={HardDrive} 
          trendText="Distributed volume partitions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions shortcuts={shortcuts} title="Root Operator Shortcuts" />
        <ActivityFeed activities={[]} title="Audit Logs Action Feed" />
      </div>
    </div>
  );
};

export default SuperAdminDashboardGrid;
