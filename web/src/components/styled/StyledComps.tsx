import Grid from "@mui/material/Grid2";
import styled from "styled-components";

export const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: transparent;
  color: transparent;
  caret-color: #000;
  border: none;
  resize: none;
  z-index: 1;
  font-family: monospace;
  font-size: 14px;
  outline: none;
  line-height: 1.5;
`;

export const StyledCodeInputBox = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #white;
  padding: 10px;
  overflow: auto;
`;

export const StyledHighlightedBox = styled.pre`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 10px;
  pointer-events: none;
  color: #000;
  z-index: 0;
  margin-top: 0px;
  line-height: 1.5;
`;

export const EditorBox = styled(Grid)`
  height: 100vh;
`;
