import { Users, MessageSquare, ThumbsUp, Clock } from 'lucide-react';

import { MetricCard } from '@/components/cards/MetricCard';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/rootReducer';

export function DashboardMetrics() {
  const dashboardStats = useSelector(
    (state: AppState) => state.dashboard.dashboardStats
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={<Users className="h-5 w-5 text-primary" />}
        label="Active Users"
        value={dashboardStats?.active_users}
        change="+1.2%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<MessageSquare className="h-5 w-5 text-primary" />}
        label="Total Queries"
        value={dashboardStats?.total_queries}
        change="+0.8%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<ThumbsUp className="h-5 w-5 text-primary" />}
        label="Avg. Satisfaction"
        value={dashboardStats?.average_satisfaction}
        change="+0.1%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<Clock className="h-5 w-5 text-primary" />}
        label="Avg. Response Time"
        value={dashboardStats?.average_response_time}
        change="-0.2s"
        changeDirection="down"
        changeLabel="from last week"
      />
    </div>
  );
}
