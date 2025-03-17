import { useSelector } from 'react-redux';
import { PerformanceMetrics } from '../../charts/PerformanceMetrics';
import { ResponseTime } from '../../charts/ResponseTime';
import { AppState } from '@/store/rootReducer';

export function PerformanceHistory() {
  const performancesData = useSelector(
    (state: AppState) => state.dashboard.performanceData
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceMetrics performancesData={performancesData?.chart_data} />
      <ResponseTime performancesData={performancesData?.chart_data} />
    </div>
  );
}
