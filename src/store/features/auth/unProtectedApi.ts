import { userLoggedIn } from './authSlice';
import { unProtectedSlice } from '../api/unProtectedSlice';

export const authApi = unProtectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint here
    login: builder.mutation({
      query: (data) => ({
        url: 'https://cognito-idp.us-east-1.amazonaws.com/',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // setting tokens in local storages
          localStorage.setItem('token', result.data.accessToken);
          // localStorage.setItem('user', JSON.stringify(result.data.user));

          // setting logged data to redux state
          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // logout endpoint here
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
