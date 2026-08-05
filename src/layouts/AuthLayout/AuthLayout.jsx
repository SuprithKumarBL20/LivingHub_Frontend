import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambience Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[460px] bg-card/60 backdrop-blur-md border border-border p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 text-text-primary font-bold font-poppins text-xl tracking-tight mb-2">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-primary">
              <Home className="w-5.5 h-5.5" />
            </div>
            Living<span className="text-accent">Hub</span>
          </Link>
          <p className="text-xs text-muted">AI-Powered Community & Apartment Management</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
