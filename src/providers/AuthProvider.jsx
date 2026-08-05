import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth';
import { logger } from '../shared/utils/logger';
import { Home } from 'lucide-react';

export const AuthProvider = ({ children }) => {
  const { token, login, logout } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          logger.info('AuthProvider: Validating session token on start...');
          // Check expiration
          const parts = token.split('.');
          let isExpired = false;
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.exp && Date.now() >= payload.exp * 1000) {
              isExpired = true;
            }
          }

          let activeToken = token;
          if (isExpired) {
            logger.warn('AuthProvider: Session token expired. Refreshing...');
            const refreshRes = await authService.refreshToken(token);
            if (refreshRes.success) {
              activeToken = refreshRes.data.token;
            } else {
              throw new Error('Refresh failed');
            }
          }

          // Fetch real profile details from /auth/me
          const meRes = await authService.getMe();
          if (meRes.success) {
            logger.info('AuthProvider: Session restored successfully for ' + meRes.data.name);
            login(activeToken, meRes.data, true);
          } else {
            throw new Error('Failed to resolve profile');
          }
        } catch (err) {
          logger.error('AuthProvider: Token validation failed. Session cleared.', err);
          logout();
        }
      }
      setInitializing(false);
    };

    checkAuth();
  }, [token, login, logout]);

  if (initializing) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center flex-col gap-6 text-center select-none font-sans">
        <div className="flex items-center gap-3 text-text-primary font-bold font-poppins text-2xl tracking-tight mb-2 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
            <Home className="w-6 h-6" />
          </div>
          Living<span>Hub</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-[3.5px] border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary font-semibold font-poppins text-xs tracking-wide">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
