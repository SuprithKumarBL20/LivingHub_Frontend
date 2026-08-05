import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { QrCode, Shield, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const SecurityGatePage = () => {
  const [queue, setQueue] = useState([
    { id: 'LH-1092', name: 'UPS Parcel Courier', category: 'Courier', host: 'David Miller', unit: 'A-402', status: 'PENDING' },
    { id: 'LH-1095', name: 'Mark Sterling', category: 'Guest', host: 'Sophia Miller', unit: 'A-402', status: 'PENDING' },
    { id: 'LH-1096', name: 'Water Pipe Technician', category: 'Maintenance Vendor', host: 'Gary Vance', unit: 'B-108', status: 'PENDING' }
  ]);

  const handleApprove = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'APPROVED' } : q));
    toast.success(`Access approved for ${id}`);
  };

  const handleReject = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'REJECTED' } : q));
    toast.error(`Access rejected for ${id}`);
  };

  const getStatusBadge = (stat) => {
    const maps = {
      PENDING: 'info',
      APPROVED: 'success',
      REJECTED: 'danger'
    };
    return <Badge type={maps[stat] || 'info'}>{stat}</Badge>;
  };

  const headers = ['Pass Code', 'Guest Name', 'Category', 'Host Resident', 'Target Unit', 'Status', 'Gate Actions'];
  const rows = queue.map(q => [
    <span className="font-mono text-xs font-bold">{q.id}</span>,
    <span className="font-bold text-text-primary">{q.name}</span>,
    q.category,
    q.host,
    <span className="font-mono text-xs">{q.unit}</span>,
    getStatusBadge(q.status),
    <div className="flex gap-2">
      {q.status === 'PENDING' ? (
        <>
          <Button size="sm" variant="primary" onClick={() => handleApprove(q.id)} className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Verify
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleReject(q.id)} className="flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Deny
          </Button>
        </>
      ) : (
        <span className="text-[10px] text-muted uppercase font-bold">Checked</span>
      )}
    </div>
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" /> Security Gate Entry Control
        </h1>
        <p className="text-xs text-muted mt-1">Verify expected visitor passes and scan barcodes for entry/exit clearance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Scanning block */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
              Terminal Scanner Emulator
            </h3>
            <p className="text-[11px] text-muted leading-relaxed">
              Scan pass barcodes to clear visitor entry logs instantly.
            </p>
            
            <div 
              onClick={() => toast.success('Mock barcode scanner activated')}
              className="border-2 border-dashed border-accent/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent bg-accent/5 transition duration-150 active:scale-98"
            >
              <QrCode className="w-8 h-8 text-accent mb-2" />
              <p className="text-xs font-bold text-text-primary">Click to Scan Pass</p>
              <p className="text-[9px] text-muted mt-1">Simulates camera scanner overlays</p>
            </div>
          </Card>
        </div>

        {/* Visitor Queue Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <Table headers={headers} rows={rows} />
          </Card>
        </div>

      </div>

    </div>
  );
};

export default SecurityGatePage;
