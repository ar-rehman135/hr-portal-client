'use client';
import { CalendarIcon, LogOutIcon, Menu, SearchIcon } from 'lucide-react';

import Image from '@/shadcn/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/select';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu';
import { DropdownMenu } from '@/shadcn/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/avatar';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { userLoggedOut } from '@/store/features/auth/authSlice';
import { InputWithIcon } from '@/shadcn/input-with-icon';
import { IHeaderProps } from '@/types';
import { queryOptions } from '../items';
import { useRouter } from 'next/navigation';

export function MobileHeader({
  onSearch,
  handleSelectChange,
  selected,
}: IHeaderProps) {
  const { user } = useAppSelector(getAuthDataSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex flex-col justify-between items-center p-3 border-b border-border bg-background">
      <div className="w-full flex justify-between my-6">
        <div className="flex items-center">
          <Image
            src="/images/logo.PNG"
            alt="HR PORTAL Logo"
            width={140}
            height={30}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-primary text-white">
                  {user?.firstName?.charAt(0) || 'U'}
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
                    <LogOutIcon className="h-4 w-4 mt-1 text-red-500" />
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center col-span-4 mb-4">
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
        <div className="col-span-3 mb-4" />
        <div className="flex items-center justify-end w-full flex-1 gap-2 sm:gap-4 col-span-4 ">
          <Select onValueChange={handleSelectChange} value={selected} defaultValue={"7d"}>
            <SelectTrigger className="bg-border">
              <CalendarIcon className="w-4 h-4" />
              <SelectValue placeholder="Select Value" className="text-primary">
                {
                  queryOptions.find((option) => option.value === selected)
                    ?.label
                }
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
      </div>
    </header>
  );
}
