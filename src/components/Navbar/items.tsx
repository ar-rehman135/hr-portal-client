import {
  MoreHorizontal,
  Users,
  BarChart,
  PieChart,
  LineChart,
  ThumbsUp,
} from 'lucide-react';

export interface INavItem {
  href: string;
  icon: React.ReactNode;
  alt?: string;
  label: string;
  active?: boolean;
  showBorderBottom?: boolean;
}

interface INav {
  category: string;
  items: INavItem[];
}

export const navItems: INav[] = [
  {
    category: 'Overview',
    items: [
      {
        href: '/dashboard',
        icon: <LineChart className="h-6 w-6" />,
        alt: 'Dashboard',
        label: 'Dashboard',
        active: true,
      },
      {
        href: '/user-management',
        icon: <Users className="h-6 w-6" />,
        alt: 'Users',
        label: 'Users',
      },
      {
        href: '/reports',
        icon: <BarChart className="h-6 w-6" />,
        alt: 'Reports',
        label: 'Reports',
      },
    ],
  },
  {
    category: 'Analytics',
    items: [
      {
        href: '/usage-metrics',
        icon: <PieChart className="h-6 w-6" />,
        alt: 'Usage Metrics',
        label: 'Usage Metrics',
      },
      {
        href: '/query-categories',
        icon: <BarChart className="h-6 w-6" />,
        alt: 'Query Categories',
        label: 'Query Categories',
      },
      {
        href: '/performance-metrics',
        icon: <ThumbsUp className="h-6 w-6" />,
        label: 'Performance',
        showBorderBottom: true,
      },
      {
        href: '/demographics',
        icon: <MoreHorizontal className="h-6 w-6" />,
        alt: 'Demographics',
        label: 'Demographics',
      },
    ],
  },
];

export const queryOptions = [
  {
    label: 'Last 7 Days',
    value: '7d',
  },
  {
    label: 'Last 30 Days',
    value: '30d',
  },
  // {
  //   label: 'Last 3 Months',
  //   value: '3m',
  // },
  // {
  //   label: 'Last 6 Months',
  //   value: '6m',
  // },
  // {
  //   label: 'Last 12 Months',
  //   value: '12m',
  // },
];
