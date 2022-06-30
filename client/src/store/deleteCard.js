import { createSlice } from "@reduxjs/toolkit";

const deleteCardSlice = createSlice({
    name: "deleteCard",
    initialState: {
        deleted: false,
    },
    reducers: {
        setDeleteCard(state) {
            state.deleted = !state.deleted;
        },
    },
});

export const deleteCardActions = deleteCardSlice.actions;
export const deleteCardReducer = deleteCardSlice.reducer;
