import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { QrCode, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export const VisitorForm = ({ onSubmitSuccess }) => {
  const [visitor, setVisitor] = useState({
    name: '',
    category: 'Guest',
    phone: '',
    vehiclePlate: '',
    validHours: '24'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!visitor.name || !visitor.phone) {
      toast.error('Please enter visitor name and contact number');
      return;
    }
    setSubmitting(true);
    // Simulate API gateway post request to POST /api/v1/visitors
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitting(false);

    const generated = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      name: visitor.name,
      category: visitor.category,
      phone: visitor.phone,
      vehiclePlate: visitor.vehiclePlate || 'None',
      host: 'David Miller',
      unit: 'A-402',
      validUntil: new Date(Date.now() + parseInt(visitor.validHours) * 3600000).toLocaleString(),
      status: 'APPROVED',
      entryCount: 0
    };

    toast.success('Visitor pre-registration successful!');
    onSubmitSuccess(generated);
  };

  return (
    <Card className="space-y-4">
      <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
        Pre-register Guest / Courier
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
        <Input 
          label="Visitor Full Name" 
          id="vis-name" 
          placeholder="e.g. John Doe" 
          value={visitor.name} 
          onChange={e => setVisitor({ ...visitor, name: e.target.value })} 
          required 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select 
            label="Visitor Category" 
            id="vis-cat" 
            value={visitor.category} 
            onChange={e => setVisitor({ ...visitor, category: e.target.value })}
            options={[
              { value: 'Guest', label: 'Guest / Friend' },
              { value: 'Delivery', label: 'Delivery / Parcel' },
              { value: 'Domestic Worker', label: 'Domestic Worker (Maid/Cook)' },
              { value: 'Maintenance Vendor', label: 'Maintenance Vendor' },
              { value: 'Taxi / Ride Share', label: 'Taxi / Ride Share' },
              { value: 'Courier', label: 'Courier Services (FedEx/UPS)' }
            ]}
          />
          <Input 
            label="Contact Phone" 
            id="vis-phone" 
            placeholder="e.g. +1 (555) 012-3456" 
            value={visitor.phone} 
            onChange={e => setVisitor({ ...visitor, phone: e.target.value })} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input 
            label="Vehicle Plate Number (Optional)" 
            id="vis-plate" 
            placeholder="e.g. NY-9981" 
            value={visitor.vehiclePlate} 
            onChange={e => setVisitor({ ...visitor, vehiclePlate: e.target.value })} 
          />
          <Select 
            label="Pass Validity Duration" 
            id="vis-valid" 
            value={visitor.validHours} 
            onChange={e => setVisitor({ ...visitor, validHours: e.target.value })}
            options={[
              { value: '4', label: '4 Hours (Quick entry)' },
              { value: '12', label: '12 Hours (Half day)' },
              { value: '24', label: '24 Hours (Full day)' },
              { value: '72', label: '72 Hours (Weekend pass)' }
            ]}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-1.5 text-xs" isLoading={submitting}>
          <QrCode className="w-4 h-4" /> Generate Gate Pass
        </Button>
      </form>
    </Card>
  );
};

export default VisitorForm;
