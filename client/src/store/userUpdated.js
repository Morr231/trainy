import { createSlice } from "@reduxjs/toolkit";

const userUpdatedSlice = createSlice({
    name: "userUpdated",
    initialState: {
        updated: false,
    },
    reducers: {
        setUserUpdatedTrue(state) {
            state.updated = true;
        },
        setUserUpdatedFalse(state) {
            state.updated = false;
        },
    },
});

export const userUpdatedActions = userUpdatedSlice.actions;
export const userUpdatedReducer = userUpdatedSlice.reducer;
