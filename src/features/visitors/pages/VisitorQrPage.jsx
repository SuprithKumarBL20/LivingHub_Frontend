import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { QRViewer } from '../components/QRViewer';
import { ArrowLeft, UserPlus, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export const VisitorQrPage = () => {
  const navigate = useNavigate();

  const [visitor] = useState({
    id: '9921',
    name: 'Emily Davis',
    category: 'Guest',
    host: 'David Miller',
    unit: 'A-402',
    validUntil: '2026-08-03 23:59',
    status: 'APPROVED'
  });

  return (
    <div className="space-y-8 text-left max-w-xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/visitors')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Gate pass Token</h1>
          <p className="text-xs text-muted mt-0.5">Show this barcode at the security entrance gate</p>
        </div>
      </div>

      <div className="space-y-6">
        <QRViewer visitor={visitor} />

        {/* Upload visitor photo */}
        <Card className="space-y-4">
          <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-accent" /> Security Verification Photo
          </h4>
          <p className="text-[11px] text-muted leading-relaxed">
            Uploading a photo of your guest allows security guards to quickly match identity at the gate checks.
          </p>
          <div 
            onClick={() => toast.success('Mock photo upload selector triggered')}
            className="border border-dashed border-border/80 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-accent bg-primary/25"
          >
            <Upload className="w-4 h-4 text-muted" />
            <span className="text-xs text-text-secondary">Attach Guest Photo</span>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default VisitorQrPage;
