'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COLORS } from '@/contants';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DistributionCategories({
  category_distribution,
}: {
  category_distribution: any;
}) {
  const labels = category_distribution?.map((item: any) => item?.category);
  const dataValues = category_distribution?.map(
    (item: any) => item?.percentage
  );

  const backgroundColors = [
    COLORS.MAGENTA,
    COLORS.LIGHT_PURPLE,
    COLORS.PINK,
    COLORS.LIGHT_BLUE,
    COLORS.BLUE,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels?.length),
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
          label: (context: any) => `${context?.label}: ${context?.raw}%`,
        },
      },
    },
  };

  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
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
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="mt-4 space-y-2">
          {category_distribution?.map((category: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      backgroundColors[index % backgroundColors.length],
                  }}
                ></div>
                <span className="font-medium">{category.category}:</span>
              </div>
              <span>{category.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
