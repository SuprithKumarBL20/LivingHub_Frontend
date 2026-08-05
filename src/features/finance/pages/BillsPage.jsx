import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { CreditCard, Landmark, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const BillsPage = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([
    { id: 'INV-8813', title: 'Monthly Maintenance Service Charge', amount: 85.00, due: '2026-08-15', status: 'DUE', period: 'Aug 2026' },
    { id: 'INV-8814', title: 'Water Meter Utility Charges', amount: 110.50, due: '2026-08-15', status: 'DUE', period: 'Aug 2026' }
  ]);

  const [activeBill, setActiveBill] = useState(null);
  const [clearing, setClearing] = useState(false);

  const getStatusBadge = (stat) => {
    const maps = {
      DRAFT: 'info',
      GENERATED: 'info',
      DUE: 'warning',
      PARTIALLY_PAID: 'warning',
      PAID: 'success',
      OVERDUE: 'danger',
      CANCELLED: 'danger'
    };
    return <Badge type={maps[stat] || 'info'}>{stat}</Badge>;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!activeBill) return;
    setClearing(true);
    
    // Simulate API request to PUT /api/v1/finance/payments
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBills(bills.map(b => b.id === activeBill.id ? { ...b, status: 'PAID' } : b));
    setClearing(false);
    setActiveBill(null);
    toast.success('Payment settled successfully! Receipt generated.');
  };

  const headers = ['Invoice ID', 'Bill Details', 'Billing Period', 'Amount', 'Due Date', 'Status', 'Actions'];
  const rows = bills.map(b => [
    <span className="font-mono text-xs font-bold">{b.id}</span>,
    <span className="font-bold text-text-primary">{b.title}</span>,
    b.period,
    <span className="font-mono text-xs font-bold">${b.amount.toFixed(2)}</span>,
    b.due,
    getStatusBadge(b.status),
    b.status !== 'PAID' ? (
      <Button 
        variant="primary" 
        size="sm" 
        onClick={() => setActiveBill(b)}
        className="flex items-center gap-1 text-xs cursor-pointer active:scale-95"
      >
        <CreditCard className="w-3.5 h-3.5" /> Pay Now
      </Button>
    ) : (
      <span className="text-success text-xs font-semibold flex items-center gap-1.5">
        <CheckCircle className="w-4 h-4" /> Paid
      </span>
    )
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/finance')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Unpaid Invoices Ledger</h1>
          <p className="text-xs text-muted mt-0.5">Select pending invoice bills to process payment gateway checkout</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table view */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <Table headers={headers} rows={rows} />
          </Card>
        </div>

        {/* Stripe Simulator checkout card */}
        <div className="space-y-6">
          {activeBill ? (
            <Card className="space-y-4 border border-accent/30 bg-accent/5">
              <h3 className="text-xs font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
                <CreditCard className="w-4 h-4 text-accent animate-pulse" /> Payment Gateway Checkout
              </h3>
              
              <div className="text-xs space-y-3 leading-relaxed text-text-secondary">
                <div className="flex justify-between">
                  <span className="text-muted">Settling Invoice</span>
                  <span className="font-mono font-bold text-text-primary">{activeBill.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Billing Amount</span>
                  <span className="font-mono font-bold text-accent">${activeBill.amount.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Mock Card Credentials
                  </label>
                  <input 
                    type="text" 
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full p-2.5 bg-primary/40 border border-border/60 rounded-xl text-xs font-mono focus:outline-none focus:border-accent text-text-primary"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      defaultValue="12/29"
                      className="w-full p-2.5 bg-primary/40 border border-border/60 rounded-xl text-xs font-mono focus:outline-none focus:border-accent text-text-primary"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="CVC"
                      defaultValue="123"
                      className="w-full p-2.5 bg-primary/40 border border-border/60 rounded-xl text-xs font-mono focus:outline-none focus:border-accent text-text-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="glass" className="w-1/2" onClick={() => setActiveBill(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-1/2 flex items-center justify-center gap-1.5 text-xs" isLoading={clearing}>
                    {clearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Authorize Charge'}
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[220px] border border-dashed border-border/60">
              <Landmark className="w-8 h-8 text-muted mb-3" />
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">No Active Checkout</h4>
              <p className="text-[10px] text-muted max-w-xs mt-1 leading-relaxed">
                Select an outstanding invoice from the table grid list to start payment.
              </p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};

export default BillsPage;
