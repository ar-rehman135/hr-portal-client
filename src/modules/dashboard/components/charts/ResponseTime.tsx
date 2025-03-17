'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { COLORS } from '@/contants';
import { CardTitle } from '@/shadcn/card';
import { CardHeader } from '@/shadcn/card';
import { Card, CardContent } from '@/shadcn/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ResponseTime() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Response Time (seconds)',
        data: [2.1, 1.9, 2.0, 1.8, 1.7, 1.9, 2.0],
        backgroundColor: COLORS.MAGENTA,
        borderRadius: 4,
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
          label: (context: any) => `${context.raw}s`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#999',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#999',
          font: {
            size: 11,
          },
          callback: (value: any) => `${value}s`,
        },
        suggestedMin: 0,
        suggestedMax: 3,
      },
    },
  };

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            Response Time
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">Average in seconds</p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px]">
          <Bar options={options} data={data} />
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>
            Average response time has decreased by 0.2s this week, showing
            improved system performance.
          </p>
          <p className="mt-2">
            Friday shows the fastest response time at 1.7s.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
