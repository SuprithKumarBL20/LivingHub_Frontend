import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useDashboardSummaryQuery } from '../../../services/dashboard/queries/dashboardQueries';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Import layout grids
import ResidentDashboardGrid from '../components/ResidentDashboardGrid';
import AdminDashboardGrid from '../components/AdminDashboardGrid';
import SecurityDashboardGrid from '../components/SecurityDashboardGrid';
import MaintenanceDashboardGrid from '../components/MaintenanceDashboardGrid';
import AccountantDashboardGrid from '../components/AccountantDashboardGrid';
import SuperAdminDashboardGrid from '../components/SuperAdminDashboardGrid';

// Role to layout mapping registry
const dashboardLayouts = {
  SUPER_ADMIN: SuperAdminDashboardGrid,
  COMMUNITY_ADMIN: AdminDashboardGrid,
  RESIDENT: ResidentDashboardGrid,
  OWNER: ResidentDashboardGrid,
  TENANT: ResidentDashboardGrid,
  SECURITY: SecurityDashboardGrid,
  MAINTENANCE: MaintenanceDashboardGrid,
  ACCOUNTANT: AccountantDashboardGrid,
};

export const DashboardHome = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error, refetch } = useDashboardSummaryQuery();

  // 1. Loading Skeleton Layout State
  if (isLoading) {
    return (
      <div className="space-y-6 text-left max-w-7xl mx-auto animate-pulse">
        <div className="border-b border-border pb-4">
          <div className="h-6 w-48 bg-primary rounded"></div>
          <div className="h-4 w-72 bg-primary rounded mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-28 flex flex-col justify-between">
              <div className="h-4 w-24 bg-primary rounded"></div>
              <div className="h-8 w-16 bg-primary rounded"></div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="h-80 bg-primary/20"></Card>
          <Card className="h-80 bg-primary/20"></Card>
          <Card className="h-80 bg-primary/20"></Card>
        </div>
      </div>
    );
  }

  // 2. Gateway / Network Error Fallback State
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-danger/10 border border-danger/25 rounded-2xl flex items-center justify-center text-danger mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-poppins text-text-primary">API Gateway Offline</h3>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              We couldn't connect to the dashboard aggregation services. Verify your network or if the API Gateway address is correct.
            </p>
          </div>
          <Button variant="glass" onClick={() => refetch()} className="flex items-center gap-2 mx-auto text-xs active:scale-95">
            <RefreshCw className="w-3.5 h-3.5" /> Reconnect Gateway
          </Button>
        </div>
      </div>
    );
  }

  // 3. Dynamic Rendering Per Registry Layout Map
  const role = user?.role || 'RESIDENT';
  const DashboardLayout = dashboardLayouts[role] || ResidentDashboardGrid;

  const widgets = data?.widgets || {};

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary">
          Welcome back, {user?.name || 'Resident'}
        </h1>
        <p className="text-xs text-muted mt-1">
          Authorized workspace role: <span className="font-mono text-accent font-bold tracking-wide uppercase">{role}</span>
        </p>
      </div>

      {/* Render layout component passing parsed props */}
      <DashboardLayout widgets={widgets} />
    </div>
  );
};

export default DashboardHome;
