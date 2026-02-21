import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/userSlice"
import tabsSlice from "./slices/tabsSlice";
import productSlice from "./slices/productSlice"
import OrderSlice from "./slices/orderSlice"
import customerSlice from "./slices/customerSlice"

export const reduxStore = configureStore({
    reducer:{
        user:users,
        tabs:tabsSlice,
        product: productSlice,
        orders: OrderSlice,
        customerList:customerSlice
    }
})