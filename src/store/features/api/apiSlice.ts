import { BASE_URL } from '@/configs/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7919uxiuv2.execute-api.us-east-1.amazonaws.com/prod',
    credentials: 'include',
  }),
  tagTypes: [''],
  endpoints: () => ({}),
});
