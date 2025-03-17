'use client';

const topics = [
  { id: 1, text: 'Remote Work Policy', percentage: '+32%' },
  { id: 2, text: 'Mental Health Benefits', percentage: '+28%' },
  { id: 3, text: 'Learning & Development', percentage: '+24%' },
  { id: 4, text: 'Return to Office', percentage: '+18%' },
  { id: 5, text: 'Learning & Development', percentage: '+23%' },
  { id: 6, text: 'Return to Office', percentage: '+16%' },
];

export function TrendingTopics() {
  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl">
      <div className="mb-4 bg-border flex-row items-center justify-between pb-4 pt-2 px-6 rounded-tl-2xl rounded-tr-2xl">
        <h3 className="text-base font-medium">Trending Topics</h3>
        <p className="text-xs text-gray-500 mt-0.5">Growing in popularity</p>
      </div>
      <div className="space-y-4 h-[250px] px-4">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center justify-between">
            <div className="text-xs font-medium">{topic.text}</div>
            <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
              {topic.percentage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
