import { createSlice } from "@reduxjs/toolkit";


const   initialState = {
        name: "",
        email: "",
        password: ""
    }

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logIn(state,action){

        },
        signUp(state,action){

        },
        logOut(){

        }
    }
  
})

export const {logIn,signUp,logOut} = userSlice.actions
export default userSlice.reducer