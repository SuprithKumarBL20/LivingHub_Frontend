import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { ShoppingBag, Plus, Search, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export const MarketplaceHome = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: '1', title: 'Ergonomic Office Chair', price: 85, category: 'Furniture', status: 'Available', date: '2026-08-01', description: 'Gently used home office mesh chair. Fully adjustable armrests and height.', owner: 'Sophia Miller' },
    { id: '2', title: 'Coffee Maker (12-Cup)', price: 25, category: 'Appliances', status: 'Reserved', date: '2026-08-02', description: 'Programmable drip coffee maker. Works perfectly, clean filter basket.', owner: 'David Miller' },
    { id: '3', title: 'Mountain Bike (21 Speed)', price: 150, category: 'Vehicles', status: 'Available', date: '2026-07-28', description: 'Dual suspension mountain bicycle. Gears and brakes operate smoothly.', owner: 'Lucas Sterling' }
  ]);

  const [filters, setFilters] = useState({ category: '', search: '' });
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', price: '', category: 'Furniture', description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.price) {
      toast.error('Please enter title and price');
      return;
    }
    const created = {
      id: Date.now().toString(),
      title: newItem.title,
      price: parseFloat(newItem.price),
      category: newItem.category,
      status: 'Available',
      date: new Date().toISOString().split('T')[0],
      description: newItem.description,
      owner: 'David Miller'
    };
    setItems([created, ...items]);
    setNewItem({ title: '', price: '', category: 'Furniture', description: '' });
    setShowForm(false);
    toast.success('Marketplace listing posted!');
  };

  const filtered = items.filter(i => {
    if (filters.category && i.category !== filters.category) return false;
    if (filters.search && !i.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" /> Community Classifieds Marketplace
          </h1>
          <p className="text-xs text-muted mt-1">Buy, sell, or rent items securely within our residential tower</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-1.5 text-xs active:scale-95"
        >
          <Plus className="w-4 h-4" /> Post Classified Listing
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd}>
          <Card className="space-y-4 p-6 border border-accent/20 bg-accent/5">
            <h3 className="text-xs font-bold font-poppins text-text-primary">Create Classified Listing</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input 
                label="Item Name / Title" 
                id="item-title" 
                value={newItem.title} 
                onChange={e => setNewItem({ ...newItem, title: e.target.value })} 
                required 
              />
              <Input 
                label="Price ($)" 
                id="item-price" 
                type="number"
                value={newItem.price} 
                onChange={e => setNewItem({ ...newItem, price: e.target.value })} 
                required 
              />
              <Select 
                label="Category" 
                id="item-cat" 
                value={newItem.category}
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                options={[
                  { value: 'Furniture', label: 'Furniture' },
                  { value: 'Appliances', label: 'Appliances' },
                  { value: 'Electronics', label: 'Electronics' },
                  { value: 'Vehicles', label: 'Vehicles' },
                  { value: 'Books', label: 'Books' },
                  { value: 'Miscellaneous', label: 'Miscellaneous' }
                ]}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Item Description</label>
              <textarea 
                rows={2}
                value={newItem.description}
                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full p-2.5 bg-primary/40 border border-border/60 rounded-xl text-xs focus:outline-none focus:border-accent text-text-primary"
                placeholder="Details about quality, dimensions, age..."
              />
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <Button variant="glass" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm">Publish Listing</Button>
            </div>
          </Card>
        </form>
      )}

      {/* Filters */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Input 
          label="Search listings" 
          id="search-mkt" 
          placeholder="e.g. Chair..." 
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />
        <Select 
          label="Filter by Category" 
          id="filter-mcat" 
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Furniture', label: 'Furniture' },
            { value: 'Appliances', label: 'Appliances' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Vehicles', label: 'Vehicles' },
            { value: 'Books', label: 'Books' }
          ]}
        />
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filtered.map(i => (
          <Card key={i.id} className="flex flex-col justify-between h-[280px]">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge type={i.status === 'Available' ? 'success' : 'warning'}>{i.status}</Badge>
                <span className="font-mono text-xs font-bold text-accent">${i.price}</span>
              </div>
              <h3 className="text-sm font-bold font-poppins text-text-primary mt-2">{i.title}</h3>
              <p className="text-[10px] text-muted">{i.category} &bull; Posted {i.date}</p>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 pt-2">{i.description}</p>
            </div>

            <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-4">
              <span className="text-[10px] text-muted">Seller: {i.owner}</span>
              <Button 
                variant="glass" 
                size="sm" 
                onClick={() => navigate(`/marketplace/${i.id}`)}
                className="text-xs active:scale-95"
              >
                Inspect details
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default MarketplaceHome;
