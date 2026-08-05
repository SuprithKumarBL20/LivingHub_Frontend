import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const ErrorLayout = () => {
  return (
    <div className="min-h-screen bg-primary text-text-secondary flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 bg-card border border-danger/30 rounded-2xl flex items-center justify-center text-danger mb-6 shadow-lg shadow-danger/5">
        <ShieldAlert className="w-8 h-8" />
      </div>
      
      <main className="max-w-md">
        <Outlet />
      </main>

      <div className="mt-8">
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-card hover:bg-border text-text-primary text-sm font-semibold rounded-xl border border-border transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayout;
