import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { updateCodeText } from "../../slice/editorSlice";
import { codeTextSelector } from "../../selector/selector";
import { highlightSyntax } from "../../common/highlightSyntax";
import {
  StyledCodeInputBox,
  StyledHighlightedBox,
  TextArea,
} from "../styled/StyledComps";

export const CodeInput: React.FC = () => {
  const dispatch = useDispatch();

  const codeText = useSelector(codeTextSelector);

  const handleCodeChange = (code: string) => {
    dispatch(updateCodeText(code));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const indent = "   ";
    if (e.key === "Tab") {
      e.preventDefault();
      textarea.setRangeText(indent, start, end, "end");
    }

    if (e.key === "Enter") {
      const beforeCursor = codeText.substring(0, start);
      const lastChar = beforeCursor.trim().slice(-1);
      const nextChar = codeText.substring(end, end + 1);
      const addIndent = nextChar === "";

      const lastBracket = lastChar === "{" ? "}" : ")";

      if (addIndent && (lastChar === "{" || lastChar === "(")) {
        textarea.setRangeText(`\n${indent}\n${lastBracket}`, start, end, "end");
        // Move cursor to indented line
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            start + indent.length + 1;
        }, 0);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <StyledCodeInputBox>
          <StyledHighlightedBox
            dangerouslySetInnerHTML={{ __html: highlightSyntax(codeText) }}
          />
          <TextArea
            value={codeText}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
        </StyledCodeInputBox>
      </Grid>
    </Grid>
  );
};
