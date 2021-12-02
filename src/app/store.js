import { configureStore } from '@reduxjs/toolkit';
import parametersSlice from '../features/parameters/parametersSlice';
import countriesSlice from '../features/countries/countriesSlice';
import cityViewSlice from '../features/cityView/cityViewSlice';

export const store = configureStore({
  reducer: {
    parametersData: parametersSlice,
    countriesData: countriesSlice,
    cityView: cityViewSlice
  },
});
