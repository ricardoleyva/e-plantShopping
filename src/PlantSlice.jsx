import { createSlice } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

const PlantSlice = createSlice({
  name: "plant",
  initialState: {
    items: [],
  },
  reducers: {
    disablePlant: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (!existingItem) {
        state.items.push(name);
      }
    },
    enablePlant: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
  },
});

export const { disablePlant, enablePlant } = PlantSlice.actions;
export default PlantSlice.reducer;
