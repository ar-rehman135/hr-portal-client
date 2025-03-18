import { PerformanceMetrics } from '../../charts/PerformanceMetrics';
import { ResponseTime } from '../../charts/ResponseTime';
import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';

export function PerformanceHistory() {
  const { performanceData } = useAppSelector(getDashboardDataSelector);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceMetrics performancesData={performanceData?.chart_data} />
      <ResponseTime performancesData={performanceData?.chart_data} />
    </div>
  );
}
