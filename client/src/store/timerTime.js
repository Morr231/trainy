import { createSlice } from "@reduxjs/toolkit";

const timerTimeSlice = createSlice({
    name: "deleteCard",
    initialState: {
        value: 0,
        pomodoroFinished: false,
    },
    reducers: {
        updateTime(state, time) {
            state.value = time.payload;
        },
        setPomodoroFinished(state, time) {
            state.pomodoroFinished = !state.pomodoroFinished;
        },
    },
});

export const timerTimeActions = timerTimeSlice.actions;
export const timerTimeReducer = timerTimeSlice.reducer;
