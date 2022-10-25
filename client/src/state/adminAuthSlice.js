import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    adminUser:{}
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
     getAdminUser:(state, action) => {
         console.log(action)
        return state.adminUser = action.payload
     }
    }
})

export const {getAdminUser} = adminSlice.actions
export default adminSlice.reducer