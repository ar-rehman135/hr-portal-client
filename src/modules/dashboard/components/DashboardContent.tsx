import { Tabs, TabsContent } from '@/shadcn/tabs';

import { UsageMetrics } from './tabs/UsageMetrics';
import { QueryCategories } from './tabs/QueryCategories';
import { PerformanceHistory } from './tabs/PerformanceHistory';
import { Demographics } from './tabs/DemoGraphics';

interface DashboardContentProps {
  activeTab: string;
}

export function DashboardContent({ activeTab }: DashboardContentProps) {
  return (
    <Tabs value={activeTab} onValueChange={() => {}} className="w-full">
      <TabsContent value="usage-metrics" className="mt-0">
        <UsageMetrics />
      </TabsContent>

      <TabsContent value="query-categories" className="mt-0">
        <QueryCategories />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <PerformanceHistory />
      </TabsContent>

      <TabsContent value="demographics" className="mt-0">
        <Demographics />
      </TabsContent>
    </Tabs>
  );
}
