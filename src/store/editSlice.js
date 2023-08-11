import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: 'edit',
    initialState: {
        edit: false
    },
    reducers: {
        edited(state) {
            state.edit = true
        },
        endEditing(state) {
            state.edit = false
        }
    }
})

export const {edited, endEditing} = editSlice.actions
export default editSlice.reducer