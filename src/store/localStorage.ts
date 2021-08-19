import type { RootState } from '@/common/types';

export const loadState = (): RootState | undefined => {
  // wrap this in try-catch since access
  // to localStorage might not be allowed
  try {
    const serializedState = localStorage.getItem('redux-persisted-state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('redux-persisted-state', serializedState);
  } catch (err) {
    console.warn('saveState failed');
  }
};
