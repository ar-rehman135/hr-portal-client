'use client';
import { useEffect, useState } from 'react';

import { ILayoutProps } from '@/types';
import { cn } from '@/lib/cn';

import LeftNavbar from './Components/LeftNavBar';
import { Header } from './Components/Header';
import { MobileHeader } from './Components/MobileHeader';
import { MobileNavigation } from './Components/MobileNavigation';
import { useLazyGetDashboardStatesQuery } from '@/store/features/auth/protectedApi';

interface INavbar extends ILayoutProps {}

export function Navbar({ children, title }: INavbar) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('7d');
  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
    setSelectedValue(value);
    fetchData();
  };
  const fetchData = async () => {
    // try {
    //   const response = await getDashboardState({
    //     range: selectedValue,
    //   }).unwrap();
    //   console.log('Dashboard data:', response);
    // } catch (error) {
    //   console.error('Failed to fetch dashboard data:', error);
    // }
    console.log('yahoooo');
  };

  const [getDashboardState, { data, isFetching }] =
    useLazyGetDashboardStatesQuery();

  useEffect(() => {
    fetchData();
  }, [selectedValue]);

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
              onSelect={handleSelectChange}
              selectedValue={selectedValue}
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
        <MobileHeader />
        <MobileNavigation />
        <div className={cn('mt-[150px] overflow-auto px-6')}>{children}</div>
      </div>
    </>
  );
}
