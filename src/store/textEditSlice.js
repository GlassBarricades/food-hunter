import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	editText: false,
	editUuidText: '',
	editDataText: {
		text: '',
	},
	editModalText: false,
}

const editSliceText = createSlice({
	name: 'editText',
	initialState: initialState,
	reducers: {
		editedText(state, action) {
			state.editText = true
			state.editDataText = action.payload
			state.editUuidText = action.payload.uuid
			state.editModalText = true
		},
		endEditingText(state) {
			state.editText = false
		},
		setEditUuidText(state, action) {
			state.editUuidText = action.payload.tempUuid
		},
		setEditDataText(state, action) {
			state.editDataText = action.payload.formData
		},
		openModalText(state) {
			state.editModalText = true
		},
		closeModalText(state) {
			state.editModalText = false
			state.editDataText = {
				text: '',
			}
			state.editText = false
			state.editUuidText = ''
		},
	},
})

export const {
	editedText,
	endEditingText,
	setEditUuidText,
	setEditDataText,
	openModalText,
	closeModalText,
} = editSliceText.actions
export default editSliceText.reducer