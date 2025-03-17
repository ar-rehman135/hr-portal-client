'use client';
import { useState } from 'react';

import AppLayout from '@/layouts/AppLayout';

import { DashboardHeader } from './components/DashboardHeader';
import { DashboardMetrics } from './components/DashboardMetrics';
import { DashboardContent } from './components/DashboardContent';
import { TabNavigation } from './components/tabs';
import { useLazyGetDashboardStatesQuery } from '@/store/features/auth/protectedApi';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('usage-metrics');

  return (
    <AppLayout title="Dashboard">
      <div className="w-full">
        <DashboardHeader />
        <div className="h-px w-full bg-gray-200 mb-6"></div>
        <DashboardMetrics />
        <div className="flex justify-between items-center mb-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <DashboardContent activeTab={activeTab} />
      </div>
    </AppLayout>
  );
}
