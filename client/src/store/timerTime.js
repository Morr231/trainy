import { createSlice } from "@reduxjs/toolkit";

const timerTimeSlice = createSlice({
    name: "timerTime",
    initialState: {
        value: 0,
        essayFinished: false,
        pomodoroFinished: false,
        dangerousUpdated: false,
        dangerousFinished: false,
        changeValue: false,
    },
    reducers: {
        updateTime(state, time) {
            state.value = time.payload;
        },
        setEssayFinishedTrue(state) {
            state.essayFinished = true;
        },
        setEssayFinishedFalse(state) {
            state.essayFinished = false;
        },
        setPomodoroFinished(state) {
            state.pomodoroFinished = !state.pomodoroFinished;
        },
        setDangerousUpdated(state) {
            state.dangerousUpdated = !state.dangerousUpdated;
        },
        setDangerousFinished(state) {
            state.dangerousFinished = !state.dangerousFinished;
        },
        changeValue(state) {
            state.changeValue = !state.changeValue;
        },
    },
});

export const timerTimeActions = timerTimeSlice.actions;
export const timerTimeReducer = timerTimeSlice.reducer;
