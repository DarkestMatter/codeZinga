import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditor } from "../interface/IEditor";

const initialState: IEditor = {
  code: "console.log('//Welocme to CodeZinga//');",
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
      if (action.payload === "~~clear()~~") {
        state.output = [];
        return;
      }
      state.output = state.output
        ? [...state.output, action.payload]
        : [action.payload];
    },
    updateRunBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateCodeText, updateCompiledCode, updateRunBtnLoading } =
  editorSlice.actions;

export const editorReducer = editorSlice.reducer;
