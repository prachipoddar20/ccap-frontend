import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice';

export const appStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
