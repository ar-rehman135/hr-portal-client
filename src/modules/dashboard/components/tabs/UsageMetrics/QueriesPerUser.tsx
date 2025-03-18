'use client';

import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { useAppSelector } from '@/store/hooks';
import { Loader2 } from 'lucide-react';

export function QueriesPerUser({
  unique_users,
}: {
  unique_users: number | undefined;
}) {
  const { usageStatsLoading } = useAppSelector(getDashboardDataSelector);

  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl">
      <div className="mb-4 bg-border flex-row items-center justify-between pb-4 pt-2 px-6 rounded-tl-2xl rounded-tr-2xl">
        <h3 className="text-base font-medium text-primary">Queries Per User</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Average queries per active user
        </p>
      </div>
      <div className="flex flex-col items-center justify-center h-[250px]">
        {usageStatsLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
            </p>
          </div>
        ) : (
          <>
            {unique_users ? (
              <>
                <div className="text-[100px] font-bold text-primary leading-none">
                  {unique_users}
                </div>
                <div className="text-base font-medium text-gray-700 mt-2">
                  Queries per user
                </div>
              </>
            ) : (
              <div className="text-base text-gray-500 pt-5">No data</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
