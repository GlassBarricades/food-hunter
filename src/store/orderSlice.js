import { createSlice } from '@reduxjs/toolkit'
import { notifications } from '@mantine/notifications'
import { Check } from 'tabler-icons-react'

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		order: [],
	},
	reducers: {
		addOrder(state, action) {
			const { quantity, label, item, id, price, handlers, orderUuid, delive } =
				action.payload
			state.order.push({
				...item,
				quantity: quantity,
				variantOrder: label,
				orderId: id,
				priceOrder: price,
				orderUuid: orderUuid,
				delive: delive,
			})
			notifications.show({
				title: 'Добавление в корзину',
				message: `${item.name} успешно добавлен в корзину!`,
				color: 'yellow',
				position: 'top-right',
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
		resetOrder(state) {
			state.order = []
		},
	},
})

export const { addOrder, removeOrder, resetOrder } = orderSlice.actions
export default orderSlice.reducer
