import { configureStore } from "@reduxjs/toolkit";
import postReducer from './features/post/postSlice';
import usersReducer from './features/user/userSlice'

export const store = configureStore({
    reducer: {
        post: postReducer,
        users: usersReducer
    }
});