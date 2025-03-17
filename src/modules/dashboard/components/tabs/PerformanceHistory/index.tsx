import { PerformanceMetrics } from '../../charts/PerformanceMetrics';
import { ResponseTime } from '../../charts/ResponseTime';

export function PerformanceHistory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceMetrics />
      <ResponseTime />
    </div>
  );
}
