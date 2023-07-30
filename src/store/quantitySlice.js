import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderSlice";

const quantitySlice = createSlice({
  name: "quantity",
  initialState: {
    quantity: 1,
  },
  reducers: {
    incrementQuantity(state) {
      state.quantity += 1
    },
    decrementQuantity(state) {
      state.quantity -= 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder, (state) => {
        state.quantity = 1
    })
  }
});

export const { incrementQuantity, decrementQuantity } = quantitySlice.actions;

export default quantitySlice.reducer;
