import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateCodeText } from "../slice/editorSlice";
import { codeTextSelector } from "../selector/selector";

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
    if (e.key === "Tab") {
      e.preventDefault();
      const updatedText =
        codeText.substring(0, start) + "   " + codeText.substring(end);
      dispatch(updateCodeText(updatedText));

      // Move cursor after tab space
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    if (e.key === "Enter") {
      const beforeCursor = codeText.substring(0, start);
      const lastChar = beforeCursor.trim().slice(-1);

      const lastBracket = lastChar === "{" ? "}" : ")";

      if (lastChar === "{" || lastChar === "(") {
        const indent = "   ";
        const newCode =
          codeText.substring(0, start) +
          `\n${indent}\n${lastBracket}` +
          codeText.substring(end);
        dispatch(updateCodeText(newCode));

        // Move cursor to indented line
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            start + indent.length + 1;
        }, 0);
      }
    }
  };

  const highlightSyntax = (text: string) => {
    // Step 1: Extract and replace string literals with placeholders
    const stringMatches: string[] = [];
    text = text.replace(/(['"`])(?:\\.|(?!\1).)*?\1/g, (match) => {
      stringMatches.push(match); // Store original string
      return `___STRING_PLACEHOLDER_${stringMatches.length - 1}___`;
    });

    // Step 2: Escape HTML (safe for rest of the code)
    text = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Step 3: Highlight keywords
    text = text
      .replace(/\b(let)\b/g, '<span class="keyword-blue">$1</span>')
      .replace(/\b(const)\b/g, '<span class="keyword-green">$1</span>')
      .replace(/\b(console)\b/g, '<span class="keyword-grey">$1</span>')
      .replace(
        /\b(function|return|await|async|if|else)\b/g,
        '<span class="keyword-purple">$1</span>'
      )
      .replace(/(=>)/g, '<span class="keyword-yellow">$1</span>')
      .replace(/\b(-?\d+(\.\d+)?)\b/g, '<span class="keyword-pink">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="comment-fade">$1</span>');

    // Step 4: Replace string placeholders with original strings inside span (escaped internally)
    stringMatches.forEach((str, i) => {
      // Escape string content only (not the quotes)
      const quote = str[0];
      const inner = str
        .slice(1, -1)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const highlighted = `<span class="string-lightRed">${quote}${inner}${quote}</span>`;
      text = text.replace(`___STRING_PLACEHOLDER_${i}___`, highlighted);
    });

    return text;
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
