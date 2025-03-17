import { DepartmentUsage } from '../../charts/DepartmentUsage';
import { UsageBySeniority } from '../../charts/UsageBySenority';
import { UserType } from '../../charts/UserTypes';

export function Demographics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DepartmentUsage />
      <UsageBySeniority />
      <UserType />
    </div>
  );
}
