import { BASE_URL } from '@/configs/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints
export const protectedSlice = createApi({
  reducerPath: 'protected',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `${token}`);
      return headers;
    },
  }),
  tagTypes: ['Users'],

  endpoints: () => ({}),
});
