import React from 'react';
import { Card } from '../shared/components/Card';
import { Button } from '../shared/components/Button';
import { Input } from '../shared/components/Input';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been submitted. We will contact you soon!');
  };

  return (
    <div className="bg-primary min-h-screen py-16 px-6 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-poppins text-text-primary mb-2">Contact Sales</h1>
          <p className="text-xs text-muted">Let us set up LivingHub for your community.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Your Name" id="name" placeholder="John Doe" required />
            <Input label="Work Email" id="email" type="email" placeholder="john@company.com" required />
            <Input label="Community Name" id="community" placeholder="Sterling Towers" required />
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="message" className="text-xs font-semibold text-text-secondary select-none font-poppins">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                placeholder="Tell us about your properties..."
                required
                className="w-full px-4 py-2.5 bg-primary/60 border border-border/60 focus:border-accent rounded-xl text-text-primary placeholder:text-muted/70 text-sm outline-none transition"
              />
            </div>
            <Button type="submit" className="w-full">Submit Query</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
