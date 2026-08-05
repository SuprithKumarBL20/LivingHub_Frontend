import React from 'react';
import { ShieldCheck, QrCode, BellRing, UserCheck } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { RecentVisitors } from '../../../widgets/RecentVisitors';
import { EmergencyAlerts } from '../../../widgets/EmergencyAlerts';
import { QuickActions } from '../../../widgets/QuickActions';

export const SecurityDashboardGrid = ({ widgets = {} }) => {
  const visitorsToday = widgets.visitorsToday || { expected: 0, scanned: 0 };
  const emergency = widgets.emergencyAlerts || { active: false, latestMessage: 'None' };
  const queue = widgets.visitorQueue || [];

  const shortcuts = [
    { label: 'Check Pass Scan', path: '/visitors', icon: QrCode },
    { label: 'Active Alerts Log', path: '/community', icon: BellRing },
    { label: 'Residents Register', path: '/profile', icon: UserCheck },
    { label: 'Gate Access Console', path: '/security', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <KpiCard 
          title="Guest QR Scanned" 
          value={`${visitorsToday.scanned}/${visitorsToday.expected}`} 
          icon={QrCode} 
          trendText="Expected check-ins today"
        />
        <KpiCard 
          title="Security Alerts Mode" 
          value={emergency.active ? 'EMERGENCY' : 'SECURE'} 
          icon={ShieldCheck} 
          trendText="All zones operating normally"
          trendType={emergency.active ? 'danger' : 'success'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions shortcuts={shortcuts} title="Gate Security Controls" />
        <RecentVisitors visitors={queue} title="Entry Logs Queue Feed" />
        <EmergencyAlerts active={emergency.active} latestMessage={emergency.latestMessage} title="Active SOS Zone Feed" />
      </div>
    </div>
  );
};

export default SecurityDashboardGrid;
