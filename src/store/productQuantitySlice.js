import { createSlice } from '@reduxjs/toolkit'
import { addOrder, removeOrder, resetOrder } from './orderSlice'

const productQuantitySlice = createSlice({
	name: 'productQuantitySlice',
	initialState: {
		productQuantity: [],
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(addOrder, (state, action) => {
			const { quantity, orderUuid } = action.payload
			state.productQuantity.push({ quantity: quantity, orderUuid: orderUuid })
		})
		builder.addCase(removeOrder, (state, action) => {
			const arr = state.productQuantity.filter(item => {
				return item.orderUuid !== action.payload.id
			})
			state.productQuantity = arr
		})
		builder.addCase(resetOrder, state => {
			state.productQuantity = []
		})
	},
})

export default productQuantitySlice.reducer
