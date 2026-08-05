import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldAlert } from 'lucide-react';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Button } from '../../../shared/components/Button';
import { authService } from '../../../services/auth';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['RESIDENT', 'COMMUNITY_ADMIN'], { errorMap: () => ({ message: 'Please select a role' }) }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', role: 'RESIDENT', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await authService.register(data.email, data.name, data.password, data.role);
      if (response.success) {
        toast.success('Account registered successfully. Please login.');
        navigate('/login');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold font-poppins text-text-primary">Create Account</h2>
        <p className="text-xs text-muted mt-1">Register your profile for LivingHub access</p>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-danger/10 border border-danger/30 rounded-xl flex items-start gap-3 text-xs text-danger text-left">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Full Name" 
          id="name" 
          placeholder="David Miller" 
          error={errors.name} 
          {...register('name')}
        />
        <Input 
          label="Email Address" 
          id="email" 
          placeholder="resident@livinghub.com" 
          error={errors.email} 
          {...register('email')}
        />
        <Select
          label="I am registering as a"
          id="role"
          options={[
            { value: 'RESIDENT', label: 'Resident / Owner / Tenant' },
            { value: 'COMMUNITY_ADMIN', label: 'Community Manager / Admin' }
          ]}
          error={errors.role}
          {...register('role')}
        />
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          error={errors.password} 
          {...register('password')}
        />
        <Input 
          label="Confirm Password" 
          id="confirmPassword" 
          type="password" 
          placeholder="••••••••" 
          error={errors.confirmPassword} 
          {...register('confirmPassword')}
        />

        <Button type="submit" className="w-full font-bold" isLoading={loading}>
          Register Account
        </Button>
      </form>

      <div className="text-center text-xs text-muted">
        Already have an account? <Link to="/login" className="text-accent hover:underline font-semibold">Log in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
