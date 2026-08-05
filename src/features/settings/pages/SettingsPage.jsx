import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Switch } from '../../../shared/components/Switch';
import { Bell, ShieldCheck, Mail, Smartphone, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const [channels, setChannels] = useState({
    inAppNotif: true,
    emailNotif: true,
    smsNotif: false,
    pushNotif: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    vehicleScanAlerts: true,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate PUT /api/v1/profile/preferences
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    toast.success('Preferences updated successfully');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent" /> System Preferences & Channels
        </h1>
        <p className="text-xs text-muted mt-1">Configure notification channels delivery methods and privacy settings</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Notification Preferences */}
        <Card className="space-y-6">
          <h2 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
            <Mail className="w-4 h-4 text-accent" /> Notification Channels
          </h2>
          
          <div className="space-y-4">
            <Switch
              label="In-App Alerts inbox"
              description="Receive alerts in the header notification center drawer"
              id="pref-inapp"
              checked={channels.inAppNotif}
              onChange={(val) => setChannels({ ...channels, inAppNotif: val })}
            />
            <Switch
              label="Email updates bulletins"
              description="Receive standard summaries and billing receipts via email"
              id="pref-email"
              checked={channels.emailNotif}
              onChange={(val) => setChannels({ ...channels, emailNotif: val })}
            />
            <Switch
              label="SMS Text notifications (Future)"
              description="Dispatch gate scan alerts to mobile phone via SMS"
              id="pref-sms"
              checked={channels.smsNotif}
              disabled
              onChange={(val) => setChannels({ ...channels, smsNotif: val })}
            />
            <Switch
              label="Mobile Push messages (Future)"
              description="Send real-time alerts to the LivingHub iOS/Android app"
              id="pref-push"
              disabled
              checked={channels.pushNotif}
              onChange={(val) => setChannels({ ...channels, pushNotif: val })}
            />
          </div>
        </Card>

        {/* Privacy & Safety Configurations */}
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2 border-b border-border/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> Privacy & Gate Settings
            </h2>
            
            <div className="space-y-4">
              <Switch
                label="Directory visibility"
                description="Allow building staff to lookup name and family members"
                id="pref-visible"
                checked={privacy.profileVisible}
                onChange={(val) => setPrivacy({ ...privacy, profileVisible: val })}
              />
              <Switch
                label="Vehicle check logs notifications"
                description="Alert me whenever my registered vehicle plates clear the barcode gate"
                id="pref-vscan"
                checked={privacy.vehicleScanAlerts}
                onChange={(val) => setPrivacy({ ...privacy, vehicleScanAlerts: val })}
              />
            </div>
          </Card>

          <Button type="submit" variant="primary" className="w-full" isLoading={saving}>
            Save Preferences Configurations
          </Button>
        </div>

      </form>

    </div>
  );
};

export default SettingsPage;
