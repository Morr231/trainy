import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./autorization";
import { timerTimeReducer } from "./timerTime";
import { deleteCardReducer } from "./deleteCard";
import { userUpdatedReducer } from "./userUpdated";

const store = configureStore({
    reducer: {
        auth: authReducer,
        timerTime: timerTimeReducer,
        deleteCard: deleteCardReducer,
        userUpdated: userUpdatedReducer,
    },
});

export default store;
