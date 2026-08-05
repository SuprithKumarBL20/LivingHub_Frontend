import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { KpiCard } from '../../../widgets/KpiCard';
import { RevenueChart } from '../../../widgets/RevenueChart';
import { DollarSign, Landmark, FileText, CreditCard, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export const FinanceDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const isAccountant = user?.role === 'ACCOUNTANT' || user?.role === 'SUPER_ADMIN';

  // Seed chart collections statistics
  const collectionsHistory = [
    { name: 'May', collected: 11000 },
    { name: 'Jun', collected: 13500 },
    { name: 'Jul', collected: 12400 },
    { name: 'Aug', collected: 14200 }
  ];

  // Accountant view
  if (isAccountant) {
    const headers = ['Invoice ID', 'Resident Host', 'Unit', 'Amount Due', 'Status', 'Date Generated'];
    const rows = [
      ['INV-8812', 'Sophia Miller', 'A-402', '$85.00', <Badge type="success">PAID</Badge>, '2026-08-01'],
      ['INV-8813', 'Marcus Brody', 'B-108', '$150.00', <Badge type="warning">DUE</Badge>, '2026-08-01'],
      ['INV-8814', 'David Miller', 'A-402', '$110.50', <Badge type="warning">DUE</Badge>, '2026-08-01']
    ];

    return (
      <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
        <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
              <Landmark className="w-5 h-5 text-accent" /> Accountant Ledger Dashboard
            </h1>
            <p className="text-xs text-muted mt-1">Audit resident invoices, daily collections, and clearing status updates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => navigate('/finance/bills')} className="text-xs active:scale-95">
              Manage Invoices
            </Button>
            <Button variant="glass" onClick={() => navigate('/finance/receipts')} className="text-xs active:scale-95">
              Clearance Receipts
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <KpiCard title="Total Outstanding" value="$4,950.00" icon={DollarSign} trendText="18 unpaid invoices" trendType="warning" />
          <KpiCard title="Collected Today" value="$875.00" icon={Landmark} trendText="6 payments cleared" trendType="success" />
          <KpiCard title="Monthly Goal" value="84%" icon={TrendingUp} trendText="Target: 90% clearance" />
          <KpiCard title="Pending Verifications" value="2" icon={FileText} trendText="Manual check validations" />
        </div>

        {/* Charts & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart data={collectionsHistory} title="Collections History Chart" />
          <Card className="p-0 overflow-hidden">
            <h3 className="text-xs font-bold font-poppins text-text-primary p-4 border-b border-border/40">
              Recent Billing Transactions
            </h3>
            <Table headers={headers} rows={rows} />
          </Card>
        </div>
      </div>
    );
  }

  // Resident view
  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent" /> My Dues & Invoices
          </h1>
          <p className="text-xs text-muted mt-1">Check unpaid service charges, download clearing receipts, and clear invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => navigate('/finance/bills')} className="text-xs active:scale-95">
            Clear Outstanding Bills
          </Button>
          <Button variant="glass" onClick={() => navigate('/finance/receipts')} className="text-xs active:scale-95">
            Download Receipts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="space-y-2">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Current Dues Total</p>
          <h3 className="text-2xl font-bold font-mono text-text-primary">$195.50</h3>
          <Badge type="danger">DUE</Badge>
        </Card>
        <Card className="space-y-2">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Payment Due Date</p>
          <h3 className="text-base font-bold font-poppins text-text-primary flex items-center gap-1.5 pt-1">
            <Calendar className="w-4 h-4 text-warning" /> Aug 15, 2026
          </h3>
          <p className="text-[10px] text-muted">Overdue penalties apply after deadline</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Last Payment Cleared</p>
          <h3 className="text-base font-bold font-poppins text-text-primary flex items-center gap-1.5 pt-1">
            <Landmark className="w-4 h-4 text-success" /> $150.00
          </h3>
          <p className="text-[10px] text-muted">Cleared on Jul 15, 2026</p>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
