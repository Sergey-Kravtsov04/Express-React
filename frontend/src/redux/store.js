import { configureStore } from "@reduxjs/toolkit";
import { majorsReducer } from "./slices/majors";
import { usersReducer } from "./slices/users";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer:{
        majors:majorsReducer,
        users: usersReducer,
        auth: authReducer,
    }
});

export default store;