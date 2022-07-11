import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./autorization";
import { timerTimeReducer } from "./timerTime";
import { userUpdatedReducer } from "./userUpdated";

const store = configureStore({
    reducer: {
        auth: authReducer,
        timerTime: timerTimeReducer,
        userUpdated: userUpdatedReducer,
    },
});

export default store;
