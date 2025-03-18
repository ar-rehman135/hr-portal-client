import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';

import { DepartmentUsage } from '../../charts/DepartmentUsage';
import { UsageBySeniority } from '../../charts/UsageBySenority';
import { UserType } from '../../charts/UserTypes';

export function Demographics() {
  const { demographicsData } = useAppSelector(getDashboardDataSelector);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DepartmentUsage demographicsData={demographicsData?.department_usage} />
      <UsageBySeniority demographicsData={demographicsData?.seniority_usage} />
      <UserType demographicsData={demographicsData?.new_vs_returning} />
    </div>
  );
}
