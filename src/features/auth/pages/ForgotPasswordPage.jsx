import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { authService } from '../../../services/auth';
import toast from 'react-hot-toast';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.forgotPassword(data.email);
      if (response.success) {
        setSent(true);
        toast.success('Simulated email reset link dispatched.');
      }
    } catch (err) {
      toast.error(err.message || 'Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold font-poppins text-text-primary">Recover Password</h2>
        <p className="text-xs text-muted mt-1">Request a recovery link for password resets</p>
      </div>

      {sent ? (
        <div className="bg-success/15 border border-success/30 p-4 rounded-xl text-center space-y-4">
          <p className="text-xs text-success leading-relaxed font-semibold">
            Password recovery simulation link sent. Look for it in your logs or console output.
          </p>
          <Link to="/login">
            <Button variant="secondary" className="w-full mt-2">Back to Login</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Registered Email" 
            id="email" 
            placeholder="resident@livinghub.com" 
            error={errors.email} 
            {...register('email')}
          />
          <Button type="submit" className="w-full font-bold" isLoading={loading}>
            Send Link
          </Button>
        </form>
      )}

      <div className="text-center text-xs text-muted">
        <Link to="/login" className="text-accent hover:underline font-semibold">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
