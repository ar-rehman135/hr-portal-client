import { UsageOverTime } from '@/modules/dashboard/components/charts/UsageOvertime';

import { QueriesPerUser } from './QueriesPerUser';

interface UsageMetricsProps {}

export function UsageMetrics({}: UsageMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UsageOverTime />
      <QueriesPerUser />
    </div>
  );
}
