'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COLORS } from '@/contants';
import { Card, CardTitle, CardContent, CardHeader } from '@/shadcn/card';
import { useAppSelector } from '@/store/hooks';
import { getDashboardDataSelector } from '@/store/features/auth/dashboardSelector';
import { ChartLoading } from './Loading';
import { NoChartData } from './NoData';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserTypeProps {
  demographicsData: {
    new: number;
    returning: number;
  };
}

export function UserType({ demographicsData }: UserTypeProps | any) {
  const { demographicsDataLoading } = useAppSelector(getDashboardDataSelector);

  if (demographicsDataLoading) {
    return (
      <ChartLoading title="User Type" description="New vs. returning users" />
    );
  }

  if (!demographicsData || Object.keys(demographicsData).length === 0) {
    return (
      <NoChartData
        title="User Type"
        description="New vs. returning users"
        message="No data"
      />
    );
  }

  const { new: newUsers, returning: returningUsers } = demographicsData;

  const data = {
    labels: ['New Users', 'Returning Users'],
    datasets: [
      {
        data: [newUsers, returningUsers],
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
    { name: 'New Users', percentage: `${newUsers}%`, color: COLORS.PINK },
    {
      name: 'Returning Users',
      percentage: `${returningUsers}%`,
      color: COLORS.LIGHT_BLUE,
    },
  ];

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
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
          {returningUsers > newUsers
            ? `${returningUsers}% of users are returning, indicating strong retention.`
            : `${newUsers}% of users are new, showing growth potential.`}
        </p>
      </CardContent>
    </Card>
  );
}
