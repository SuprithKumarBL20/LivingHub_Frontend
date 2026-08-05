import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { permissionUtils } from '../../shared/utils/permissionUtils';

export const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  if (!permissionUtils.canAccess(user, allowedRoles)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
