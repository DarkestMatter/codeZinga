import { useSelector } from "react-redux";
import styled from "styled-components";
import Grid from "@mui/material/Grid2";
import { codeOutputSelector } from "../../selector/selector";

export const CompiledArea = styled.div`
  width: 100%;
  height: 100vh;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
`;

export const CodeOutput: React.FC = () => {
  const codeOutput = useSelector(codeOutputSelector);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <CompiledArea>
          {codeOutput?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
        </CompiledArea>
      </Grid>
    </Grid>
  );
};
