import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/common/types';

const initialState: User = {
  sparcsID: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
