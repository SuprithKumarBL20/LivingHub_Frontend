import React from 'react';
import { Card } from '../shared/components/Card';

export const AboutPage = () => {
  return (
    <div className="bg-primary min-h-screen py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-text-primary mb-6">About LivingHub</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-12">
          LivingHub is designed to streamline property operations, security passcodes, maintenance ledgers, and resident forums using a microservice architecture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <Card>
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-3">Our Mission</h3>
            <p className="text-xs text-muted leading-relaxed">
              We empower modern communities with highly response-driven APIs, secure real-time WebSocket feeds, and intelligent automated workflows.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold font-poppins text-text-primary mb-3">SaaS Ready Architecture</h3>
            <p className="text-xs text-muted leading-relaxed">
              Equipped with dynamic color customization, tenant branding injections, and strict authorization boundary filters.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
