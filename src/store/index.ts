import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import userReducer from './slices/user';
import loginReducer from './slices/login';
import darkReducer from './slices/dark';
import throttle from 'lodash/throttle';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    loggedIn: loginReducer,
    dark: darkReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  })
);

export type AppDispatch = typeof store.dispatch;
