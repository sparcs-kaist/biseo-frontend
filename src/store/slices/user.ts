import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/common/types';

const initialState: User = {
  ssoUID: null,
  sparcsID: null,
  isUserAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
