import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Folder, Upload, Download, Trash2, Eye, FileText, FileSpreadsheet, Image } from 'lucide-react';
import toast from 'react-hot-toast';

export const FileManagementPage = () => {
  const [activeCategory, setActiveCategory] = useState('FINANCE');

  const [files, setFiles] = useState([
    { id: 'f-1', name: 'Apartment_Lease_Agreement.pdf', size: '2.4 MB', type: 'pdf', date: '2026-08-01', category: 'RESIDENT' },
    { id: 'f-2', name: 'Kitchen_Leak_Photo.jpg', size: '850 KB', type: 'image', date: '2026-08-02', category: 'COMPLAINT' },
    { id: 'f-3', name: 'August_Invoice_REC-9011.pdf', size: '120 KB', type: 'pdf', date: '2026-08-03', category: 'FINANCE' },
    { id: 'f-4', name: 'Quarterly_Expense_Report.xlsx', size: '1.2 MB', type: 'excel', date: '2026-08-03', category: 'AI_REPORTS' }
  ]);

  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    toast.success('Triggering upload file selector...');
    setTimeout(() => {
      const mockFile = {
        id: `f-${Date.now()}`,
        name: `Uploaded_Asset_${Math.floor(Math.random() * 1000)}.pdf`,
        size: '450 KB',
        type: 'pdf',
        date: new Date().toISOString().split('T')[0],
        category: activeCategory
      };
      setFiles(prev => [mockFile, ...prev]);
      setUploading(false);
      toast.success('Document uploaded and indexed successfully!');
    }, 1000);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
    toast.success('File deleted from index');
  };

  const getFileIcon = (type) => {
    if (type === 'pdf') return <FileText className="w-8 h-8 text-danger shrink-0" />;
    if (type === 'excel') return <FileSpreadsheet className="w-8 h-8 text-success shrink-0" />;
    return <Image className="w-8 h-8 text-info shrink-0" />;
  };

  const filtered = files.filter(f => f.category === activeCategory);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Folder className="w-5 h-5 text-accent" /> Centralized Document Repository
          </h1>
          <p className="text-xs text-muted mt-1">Manage residency contracts, billing invoices, maintenance pictures, and AI generated charts</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={handleUpload}
          className="flex items-center gap-1.5 text-xs active:scale-95 cursor-pointer"
          isLoading={uploading}
        >
          <Upload className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {/* Categories Row */}
      <div className="flex gap-2 border-b border-border/40 pb-2 overflow-x-auto">
        {[
          { id: 'RESIDENT', label: 'Resident Profile docs' },
          { id: 'COMPLAINT', label: 'Complaint attachments' },
          { id: 'FINANCE', label: 'Finance Invoices' },
          { id: 'AI_REPORTS', label: 'AI Generated summaries' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 border-b-2 font-poppins text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id 
                ? 'border-accent text-text-primary' 
                : 'border-transparent text-muted hover:text-text-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <Card className="col-span-full text-center py-16 text-muted text-xs border border-dashed border-border/40">
            No files archived under this category folder. Click "Upload Document" to add records.
          </Card>
        ) : (
          filtered.map(f => (
            <Card key={f.id} className="flex gap-4 items-center justify-between p-4 h-[110px]">
              <div className="flex items-center gap-3 min-w-0">
                {getFileIcon(f.type)}
                <div className="space-y-0.5 text-xs text-left min-w-0">
                  <p className="font-bold text-text-primary truncate" title={f.name}>{f.name}</p>
                  <p className="text-[10px] text-muted">{f.size} &bull; Uploaded {f.date}</p>
                </div>
              </div>

              <div className="flex gap-1 shrink-0">
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => toast.success(`Simulating preview of ${f.name}`)}
                  className="p-2 cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => toast.success(`Simulating download of ${f.name}`)}
                  className="p-2 cursor-pointer"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => handleDelete(f.id)}
                  className="p-2 cursor-pointer text-danger hover:bg-danger/10"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

    </div>
  );
};

export default FileManagementPage;
