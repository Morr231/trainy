import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./autorization";
import { otherUserReducer } from "./otherUser";
import { timerTimeReducer } from "./timerTime";
import { userUpdatedReducer } from "./userUpdated";

const store = configureStore({
    reducer: {
        auth: authReducer,
        otherUser: otherUserReducer,
        timerTime: timerTimeReducer,
        userUpdated: userUpdatedReducer,
    },
});

export default store;
