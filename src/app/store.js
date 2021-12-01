import { configureStore } from '@reduxjs/toolkit';
import parametersSlice from '../features/parameters/parametersSlice';
import cityViewSlice from '../features/cityView/cityViewSlice';

export const store = configureStore({
  reducer: {
    parametersData: parametersSlice,
    cityView: cityViewSlice
  },
});
