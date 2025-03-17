import { ReactNode } from 'react';

export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface ITask {
  id: string;
  title: string;
  status: Status;
  color: string;
}

export interface ILayoutProps {
  children?: ReactNode;
  title?: string;
  showSearch?: boolean;
  onSearch?: (searchText: string) => void;
  showSelect?: boolean;
  handleSelectChange?: (value: string) => void;
  selected?: string;
  user?: any;
  handleLogout?: () => void;
}

export interface IHeaderProps {
  children?: ReactNode;
  title?: string;
  showSearch?: boolean;
  onSearch?: (searchText: string) => void;
  showSelect?: boolean;
  handleSelectChange?: (value: string) => void;
  selected?: string;
}

export interface User {
  id: number;
  name: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
}
