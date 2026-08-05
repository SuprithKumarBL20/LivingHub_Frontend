import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { Phone, Plus, Trash2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export const EmergencyContactCard = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Robert Miller', relation: 'Father', phone: '+1 (555) 018-9988', bloodGroup: 'O+', isPrimary: true }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: 'Parent', phone: '', bloodGroup: 'O+', isPrimary: false });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) {
      toast.error('Please enter name and contact phone number');
      return;
    }
    
    let updatedContacts = [...contacts];
    if (newContact.isPrimary) {
      // Toggle off previous primary
      updatedContacts = updatedContacts.map(c => ({ ...c, isPrimary: false }));
    }

    const created = {
      id: Date.now().toString(),
      ...newContact
    };

    setContacts([...updatedContacts, created]);
    setNewContact({ name: '', relation: 'Parent', phone: '', bloodGroup: 'O+', isPrimary: false });
    setShowForm(false);
    toast.success('Emergency contact added');
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success('Contact removed');
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center border-b border-border/40 pb-2">
        <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-danger animate-pulse" /> Emergency Contacts
        </h3>
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-1 text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Add Contact
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="p-4 bg-primary/35 border border-border/50 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Contact Name" 
              id="c-name" 
              value={newContact.name} 
              onChange={e => setNewContact({ ...newContact, name: e.target.value })} 
              required 
            />
            <Input 
              label="Phone Number" 
              id="c-phone" 
              value={newContact.phone} 
              onChange={e => setNewContact({ ...newContact, phone: e.target.value })} 
              required 
            />
            <Select 
              label="Relationship" 
              id="c-rel" 
              value={newContact.relation}
              onChange={e => setNewContact({ ...newContact, relation: e.target.value })}
              options={[
                { value: 'Parent', label: 'Parent' },
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Child', label: 'Child' },
                { value: 'Other', label: 'Other' }
              ]}
            />
            <Select 
              label="Blood Group (Optional)" 
              id="c-blood" 
              value={newContact.bloodGroup}
              onChange={e => setNewContact({ ...newContact, bloodGroup: e.target.value })}
              options={[
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' }
              ]}
            />
          </div>
          
          <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={newContact.isPrimary} 
              onChange={e => setNewContact({ ...newContact, isPrimary: e.target.checked })}
              className="rounded border-border text-accent focus:ring-accent"
            />
            Designate as Primary Emergency Contact
          </label>

          <div className="flex justify-end gap-2">
            <Button variant="glass" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Add Contact</Button>
          </div>
        </form>
      )}

      {contacts.length === 0 ? (
        <p className="text-xs text-muted py-6 text-center">No emergency contacts registered.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map(c => (
            <div key={c.id} className="p-3.5 bg-primary/45 border border-border/55 rounded-xl flex items-center justify-between">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">{c.name}</span>
                  <span className="text-[10px] text-muted font-poppins">({c.relation})</span>
                  {c.isPrimary && <Badge type="danger">PRIMARY</Badge>}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted">
                  <Phone className="w-3 h-3" /> {c.phone}
                </div>
                {c.bloodGroup && (
                  <div className="text-[9px] font-mono text-danger font-semibold bg-danger/5 border border-danger/20 rounded px-1.5 py-0.5 inline-block mt-1">
                    Blood Group: {c.bloodGroup}
                  </div>
                )}
              </div>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => handleDelete(c.id)}
                className="p-2 cursor-pointer active:scale-95 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EmergencyContactCard;
