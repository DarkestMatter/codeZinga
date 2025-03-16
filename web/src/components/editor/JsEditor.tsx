import Grid from "@mui/material/Grid2";
import { CodeInput } from "./CodeInput";
import { RunButton } from "./RunButton";
import { CodeOutput } from "./CodeOutput";
import { EditorBox } from "../styled/StyledComps";

export const JsEditor: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={12} style={{ textAlign: "center" }}>
        <RunButton />
      </Grid>
      <EditorBox size={6}>
        <CodeInput />
      </EditorBox>
      <EditorBox size={6}>
        <CodeOutput />
      </EditorBox>
    </Grid>
  );
};
