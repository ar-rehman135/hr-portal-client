'use client';

import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { Loader2 } from 'lucide-react';

export function TopQueries({ top_5_categories }: { top_5_categories: any }) {
  const { categoryDataLoading } = useAppSelector(getDashboardDataSelector);

  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl">
      <div className="mb-4 bg-border flex-row items-center justify-between pb-4 pt-2 px-6 rounded-tl-2xl rounded-tr-2xl">
        <h3 className="text-base font-medium">Top Queries</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Most frequent user questions
        </p>
      </div>
      <div className="space-y-4 h-[250px] px-4 overflow-auto">
        {categoryDataLoading ? (
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 h-[250px] px-4 overflow-auto">
              {top_5_categories?.length > 0 ? (
                top_5_categories?.map((query: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-start">
                      <div className="text-xs font-medium mr-2">
                        {index + 1}.
                      </div>
                      <div className="text-xs font-medium capitalize">
                        {query.category}
                      </div>
                    </div>
                    <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      {query.count}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center pt-5 h-full">
                  <p className="text-gray-500">No data</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
