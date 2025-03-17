import { useSelector } from 'react-redux';
import { DepartmentUsage } from '../../charts/DepartmentUsage';
import { UsageBySeniority } from '../../charts/UsageBySenority';

import { AppState } from '@/store/rootReducer';
import { UserType } from '../../charts/UserTypes';

export function Demographics() {
  const demographicsData = useSelector(
    (state: AppState) => state.dashboard.demographicsData
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DepartmentUsage demographicsData={demographicsData?.department_usage} />
      <UsageBySeniority demographicsData={demographicsData?.seniority_usage} />
      <UserType demographicsData={demographicsData?.new_vs_returning} />
    </div>
  );
}
