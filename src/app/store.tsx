import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../features/countrySlice'
import favoriteSlice from '../features/favoriteSlice';

export const store = configureStore({
    reducer: {
        country: countryReducer,
        favorite: favoriteSlice
    },
  });
  