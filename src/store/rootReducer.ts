import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import dashboardReducer from './features/auth/dashboardSlice';
import { protectedSlice } from './features/api/protectedSlice';
import { unProtectedSlice } from './features/api/unProtectedSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [protectedSlice.reducerPath]: protectedSlice.reducer,
  [unProtectedSlice.reducerPath]: unProtectedSlice.reducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
