import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { useAuthStore } from '../../../store/authStore';
import { authService } from '../../../services/auth';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore(state => state.login);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await authService.login(data.email, data.password);
      if (response.success) {
        // Redirect to OTP page for Phase 1 verification demonstration
        toast.success('Credentials verified. Please enter OTP.');
        navigate('/otp', { state: { email: data.email, token: response.data.token, user: response.data.user } });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
      toast.error(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill fields for developer testing shortcuts
  const handleQuickLogin = (email, pwd) => {
    setValue('email', email);
    setValue('password', pwd);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold font-poppins text-text-primary">Welcome Back</h2>
        <p className="text-xs text-muted mt-1">Access your property dashboard portal</p>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-danger/10 border border-danger/30 rounded-xl flex items-start gap-3 text-xs text-danger leading-relaxed text-left">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Email Address" 
          id="email" 
          placeholder="resident@livinghub.com" 
          error={errors.email} 
          {...register('email')}
        />
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          error={errors.password} 
          {...register('password')}
        />

        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="rounded border-border text-accent focus:ring-accent bg-primary" />
            <span className="text-muted">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-accent hover:underline font-semibold">Forgot Password?</Link>
        </div>

        <Button type="submit" className="w-full font-bold" isLoading={loading}>
          Log in
        </Button>
      </form>

      {/* Developer Quick-logins Panel */}
      <div className="bg-primary/40 border border-border/50 p-4 rounded-xl space-y-3">
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider text-left flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-accent" /> Developer Quick Logins (Phase 1)
        </p>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-medium font-poppins">
          <button 
            type="button" 
            onClick={() => handleQuickLogin('resident@livinghub.com', 'resident123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Resident
          </button>
          <button 
            type="button" 
            onClick={() => handleQuickLogin('admin@livinghub.com', 'admin123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Comm Admin
          </button>
          <button 
            type="button" 
            onClick={() => handleQuickLogin('superadmin@livinghub.com', 'super123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Super Admin
          </button>
          <button 
            type="button" 
            onClick={() => handleQuickLogin('security@livinghub.com', 'security123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Security Guard
          </button>
          <button 
            type="button" 
            onClick={() => handleQuickLogin('maintenance@livinghub.com', 'maintenance123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Maintenance
          </button>
          <button 
            type="button" 
            onClick={() => handleQuickLogin('accountant@livinghub.com', 'accountant123')}
            className="px-2.5 py-1.5 bg-card hover:bg-border rounded-lg text-text-secondary hover:text-text-primary transition"
          >
            Accountant
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-muted">
        Don't have an account? <Link to="/register" className="text-accent hover:underline font-semibold">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
