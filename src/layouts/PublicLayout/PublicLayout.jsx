import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-primary text-text-secondary flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-secondary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-text-primary font-bold font-poppins text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary">
              <Home className="w-5 h-5" />
            </div>
            Living<span className="text-accent">Hub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-text-primary transition">Home</Link>
            <Link to="/about" className="hover:text-text-primary transition">About</Link>
            <Link to="/pricing" className="hover:text-text-primary transition">Pricing</Link>
            <Link to="/contact" className="hover:text-text-primary transition">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold hover:text-text-primary transition">
              Log in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-accent hover:bg-accent-hover text-primary text-sm font-bold rounded-lg transition duration-200">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-12 text-center text-xs text-muted">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p>&copy; {new Date().getFullYear()} LivingHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
