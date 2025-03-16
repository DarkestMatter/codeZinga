import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const state = (state: RootState) => state;

export const codeTextSelector = createSelector(
  state,
  (state) => state.editor.code
);

export const codeOutputSelector = createSelector(
  state,
  (state) => state.editor?.output
);

export const isRunBtnLoadingSelector = createSelector(
  state,
  (state) => state.editor?.loading
);
