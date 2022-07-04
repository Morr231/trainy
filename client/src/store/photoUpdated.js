import { createSlice } from "@reduxjs/toolkit";

const photoUpdatedSlice = createSlice({
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

export const photoUpdatedActions = photoUpdatedSlice.actions;
export const photoUpdatedReducer = photoUpdatedSlice.reducer;
