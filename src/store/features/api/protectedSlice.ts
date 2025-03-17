import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints
export const protectedSlice = createApi({
  reducerPath: 'protected',
  baseQuery: fetchBaseQuery({
    // baseUrl:process.env.NEXT_PUBLIC_API_URL,
    baseUrl: 'https://7919uxiuv2.execute-api.us-east-1.amazonaws.com/prod',

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `${token}`);
      // if (token) headers.set('Authorization', ``);

      return headers;
    },
  }),
  tagTypes: ['Users'],

  endpoints: () => ({}),
});
