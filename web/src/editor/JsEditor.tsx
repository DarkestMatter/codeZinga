import Grid from "@mui/material/Grid2";
import { CodeInput } from "./CodeInput";

export const JsEditor: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <CodeInput />
      </Grid>
    </Grid>
  );
};
