import { createSlice } from "@reduxjs/toolkit";

export const PlantSlice = createSlice({
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
      const name = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i] === name) {
          state.items.splice(i, 1);
        }
      }
    },
  },
});

export const { disablePlant, enablePlant } = PlantSlice.actions;
export default PlantSlice.reducer;
