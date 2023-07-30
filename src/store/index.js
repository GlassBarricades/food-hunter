import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import productQuantitySlice from './productQuantitySlice';
import productsArrSlice from './productsArrSlice';
import quantitySlice from './quantitySlice';

export default configureStore({
  reducer: {
    order: orderReducer,
    quantity: quantitySlice,
    productsArr: productsArrSlice,
    productQuantity: productQuantitySlice
  },
});