import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { useAuthStore } from '../../../store/authStore';
import { authService } from '../../../services/auth';
import toast from 'react-hot-toast';

const otpSchema = z.object({
  code: z.string().length(5, 'OTP must be exactly 5 digits'),
});

export const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginStore = useAuthStore(state => state.login);
  const [loading, setLoading] = useState(false);

  const email = location.state?.email || 'user@livinghub.com';
  const token = location.state?.token;
  const user = location.state?.user;

  useEffect(() => {
    // Fire off mock OTP simulation
    authService.sendOtp(email);
  }, [email]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(otpSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.verifyOtp(email, data.code);
      if (response.success && token && user) {
        loginStore(token, user, true);
        toast.success(`Welcome, ${user.name}!`);
        navigate('/dashboard');
      } else if (response.success) {
        toast.success('Simulated verify successful.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message || 'Verification failed. Use code 12345.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold font-poppins text-text-primary">OTP Verification</h2>
        <p className="text-xs text-muted mt-1">We sent a 5-digit verification code to <span className="font-semibold text-text-secondary">{email}</span></p>
      </div>

      <div className="bg-accent/10 border border-accent/30 p-3 rounded-xl text-center text-xs text-accent">
        Developer Hint: Enter <span className="font-bold">12345</span> to pass.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Verification Code" 
          id="code" 
          placeholder="12345" 
          maxLength={5}
          error={errors.code} 
          {...register('code')}
        />
        <Button type="submit" className="w-full font-bold" isLoading={loading}>
          Verify OTP
        </Button>
      </form>

      <div className="text-center text-xs text-muted">
        Didn't receive code?{' '}
        <button 
          onClick={() => authService.sendOtp(email).then(() => toast.success('Code resent.'))}
          className="text-accent hover:underline font-semibold"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
