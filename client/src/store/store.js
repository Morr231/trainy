import { configureStore } from "@reduxjs/toolkit";

import { authReducer, userInfoReducer } from "./autorization";
import { deleteCardReducer } from "./deleteCard";

const store = configureStore({
    reducer: {
        auth: authReducer,
        userInfo: userInfoReducer,
        deleteCard: deleteCardReducer,
    },
});

export default store;
