'use client';

import type React from 'react';
import Link from 'next/link';
import Image from '@/shadcn/image';
import { navItems } from '../items';
import { cn } from '@/lib/cn';
import { ArrowDownIcon, LogOutIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu';
import NextImage from '@/shadcn/image';
import { UserIcon } from 'lucide-react';
import { Button } from '@/shadcn/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import { userLoggedOut } from '@/store/features/auth/authSlice';

interface LeftNavbarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const LeftNavbar = ({ open, setOpen }: LeftNavbarProps) => {
  const { user } = useAppSelector(getAuthDataSelector);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <div
      className={cn(
        'fixed bg-background w-[280px] px-5 z-30 transition-all duration-300 flex-none border-r-2 border-border ',
        open && 'w-full'
      )}
      style={{
        minHeight: 'calc(100dvh - 1px)',
        maxHeight: 'calc(100dvh - 1px)',
        overflow: 'auto',
      }}
    >
      <div className="flex items-center justify-center py-6 border-b border-border">
        <Image
          src="/images/logo.PNG"
          alt="Hr Analytics Logo"
          width={150}
          height={50}
          style={{ marginLeft: -10 }}
        />
      </div>
      <div className="h-full w-full overflow-hidden mt-4 ">
        <div className="flex flex-col gap-2 flex-1">
          {navItems.map(({ category, items }) => (
            <div className="flex flex-col gap-2" key={category}>
              <div className="text-sm text-primary font-bold items-start ">
                {category}
              </div>
              {items.map(({ href, icon, label, active }) => (
                <NavItem
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  active={active}
                />
              ))}
              <div className="h-[0.5px] w-full bg-border" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[260px] py-4 flex flex-row custom-logout-container fixed bottom-0">
        <div className=" border-border flex flex-row items-center justify-between pr-2 cursor-pointer space-x-2 w-full">
          <div className="flex items-center gap-2">
            {user?.image ? (
              <NextImage
                className="w-10 h-10 rounded-full ml-2"
                src={user?.image}
                alt="User Profile"
                width={50}
                height={50}
              />
            ) : (
              <UserIcon className="w-8 h-8 rounded-full ml-2 text-primary" />
            )}
            <div className="flex flex-col">
              <p className="font-medium text-primary">
                {user?.firstName || 'User Name'}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <Button
            className="rounded-none  border-none !outline-none bg-transaparent hover:bg-transaparent !p-0 transition-none justify-end"
            variant={'outline'}
          >
            <LogOutIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  showBorderBottom?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`navbar-custom flex p-1 rounded-lg items-center gap-1 w-full px-2 ${active ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-primary hover:!text-primary-foreground'}`}
    >
      <div className={`p-2 rounded-full `}>{icon}</div>
      <span
        className={`text-sm font-bold text-center nav-item ${active ? '!text-white' : ''} `}
      >
        {label}
      </span>
    </Link>
  );
}

export default LeftNavbar;
