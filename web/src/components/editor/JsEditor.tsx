import Grid from "@mui/material/Grid";
import { CodeInput } from "./CodeInput";
import { RunButton } from "./RunButton";
import { CodeOutput } from "./CodeOutput";
import { EditorBox } from "../styled/StyledComps";
import { useEffect } from "react";

export const JsEditor: React.FC = () => {
  useEffect(() => {
    console.clear();
  }, []);

  const streamUrl = "https://junkieembeds.pages.dev/embed/fusballtv1uhd-de";

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} style={{ height: "400px" }}>
        <iframe
          src={streamUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="origin"
        ></iframe>
        <a href={streamUrl} target="_blank" rel="noreferrer">
          Open stream
        </a>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
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
