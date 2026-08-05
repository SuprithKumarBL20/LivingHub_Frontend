import { useAuthStore } from '../../../store/authStore';

export const usePermission = () => {
  const { user } = useAuthStore();

  const hasPermission = (permission) => {
    if (!user) return false;
    // Super admin has all credentials wildcard
    if (user.permissions.includes('*') || user.permissions.includes('manage:all')) return true;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permsArray) => {
    if (!user) return false;
    if (user.permissions.includes('*') || user.permissions.includes('manage:all')) return true;
    return permsArray.some(p => user.permissions.includes(p));
  };

  return {
    hasPermission,
    hasAnyPermission,
    role: user?.role || null,
  };
};
