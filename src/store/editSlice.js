import { createSlice } from '@reduxjs/toolkit'

const editSlice = createSlice({
	name: 'edit',
	initialState: {
		edit: false,
		editUuid: '',
		editData: {},
		editModal: false,
	},
	reducers: {
		edited(state, action) {
			state.edit = true
			state.editData = action.payload
			state.editUuid = action.payload.uuid
			state.editModal = true
		},
		endEditing(state) {
			state.edit = false
		},
		setEditUuid(state, action) {
			state.editUuid = action.payload.tempUuid
		},
		setEditData(state, action) {
			state.editData = action.payload.formData
		},
		openModal(state) {
			state.editModal = true
		},
		closeModal(state) {
			state.editModal = false
			state.editData = {}
			state.edit = false
			state.editUuid = ''
		},
	},
})

export const {
	edited,
	endEditing,
	setEditUuid,
	setEditData,
	openModal,
	closeModal,
} = editSlice.actions
export default editSlice.reducer
