import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
