import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useThemeStore } from '../../../store/themeStore';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { User, Lock, Settings, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const UserProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 019-2834',
    language: 'en',
  });

  const [pwdData, setPwdData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    // Simulate API request to PUT /api/v1/profile
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    updateUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    
    setSavingProfile(false);
    toast.success('Account profile updated successfully');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setSavingPassword(true);
    // Simulate API request to PUT /api/v1/profile/password
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSavingPassword(false);
    toast.success('Password updated successfully');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <User className="w-5 h-5 text-accent" /> Account Settings
        </h1>
        <p className="text-xs text-muted mt-1">Manage credentials, passwords, and client settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Form */}
        <Card className="space-y-4">
          <h2 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
            <User className="w-4 h-4 text-accent" /> Personal Information
          </h2>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="profile-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              id="profile-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              id="profile-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            
            <Select
              label="System Language"
              id="profile-lang"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              options={[
                { value: 'en', label: 'English' },
                { value: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
                { value: 'hi', label: 'Hindi (हिन्दी)' }
              ]}
            />
            
            <Button type="submit" variant="primary" className="w-full" isLoading={savingProfile}>
              Save Profile Details
            </Button>
          </form>
        </Card>

        {/* Password Reset Form & Theme Configs */}
        <div className="space-y-8">
          <Card className="space-y-4">
            <h2 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
              <Lock className="w-4 h-4 text-accent" /> Change Password
            </h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                id="current-password"
                type="password"
                value={pwdData.currentPassword}
                onChange={(e) => setPwdData({ ...pwdData, currentPassword: e.target.value })}
                required
              />
              <Input
                label="New Password"
                id="new-password"
                type="password"
                value={pwdData.newPassword}
                onChange={(e) => setPwdData({ ...pwdData, newPassword: e.target.value })}
                required
              />
              <Input
                label="Confirm New Password"
                id="confirm-password"
                type="password"
                value={pwdData.confirmPassword}
                onChange={(e) => setPwdData({ ...pwdData, confirmPassword: e.target.value })}
                required
              />
              
              <Button type="submit" variant="glass" className="w-full" isLoading={savingPassword}>
                Update Password
              </Button>
            </form>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
              <Settings className="w-4 h-4 text-accent" /> Interface Preferences
            </h2>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted">Color Palette Theme</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={theme === 'dark' ? 'primary' : 'glass'}
                  onClick={() => setTheme('dark')}
                  className="px-3"
                >
                  Dark Mode
                </Button>
                <Button 
                  size="sm" 
                  variant={theme === 'light' ? 'primary' : 'glass'}
                  onClick={() => setTheme('light')}
                  className="px-3"
                >
                  Light Mode
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
