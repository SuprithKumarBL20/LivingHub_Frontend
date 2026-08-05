import React, { useState } from 'react';
import { Table } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Card } from '../../../shared/components/Card';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const FamilyTable = () => {
  const [family, setFamily] = useState([
    { id: '1', name: 'Sophia Miller', relation: 'Spouse', phone: '+1 (555) 019-8812' },
    { id: '2', name: 'Lucas Miller', relation: 'Child', phone: 'None' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relation: 'Spouse', phone: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMember.name) {
      toast.error('Please enter name');
      return;
    }
    const created = {
      id: Date.now().toString(),
      ...newMember
    };
    setFamily([...family, created]);
    setNewMember({ name: '', relation: 'Spouse', phone: '' });
    setShowForm(false);
    toast.success('Family member registered');
  };

  const handleDelete = (id) => {
    setFamily(family.filter(m => m.id !== id));
    toast.success('Member removed');
  };

  const headers = ['Name', 'Relationship', 'Phone Number', 'Actions'];
  const rows = family.map(m => [
    m.name,
    m.relation,
    m.phone || 'None',
    <Button 
      variant="danger" 
      size="sm" 
      onClick={() => handleDelete(m.id)}
      className="p-2 cursor-pointer active:scale-95"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  ]);

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center border-b border-border/40 pb-2">
        <h3 className="text-sm font-bold font-poppins text-text-primary">Family Members Register</h3>
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-1 text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Register Member
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="p-4 bg-primary/35 border border-border/50 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input 
              label="Full Name" 
              id="fam-name" 
              value={newMember.name} 
              onChange={e => setNewMember({ ...newMember, name: e.target.value })} 
              required 
            />
            <Select 
              label="Relationship" 
              id="fam-rel" 
              value={newMember.relation}
              onChange={e => setNewMember({ ...newMember, relation: e.target.value })}
              options={[
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Child', label: 'Child' },
                { value: 'Parent', label: 'Parent' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Other', label: 'Other' }
              ]}
            />
            <Input 
              label="Contact Phone" 
              id="fam-phone" 
              value={newMember.phone} 
              placeholder="Optional"
              onChange={e => setNewMember({ ...newMember, phone: e.target.value })} 
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="glass" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Submit Registration</Button>
          </div>
        </form>
      )}

      {family.length === 0 ? (
        <p className="text-xs text-muted py-6 text-center">No family members registered.</p>
      ) : (
        <div className="overflow-hidden border border-border/40 rounded-xl">
          <Table headers={headers} rows={rows} />
        </div>
      )}
    </Card>
  );
};

export default FamilyTable;
