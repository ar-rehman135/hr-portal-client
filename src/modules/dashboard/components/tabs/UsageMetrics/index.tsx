import { UsageOverTime } from '@/modules/dashboard/components/charts/UsageOvertime';

import { QueriesPerUser } from './QueriesPerUser';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/rootReducer';

export function UsageMetrics() {
  const usageStats = useSelector(
    (state: AppState) => state.dashboard.usageStats
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UsageOverTime chart_data={usageStats} />
      <QueriesPerUser unique_users={usageStats?.avg_queries_per_user} />
    </div>
  );
}
