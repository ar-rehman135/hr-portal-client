'use client';
import { useEffect, useState } from 'react';

import { ILayoutProps } from '@/types';
import { cn } from '@/lib/cn';

import LeftNavbar from './Components/LeftNavBar';
import { Header } from './Components/Header';
import { MobileHeader } from './Components/MobileHeader';
import { MobileNavigation } from './Components/MobileNavigation';
import { useLazyGetDashboardStatesQuery } from '@/store/features/auth/protectedApi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { userLoggedOut } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
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

interface INavbar extends ILayoutProps {}

export function Navbar({ children, title }: INavbar) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(getAuthDataSelector);
  const [selected, setSelected] = useState('7d');

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
    fetchData(selected);
  }, [selected]);

  return (
    <>
      <div className="hidden h-screen md:flex overflow-hidden">
        <LeftNavbar open={open} setOpen={setOpen} />
        <div
          className="flex-col relative flex-1"
          style={{ marginLeft: '280px' }}
        >
          <div>
            <Header
              title={title}
              handleSelectChange={handleSelectChange}
              user={user}
              handleLogout={handleLogout}
            />
          </div>
          <div
            className={cn('mt-7 overflow-auto px-6')}
            style={{ height: 'calc(100vh - 100px)' }}
          >
            {children}
          </div>
        </div>
      </div>

      <div className="block md:hidden relative">
        <MobileHeader title={title} handleSelectChange={handleSelectChange} />
        <MobileNavigation />
        <div className={cn('mt-[200px] overflow-auto px-6')}>{children}</div>
      </div>
    </>
  );
}
