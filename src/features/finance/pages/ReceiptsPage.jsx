import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Table } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { ArrowLeft, Receipt, Printer, Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReceiptsPage = () => {
  const navigate = useNavigate();

  const [receipts] = useState([
    { id: 'REC-9011', invoiceId: 'INV-8811', title: 'Monthly Maintenance Service Charge', amount: 85.00, method: 'Credit Card', date: '2026-08-01', ref: 'TXN-98129038' },
    { id: 'REC-9012', invoiceId: 'INV-8812', title: 'Water Meter Utility Charges', amount: 65.50, method: 'Bank Transfer', date: '2026-07-15', ref: 'TXN-98129012' }
  ]);

  const [activeReceipt, setActiveReceipt] = useState(null);

  const headers = ['Receipt ID', 'Invoice ID', 'Bill Description', 'Amount Settled', 'Date Cleared', 'Actions'];
  const rows = receipts.map(r => [
    <span className="font-mono text-xs font-bold">{r.id}</span>,
    <span className="font-mono text-xs text-muted">{r.invoiceId}</span>,
    <span className="font-bold text-text-primary">{r.title}</span>,
    <span className="font-mono text-xs font-bold text-success">${r.amount.toFixed(2)}</span>,
    r.date,
    <Button 
      variant="glass" 
      size="sm" 
      onClick={() => setActiveReceipt(r)}
      className="flex items-center gap-1.5 text-xs cursor-pointer active:scale-95"
    >
      <Eye className="w-3.5 h-3.5" /> Preview
    </Button>
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
          <h1 className="text-xl font-bold font-poppins text-text-primary">Invoices Clearance Receipts</h1>
          <p className="text-xs text-muted mt-0.5">Preview transaction histories, bank transfers references, and print receipts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table list */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <Table headers={headers} rows={rows} />
          </Card>
        </div>

        {/* Receipt Viewer Box */}
        <div className="space-y-6">
          {activeReceipt ? (
            <Card className="space-y-6 border border-success/35 bg-success/5 p-6">
              <div className="text-center space-y-1">
                <Receipt className="w-8 h-8 text-success mx-auto animate-bounce" />
                <h3 className="text-xs font-bold font-poppins text-text-primary uppercase tracking-wider">Payment Receipt</h3>
                <p className="text-[9px] text-muted">Cleared transaction reference</p>
              </div>

              {/* Bill items details */}
              <div className="w-full text-xs text-left space-y-3.5 border-t border-b border-border/40 py-4 text-text-secondary leading-relaxed">
                <div className="flex justify-between">
                  <span className="text-muted">Receipt Code</span>
                  <span className="font-mono font-bold text-text-primary">{activeReceipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Settled Invoice</span>
                  <span className="font-mono font-bold text-text-primary">{activeReceipt.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Payment Channel</span>
                  <span className="font-bold text-text-primary">{activeReceipt.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Transaction Ref</span>
                  <span className="font-mono text-[10px] text-text-primary">{activeReceipt.ref}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Total Paid</span>
                  <span className="font-mono font-bold text-success">${activeReceipt.amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button variant="glass" size="sm" onClick={() => toast.success('Mock print dialog opened')} className="flex items-center justify-center gap-1.5 p-2">
                  <Printer className="w-3.5 h-3.5" /> Print
                </Button>
                <Button variant="glass" size="sm" onClick={() => toast.success('Mock pdf download completed')} className="flex items-center justify-center gap-1.5 p-2">
                  <Download className="w-3.5 h-3.5" /> PDF
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[220px] border border-dashed border-border/60">
              <Receipt className="w-8 h-8 text-muted mb-3" />
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">No Receipt Selected</h4>
              <p className="text-[10px] text-muted max-w-xs mt-1 leading-relaxed">
                Click on the "Preview" button of any paid invoice row to view transaction receipt slips details.
              </p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};

export default ReceiptsPage;
