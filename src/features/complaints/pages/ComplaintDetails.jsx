import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { ComplaintTimeline } from '../components/ComplaintTimeline';
import { CommentSection } from '../components/CommentSection';
import { AttachmentViewer } from '../components/AttachmentViewer';
import { ArrowLeft, MessageSquare, Star, HeartHandshake } from 'lucide-react';
import toast from 'react-hot-toast';

export const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Seed Complaint States
  const [complaint, setComplaint] = useState({
    id: id || 'comp-101',
    title: 'Water leakage in bathroom ceiling',
    category: 'Plumbing',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    date: '2026-08-02',
    description: 'There is a continuous drop leaking from the bathroom false ceiling panel, likely coming from unit A-502 above us. The drywall panel is showing water patches.',
    unit: 'Unit A-402',
    attachments: [
      { id: '1', name: 'ceiling_leak_photo.jpg', size: '1.4 MB', type: 'IMAGE' }
    ]
  });

  const [comments, setComments] = useState([
    { id: '1', author: 'David Miller', role: 'Tenant', content: 'Noticed the wet spot yesterday night, has grown since.', timestamp: 'Aug 02, 09:30 AM' },
    { id: '2', author: 'Gary Vance', role: 'Staff (Plumber)', content: 'Assigned ticket, will drop by A-502 to inspect their plumbing traps first.', timestamp: 'Aug 02, 02:40 PM' }
  ]);

  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [rated, setRated] = useState(false);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'David Miller',
      role: 'Tenant',
      content: text,
      timestamp: 'Just now'
    };
    setComments([...comments, newComment]);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select star rating');
      return;
    }
    setComplaint({ ...complaint, status: 'RATED' });
    setRated(true);
    toast.success('Thank you for rating our service!');
  };

  const getPriorityBadge = (prio) => {
    const maps = { LOW: 'info', MEDIUM: 'warning', HIGH: 'danger', CRITICAL: 'danger' };
    return <Badge type={maps[prio] || 'info'}>{prio}</Badge>;
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => navigate('/complaints')}
            className="p-2 cursor-pointer active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold font-poppins text-text-primary">Ticket {complaint.id}</h1>
              {getPriorityBadge(complaint.priority)}
            </div>
            <p className="text-xs text-muted mt-0.5">{complaint.title}</p>
          </div>
        </div>
        
        {/* Developer simulation controls */}
        <div className="flex gap-2">
          {complaint.status === 'IN_PROGRESS' && (
            <Button 
              size="sm" 
              variant="primary" 
              onClick={() => {
                setComplaint({ ...complaint, status: 'RESOLVED' });
                toast.success('Simulation: Ticket status updated to RESOLVED');
              }}
              className="text-xs active:scale-95"
            >
              Simulate Resolution
            </Button>
          )}
        </div>
      </div>

      {/* 7-Step Workflow Timeline */}
      <ComplaintTimeline currentStatus={complaint.status} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Ticket Metadata & Attachments */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
              Ticket Details
            </h3>
            
            <div className="text-xs text-text-secondary leading-relaxed space-y-4">
              <div>
                <p className="font-bold text-muted uppercase text-[9px] tracking-wider">Filed Date</p>
                <p className="text-text-primary font-medium mt-0.5">{complaint.date}</p>
              </div>
              <div>
                <p className="font-bold text-muted uppercase text-[9px] tracking-wider">Unit Allocation</p>
                <p className="text-text-primary font-medium mt-0.5">{complaint.unit}</p>
              </div>
              <div>
                <p className="font-bold text-muted uppercase text-[9px] tracking-wider">Category</p>
                <p className="text-text-primary font-medium mt-0.5">{complaint.category}</p>
              </div>
              <div>
                <p className="font-bold text-muted uppercase text-[9px] tracking-wider">Incident Description</p>
                <p className="mt-1 bg-primary/20 border border-border/40 rounded-xl p-3 text-text-secondary leading-relaxed">
                  {complaint.description}
                </p>
              </div>
            </div>
          </Card>

          <AttachmentViewer attachments={complaint.attachments} />
        </div>

        {/* Right Side: Conversation log & Feedbacks */}
        <div className="space-y-6">
          <CommentSection comments={comments} onAddComment={handleAddComment} />

          {/* Rating Survey Panel (Visible if status is RESOLVED or CLOSED) */}
          {(complaint.status === 'RESOLVED' || complaint.status === 'CLOSED' || complaint.status === 'RATED') && (
            <Card className="space-y-4 border border-accent/40 bg-accent/5">
              <h3 className="text-xs font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
                <HeartHandshake className="w-4 h-4 text-accent animate-pulse" /> Repair Service Feedback
              </h3>
              
              {complaint.status === 'RATED' || rated ? (
                <div className="text-center py-4 space-y-2 text-xs">
                  <div className="flex justify-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-5 h-5 fill-accent`} />
                    ))}
                  </div>
                  <p className="font-bold text-text-primary">Evaluation Registered!</p>
                  <p className="text-[10px] text-muted">You rated this service 5/5 stars.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRating} className="space-y-4">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Gary Vance marked this task resolved. Rate your satisfaction with the repair work:
                  </p>
                  
                  <div className="flex justify-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setRatingHover(star)}
                        onMouseLeave={() => setRatingHover(0)}
                        className="cursor-pointer transition transform active:scale-90"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= (ratingHover || rating) 
                              ? 'text-accent fill-accent' 
                              : 'text-muted hover:text-accent'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <Button type="submit" variant="primary" className="w-full text-xs">
                    Submit Repair Rating
                  </Button>
                </form>
              )}
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};

export default ComplaintDetails;
