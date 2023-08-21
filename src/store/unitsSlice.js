import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, ref, child, get } from 'firebase/database'

export const fetchUnits = createAsyncThunk('units/fetchUnits', async () => {
	const dbRef = ref(getDatabase())
	let dataUnits
	let unitsArray
	await get(child(dbRef, `/units/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				const data = Object.values(snapshot.val())
				return data
			} else {
				console.log('No data available')
			}
		})
		.then(data => {
			dataUnits = data
			unitsArray = data.map(item => {
				return item.name
			})
		})
		.catch(error => {
			console.error(error)
		})
	return dataUnits
})

const unitsSlice = createSlice({
	name: 'units',
	initialState: {
		units: [],
		unitsNamesArray: [],
		status: null,
		error: null,
	},
	reducers: {
		setUnits(state) {
			const dbRef = ref(getDatabase())
			get(child(dbRef, `/units/`))
				.then(snapshot => {
					if (snapshot.exists()) {
						const data = Object.values(snapshot.val())
						return data
					} else {
						console.log('No data available')
					}
				})
				.then(data => {
					state.units = data
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
	extraReducers: {
		[fetchUnits.pending]: state => {
			state.status = 'loading'
			state.error = null
		},
		[fetchUnits.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.units = action.payload
			state.unitsNamesArray = action.payload.map(item => {
				return item.name
			})
		},
		[fetchUnits.rejected]: (state, action) => {},
	},
})

export default unitsSlice.reducer
