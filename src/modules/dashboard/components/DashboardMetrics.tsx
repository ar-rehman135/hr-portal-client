import { Users, MessageSquare, ThumbsUp, Clock } from 'lucide-react';

import { MetricCard } from '@/components/cards/MetricCard';

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={<Users className="h-5 w-5 text-primary" />}
        label="Active Users"
        value="2,350"
        change="+1.2%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<MessageSquare className="h-5 w-5 text-primary" />}
        label="Total Queries"
        value="8,642"
        change="+0.8%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<ThumbsUp className="h-5 w-5 text-primary" />}
        label="Avg. Satisfaction"
        value="86.5%"
        change="+0.1%"
        changeDirection="up"
        changeLabel="from last week"
      />
      <MetricCard
        icon={<Clock className="h-5 w-5 text-primary" />}
        label="Avg. Response Time"
        value="1.9s"
        change="-0.2s"
        changeDirection="down"
        changeLabel="from last week"
      />
    </div>
  );
}
