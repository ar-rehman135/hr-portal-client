import { useSelector } from 'react-redux';
import { DistributionCategories } from '../../charts/DistributionCategories';
import { TopQueries } from './TopQueries';
import { TrendingTopics } from './TrendingTopics';
import { AppState } from '@/store/rootReducer';

export function QueryCategories() {
  const categoryData = useSelector(
    (state: AppState) => state.dashboard.categoryData
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DistributionCategories
        category_distribution={categoryData?.category_distribution}
      />
      <TopQueries top_5_categories={categoryData?.top_5_categories} />
      <TrendingTopics trending_topics={categoryData?.trending_topics} />
    </div>
  );
}
