import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    otherUserInfo: null,
};

const otherUserSlice = createSlice({
    name: "otherUser",
    initialState: initialState,
    reducers: {
        setOtherUserInfo(state, payload) {
            state.otherUserInfo = payload.payload;
        },
    },
});

export const otherUserActions = otherUserSlice.actions;
export const otherUserReducer = otherUserSlice.reducer;
