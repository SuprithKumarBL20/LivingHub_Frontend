import React from 'react';
import { Card } from '../shared/components/Card';
import { Button } from '../shared/components/Button';
import { Check } from 'lucide-react';

export const PricingPage = () => {
  return (
    <div className="bg-primary min-h-screen py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-text-primary mb-3">Simple, Scalable Pricing</h1>
        <p className="text-text-secondary text-xs mb-16">Choose a plan tailored for your residential complexes.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <Card className="flex flex-col text-left">
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-1">Standard</h3>
            <p className="text-[10px] text-muted mb-6">For single tower properties</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-text-primary font-mono">$99</span>
              <span className="text-xs text-muted">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-text-secondary mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Up to 100 Apartments</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Core Maintenance Logs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Security pass queues</li>
            </ul>
            <Button variant="secondary" className="w-full">Get Started</Button>
          </Card>

          {/* Plan 2 */}
          <Card className="flex flex-col text-left border border-accent shadow-lg shadow-accent/5">
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-1">Professional</h3>
            <p className="text-[10px] text-accent font-semibold mb-6">MOST POPULAR</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-text-primary font-mono">$199</span>
              <span className="text-xs text-muted">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-text-secondary mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Up to 500 Apartments</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Real-time WebSocket alerts</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> consolidated bills ledgers</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> AI chatbot overlay</li>
            </ul>
            <Button variant="primary" className="w-full">Get Started</Button>
          </Card>

          {/* Plan 3 */}
          <Card className="flex flex-col text-left">
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-1">Enterprise</h3>
            <p className="text-[10px] text-muted mb-6">For multi-site portfolios</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-text-primary font-mono">Custom</span>
            </div>
            <ul className="space-y-3 text-xs text-text-secondary mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Unlimited Apartments</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Tenant branding styling</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Dedicated hosting gateway</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> API developer credentials</li>
            </ul>
            <Button variant="secondary" className="w-full">Contact Sales</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
