import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const DocumentViewer = () => {
  const [documents] = useState([
    { id: '1', name: 'Tenancy_Lease_Agreement.pdf', size: '2.4 MB', type: 'Lease Contract', date: 'Jul 15, 2026' },
    { id: '2', name: 'Community_Rules_Bylaws.pdf', size: '1.1 MB', type: 'Bylaws Rules', date: 'Jan 04, 2026' }
  ]);

  const [viewingId, setViewingId] = useState(null);

  const handleView = (id, name) => {
    setViewingId(id);
    setTimeout(() => {
      setViewingId(null);
      toast.success(`Simulating preview of: ${name}`);
    }, 1000);
  };

  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
        Tenancy & Community Documents
      </h3>
      
      <div className="space-y-3.5 text-xs">
        {documents.map(d => (
          <div key={d.id} className="p-3.5 bg-primary/45 border border-border/55 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-text-primary">{d.name}</p>
                <p className="text-[10px] text-muted">{d.size} &bull; Uploaded {d.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge type="info">{d.type}</Badge>
              <Button 
                variant="glass" 
                size="sm" 
                onClick={() => handleView(d.id, d.name)}
                disabled={viewingId === d.id}
                className="flex items-center gap-1 text-xs cursor-pointer active:scale-95"
              >
                {viewingId === d.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </>
                )}
              </Button>
              <Button 
                variant="glass" 
                size="sm" 
                onClick={() => toast.success(`Initiated mock download of ${d.name}`)}
                className="p-2 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentViewer;
