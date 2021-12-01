import { configureStore } from '@reduxjs/toolkit';
import parametersSlice from '../features/parameters/parametersSlice';

export const store = configureStore({
  reducer: {
    parametersData: parametersSlice,
  },
});
