import React from 'react';
import { DollarSign, FileText, Landmark, FileSpreadsheet } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { RevenueChart } from '../../../widgets/RevenueChart';
import { QuickActions } from '../../../widgets/QuickActions';

export const AccountantDashboardGrid = ({ widgets = {} }) => {
  const bills = widgets.outstandingBills || { total: 0, count: 0 };
  const today = widgets.paymentsToday || { count: 0, collected: 0 };
  const collection = widgets.monthlyCollection || { percentage: 100 };
  const chartData = widgets.revenueChart || [];

  const shortcuts = [
    { label: 'Issue Invoices', path: '/billing', icon: FileText },
    { label: 'Generate Reports', path: '/developer/system', icon: FileSpreadsheet },
    { label: 'Clearing Desk', path: '/billing', icon: Landmark },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard 
          title="Outstanding Receivable" 
          value={`$${bills.total.toFixed(2)}`} 
          icon={DollarSign} 
          trendText={`${bills.count} invoices pending`}
          trendType={bills.count > 0 ? 'warning' : 'success'}
        />
        <KpiCard 
          title="Collected Today" 
          value={`$${today.collected.toFixed(2)}`} 
          icon={Landmark} 
          trendText={`${today.count} clearance transactions`}
          trendType="success"
        />
        <KpiCard 
          title="Billing Clearance Rate" 
          value={`${collection.percentage}%`} 
          icon={FileText} 
          trendText="Collection benchmark goal target"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions shortcuts={shortcuts} title="Finance Shortcuts" />
        <RevenueChart data={chartData} title="Clearance Statistics Dashboard" />
      </div>
    </div>
  );
};

export default AccountantDashboardGrid;
