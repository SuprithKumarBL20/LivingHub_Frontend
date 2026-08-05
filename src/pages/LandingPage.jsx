import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Zap, Users, Landmark, Wrench, Compass, ArrowRight, QrCode } from 'lucide-react';
import { Card } from '../shared/components/Card';
import { Button } from '../shared/components/Button';

export const LandingPage = () => {
  return (
    <div className="bg-primary text-text-secondary overflow-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-32 px-6 max-w-7xl mx-auto text-center border-b border-border/20">
        <div className="absolute top-0 inset-x-0 w-full h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <Badge className="mb-4">Version 1.0 Live</Badge>
        <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-text-primary tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
          AI-Powered Smart Community & <span className="text-accent">Apartment Management</span>
        </h1>
        <p className="text-sm lg:text-base text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          LivingHub merges real-time microservices, smart gate pass scanning, automated billing invoices, and an AI resident helper in a single SaaS dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" variant="primary" className="gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold font-poppins text-text-primary mb-3">Enterprise Community Primitives</h2>
          <p className="text-xs text-muted max-w-md mx-auto">Everything needed to run automated residential complexes in parallel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:border-accent transition duration-200">
            <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-2">AI Resident Guide</h3>
            <p className="text-xs text-muted leading-relaxed">
              Auto-generate maintenance tickets from conversations, check bill ledgers instantly, and ask community questions from a floating helper.
            </p>
          </Card>

          <Card className="hover:border-accent transition duration-200">
            <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent mb-6">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-2">Secure Gate passes</h3>
            <p className="text-xs text-muted leading-relaxed">
              Pre-approve visitors and delivery drivers with one-time QR passcodes. Alerts residents instantly via WebSockets upon scan events.
            </p>
          </Card>

          <Card className="hover:border-accent transition duration-200">
            <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent mb-6">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-2">Billing & Stripe</h3>
            <p className="text-xs text-muted leading-relaxed">
              Consolidated invoice ledgers for electricity, water, and facility rentals. Fully integrated with Stripe checkout flows.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. Microservice Stats */}
      <section className="bg-secondary/65 border-y border-border/40 py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-3xl font-bold font-mono text-text-primary">99.9%</h4>
            <p className="text-xs text-muted mt-1 uppercase font-semibold tracking-wider">Gateway Uptime</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold font-mono text-text-primary">&lt;100ms</h4>
            <p className="text-xs text-muted mt-1 uppercase font-semibold tracking-wider">API Latency</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold font-mono text-text-primary">15+</h4>
            <p className="text-xs text-muted mt-1 uppercase font-semibold tracking-wider">Active Modules</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold font-mono text-text-primary">128-bit</h4>
            <p className="text-xs text-muted mt-1 uppercase font-semibold tracking-wider">Token Encryption</p>
          </div>
        </div>
      </section>

    </div>
  );
};

// Helper badge component for internal use
const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 bg-accent/15 border border-accent/25 text-accent text-xs font-semibold rounded-full tracking-wider ${className}`}>
    {children}
  </span>
);

export default LandingPage;
