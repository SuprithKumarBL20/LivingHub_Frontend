import React, { lazy } from 'react';
import DashboardHome from '../features/dashboard/pages/DashboardHome';
import UserProfilePage from '../features/resident/pages/UserProfilePage';

// Lazy loaded page components
const ResidentProfilePage = lazy(() => import('../features/resident/pages/ResidentProfilePage'));
const ComplaintsPage = lazy(() => import('../features/complaints/pages/ComplaintsPage'));
const CreateComplaint = lazy(() => import('../features/complaints/pages/CreateComplaint'));
const ComplaintDetails = lazy(() => import('../features/complaints/pages/ComplaintDetails'));
const WorkOrdersPage = lazy(() => import('../features/complaints/pages/WorkOrdersPage'));
const VisitorsPage = lazy(() => import('../features/visitors/pages/VisitorsPage'));
const VisitorHistoryPage = lazy(() => import('../features/visitors/pages/VisitorHistoryPage'));
const VisitorQrPage = lazy(() => import('../features/visitors/pages/VisitorQrPage'));
const NotificationsPage = lazy(() => import('../features/notifications/pages/NotificationsPage'));
const SettingsPage = lazy(() => import('../features/settings/pages/SettingsPage'));

// Phase 4
const CommunityHome = lazy(() => import('../features/community/pages/CommunityHome'));
const EventDetails = lazy(() => import('../features/community/pages/EventDetails'));
const MarketplaceHome = lazy(() => import('../features/marketplace/pages/MarketplaceHome'));
const MarketplaceItemDetails = lazy(() => import('../features/marketplace/pages/MarketplaceItemDetails'));
const FacilityListPage = lazy(() => import('../features/facilities/pages/FacilityListPage'));
const FacilityBookPage = lazy(() => import('../features/facilities/pages/FacilityBookPage'));
const BookingHistoryPage = lazy(() => import('../features/facilities/pages/BookingHistoryPage'));
const FinanceDashboard = lazy(() => import('../features/finance/pages/FinanceDashboard'));
const BillsPage = lazy(() => import('../features/finance/pages/BillsPage'));
const ReceiptsPage = lazy(() => import('../features/finance/pages/ReceiptsPage'));

// Phase 5
const AIAssistantPage = lazy(() => import('../features/ai/pages/AIAssistantPage'));
const ReportsDashboard = lazy(() => import('../features/reports/pages/ReportsDashboard'));
const GlobalSearchPage = lazy(() => import('../features/search/pages/GlobalSearchPage'));
const AuditLogsPage = lazy(() => import('../features/audit/pages/AuditLogsPage'));
const FileManagementPage = lazy(() => import('../features/files/pages/FileManagementPage'));

export const residentRoutes = [
  { path: '/dashboard', element: <DashboardHome /> },
  { path: '/profile', element: <UserProfilePage /> },
  { path: '/resident/profile', element: <ResidentProfilePage /> },
  { path: '/complaints', element: <ComplaintsPage /> },
  { path: '/complaints/new', element: <CreateComplaint /> },
  { path: '/complaints/:id', element: <ComplaintDetails /> },
  { path: '/work-orders', element: <WorkOrdersPage /> },
  { path: '/visitors', element: <VisitorsPage /> },
  { path: '/visitors/history', element: <VisitorHistoryPage /> },
  { path: '/visitors/qr', element: <VisitorQrPage /> },
  { path: '/notifications', element: <NotificationsPage /> },
  { path: '/settings', element: <SettingsPage /> },
  
  // M4
  { path: '/community', element: <CommunityHome /> },
  { path: '/community/events/:id', element: <EventDetails /> },
  { path: '/marketplace', element: <MarketplaceHome /> },
  { path: '/marketplace/:id', element: <MarketplaceItemDetails /> },
  { path: '/facilities', element: <FacilityListPage /> },
  { path: '/facilities/book', element: <FacilityBookPage /> },
  { path: '/facilities/history', element: <BookingHistoryPage /> },
  { path: '/finance', element: <FinanceDashboard /> },
  { path: '/finance/bills', element: <BillsPage /> },
  { path: '/finance/receipts', element: <ReceiptsPage /> },

  // M5
  { path: '/ai', element: <AIAssistantPage /> },
  { path: '/reports', element: <ReportsDashboard /> },
  { path: '/search', element: <GlobalSearchPage /> },
  { path: '/audit', element: <AuditLogsPage /> },
  { path: '/files', element: <FileManagementPage /> },
];

export default residentRoutes;
