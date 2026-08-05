import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../index';

export const dashboardKeys = {
  all: ['dashboard'],
  summary: () => [...dashboardKeys.all, 'summary'],
};

export const useDashboardSummaryQuery = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: async () => {
      const res = await dashboardService.getSummary();
      if (!res.success) {
        throw new Error(res.message || 'Failed to retrieve dashboard');
      }
      return res.data;
    },
    staleTime: 60000, // 1 minute caching
  });
};
