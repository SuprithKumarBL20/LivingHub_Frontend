import React from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { QrCode, Download, Share2, Clipboard, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export const QRViewer = ({ visitor = {} }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`PASS-CODE-${visitor.id || '9823'}`);
    toast.success('Pass code copied to clipboard');
  };

  const getStatusBadge = (stat) => {
    const maps = {
      PENDING: 'info',
      APPROVED: 'success',
      ARRIVED: 'success',
      REJECTED: 'danger'
    };
    return <Badge type={maps[stat] || 'info'}>{stat}</Badge>;
  };

  return (
    <Card className="flex flex-col items-center text-center p-6 space-y-6 max-w-sm mx-auto border border-accent/25 bg-accent/5">
      <div className="space-y-1">
        <h3 className="text-sm font-bold font-poppins text-text-primary">Gate Access Pass</h3>
        <p className="text-[10px] text-muted">Scan at terminal scanner to authenticate entry</p>
      </div>

      {/* QR Node Container */}
      <div className="p-4 bg-white rounded-2xl border border-border/80 shadow-inner flex flex-col items-center">
        {/* Simulate QR Code */}
        <div className="w-40 h-40 bg-slate-900 flex items-center justify-center rounded-xl p-2 relative">
          <QrCode className="w-full h-full text-white" />
          <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
            <div className="w-10 h-10 bg-white border-2 border-slate-900 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-accent fill-slate-900" />
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-800 font-bold mt-3 select-all tracking-wider">
          PASS-LH-{visitor.id || '109B'}
        </span>
      </div>

      {/* Visitor Details List */}
      <div className="w-full text-xs text-left space-y-2 border-t border-border/40 pt-4 text-text-secondary leading-relaxed">
        <div className="flex justify-between">
          <span className="text-muted">Visitor Name</span>
          <span className="font-bold text-text-primary">{visitor.name || 'John Doe'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Visitor Class</span>
          <span className="font-bold text-text-primary">{visitor.category || 'Guest'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Resident Host</span>
          <span className="font-bold text-text-primary">{visitor.host || 'David Miller'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Target Unit</span>
          <span className="font-bold text-text-primary font-mono">{visitor.unit || 'A-402'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Valid Expiry</span>
          <span className="font-bold text-text-primary font-mono">{visitor.validUntil || '2026-08-03 23:59'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted">Gate Status</span>
          {getStatusBadge(visitor.status || 'APPROVED')}
        </div>
      </div>

      {/* Action panel */}
      <div className="grid grid-cols-3 gap-2 w-full pt-2">
        <Button variant="glass" size="sm" onClick={handleCopy} className="p-2 cursor-pointer">
          <Clipboard className="w-3.5 h-3.5 mx-auto" />
        </Button>
        <Button variant="glass" size="sm" onClick={() => toast.success('Mock download of QR image initiated')} className="p-2 cursor-pointer">
          <Download className="w-3.5 h-3.5 mx-auto" />
        </Button>
        <Button variant="glass" size="sm" onClick={() => toast.success('Mock share prompt opened')} className="p-2 cursor-pointer">
          <Share2 className="w-3.5 h-3.5 mx-auto" />
        </Button>
      </div>
    </Card>
  );
};

export default QRViewer;
