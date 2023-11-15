import { createSlice } from '@reduxjs/toolkit'

const navBarSlice = createSlice({
	name: 'navBar',
	initialState: {
		navBar: false,
		homeNavBar: false,
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
		openHomeNavBar(state) {
			state.homeNavBar = true
		},
		closeHomeNavBar(state) {
			state.homeNavBar = false
		},
		toggleHomeNavBar(state) {
			if (state.homeNavBar === false) {
				state.homeNavBar = true
			} else {
				state.homeNavBar = false
			}
		},
	},
})

export const { openNavBar, closeNavBar, toggleNavBar, openHomeNavBar, closeHomeNavBar, toggleHomeNavBar } = navBarSlice.actions

export default navBarSlice.reducer
