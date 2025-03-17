'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COLORS } from '@/contants';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Benefits', 'Policies', 'Onboarding', 'Time Off', 'Pay Roll'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        COLORS.MAGENTA,
        COLORS.LIGHT_PURPLE,
        COLORS.PINK,
        COLORS.LIGHT_BLUE,
        COLORS.BLUE,
      ],
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

const categories = [
  { name: 'Benefits:', percentage: '35%', color: COLORS.MAGENTA },
  { name: 'Policies:', percentage: '25%', color: COLORS.LIGHT_PURPLE },
  { name: 'Onboarding:', percentage: '20%', color: COLORS.PINK },
  { name: 'Time Off:', percentage: '15%', color: COLORS.LIGHT_BLUE },
  { name: 'Pay Roll:', percentage: '05%', color: COLORS.BLUE },
];

export function DistributionCategories() {
  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            Query Categories
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Distribution by HR category
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px] relative">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="font-medium">{category.name}</span>
              </div>
              <span>{category.percentage}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
