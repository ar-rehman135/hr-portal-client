import { UsageOverTime } from '@/modules/dashboard/components/charts/UsageOvertime';

import { QueriesPerUser } from './QueriesPerUser';
import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';

export function UsageMetrics() {
  const { usageStats } = useAppSelector(getDashboardDataSelector);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UsageOverTime chart_data={usageStats} />
      <QueriesPerUser unique_users={usageStats?.avg_queries_per_user} />
    </div>
  );
}
