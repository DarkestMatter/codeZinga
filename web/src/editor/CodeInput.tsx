import Grid from "@mui/material/Grid2";
import { useState } from "react";
import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
`;

export const CodeInput: React.FC = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = (code: string) => {
    setCode(code);
    //dispatch(setCode(code));
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextArea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
