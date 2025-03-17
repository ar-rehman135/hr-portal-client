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
import { CardTitle, CardHeader, Card, CardContent } from '@/shadcn/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ResponseTime({
  performancesData = [],
}: {
  performancesData?: any[];
}) {
  const labels = performancesData.map((entry) => entry.date);
  const responseTimes = performancesData.map(
    (entry) => entry.average_response_time / 1000
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Response Time (seconds)',
        data: responseTimes,
        backgroundColor: COLORS.MAGENTA,
        borderRadius: 4,
      },
    ],
  };

  const maxResponseTime = Math.max(...responseTimes, 3);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw.toFixed(2)}s`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#999', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: '#999',
          font: { size: 11 },
          callback: (value: any) => `${value}s`,
        },
        suggestedMin: 0,
        suggestedMax: Math.ceil(maxResponseTime),
      },
    },
  };

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
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
            Average response time this week is{' '}
            {responseTimes.length
              ? `${(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)}s`
              : 'N/A'}
            , showing system performance trends.
          </p>
          <p className="mt-2">
            Fastest response was{' '}
            {responseTimes.length
              ? `${Math.min(...responseTimes).toFixed(2)}s`
              : 'N/A'}
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
