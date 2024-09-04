import { createSlice } from "@reduxjs/toolkit";

export const authRole = createSlice({
  name: "authRole",
  initialState: {
    role: "host"
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    }
  }
});

export const { setRole } = authRole.actions;
export default authRole.reducer;
