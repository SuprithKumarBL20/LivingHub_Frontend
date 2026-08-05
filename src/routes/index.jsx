import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import ErrorLayout from '../layouts/ErrorLayout/ErrorLayout';

// Guards
import { GuestRoute } from './guards/GuestRoute';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { RoleRoute } from './guards/RoleRoute';

// Route Arrays
import { publicRoutes } from './publicRoutes';
import { authRoutes } from './authRoutes';
import { residentRoutes } from './residentRoutes';
import { adminRoutes } from './adminRoutes';
import { securityRoutes } from './securityRoutes';
import { superAdminRoutes } from './superAdminRoutes';
import { developerRoutes } from './developerRoutes';

// Suspense Loader Component
import SuspenseLoader from '../components/SuspenseLoader/SuspenseLoader';

// 404 Placeholder
import ComingSoon from '../pages/ComingSoon';

export const AppRoutes = () => {
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <Routes>
        {/* 1. Public Marketing Routes */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* 2. Guest-Only Auth Routes */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            {authRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* 3. Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* General resident level pages */}
            {residentRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}

            {/* Developer Routes */}
            {developerRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}

            {/* Admin routes with Role checks */}
            <Route element={<RoleRoute allowedRoles={['COMMUNITY_ADMIN', 'SUPER_ADMIN']} />}>
              {adminRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Route>

            {/* Security routes with Role checks */}
            <Route element={<RoleRoute allowedRoles={['SECURITY', 'SUPER_ADMIN']} />}>
              {securityRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Route>

            {/* Super Admin routes with Role checks */}
            <Route element={<RoleRoute allowedRoles={['SUPER_ADMIN']} />}>
              {superAdminRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
        </Route>

        {/* 4. Error Pages */}
        <Route element={<ErrorLayout />}>
          <Route path="/404" element={<ComingSoon title="404 Page Not Found" />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
