import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Search, History, HelpCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const GlobalSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock global indexed database
  const index = {
    residents: [
      { name: 'Sophia Miller', unit: 'A-402', role: 'Resident' },
      { name: 'David Miller', unit: 'A-402', role: 'Primary Host' }
    ],
    complaints: [
      { id: 'LH-1092', title: 'Elevator B safety certificate check', status: 'IN_PROGRESS' },
      { id: 'LH-1093', title: 'Water pipe leak in kitchen cabinet', status: 'RESOLVED' }
    ],
    marketplace: [
      { id: '1', title: 'Ergonomic Office Chair', price: '$85.00', status: 'Available' }
    ],
    bills: [
      { id: 'INV-8813', title: 'Water Meter Utility Charges', amount: '$110.50', status: 'DUE' }
    ]
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    // Simulate GET /api/v1/search?q=query
    await new Promise(resolve => setTimeout(resolve, 600));
    setLoading(false);

    const q = query.toLowerCase();
    const filtered = {
      residents: index.residents.filter(r => r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q)),
      complaints: index.complaints.filter(c => c.title.toLowerCase().includes(q)),
      marketplace: index.marketplace.filter(m => m.title.toLowerCase().includes(q)),
      bills: index.bills.filter(b => b.title.toLowerCase().includes(q))
    };

    setResults(filtered);
    toast.success('Indexed search compilation completed!');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Search className="w-5 h-5 text-accent" /> Centralized Global Search
        </h1>
        <p className="text-xs text-muted mt-1">Search residents, visitors, complaints, utility bills, and lease agreements instantly</p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative w-full">
          <input 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search keyword indexes (e.g. Miller, water, elevator, chair...)"
            className="w-full pl-11 pr-4 py-3.5 bg-primary/40 border border-border/60 rounded-xl text-xs focus:outline-none focus:border-accent text-text-primary font-poppins"
            required
          />
          <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-muted" />
        </div>
        <Button type="submit" variant="primary" className="px-6 text-xs active:scale-95 cursor-pointer" isLoading={loading}>
          Search
        </Button>
      </form>

      {/* Suggested & Recent */}
      <div className="flex gap-6 text-[10px] text-muted items-center flex-wrap pt-2">
        <span className="flex items-center gap-1"><History className="w-3.5 h-3.5" /> Recent:</span>
        {['water leak', 'Miller', 'elevator'].map((rec, idx) => (
          <button 
            key={idx}
            type="button"
            onClick={() => {
              setQuery(rec);
              handleSearch();
            }}
            className="hover:text-accent border-b border-dashed border-muted hover:border-accent transition cursor-pointer"
          >
            {rec}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> Press Enter to query</span>
      </div>

      {/* Search Results Display */}
      {results && (
        <div className="space-y-6">
          
          {/* Residents Results */}
          {results.residents.length > 0 && (
            <Card className="space-y-3">
              <h3 className="text-xs font-bold font-poppins text-accent uppercase tracking-wider border-b border-border/40 pb-1">
                Resident Profiles
              </h3>
              <div className="space-y-2.5 text-xs text-left">
                {results.residents.map((r, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-primary/25 rounded-lg border border-border/30">
                    <span className="font-bold text-text-primary">{r.name}</span>
                    <div className="flex gap-2">
                      <span className="font-mono text-muted">{r.unit}</span>
                      <Badge type="info">{r.role}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Complaints Results */}
          {results.complaints.length > 0 && (
            <Card className="space-y-3">
              <h3 className="text-xs font-bold font-poppins text-accent uppercase tracking-wider border-b border-border/40 pb-1">
                Complaints Tickets
              </h3>
              <div className="space-y-2.5 text-xs text-left">
                {results.complaints.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-primary/25 rounded-lg border border-border/30">
                    <span className="font-bold text-text-primary">{c.title}</span>
                    <div className="flex gap-2 items-center">
                      <span className="font-mono text-muted">{c.id}</span>
                      <Badge type="warning">{c.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Marketplace Results */}
          {results.marketplace.length > 0 && (
            <Card className="space-y-3">
              <h3 className="text-xs font-bold font-poppins text-accent uppercase tracking-wider border-b border-border/40 pb-1">
                Classifieds Marketplace
              </h3>
              <div className="space-y-2.5 text-xs text-left">
                {results.marketplace.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-primary/25 rounded-lg border border-border/30">
                    <span className="font-bold text-text-primary">{m.title}</span>
                    <div className="flex gap-2 items-center">
                      <span className="font-mono text-success font-bold">{m.price}</span>
                      <Badge type="success">{m.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Bills Results */}
          {results.bills.length > 0 && (
            <Card className="space-y-3">
              <h3 className="text-xs font-bold font-poppins text-accent uppercase tracking-wider border-b border-border/40 pb-1">
                Utility Invoices
              </h3>
              <div className="space-y-2.5 text-xs text-left">
                {results.bills.map((b, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-primary/25 rounded-lg border border-border/30">
                    <span className="font-bold text-text-primary">{b.title}</span>
                    <div className="flex gap-2 items-center">
                      <span className="font-mono text-danger font-bold">{b.amount}</span>
                      <Badge type="warning">{b.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Empty State */}
          {Object.values(results).every(arr => arr.length === 0) && (
            <Card className="text-center py-16 text-muted text-xs">
              No results found matching keyword. Try query "water", "leak", or "Miller".
            </Card>
          )}

        </div>
      )}

    </div>
  );
};

export default GlobalSearchPage;
