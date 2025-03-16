import Grid from "@mui/material/Grid2";
import { CodeInput } from "./CodeInput";
import { RunButton } from "./RunButton";
import styled from "styled-components";
import { CodeOutput } from "./CodeOutput";

export const StyledCodeInputBox = styled(Grid)`
  height: 100vh;
`;

export const JsEditor: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={12} style={{ textAlign: "center" }}>
        <RunButton />
      </Grid>
      <StyledCodeInputBox size={6}>
        <CodeInput />
      </StyledCodeInputBox>
      <StyledCodeInputBox size={6}>
        <CodeOutput />
      </StyledCodeInputBox>
    </Grid>
  );
};
