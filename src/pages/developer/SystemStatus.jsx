import React, { useEffect, useState } from 'react';
import { ShieldCheck, HardDrive, Wifi, Activity, Terminal } from 'lucide-react';
import { Card } from '../../shared/components/Card';
import { Badge } from '../../shared/components/Badge';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useSocket } from '../../hooks/useSocket';
import { appConfig } from '../../config/appConfig';

export const SystemStatus = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();
  const socket = useSocket();

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      setSocketConnected(socket.connected);
      const onConnect = () => setSocketConnected(true);
      const onDisconnect = () => setSocketConnected(false);

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
    } else {
      setSocketConnected(false);
    }
  }, [socket]);

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-20">
      
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold font-poppins text-text-primary flex items-center gap-2.5">
          <Terminal className="w-6 h-6 text-accent" /> Developer Diagnostics Console
        </h1>
        <p className="text-xs text-muted mt-1">Audit active API sessions, WebSocket feeds, and microservice connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Network & Infrastructure Card */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-accent" /> Gateway & Sockets
          </h3>
          
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted">API Gateway URL</span>
              <span className="font-mono text-text-primary bg-primary px-2.5 py-1 rounded border border-border/40 select-all">{appConfig.apiGateway}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted">WebSocket Status</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-success animate-pulse' : 'bg-danger'}`} />
                <span className="font-bold text-text-primary uppercase tracking-wide">
                  {socketConnected ? 'Connected' : 'Disconnected / Offline'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted">App Version</span>
              <span className="font-mono font-bold text-text-secondary">{appConfig.version}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-muted">Active Theme</span>
              <span className="uppercase font-mono font-bold text-text-secondary">{theme} mode</span>
            </div>
          </div>
        </Card>

        {/* Auth Credentials Card */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-poppins text-text-primary flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" /> Session & User Details
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted">Auth State</span>
              <Badge type={isAuthenticated ? 'success' : 'danger'}>
                {isAuthenticated ? 'Authenticated' : 'Anonymous'}
              </Badge>
            </div>

            {isAuthenticated && user && (
              <>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted">User Role</span>
                  <span className="font-bold text-text-primary tracking-wide uppercase font-mono">{user.role}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 py-2">
                  <span className="text-muted">Permissions List</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {user.permissions.map((p, i) => (
                      <span key={i} className="font-mono text-[9px] bg-primary border border-border/60 text-accent px-2 py-0.5 rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

      </div>

    </div>
  );
};

export default SystemStatus;
