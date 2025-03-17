'use client';
import { useEffect, useState } from 'react';

import { CalendarIcon, SearchIcon, MenuIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { InputWithIcon } from '@/shadcn/input-with-icon';

import { ILayoutProps } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/select';

import { queryOptions } from '../items';
import { DropdownMenuContent, DropdownMenuItem } from '@/shadcn/dropdown-menu';
import { DropdownMenu } from '@/shadcn/dropdown-menu';
import { DropdownMenuTrigger } from '@/shadcn/dropdown-menu';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { userLoggedOut } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
  useLazyGetDashboardStatesQuery,
  useLazyGetMetricsCategoriesQuery,
  useLazyGetMetricsDemographicsQuery,
  useLazyGetMetricsPerformancesQuery,
  useLazyGetMetricsUsageQuery,
} from '@/store/features/auth/protectedApi';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/rootReducer';
import {
  setCategoryData,
  setDashboardStats,
  setDemographicsData,
  setPerformanceData,
  setUsageStats,
} from '@/store/features/auth/dashboardSlice';

export function Header({
  onSearch,
  onSelect,
  selectedValue = '7d',
}: ILayoutProps) {
  const { user } = useAppSelector(getAuthDataSelector);
  console.log(selectedValue, ' datepicker');
  const [selected, setSelected] = useState(selectedValue);

  const [getDashboardState, { data, isFetching }] =
    useLazyGetDashboardStatesQuery();

  const [getMetricsUSage, { data: usageData, isFetching: isUsageData }] =
    useLazyGetMetricsUsageQuery();

  const [
    getMetricsCategories,
    { data: categoryData, isFetching: isCategoryData },
  ] = useLazyGetMetricsCategoriesQuery();

  const [
    getMetricsPerformances,
    { data: performancesData, isFetching: isPerformancesData },
  ] = useLazyGetMetricsPerformancesQuery();

  const [
    getMetricsDemographics,
    { data: demographicsData, isFetching: isDemographicsData },
  ] = useLazyGetMetricsDemographicsQuery();

  const dashboardStats = useSelector(
    (state: AppState) => state.dashboard.dashboardStats
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/login');
  };
  const handleSelectChange = (value: string) => {
    fetchData(value);
    setSelected(value);
  };

  const fetchData = async (value: string) => {
    try {
      const response = await getDashboardState({
        range: value,
      });
      const responsemetricusage = await getMetricsUSage({
        range: value,
      });

      const responsemetriccategory = await getMetricsCategories({
        range: value,
      });

      const responsemetricperformance = await getMetricsPerformances({
        range: value,
      });

      const responsemetricdemographics = await getMetricsDemographics({
        range: value,
      });

      dispatch(setDashboardStats(response.data));
      dispatch(setUsageStats(responsemetricusage.data));
      dispatch(setCategoryData(responsemetriccategory.data));
      dispatch(setPerformanceData(responsemetricperformance.data));
      dispatch(setDemographicsData(responsemetricdemographics?.data));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData('7d');
  }, [selectedValue]);

  return (
    <header className=" top-0 pl-[280px] grid grid-cols-12  right-0 z-30 w-full flex-col sm:flex-row items-center py-2 px-4 sm:px-6 border-b border-border bg-background header-custom gap-4 sm:gap-2">
      <div className="flex items-center col-span-4">
        <InputWithIcon
          label="Search"
          icon={<SearchIcon className="w-4 h-4" />}
          iconPosition="left"
          onSearch={onSearch}
          placeHolder="Search queries, users or departments"
          inputClassName="placeholder:text-gray-400 w-full"
          iconClassName="text-primary"
        />
      </div>
      <div className="col-span-3" />
      <div className="flex items-center justify-end w-full flex-1 gap-2 sm:gap-4 col-span-4 ">
        <Select onValueChange={handleSelectChange} value={selected}>
          <SelectTrigger className="bg-border">
            <CalendarIcon className="w-4 h-4" />
            <SelectValue placeholder="Select Value" className="text-primary">
              {queryOptions.find((option) => option.value === selected)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {queryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="items-center justify-center flex w-8 h-8 sm:w-10 sm:h-10 object-contain">
              <AvatarImage
                alt="User Profile"
                src={user?.image}
                style={{
                  objectFit: 'fill',
                }}
              />
              <AvatarFallback className="bg-primary rounded-full px-2 sm:px-2.5 py-1 text-white">
                U
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="flex flex-col gap-y-3 ">
                <p className="text-sm font-medium text-gray-500">
                  {user?.firstName || 'User Name'}
                </p>
                <div className="flex flex-row gap-2" onClick={handleLogout}>
                  <span className="text-gray-500 font-medium">Logout</span>
                  <LogOutIcon className="h-4 w-4 mt-[2px]" />
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
