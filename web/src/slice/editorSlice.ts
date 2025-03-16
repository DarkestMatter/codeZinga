import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditor } from "../interface/IEditor";

const initialState: IEditor = {
  code: "",
  loading: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    updateCodeText: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    updateCompiledCode: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
    },
    updateRunBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateCodeText, updateCompiledCode, updateRunBtnLoading } =
  editorSlice.actions;

export const editorReducer = editorSlice.reducer;
