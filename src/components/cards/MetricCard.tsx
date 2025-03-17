import type { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: number | undefined | null;
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
      <div className="mt-3 h-1 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
}
