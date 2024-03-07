// jobsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Job } from "../types/ReceipeTypes";

// Define the type for a job

// Define the initial state
const initialState: Job = {};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.push(action.payload);
    },
    // Define other reducers as needed
  },
});

export const { addJob } = jobsSlice.actions;

// Selectors
export const selectJobs = (state: RootState) => state.jobs;

export default jobsSlice.reducer;
