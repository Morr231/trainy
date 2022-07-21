import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isOtherUser: false,
};

const otherUserSlice = createSlice({
    name: "otherUser",
    initialState: initialState,
    reducers: {
        setOtherUserTrue(state) {
            state.otherUserInfo = true;
        },
        setOtherUserFalse(state) {
            state.otherUserInfo = false;
        },
    },
});

export const otherUserActions = otherUserSlice.actions;
export const otherUserReducer = otherUserSlice.reducer;
