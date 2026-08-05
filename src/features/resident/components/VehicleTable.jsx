import React, { useState } from 'react';
import { Table } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Card } from '../../../shared/components/Card';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([
    { id: '1', makeModel: 'Tesla Model 3 (Black)', plateNumber: '98B-7712', parkingSpot: 'Bay 104' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ makeModel: '', plateNumber: '', parkingSpot: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newVehicle.makeModel || !newVehicle.plateNumber) {
      toast.error('Please enter model and plate number');
      return;
    }
    const created = {
      id: Date.now().toString(),
      ...newVehicle
    };
    setVehicles([...vehicles, created]);
    setNewVehicle({ makeModel: '', plateNumber: '', parkingSpot: '' });
    setShowForm(false);
    toast.success('Vehicle registered successfully');
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success('Vehicle removed');
  };

  const headers = ['Model / Brand', 'License Plate', 'Assigned Slot', 'Actions'];
  const rows = vehicles.map(v => [
    v.makeModel,
    v.plateNumber,
    v.parkingSpot || 'Unassigned',
    <Button 
      variant="danger" 
      size="sm" 
      onClick={() => handleDelete(v.id)}
      className="p-2 cursor-pointer active:scale-95"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  ]);

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center border-b border-border/40 pb-2">
        <h3 className="text-sm font-bold font-poppins text-text-primary">Registered Vehicles</h3>
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-1 text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Register Vehicle
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="p-4 bg-primary/35 border border-border/50 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input 
              label="Make & Model" 
              id="veh-model" 
              placeholder="e.g. Honda Civic"
              value={newVehicle.makeModel} 
              onChange={e => setNewVehicle({ ...newVehicle, makeModel: e.target.value })} 
              required 
            />
            <Input 
              label="License Plate Number" 
              id="veh-plate" 
              placeholder="e.g. NY-998A"
              value={newVehicle.plateNumber} 
              onChange={e => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })} 
              required 
            />
            <Input 
              label="Assigned Parking Slot" 
              id="veh-slot" 
              placeholder="e.g. Bay 202"
              value={newVehicle.parkingSpot} 
              onChange={e => setNewVehicle({ ...newVehicle, parkingSpot: e.target.value })} 
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="glass" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Register Vehicle</Button>
          </div>
        </form>
      )}

      {vehicles.length === 0 ? (
        <p className="text-xs text-muted py-6 text-center">No vehicles registered.</p>
      ) : (
        <div className="overflow-hidden border border-border/40 rounded-xl">
          <Table headers={headers} rows={rows} />
        </div>
      )}
    </Card>
  );
};

export default VehicleTable;
