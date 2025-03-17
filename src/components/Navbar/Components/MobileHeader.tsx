'use client';
import { LogOutIcon, Menu } from 'lucide-react';

import Image from '@/shadcn/image';

import { Button } from '@/shadcn/button';
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

export function MobileHeader() {
  const { user } = useAppSelector(getAuthDataSelector);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-3 border-b border-border bg-background">
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
    </header>
  );
}
