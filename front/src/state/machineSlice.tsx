import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Receipe } from "../types/ReceipeTypes";
import { dummyReceipes } from "../Receipe/dummyData";
interface Machine {
  recipes: Receipe[];
  // Add other machine-related properties if necessary
}

const initialState: Machine = {
  recipes: [dummyReceipes[0], dummyReceipes[1]],
  // Initialize other machine-related properties if necessary
};

const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Receipe[]>) {
      state.recipes = action.payload;
    },
    addRecipe(state, action: PayloadAction<Receipe>) {
      state.recipes.push(action.payload);
    },
    // Add other necessary reducers for the machine
  },
});

export const { setRecipes, addRecipe } = machineSlice.actions;
export default machineSlice.reducer;
