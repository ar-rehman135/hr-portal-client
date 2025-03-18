'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { COLORS } from '@/contants';
import { CardContent, CardHeader } from '@/shadcn/card';
import { Card } from '@/shadcn/card';
import { useAppSelector } from '@/store/hooks';
import { ChartLoading } from './Loading';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { NoChartData } from './NoData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#666',
      borderColor: '#e1e1e1',
      borderWidth: 1,
      padding: 10,
      boxPadding: 5,
      cornerRadius: 4,
      displayColors: true,
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: 4.5,
          xMax: 4.5,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
        },
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
      border: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#999',
        font: {
          size: 11,
        },
        callback: (value: any) => {
          if (value >= 1000) {
            return value / 1000 + 'k';
          }
          return value;
        },
        stepSize: 50,
      },
      suggestedMin: 0,
      suggestedMax: 500,
    },
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: (context: any) => {
        const index = context.dataIndex;
        const datasetIndex = context.datasetIndex;
        return datasetIndex === 0 && index === 4 ? 4 : 0;
      },
      hoverRadius: 4,
    },
  },
};

export function PerformanceMetrics({
  performancesData,
}: {
  performancesData: any;
}) {
  const { performanceDataLoading } = useAppSelector(getDashboardDataSelector);

  if (performanceDataLoading) {
    return (
      <ChartLoading
        title="Performance Metrics"
        description="Satisfaction and resolution rates"
      />
    );
  }

  if (!performancesData) {
    return (
      <NoChartData
        title="Performance Metrics"
        description="Satisfaction and resolution rates"
        message="No data"
      />
    );
  }

  const labels = performancesData.map((item: any) => item.date);
  const satisfactionData = performancesData.map(
    (item: any) => item.satisfaction_rate
  );
  const resolutionData = performancesData.map(
    (item: any) => item.resolution_rate
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Satisfaction',
        data: satisfactionData,
        borderColor: COLORS.PINK,
        backgroundColor: 'rgba(224, 64, 251, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.PINK,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Resolution',
        data: resolutionData,
        borderColor: COLORS.LIGHT_BLUE,
        backgroundColor: 'rgba(92, 107, 192, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.LIGHT_BLUE,
        pointBorderColor: COLORS.WHITE,
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <h3 className="text-base font-medium text-primary">
            Performance Metrics
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Satisfaction and resolution rates
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px]">
          <Line options={options} data={data} />
        </div>
        <div className="mt-4 flex space-x-6 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#E040FB] mr-2"></div>
            <span className="text-gray-600">Satisfaction</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#5C6BC0] mr-2"></div>
            <span className="text-gray-600">Resolution</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
