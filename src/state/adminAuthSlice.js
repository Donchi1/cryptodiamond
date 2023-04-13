import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    adminUser:{},
    users: []
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
     getAdminUser:(state, action) => {
         return state.adminUser = action.payload
     },
     getAllUsers:(state, action) => {
         console.log(action)
         
        return state.users = action.payload
     }
    }
})

export const {getAdminUser, getAllUsers} = adminSlice.actions
export default adminSlice.reducer