import React from 'react';
import { Card } from '../../../shared/components/Card';
import { FileImage, FileText, ExternalLink, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export const AttachmentViewer = ({ attachments = [] }) => {
  const getIcon = (type) => {
    if (type === 'PDF') return <FileText className="w-5 h-5 text-accent" />;
    return <FileImage className="w-5 h-5 text-accent" />;
  };

  return (
    <Card className="space-y-4">
      <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
        Attachments & Photos
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {attachments.length === 0 ? (
          <p className="text-muted text-center py-6 sm:col-span-2">No attachments uploaded.</p>
        ) : (
          attachments.map(att => (
            <div key={att.id} className="p-3 bg-primary/45 border border-border/55 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {getIcon(att.type)}
                <div className="min-w-0">
                  <p className="font-bold text-text-primary truncate">{att.name}</p>
                  <p className="text-[9px] text-muted">{att.size}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => toast.success(`Simulating preview: ${att.name}`)}
                  className="p-1.5 hover:text-accent transition cursor-pointer"
                  title="View"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => toast.success(`Simulating download of ${att.name}`)}
                  className="p-1.5 hover:text-accent transition cursor-pointer"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default AttachmentViewer;
