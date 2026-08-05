import React from 'react';
import { Card } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { FamilyTable } from '../components/FamilyTable';
import { VehicleTable } from '../components/VehicleTable';
import { EmergencyContactCard } from '../components/EmergencyContactCard';
import { DocumentViewer } from '../components/DocumentViewer';
import { Home, Calendar, BadgeAlert, KeyRound } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export const ResidentProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Home className="w-5 h-5 text-accent" /> Apartment & Residency Directory
          </h1>
          <p className="text-xs text-muted mt-1">Manage apartment allocations, co-residents, documents, and contacts</p>
        </div>
        <Badge type="success">Checked-In Resident</Badge>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Apartment Metadata */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
              <KeyRound className="w-4 h-4 text-accent" /> Unit Allocation
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-muted">Apartment Unit</span>
                <span className="font-mono font-bold text-text-primary bg-primary px-2.5 py-1 rounded border border-border/50">Unit A-402</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-muted">Block / Tower</span>
                <span className="font-bold text-text-primary">Tower Alpha (Block A)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-muted">Allocated Floor</span>
                <span className="font-bold text-text-primary">4th Floor</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-muted">Residency Classification</span>
                <span className="font-bold text-accent uppercase tracking-wide font-mono">{user?.role || 'RESIDENT'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted">Lease Agreement Expiry</span>
                <span className="font-bold text-text-secondary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-warning" /> Jul 31, 2027
                </span>
              </div>
            </div>
          </Card>
          
          <DocumentViewer />
        </div>

        {/* Right Columns: Registry Tables & Emergency Info */}
        <div className="lg:col-span-2 space-y-6">
          <FamilyTable />
          <VehicleTable />
          <EmergencyContactCard />
        </div>

      </div>

    </div>
  );
};

export default ResidentProfilePage;
