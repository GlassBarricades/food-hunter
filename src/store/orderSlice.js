import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    addOrder(state, action) {
      const {quantity, label, item, id, price} = action.payload
      // setProductsArray([...productsArray, id]);
      // setProductsKolArr([...productsKolArr, String(value)]);
      state.order.push({...item, quantity: quantity, variantOrder: label, orderId: id, priceOrder: price, orderUuid: uid()});
    },
    removeOrder(state, action) {
      state.order = state.order.filter(order => order.orderUuid !== action.payload.id);
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
