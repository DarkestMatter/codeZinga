import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    code: "",
  },
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setCode } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
