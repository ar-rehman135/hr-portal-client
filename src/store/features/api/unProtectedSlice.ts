import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints
export const unProtectedSlice = createApi({
  reducerPath: 'unProtected',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Login'],
  endpoints: () => ({}),
});
