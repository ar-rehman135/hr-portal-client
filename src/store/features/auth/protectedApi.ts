import { protectedSlice } from '../api/protectedSlice';
import {
  GET_CATEGORIES,
  GET_DASHBOARD_STATES,
  GET_DEMOGRAPHICS,
  GET_METRICS_USAGE,
  GET_PERFORMANCES,
} from '../api/endpoints';

export const authApi = protectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getDashboardStates: builder.query({
    //   query: () => ({
    //     url: GET_DASHBOARD_STATES,
    //     method: 'GET',
    //   }),

    // }),

    getDashboardStates: builder.query({
      query: (params) => ({
        url: GET_DASHBOARD_STATES,
        method: 'GET',
        params,
      }),
    }),
    getMetricsUsage: builder.query({
      query: (params) => ({
        url: GET_METRICS_USAGE,
        method: 'GET',
        params,
      }),
    }),

    getMetricsCategories: builder.query({
      query: (params) => ({
        url: GET_CATEGORIES,
        method: 'GET',
        params,
      }),
    }),

    getMetricsPerformances: builder.query({
      query: (params) => ({
        url: GET_PERFORMANCES,
        method: 'GET',
        params,
      }),
    }),

    getMetricsDemographics: builder.query({
      query: (params) => ({
        url: GET_DEMOGRAPHICS,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useLazyGetDashboardStatesQuery,
  useLazyGetMetricsUsageQuery,
  useLazyGetMetricsCategoriesQuery,
  useLazyGetMetricsPerformancesQuery,
  useLazyGetMetricsDemographicsQuery,
} = authApi;
