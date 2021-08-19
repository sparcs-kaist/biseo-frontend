import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: false,
  reducers: {
    login: _ => true,
    logout: _ => false,
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
