import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
        activeTab: "dashboard",
        loading: false,
        errors: null
    }

const TabsSlice = createSlice({
    name: "tabs",
   initialState,
    reducers:{
        setActiveTab(state,action){
            state.activeTab = action.payload

        },
        setLoading(state,action){
            state.loading = true,
            state.errors = false
        },
        setErrors(state, action){
            state.loading = false
            state.errors = action.payload
        }

    }
})

export const {setActiveTab,setLoading,setErrors} = TabsSlice.actions
export default  TabsSlice.reducer