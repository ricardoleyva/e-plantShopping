import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import plantReducer from "./PlantSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    plant: plantReducer,
  },
});
export default store;
