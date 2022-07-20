import { createSlice } from "@reduxjs/toolkit";

import getCookie from "../helper/getCookie";

let initialState = {
    isAuthed: false,
};

if (getCookie("token")) {
    initialState.isAuthed = true;
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state) {
            state.isAuthed = true;
        },
        logout(state) {
            state.isAuthed = false;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
