import Link from 'next/link';

import { navItems } from '../items';

export function MobileNavigation() {
  return (
    <div className="fixed top-[55px] left-0 right-0 flex overflow-x-auto gap-x-4 scrollbar-hide border-b border-border bg-background">
      <div className="flex items-center gap-x-4">
        {navItems.map(({ category, items }) => (
          <div key={category} className="flex flex-row gap-2">
            {items.map(({ href, icon, label, active }) => (
              <MobileNavItem
                key={label}
                href={href}
                icon={icon}
                label={label}
                active={active}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface MobileNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  showBorderBottom?: boolean;
}

function MobileNavItem({
  href,
  icon,
  label,
  active,
  showBorderBottom,
}: MobileNavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 w-full px-2">
      <div
        className={`p-2 rounded-full ${active ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-primary hover:!text-primary-foreground'}`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] text-center nav-item ${active ? '' : ''}`}
      >
        {label}
      </span>
      {showBorderBottom && <hr className="w-full bg-background" />}
    </Link>
  );
}
