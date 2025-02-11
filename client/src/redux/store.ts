import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';

export default configureStore({
  reducer: {
    filters: filterSlice
  },
})