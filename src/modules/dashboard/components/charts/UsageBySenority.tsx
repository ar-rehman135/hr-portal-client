'use client';

import { COLORS } from '@/contants';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';

const levels = [
  { name: 'Entry', percentage: 30, color: COLORS.MAGENTA },
  { name: 'Mid', percentage: 40, color: COLORS.PINK },
  { name: 'Senior', percentage: 20, color: COLORS.LIGHT_PURPLE },
  { name: 'Manager', percentage: 10, color: COLORS.LIGHT_BLUE },
];

export function UsageBySeniority() {
  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            Usage by Seniority
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Employee level breakdown
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="space-y-4">
          {levels.map((level) => (
            <div key={level.name} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">{level.name}</span>
                <span>{level.percentage}%</span>
              </div>
              <div
                className="h-8 w-full rounded-md"
                style={{ backgroundColor: level.color }}
              >
                <div className="h-full flex items-center justify-center text-white text-xs font-medium">
                  {level.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Mid-level employees are the most active users
        </p>
      </CardContent>
    </Card>
  );
}
