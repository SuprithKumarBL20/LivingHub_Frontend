import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { VisitorForm } from '../components/VisitorForm';
import { QRViewer } from '../components/QRViewer';
import { QrCode, CalendarClock, History, UserCheck } from 'lucide-react';

export const VisitorsPage = () => {
  const navigate = useNavigate();
  const [activePass, setActivePass] = useState(null);

  const handlePassGenerated = (pass) => {
    setActivePass(pass);
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <QrCode className="w-5 h-5 text-accent" /> Visitor Pre-registrations
          </h1>
          <p className="text-xs text-muted mt-1">Generate one-time QR codes for guests, couriers, and delivery drivers</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="glass" 
            onClick={() => navigate('/visitors/history')}
            className="flex items-center gap-1.5 text-xs active:scale-95"
          >
            <History className="w-4 h-4" /> Guest Logs
          </Button>
          <Button 
            variant="glass" 
            onClick={() => navigate('/security')}
            className="flex items-center gap-1.5 text-xs text-accent active:scale-95"
          >
            <UserCheck className="w-4 h-4" /> Security Console
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Registration Form */}
        <div className="lg:col-span-3">
          <VisitorForm onSubmitSuccess={handlePassGenerated} />
        </div>

        {/* QR Viewer Box */}
        <div className="lg:col-span-2 space-y-6">
          {activePass ? (
            <QRViewer visitor={activePass} />
          ) : (
            <Card className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[300px] border border-dashed border-border/60">
              <CalendarClock className="w-10 h-10 text-muted mb-3" />
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">No Active Pass Selected</h4>
              <p className="text-[10px] text-muted max-w-xs mt-1 leading-relaxed">
                Submit the pre-registration form to generate a shareable QR pass code for your expected visitor.
              </p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};

export default VisitorsPage;
