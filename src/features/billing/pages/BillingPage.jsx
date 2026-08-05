import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DollarSign, Landmark, X, ShieldCheck, CreditCard } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Table } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { financeService } from '../../../services/finance';
import toast from 'react-hot-toast';

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be exactly 16 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be exactly 3 digits'),
});

export const BillingPage = () => {
  const [bills, setBills] = useState([]);
  const [activePaymentBill, setActivePaymentBill] = useState(null);
  const [paying, setPaying] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: { cardNumber: '', expiry: '', cvv: '' }
  });

  useEffect(() => {
    financeService.getBills().then(res => setBills(res.data));
  }, []);

  const handleProcessPayment = (data) => {
    if (!activePaymentBill) return;
    setPaying(true);

    financeService.payBill(activePaymentBill.id, 'tok_simulated').then(res => {
      if (res.success) {
        setBills(prev => prev.map(b => b.id === activePaymentBill.id ? { ...b, status: 'PAID' } : b));
        setActivePaymentBill(null);
        reset();
        toast.success(`Payment verified. Receipt generated: ${res.data.receiptNumber}`);
      }
    }).finally(() => setPaying(false));
  };

  const getCategoryColor = (cat) => {
    if (cat === 'maintenance') return 'success';
    if (cat === 'electricity') return 'warning';
    if (cat === 'water') return 'info';
    return 'info';
  };

  // Convert list mappings for shared UI Table
  const headers = ['Invoice Code', 'billing item', 'Period', 'Cost', 'Due Date', 'Status', 'Action'];
  const rows = bills.map(b => [
    <span className="font-mono text-muted">{b.invoiceNumber}</span>,
    <div className="flex flex-col">
      <span className="font-bold text-text-primary">{b.title}</span>
      <span className="text-[10px] text-muted capitalize mt-0.5">{b.category}</span>
    </div>,
    b.billingPeriod,
    <span className="font-bold text-text-primary font-mono">${b.amount.toFixed(2)}</span>,
    new Date(b.dueDate).toLocaleDateString(),
    <Badge type={b.status === 'PAID' ? 'success' : b.status === 'OVERDUE' ? 'danger' : 'warning'}>
      {b.status}
    </Badge>,
    b.status !== 'PAID' ? (
      <Button onClick={() => setActivePaymentBill(b)} size="sm" className="font-bold tracking-wide">
        Pay Now
      </Button>
    ) : (
      <span className="text-success text-xs font-semibold flex items-center gap-1">
        <ShieldCheck className="w-4 h-4" /> Cleared
      </span>
    )
  ]);

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      
      <div className="flex items-center gap-6 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/80">
        <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent">
          <Landmark className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-poppins text-text-primary">Consolidated Invoices Ledger</h2>
          <p className="text-xs text-muted mt-1">Review community maintenance fees, electricity and water utility accounts</p>
        </div>
      </div>

      {/* Invoice Grid Table */}
      <Card>
        <h3 className="text-sm font-bold font-poppins text-text-primary mb-6">Invoices History</h3>
        <Table headers={headers} rows={rows} emptyMessage="No invoices logged." />
      </Card>

      {/* Stripe Payment Simulator Card modal */}
      {activePaymentBill && (
        <>
          <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-40" onClick={() => setActivePaymentBill(null)} />
          <div className="fixed inset-x-4 top-24 mx-auto max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-6 z-50 animate-fade-in flex flex-col space-y-6">
            
            <div className="flex justify-between items-center border-b border-border pb-3 shrink-0">
              <span className="text-[10px] text-muted font-bold font-mono uppercase">Stripe Checkout Integration</span>
              <button onClick={() => setActivePaymentBill(null)} className="text-muted hover:text-text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-primary/40 border border-border p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Invoice:</span>
                <span className="font-mono text-text-secondary">{activePaymentBill.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Item:</span>
                <span className="text-text-primary font-bold">{activePaymentBill.title}</span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-2 mt-2">
                <span className="text-muted">Total Due:</span>
                <span className="text-accent font-bold font-mono text-sm">${activePaymentBill.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 p-2.5 rounded-lg text-[10px] text-accent text-center">
              Hint: Enter 16-digit card, card expiry (MM/YY), and 3-digit CVV.
            </div>

            <form onSubmit={handleSubmit(handleProcessPayment)} className="space-y-4">
              <Input 
                label="Card Number" 
                id="cardNumber" 
                placeholder="4242 4242 4242 4242"
                maxLength={16}
                error={errors.cardNumber} 
                {...register('cardNumber')}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Expiry (MM/YY)" 
                  id="expiry" 
                  placeholder="12/27" 
                  maxLength={5}
                  error={errors.expiry} 
                  {...register('expiry')}
                />
                <Input 
                  label="CVV" 
                  id="cvv" 
                  type="password"
                  placeholder="123" 
                  maxLength={3}
                  error={errors.cvv} 
                  {...register('cvv')}
                />
              </div>

              <Button type="submit" className="w-full font-bold flex justify-center gap-1.5" isLoading={paying}>
                <CreditCard className="w-4 h-4" /> Process Stripe Charge
              </Button>
            </form>

          </div>
        </>
      )}

    </div>
  );
};

export default BillingPage;
