import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    addOrder(state, action) {
      // setProductsArray([...productsArray, id]);
      // setProductsKolArr([...productsKolArr, String(value)]);
      let obj = action.payload.item;
      obj.quantity = action.payload.quantity;
      obj.variantOrder = action.payload.label;
      obj.orderId = action.payload.id;
      obj.priceOrder = action.payload.price;
      obj.orderUuid = uid();
      state.order.push(obj);
         if (typeof action.payload.handler === "object") {
            action.payload.handler.set(0);
         } else {
            action.payload.handler(1);
         }
    },
    removeOrder(state, action) {
      state.order = state.order.filter(order => order.orderUuid !== action.payload.id);
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
