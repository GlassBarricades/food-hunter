import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import quantitySlice from './quantitySlice';

export default configureStore({
  reducer: {
    order: orderReducer,
    quantity: quantitySlice,
  },
});