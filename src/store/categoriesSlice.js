import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, ref, child, get } from 'firebase/database'

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const dbRef = ref(getDatabase())
		let dataCategories
		await get(child(dbRef, `/categories/`))
			.then(snapshot => {
				if (snapshot.exists()) {
					const data = Object.values(snapshot.val())
					return data
				} else {
					console.log('No data available')
				}
			})
			.then(data => {
				dataCategories = data
			})
			.catch(error => {
				console.error(error)
			})
		return dataCategories
	}
)

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
		status: null,
		error: null,
	},
	reducers: {
		setCategories(state) {
			const dbRef = ref(getDatabase())
			get(child(dbRef, `/categories/`))
				.then(snapshot => {
					if (snapshot.exists()) {
						const data = Object.values(snapshot.val())
						return data
					} else {
						console.log('No data available')
					}
				})
				.then(data => {
					state.categories = data
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
	extraReducers: {
		[fetchCategories.pending]: state => {
			state.status = 'loading'
			state.error = null
		},
		[fetchCategories.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.categories = action.payload
		},
		[fetchCategories.rejected]: (state, action) => {},
	},
})

export default categoriesSlice.reducer
