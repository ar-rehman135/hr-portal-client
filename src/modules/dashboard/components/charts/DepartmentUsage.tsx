'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import { COLORS } from '@/contants';
import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { ChartLoading } from './Loading';
import { NoChartData } from './NoData';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DepartmentData {
  [key: string]: number;
}

interface DepartmentUsageProps {
  demographicsData: DepartmentData | undefined;
}

export function DepartmentUsage({ demographicsData }: DepartmentUsageProps) {
  const { demographicsDataLoading } = useAppSelector(getDashboardDataSelector);

  if (demographicsDataLoading) {
    return (
      <ChartLoading title="Department Usage" description="Department usage" />
    );
  }

  if (!demographicsData) {
    return (
      <NoChartData
        title="Department Usage"
        description="Department usage"
        message="No data"
      />
    );
  }

  const labels = Object.keys(demographicsData || {});
  const values = Object.values(demographicsData || {});

  const backgroundColors = [
    COLORS.MAGENTA,
    COLORS.PINK,
    COLORS.LIGHT_PURPLE,
    COLORS.LIGHT_BLUE,
    COLORS.BLUE,
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, labels.length),
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

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
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
          {labels.map((label, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: backgroundColors[index] }}
                ></div>
                <span className="font-medium">{label}:</span>
              </div>
              <span>{values[index]}%</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {labels[0]} and {labels[1]} departments show the highest adoption
          rates
        </p>
      </CardContent>
    </Card>
  );
}
