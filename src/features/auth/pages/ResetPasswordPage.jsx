import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { authService } from '../../../services/auth';
import toast from 'react-hot-toast';

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.resetPassword('mock-token', data.password);
      if (response.success) {
        toast.success('Password updated successfully. Please log in.');
        navigate('/login');
      }
    } catch (err) {
      toast.error('Error updating password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold font-poppins text-text-primary">Reset Password</h2>
        <p className="text-xs text-muted mt-1">Set a new secure access credential</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="New Password" 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          error={errors.password} 
          {...register('password')}
        />
        <Input 
          label="Confirm New Password" 
          id="confirmPassword" 
          type="password" 
          placeholder="••••••••" 
          error={errors.confirmPassword} 
          {...register('confirmPassword')}
        />
        <Button type="submit" className="w-full font-bold" isLoading={loading}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
