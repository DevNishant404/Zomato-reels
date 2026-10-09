import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice"
import foodSlice from "../redux/foodSlice";



export const store = configureStore({
  reducer: {
    authSlice,
    foodSlice
  },
});

export default store