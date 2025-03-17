import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardStats {
  active_users: number;
  total_queries: number;
  average_satisfaction: number;
  average_response_time: number;
}

export interface UsageStats {
  total_queries: number;
  unique_users: number;
  avg_queries_per_user: number;
  daily_active_users: Record<string, number>;
  query_volume: Record<string, number>;
}

export interface CategoryData {
  category_distribution: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  top_5_categories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  trending_topics: Array<{ category: string; growth: number }>;
}

interface PerformanceData {
  chart_data: Array<{
    date: string;
    satisfaction_rate: number;
    resolution_rate: number;
    average_response_time: number;
  }>;
}

interface DemographicsData {
  department_usage: Record<string, number>;
  seniority_usage: Record<string, number>;
  new_vs_returning: Record<string, number>;
}

interface DashboardState {
  dashboardStats: DashboardStats | null;
  usageStats: UsageStats | null;
  categoryData: CategoryData | null;
  performanceData: PerformanceData | null;
  demographicsData: DemographicsData | null;
}

const initialState: DashboardState = {
  dashboardStats: null,
  usageStats: null,
  categoryData: null,
  performanceData: null,
  demographicsData: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<DashboardStats>) => {
      state.dashboardStats = action.payload;
    },
    setUsageStats: (state, action: PayloadAction<UsageStats>) => {
      state.usageStats = action.payload;
    },
    setCategoryData: (state, action: PayloadAction<CategoryData>) => {
      state.categoryData = action.payload;
    },
    setPerformanceData: (state, action: PayloadAction<PerformanceData>) => {
      state.performanceData = action.payload;
    },
    setDemographicsData: (state, action: PayloadAction<DemographicsData>) => {
      state.demographicsData = action.payload;
    },
  },
});

export const {
  setDashboardStats,
  setUsageStats,
  setCategoryData,
  setPerformanceData,
  setDemographicsData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
