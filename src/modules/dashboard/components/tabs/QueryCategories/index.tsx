import { DistributionCategories } from '../../charts/DistributionCategories';

import { TopQueries } from './TopQueries';
import { TrendingTopics } from './TrendingTopics';

export function QueryCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DistributionCategories />
      <TopQueries />
      <TrendingTopics />
    </div>
  );
}
