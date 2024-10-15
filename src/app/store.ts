import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gruopSlice from '../features/group/gruopSlice';

export const store = configureStore({
  reducer: {
    group:gruopSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
