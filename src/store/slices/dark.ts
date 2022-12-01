import { createSlice } from '@reduxjs/toolkit';

export const darkSlice = createSlice({
  name: 'dark',
  initialState: false,
  reducers: {
    setDarkMode: _ => true,
    setLightMode: _ => false,
  },
});

export const { setDarkMode, setLightMode } = darkSlice.actions;

export default darkSlice.reducer;
