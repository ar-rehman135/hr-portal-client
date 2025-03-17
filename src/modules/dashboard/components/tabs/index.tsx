'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shadcn/tabs';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="bg-gray-100 p-1 h-auto flex flex-wrap gap-1">
        <TabsTrigger
          value="usage-metrics"
          className="text-sm px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none flex-1 min-w-[120px]"
        >
          Usage Metrics
        </TabsTrigger>
        <TabsTrigger
          value="query-categories"
          className="text-sm px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none flex-1 min-w-[120px]"
        >
          Query Categories
        </TabsTrigger>
        <TabsTrigger
          value="performance"
          className="text-sm px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none flex-1 min-w-[120px]"
        >
          Performance
        </TabsTrigger>
        <TabsTrigger
          value="demographics"
          className="text-sm px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none flex-1 min-w-[120px]"
        >
          Demographics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
