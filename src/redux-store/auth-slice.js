import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authStatus',
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.userInfo;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.token = null;
    },
  },
});
