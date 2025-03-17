'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COLORS } from '@/contants';
import { Card, CardTitle, CardContent, CardHeader } from '@/shadcn/card';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['New Users', 'Returning Users'],
  datasets: [
    {
      data: [65, 35],
      backgroundColor: [COLORS.PINK, COLORS.LIGHT_BLUE],
      borderWidth: 0,
      cutout: '70%',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.label}: ${context.raw}%`,
      },
    },
  },
};

const types = [
  { name: 'New Users', percentage: '65%', color: COLORS.PINK },
  { name: 'Returning Users', percentage: '35%', color: COLORS.LIGHT_BLUE },
];

export function UserType() {
  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            User Type
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            New vs. returning users
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[180px] relative">
          <Doughnut data={data} options={options} />
        </div>

        <div className="mt-4 space-y-2">
          {types.map((type, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: type.color }}
                ></div>
                <span className="font-medium">{type.name}</span>
              </div>
              <span>{type.percentage}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          75% of users are returning, indicating strong retention
        </p>
      </CardContent>
    </Card>
  );
}
