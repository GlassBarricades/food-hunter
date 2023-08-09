import { createSlice } from '@reduxjs/toolkit'
import { addOrder, removeOrder, resetOrder } from './orderSlice'

const productsArrSlice = createSlice({
	name: 'productsArr',
	initialState: {
		productsArr: [],
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(addOrder, (state, action) => {
			const { id, orderUuid } = action.payload
			state.productsArr.push({ id: id, orderUuid: orderUuid })
		})
		builder.addCase(removeOrder, (state, action) => {
			const arr = state.productsArr.filter(item => {
				return item.orderUuid !== action.payload.id
			})
			state.productsArr = arr
		})
		builder.addCase(resetOrder, state => {
			state.productsArr = []
		})
	},
})

export default productsArrSlice.reducer
