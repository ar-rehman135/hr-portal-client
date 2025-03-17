'use client';

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

export function Header({
  onSearch,
  handleSelectChange,
  selected,
  user,
  handleLogout,
}: ILayoutProps) {
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
