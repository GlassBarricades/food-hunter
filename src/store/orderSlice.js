import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		order: [],
	},
	reducers: {
		addOrder(state, action) {
			const { quantity, label, item, id, price, handlers, orderUuid } =
				action.payload
			state.order.push({
				...item,
				quantity: quantity,
				variantOrder: label,
				orderId: id,
				priceOrder: price,
				orderUuid: orderUuid,
			})
			if (typeof handlers === 'object') {
				handlers.set(0)
			} else {
				return undefined
			}
		},
		removeOrder(state, action) {
			state.order = state.order.filter(
				order => order.orderUuid !== action.payload.id
			)
		},
	},
})

export const { addOrder, removeOrder } = orderSlice.actions
export default orderSlice.reducer
