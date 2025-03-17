import { UsageOverTime } from '@/modules/dashboard/components/charts/UsageOvertime';

import { QueriesPerUser } from './QueriesPerUser';

export function UsageMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UsageOverTime />
      <QueriesPerUser />
    </div>
  );
}
