import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Users, Car, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Table } from '../../../shared/components/Table';
import { residentService } from '../../../services/resident';
import toast from 'react-hot-toast';

const familySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relation: z.string().min(2, 'Relation is required (e.g. Spouse, Son)'),
});

const vehicleSchema = z.object({
  model: z.string().min(2, 'Model is required (e.g. Tesla Model 3)'),
  plateNumber: z.string().min(4, 'License plate is required'),
});

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [family, setFamily] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  const [addingFamily, setAddingFamily] = useState(false);
  const [addingVehicle, setAddingVehicle] = useState(false);

  const { register: regFamily, handleSubmit: subFamily, reset: resetFamily, formState: { errors: errFamily } } = useForm({
    resolver: zodResolver(familySchema)
  });

  const { register: regVehicle, handleSubmit: subVehicle, reset: resetVehicle, formState: { errors: errVehicle } } = useForm({
    resolver: zodResolver(vehicleSchema)
  });

  useEffect(() => {
    residentService.getProfile().then(res => setProfile(res.data));
    residentService.getFamilyMembers().then(res => setFamily(res.data));
    residentService.getVehicles().then(res => setVehicles(res.data));
  }, []);

  const handleAddFamily = (data) => {
    const newMember = {
      id: `fam-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      relation: data.relation,
      phoneNumber: '+1 (555) 000-0000'
    };
    setFamily(prev => [...prev, newMember]);
    setAddingFamily(false);
    resetFamily();
    toast.success('Family member added to registry.');
  };

  const handleAddVehicle = (data) => {
    const newVehicle = {
      id: `veh-${Math.random().toString(36).substr(2, 9)}`,
      type: 'Car',
      model: data.model,
      plateNumber: data.plateNumber,
      parkingSlot: 'P-12A'
    };
    setVehicles(prev => [...prev, newVehicle]);
    setAddingVehicle(false);
    resetVehicle();
    toast.success('Vehicle registered successfully.');
  };

  const deleteFamily = (id) => {
    setFamily(prev => prev.filter(f => f.id !== id));
    toast.error('Family member removed.');
  };

  const deleteVehicle = (id) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    toast.error('Vehicle registration revoked.');
  };

  // Convert list mappings for shared UI Table
  const familyHeaders = ['Name', 'Relation', 'Phone Number', 'Actions'];
  const familyRows = family.map(f => [
    f.name,
    f.relation,
    f.phoneNumber || 'N/A',
    <button onClick={() => deleteFamily(f.id)} className="text-danger hover:underline font-bold flex items-center gap-1 cursor-pointer">
      <Trash2 className="w-3.5 h-3.5" /> Delete
    </button>
  ]);

  const vehicleHeaders = ['Model', 'Plate Number', 'Parking Slot', 'Actions'];
  const vehicleRows = vehicles.map(v => [
    v.model,
    v.plateNumber,
    v.parkingSlot,
    <button onClick={() => deleteVehicle(v.id)} className="text-danger hover:underline font-bold flex items-center gap-1 cursor-pointer">
      <Trash2 className="w-3.5 h-3.5" /> Remove
    </button>
  ]);

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      
      {/* Profile Overview Card */}
      <Card className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-20 h-20 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
          <User className="w-10 h-10" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-xl font-bold font-poppins text-text-primary">{profile?.name || 'David Miller'}</h2>
          <p className="text-xs text-muted mt-1">Email: {profile?.email} &bull; Apartment: {profile?.apartmentNumber}</p>
          <div className="inline-flex items-center gap-1.5 mt-3 text-[10px] bg-success/15 border border-success/30 text-success px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Resident Profile Verified
          </div>
        </div>
      </Card>

      {/* Family Members Section */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Family Registries ({family.length})
          </h3>
          <Button onClick={() => setAddingFamily(!addingFamily)} size="sm" variant="secondary" className="gap-1.5 select-none">
            <Plus className="w-4 h-4" /> Add Family
          </Button>
        </div>

        {addingFamily && (
          <form onSubmit={subFamily(handleAddFamily)} className="bg-primary/50 border border-border p-4 rounded-xl space-y-4 mb-6">
            <h4 className="text-xs font-bold text-text-primary">New Family Member Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name" id="fam-name" placeholder="Sarah Miller" error={errFamily.name} {...regFamily('name')} />
              <Input label="Relation" id="fam-relation" placeholder="Spouse" error={errFamily.relation} {...regFamily('relation')} />
            </div>
            <div className="flex justify-end gap-3 mt-2">
              <Button onClick={() => setAddingFamily(false)} size="sm" variant="secondary">Cancel</Button>
              <Button type="submit" size="sm">Save Registry</Button>
            </div>
          </form>
        )}

        <Table headers={familyHeaders} rows={familyRows} emptyMessage="No registered family members." />
      </Card>

      {/* Vehicle Registries Section */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2">
            <Car className="w-4 h-4 text-accent" /> Vehicle registries ({vehicles.length})
          </h3>
          <Button onClick={() => setAddingVehicle(!addingVehicle)} size="sm" variant="secondary" className="gap-1.5 select-none">
            <Plus className="w-4 h-4" /> Add Vehicle
          </Button>
        </div>

        {addingVehicle && (
          <form onSubmit={subVehicle(handleAddVehicle)} className="bg-primary/50 border border-border p-4 rounded-xl space-y-4 mb-6">
            <h4 className="text-xs font-bold text-text-primary">New Vehicle Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Model (Make/Model)" id="veh-model" placeholder="Tesla Model 3" error={errVehicle.model} {...regVehicle('model')} />
              <Input label="License plate" id="veh-plate" placeholder="LIV-4923" error={errVehicle.plateNumber} {...regVehicle('plateNumber')} />
            </div>
            <div className="flex justify-end gap-3 mt-2">
              <Button onClick={() => setAddingVehicle(false)} size="sm" variant="secondary">Cancel</Button>
              <Button type="submit" size="sm">Save Vehicle</Button>
            </div>
          </form>
        )}

        <Table headers={vehicleHeaders} rows={vehicleRows} emptyMessage="No registered vehicles." />
      </Card>

    </div>
  );
};

export default ProfilePage;
