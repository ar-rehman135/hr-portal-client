// 'use client';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/shadcn/select';
// import { Line } from 'react-chartjs-2';

// import { COLORS } from '@/contants';
// import { UsageStats } from '@/store/features/auth/dashboardSlice';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const data = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Queries',
//       data: [100, 80, 60, 120, 150, 100, 80],
//       borderColor: COLORS.MAGENTA,
//       backgroundColor: 'rgba(224, 64, 251, 0.1)',
//       tension: 0.4,
//       fill: false,
//       pointBackgroundColor: COLORS.MAGENTA,
//       pointBorderColor: COLORS.WHITE,
//       pointBorderWidth: 2,
//       pointRadius: 0,
//       pointHoverRadius: 4,
//     },
//     {
//       label: 'Users',
//       data: [50, 70, 40, 50, 40, 60, 50],
//       borderColor: COLORS.BLUE,
//       backgroundColor: 'rgba(92, 107, 192, 0.1)',
//       tension: 0.4,
//       fill: false,
//       pointBackgroundColor: COLORS.BLUE,
//       pointBorderColor: COLORS.WHITE,
//       pointBorderWidth: 2,
//       pointRadius: 0,
//       pointHoverRadius: 4,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     tooltip: {
//       mode: 'index' as const,
//       intersect: false,
//       backgroundColor: COLORS.WHITE,
//       titleColor: COLORS.BLUE,
//       bodyColor: COLORS.BLUE,
//       borderColor: COLORS.BLUE,
//       borderWidth: 1,
//       padding: 10,
//       boxPadding: 5,
//       cornerRadius: 4,
//       displayColors: true,
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//       ticks: {
//         color: '#999',
//         font: {
//           size: 11,
//         },
//       },
//       border: {
//         display: false,
//       },
//     },
//     y: {
//       border: {
//         display: false,
//       },
//       grid: {
//         color: 'rgba(0, 0, 0, 0.05)',
//       },
//       ticks: {
//         color: '#999',
//         font: {
//           size: 11,
//         },
//         callback: (value: any) => {
//           if (value >= 1000) {
//             return value / 1000 + 'k';
//           }
//           return value;
//         },
//       },
//     },
//   },
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   elements: {
//     line: {
//       borderWidth: 2,
//     },
//   },
// };

// export function UsageOverTime({
//   chart_data,
// }: {
//   chart_data: UsageStats | null;
// }) {
//   console.log('chart_data', chart_data);

//   return (
//     <Card className="border-gray-200 shadow-sm rounded-2xl">
//       <CardHeader className="flex  flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
//         <div>
//           <CardTitle className="text-base font-medium text-gray-800">
//             Usage Over Time
//           </CardTitle>
//           <p className="text-xs text-gray-500 mt-0.5">
//             Daily active users and query volume
//           </p>
//         </div>
//       </CardHeader>
//       <CardContent className="px-6 py-8">
//         <div className="h-[250px]">
//           <Line options={options} data={data} />
//         </div>
//         <div className="mt-4 flex space-x-6 text-xs">
//           <div className="flex items-center">
//             <div
//               className={`w-3 h-3 rounded-full bg-[${COLORS.MAGENTA}] mr-2`}
//             ></div>
//             <span className="text-gray-600">Queries</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
//             <span className="text-gray-600">Users</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';
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

import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import { Line } from 'react-chartjs-2';

import { COLORS } from '@/contants';
import { useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { Loader2 } from 'lucide-react';
import { ChartLoading } from './Loading';
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
      backgroundColor: COLORS.WHITE,
      titleColor: COLORS.BLUE,
      bodyColor: COLORS.BLUE,
      borderColor: COLORS.BLUE,
      borderWidth: 1,
      padding: 10,
      boxPadding: 5,
      cornerRadius: 4,
      displayColors: true,
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
      },
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
  },
};

export function UsageOverTime({
  chart_data,
}: {
  chart_data: {
    daily_active_users: { [key: string]: number };
    query_volume: { [key: string]: number };
  } | null;
}) {
  const { usageStatsLoading } = useAppSelector(getDashboardDataSelector);

  if (usageStatsLoading) {
    return (
      <ChartLoading
        title="Usage Over Time"
        description="Daily active users and query volume"
      />
    );
  }

  if (!chart_data) {
    return (
      <NoChartData
        title="Usage Over Time"
        description="Daily active users and query volume"
        message="No data"
      />
    );
  }

  const labels = Object.keys(chart_data.daily_active_users).sort();
  const usersData = labels.map((date) => chart_data.daily_active_users[date]);
  const queriesData = labels.map((date) => chart_data.query_volume[date]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Queries',
        data: queriesData,
        borderColor: COLORS.MAGENTA,
        backgroundColor: 'rgba(224, 64, 251, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.MAGENTA,
        pointBorderColor: COLORS.WHITE,
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Users',
        data: usersData,
        borderColor: COLORS.BLUE,
        backgroundColor: 'rgba(92, 107, 192, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: COLORS.BLUE,
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
          <CardTitle className="text-base font-medium text-gray-800">
            Usage Over Time
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Daily active users and query volume
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px]">
          <Line options={options} data={data} />
        </div>
        <div className="mt-4 flex space-x-6 text-xs">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full bg-[${COLORS.MAGENTA}] mr-2`}
            ></div>
            <span className="text-gray-600">Queries</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-gray-600">Users</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
