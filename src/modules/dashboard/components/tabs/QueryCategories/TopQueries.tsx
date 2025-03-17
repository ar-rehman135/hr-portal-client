'use client';

const queries = [
  { id: 1, text: 'How do I request time off?', count: 245 },
  { id: 2, text: 'What are the health insurance options?', count: 198 },
  { id: 3, text: 'When is the next payday?', count: 175 },
  { id: 4, text: 'How do I update my tax withholdings?', count: 164 },
  { id: 5, text: 'What is the parental leave policy?', count: 176 },
  { id: 6, text: 'How do I update my tax withholdings?', count: 164 },
];

export function TopQueries({ top_5_categories }: { top_5_categories: any }) {
  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl">
      <div className="mb-4 bg-border flex-row items-center justify-between pb-4 pt-2 px-6 rounded-tl-2xl rounded-tr-2xl">
        <h3 className="text-base font-medium">Top Queries</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Most frequent user questions
        </p>
      </div>
      <div className="space-y-4 h-[250px] px-4 overflow-auto">
        {top_5_categories?.map((query: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="text-xs font-medium mr-2">{index + 1}.</div>
              <div className="text-xs font-medium capitalize">
                {query.category}
              </div>
            </div>
            <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
              {query.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
