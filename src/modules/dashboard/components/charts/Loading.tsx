import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import { Loader2 } from 'lucide-react';

interface ChartLoadingProps {
  title: string;
  description: string;
}

export function ChartLoading({ title, description }: ChartLoadingProps) {
  return (
    <Card className="border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-6 bg-border rounded-tl-2xl rounded-tr-2xl">
        <div>
          <CardTitle className="text-base font-medium text-gray-800">
            {title}
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <div className="h-[250px]">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
