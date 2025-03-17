'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COLORS } from '@/contants';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Other'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        COLORS.MAGENTA,
        COLORS.PINK,
        COLORS.LIGHT_PURPLE,
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

const departments = [
  { name: 'Engineering:', percentage: '35%', color: COLORS.MAGENTA },
  { name: 'Sales:', percentage: '25%', color: COLORS.PINK },
  { name: 'Marketing:', percentage: '20%', color: COLORS.LIGHT_PURPLE },
  { name: 'HR:', percentage: '15%', color: COLORS.LIGHT_BLUE },
  { name: 'Other:', percentage: '05%', color: COLORS.BLUE },
];

export function DepartmentUsage() {
  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            Department Usage
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Breakdown by department
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px] relative">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 space-y-2">
          {departments.map((department, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: department.color }}
                ></div>
                <span className="font-medium">{department.name}</span>
              </div>
              <span>{department.percentage}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Engineering and Sales departments show highest adoption rates
        </p>
      </CardContent>
    </Card>
  );
}
