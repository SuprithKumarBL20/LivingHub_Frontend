import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { permissionUtils } from '../../shared/utils/permissionUtils';

export const PermissionRoute = ({ requiredPermission }) => {
  const { user } = useAuthStore();

  if (!permissionUtils.canAccess(user, [], requiredPermission)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default PermissionRoute;
