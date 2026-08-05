import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

export const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[70vh] text-center">
      <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-6 text-accent animate-bounce">
        <Clock className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold font-poppins text-text-primary mb-2">
        {title || 'Feature Coming Soon'}
      </h1>
      <p className="text-text-secondary max-w-md text-sm mb-8 leading-relaxed">
        This microservice interface is currently under construction. When the backend service endpoint contract is established, it will integrate seamlessly without changes to the routing logic.
      </p>
      <Link 
        to="/dashboard" 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-card hover:bg-border text-text-primary text-sm font-semibold rounded-xl transition duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ComingSoon;
