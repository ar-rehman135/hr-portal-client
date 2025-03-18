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
import {
  clearErrors,
  setCategoryData,
  setCategoryDataError,
  setCategoryDataLoading,
  setDashboardStats,
  setDashboardStatsLoading,
  setDemographicsData,
  setDemographicsDataError,
  setDemographicsDataLoading,
  setPerformanceData,
  setPerformanceDataError,
  setPerformanceDataLoading,
  setUsageStats,
  setUsageStatsError,
  setUsageStatsLoading,
} from '@/store/features/auth/dashboardSlice';
import { batch } from 'react-redux';

interface INavbar extends ILayoutProps {}

export function Navbar({ children, title }: INavbar) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(getAuthDataSelector);
  const [selected, setSelected] = useState('7d');

  const [getDashboardState] = useLazyGetDashboardStatesQuery();

  const [getMetricsUSage] = useLazyGetMetricsUsageQuery();

  const [getMetricsCategories] = useLazyGetMetricsCategoriesQuery();

  const [getMetricsPerformances] = useLazyGetMetricsPerformancesQuery();

  const [getMetricsDemographics] = useLazyGetMetricsDemographicsQuery();

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
      dispatch(clearErrors());
      dispatch(setDashboardStatsLoading(true));
      dispatch(setUsageStatsLoading(true));
      dispatch(setCategoryDataLoading(true));
      dispatch(setPerformanceDataLoading(true));
      dispatch(setDemographicsDataLoading(true));

      const [
        response,
        responsemetricusage,
        responsemetriccategory,
        responsemetricperformance,
        responsemetricdemographics,
      ] = await Promise.all([
        getDashboardState({
          range: value,
        }),
        getMetricsUSage({
          range: value,
        }),
        getMetricsCategories({
          range: value,
        }),
        getMetricsPerformances({
          range: value,
        }),
        getMetricsDemographics({
          range: value,
        }),
      ]);

      if (response.data) {
        dispatch(setDashboardStats(response.data));
      }
      if (responsemetricusage.data) {
        dispatch(setUsageStats(responsemetricusage.data));
      }
      if (responsemetriccategory.data) {
        dispatch(setCategoryData(responsemetriccategory.data));
      }
      if (responsemetricperformance.data) {
        dispatch(setPerformanceData(responsemetricperformance.data));
      }
      if (responsemetricdemographics.data) {
        dispatch(setDemographicsData(responsemetricdemographics.data));
      }

      if (responsemetricusage.error) {
        dispatch(setUsageStatsError(responsemetricusage.error as string));
      }
      if (responsemetriccategory.error) {
        dispatch(setCategoryDataError(responsemetriccategory.error as string));
      }
      if (responsemetricperformance.error) {
        dispatch(
          setPerformanceDataError(responsemetricperformance.error as string)
        );
      }
      if (responsemetricdemographics.error) {
        dispatch(
          setDemographicsDataError(responsemetricdemographics.error as string)
        );
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      dispatch(setDashboardStatsLoading(false));
      dispatch(setUsageStatsLoading(false));
      dispatch(setCategoryDataLoading(false));
      dispatch(setPerformanceDataLoading(false));
      dispatch(setDemographicsDataLoading(false));
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
              selected={selected}
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
        <MobileHeader
          title={title}
          handleSelectChange={handleSelectChange}
          selected={selected}
        />
        <MobileNavigation />
        <div className={cn('mt-[300px] overflow-auto px-6')}>{children}</div>
      </div>
    </>
  );
}
