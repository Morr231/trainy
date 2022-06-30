import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isAuthed: false,
};

if (window.localStorage.getItem("token")) {
    initialState.isAuthed = true;
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },
    },
});

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
export const userInfoActions = userInfoSlice.actions;

export const authReducer = authSlice.reducer;
export const userInfoReducer = userInfoSlice.reducer;
