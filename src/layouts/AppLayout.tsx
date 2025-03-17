import { ReactNode } from 'react';

import { Navbar } from '../components/Navbar/Navbar';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children, title } = props;
  return <Navbar  title={title}>{children}</Navbar>;
};

export default AppLayout;
