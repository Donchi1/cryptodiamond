import {configureStore} from "@reduxjs/toolkit"
import adminAuthSlice from "./adminAuthSlice"
import authReducer from "./authSlice"
import appReducer from "./mainSlice"

export const store  = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        admin: adminAuthSlice
    }
})