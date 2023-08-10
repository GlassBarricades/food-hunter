import { createSlice } from '@reduxjs/toolkit'

const navBarSlice = createSlice({
	name: 'navBar',
	initialState: {
		navBar: false,
	},
	reducers: {
		openNavBar(state) {
			state.navBar = true
		},
		closeNavBar(state) {
			state.navBar = false
		},
		toggleNavBar(state) {
			if (state.navBar === false) {
				state.navBar = true
			} else {
				state.navBar = false
			}
		},
	},
})

export const { openNavBar, closeNavBar, toggleNavBar } = navBarSlice.actions

export default navBarSlice.reducer
