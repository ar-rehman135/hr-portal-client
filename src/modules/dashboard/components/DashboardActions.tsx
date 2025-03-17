import { Filter } from 'lucide-react';
import { Button } from '@/shadcn/button';

export function DashboardActions() {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3 text-xs font-medium text-gray-700 border-gray-200"
      >
        <Filter className="h-3.5 w-3.5 mr-2" />
        Filter
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3 text-xs font-medium text-gray-700 border-gray-200"
      >
        Export
      </Button>
    </div>
  );
}
