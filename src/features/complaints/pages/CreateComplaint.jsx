import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Wrench, Upload, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const complaintSchema = z.object({
  title: z.string().min(6, 'Title must contain at least 6 characters'),
  description: z.string().min(12, 'Please write a descriptive issue log (at least 12 characters)'),
  category: z.string().nonempty('Category selection required'),
  priority: z.string().nonempty('Priority selection required'),
});

export const CreateComplaint = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Plumbing',
      priority: 'MEDIUM',
    }
  });

  const category = watch('category');
  const priority = watch('priority');

  // Dynamically calculate estimated SLA resolution
  const getEstimatedSla = () => {
    if (priority === 'CRITICAL') return 'Within 4 Hours (Emergency Dispatch)';
    if (priority === 'HIGH') return 'Within 24 Hours (Next Day Service)';
    if (priority === 'MEDIUM') return 'Within 48 Hours';
    return 'Within 72 Hours';
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    // Simulate network latency calling POST /api/v1/complaints
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitting(false);
    toast.success('Maintenance ticket filed successfully!');
    navigate('/complaints');
  };

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Wrench className="w-5 h-5 text-accent" /> File Maintenance Ticket
        </h1>
        <p className="text-xs text-muted mt-1">Submit plumbing, electrical, or carpentry complaints to building administration</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <Input 
            label="Ticket Subject / Title" 
            id="comp-title" 
            placeholder="e.g. Toilet tank flush handle broken"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select 
              label="Incident Category" 
              id="comp-cat" 
              error={errors.category?.message}
              options={[
                { value: 'Plumbing', label: 'Plumbing' },
                { value: 'Electrical', label: 'Electrical' },
                { value: 'Carpentry', label: 'Carpentry' },
                { value: 'Appliances', label: 'Home Appliances' },
                { value: 'Other', label: 'Other / General' }
              ]}
              {...register('category')}
            />

            <Select 
              label="Severity Priority" 
              id="comp-prio" 
              error={errors.priority?.message}
              options={[
                { value: 'LOW', label: 'Low (General repair)' },
                { value: 'MEDIUM', label: 'Medium (Standard SLA)' },
                { value: 'HIGH', label: 'High (Immediate dispatch)' },
                { value: 'CRITICAL', label: 'Critical (Emergency - SOS)' }
              ]}
              {...register('priority')}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
              Detailed Description
            </label>
            <textarea
              id="comp-desc"
              rows={4}
              placeholder="Describe the issues details, specific location inside unit, and accessibility details..."
              className={`w-full p-3 rounded-xl bg-primary/45 border text-xs text-text-primary focus:outline-none focus:border-accent ${
                errors.description ? 'border-danger' : 'border-border/60'
              }`}
              {...register('description')}
            />
            {errors.description && (
              <span className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.description.message}
              </span>
            )}
          </div>

          {/* SLA Indicator */}
          <div className="p-4 bg-primary/50 border border-border/40 rounded-xl space-y-1 text-xs">
            <p className="text-muted font-poppins">Estimated SLA Target Resolution:</p>
            <p className="font-bold text-accent">{getEstimatedSla()}</p>
          </div>

          {/* Mock Drag drop attachment zone */}
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
              Attach Photos / PDF Logs
            </label>
            <div 
              onClick={() => toast.success('Mock photo selector active')}
              className="border-2 border-dashed border-border/70 hover:border-accent rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center select-none bg-primary/20 active:scale-98"
            >
              <Upload className="w-6 h-6 text-muted" />
              <p className="text-xs font-bold text-text-secondary">Click or drag files to upload</p>
              <p className="text-[10px] text-muted">Supports JPG, PNG, and PDF (Max 5MB size limit)</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="glass" className="w-1/2" onClick={() => navigate('/complaints')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-1/2" isLoading={submitting}>
              Submit Ticket
            </Button>
          </div>
        </Card>
      </form>

    </div>
  );
};

export default CreateComplaint;
