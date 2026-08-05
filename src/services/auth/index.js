import { authApi } from './api/authApi';
import { authMapper } from './mappers/authMapper';
import { authQueries } from './queries/authQueries';
import { logger } from '../../shared/utils/logger';

// Predefined accounts for login demonstration in Phase 1 placeholder
const PLACEHOLDER_ACCOUNTS = {
  'superadmin@livinghub.com': {
    password: 'super123',
    user: {
      id: 'usr-super',
      name: 'Alexander Sterling',
      email: 'superadmin@livinghub.com',
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      permissions: ['*'],
      phoneNumber: '+1 (555) 999-0000',
    }
  },
  'admin@livinghub.com': {
    password: 'admin123',
    user: {
      id: 'usr-admin',
      name: 'Evelyn Carter',
      email: 'admin@livinghub.com',
      role: 'COMMUNITY_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      permissions: ['read:all', 'write:all', 'approve:residents', 'manage:facilities', 'publish:notices'],
      communityId: 'comm-1',
      phoneNumber: '+1 (555) 100-2000',
    }
  },
  'resident@livinghub.com': {
    password: 'resident123',
    user: {
      id: 'usr-resident',
      name: 'David Miller',
      email: 'resident@livinghub.com',
      role: 'RESIDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      permissions: ['read:own', 'write:own', 'book:facilities', 'file:complaints', 'request:visitors'],
      communityId: 'comm-1',
      apartmentNumber: 'Apt 12B',
      phoneNumber: '+1 (555) 200-3000',
    }
  },
  'security@livinghub.com': {
    password: 'security123',
    user: {
      id: 'usr-security',
      name: 'Officer Marcus',
      email: 'security@livinghub.com',
      role: 'SECURITY',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      permissions: ['read:visitors', 'check:visitors', 'trigger:emergency'],
      communityId: 'comm-1',
      phoneNumber: '+1 (555) 500-6000',
    }
  },
  'maintenance@livinghub.com': {
    password: 'maintenance123',
    user: {
      id: 'usr-maint',
      name: 'Gary Vance',
      email: 'maintenance@livinghub.com',
      role: 'MAINTENANCE',
      avatarUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
      permissions: ['read:complaints', 'update:complaints', 'complete:jobs'],
      communityId: 'comm-1',
      phoneNumber: '+1 (555) 600-7000',
    }
  },
  'accountant@livinghub.com': {
    password: 'accountant123',
    user: {
      id: 'usr-acct',
      name: 'Sarah Jenkins',
      email: 'accountant@livinghub.com',
      role: 'ACCOUNTANT',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      permissions: ['read:finance', 'write:bills', 'generate:invoices'],
      communityId: 'comm-1',
      phoneNumber: '+1 (555) 700-8000',
    }
  }
};

export const authService = {
  login: async (email, password) => {
    logger.info(`Authenticating user: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Latency

    const account = PLACEHOLDER_ACCOUNTS[email.toLowerCase().trim()];
    if (!account) {
      throw { status: 404, message: 'User not found. Try resident@livinghub.com or admin@livinghub.com.' };
    }
    if (account.password !== password) {
      throw { status: 401, message: 'Incorrect password. Try resident123 or admin123.' };
    }

    const payload = btoa(JSON.stringify({ id: account.user.id, email: account.user.email, role: account.user.role }));
    const mockToken = `header.${payload}.signature`;

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: authMapper.toUser(account.user),
        token: mockToken,
        refreshToken: 'refresh-token-placeholder',
      },
      errors: [],
      meta: null
    };
  },

  register: async (email, name, password, role) => {
    logger.info(`Registering user: ${email} (${role})`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (PLACEHOLDER_ACCOUNTS[email.toLowerCase().trim()]) {
      throw { status: 400, message: 'An account with this email already exists.' };
    }

    let permissions = ['read:own'];
    if (role === 'RESIDENT') {
      permissions = ['read:own', 'write:own', 'book:facilities', 'file:complaints', 'request:visitors'];
    } else if (role === 'COMMUNITY_ADMIN') {
      permissions = ['read:all', 'write:all', 'approve:residents', 'manage:facilities', 'publish:notices'];
    }

    const newUser = {
      id: `usr-${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: email.toLowerCase().trim(),
      role,
      permissions,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      phoneNumber: '+1 (555) 000-1111',
      apartmentNumber: 'Apt Pending Approval'
    };

    PLACEHOLDER_ACCOUNTS[newUser.email] = {
      password,
      user: newUser
    };

    const payload = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, role: newUser.role }));
    const mockToken = `header.${payload}.signature`;

    return {
      success: true,
      message: 'Registration successful',
      data: {
        user: authMapper.toUser(newUser),
        token: mockToken,
        refreshToken: 'refresh-token-placeholder',
      },
      errors: [],
      meta: null
    };
  },

  sendOtp: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    logger.info(`[i18n OTP] Sent 5-digit verification code to ${email}: 12345`);
    return {
      success: true,
      message: 'OTP sent successfully',
      data: true,
      errors: [],
      meta: null
    };
  },

  verifyOtp: async (email, code) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (code === '12345') {
      return {
        success: true,
        message: 'OTP verified successfully',
        data: true,
        errors: [],
        meta: null
      };
    }
    throw { status: 400, message: 'Invalid verification code. Use 12345.' };
  },

  forgotPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const exists = Object.keys(PLACEHOLDER_ACCOUNTS).includes(email.toLowerCase().trim());
    if (!exists) {
      throw { status: 404, message: 'No account found with this email.' };
    }
    return {
      success: true,
      message: 'Recovery link simulated',
      data: true,
      errors: [],
      meta: null
    };
  },

  resetPassword: async (token, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Password reset successful',
      data: true,
      errors: [],
      meta: null
    };
  },

  refreshToken: async (token) => {
    return {
      success: true,
      message: 'Token refreshed',
      data: { token: 'new-token-placeholder' },
      errors: [],
      meta: null
    };
  },

  getMe: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const token = localStorage.getItem('livinghub-token') || sessionStorage.getItem('livinghub-token');
    if (!token) {
      throw { status: 401, message: 'Unauthorized session' };
    }
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const account = Object.values(PLACEHOLDER_ACCOUNTS).find(acc => acc.user.id === payload.id);
        if (account) {
          return {
            success: true,
            message: 'User profile retrieved',
            data: authMapper.toUser(account.user),
            errors: [],
            meta: null
          };
        }
      }
    } catch (err) {
      // ignore
    }
    throw { status: 401, message: 'Invalid session token' };
  },

  getBranding: async () => {
    return {
      success: true,
      message: 'Branding details resolved',
      data: {
        communityName: 'Sterling Heights',
        logoUrl: '/assets/logos/sterling_logo.png',
        favicon: '/assets/icons/sterling.ico',
        colors: {
          primary: '#0A1D29',
          accent: '#FFFE15'
        }
      },
      errors: [],
      meta: null
    };
  }
};

export { authQueries };
export { authApi };
export { authMapper };
export { PLACEHOLDER_ACCOUNTS };
