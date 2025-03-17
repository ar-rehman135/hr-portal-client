import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  changeDirection: 'up' | 'down';
  changeLabel: string;
}

export function MetricCard({
  icon,
  label,
  value,
  change,
  changeDirection,
  changeLabel,
}: MetricCardProps) {
  return (
    <div className="bg-background rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-gray-500 font-medium">{label}</div>
        <div className="bg-background p-1.5 rounded-full">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      {/* <div className="flex items-center text-xs">
        {changeDirection === 'up' ? (
          <ArrowUp className="h-3 w-3 text-accent mr-1" />
        ) : (
          <ArrowDown className="h-3 w-3 text-accent mr-1" />
        )}
        <span className="text-accent font-medium">{change}</span>
        <span className="text-gray-500 ml-1">{changeLabel}</span>
      </div> */}
      <div className="mt-3 h-1 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
}
