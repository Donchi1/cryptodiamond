import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import appReducer from "./mainSlice"

export const store  = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer
    }
})