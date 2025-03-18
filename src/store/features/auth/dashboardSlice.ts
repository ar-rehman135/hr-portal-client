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
  dashboardStatsLoading: boolean;
  dashboardStatsError: string | null;
  usageStats: UsageStats | null;
  usageStatsLoading: boolean;
  usageStatsError: string | null;
  categoryData: CategoryData | null;
  categoryDataLoading: boolean;
  categoryDataError: string | null;
  performanceData: PerformanceData | null;
  performanceDataLoading: boolean;
  performanceDataError: string | null;
  demographicsData: DemographicsData | null;
  demographicsDataLoading: boolean;
  demographicsDataError: string | null;
}

const initialState: DashboardState = {
  dashboardStats: null,
  usageStats: null,
  categoryData: null,
  performanceData: null,
  demographicsData: null,
  dashboardStatsLoading: false,
  dashboardStatsError: null,
  usageStatsLoading: false,
  usageStatsError: null,
  categoryDataLoading: false,
  categoryDataError: null,
  performanceDataLoading: false,
  performanceDataError: null,
  demographicsDataLoading: false,
  demographicsDataError: null,
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
    setDashboardStatsLoading: (state, action: PayloadAction<boolean>) => {
      state.dashboardStatsLoading = action.payload;
    },
    setUsageStatsLoading: (state, action: PayloadAction<boolean>) => {
      state.usageStatsLoading = action.payload;
    },
    setCategoryDataLoading: (state, action: PayloadAction<boolean>) => {
      state.categoryDataLoading = action.payload;
    },
    setPerformanceDataLoading: (state, action: PayloadAction<boolean>) => {
      state.performanceDataLoading = action.payload;
    },
    setDemographicsDataLoading: (state, action: PayloadAction<boolean>) => {
      state.demographicsDataLoading = action.payload;
    },
    setDashboardStatsError: (state, action: PayloadAction<string | null>) => {
      state.dashboardStatsError = action.payload;
    },
    setUsageStatsError: (state, action: PayloadAction<string | null>) => {
      state.usageStatsError = action.payload;
    },
    setCategoryDataError: (state, action: PayloadAction<string | null>) => {
      state.categoryDataError = action.payload;
    },
    setPerformanceDataError: (state, action: PayloadAction<string | null>) => {
      state.performanceDataError = action.payload;
    },
    setDemographicsDataError: (state, action: PayloadAction<string | null>) => {
      state.demographicsDataError = action.payload;
    },
    clearErrors: (state) => {
      state.dashboardStatsError = null;
      state.usageStatsError = null;
      state.categoryDataError = null;
      state.performanceDataError = null;
      state.demographicsDataError = null;
    },
  },
});

export const {
  setDashboardStats,
  setUsageStats,
  setCategoryData,
  setPerformanceData,
  setDemographicsData,
  setDashboardStatsLoading,
  setUsageStatsLoading,
  setCategoryDataLoading,
  setPerformanceDataLoading,
  setDemographicsDataLoading,
  setDashboardStatsError,
  setUsageStatsError,
  setCategoryDataError,
  setPerformanceDataError,
  setDemographicsDataError,
  clearErrors,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
