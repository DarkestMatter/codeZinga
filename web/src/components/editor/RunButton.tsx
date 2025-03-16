import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompiledCode,
  updateRunBtnLoading,
} from "../../slice/editorSlice";
import {
  codeTextSelector,
  isRunBtnLoadingSelector,
} from "../../selector/selector";
import { useEffect } from "react";

export const RunButton: React.FC = () => {
  const dispatch = useDispatch();

  const codeText = useSelector(codeTextSelector);
  const isRunBtnLoading = useSelector(isRunBtnLoadingSelector);

  useEffect(() => {
    const originalLog = console.log;
    // const originalConsoleError = console.error;
    // const capturedErrors: string[] = [];

    console.log = (...args) => {
      const logMessage = args.reduce((a, b) => {
        typeof b === "object" ? a + JSON.stringify(b) : a + b, "";
      });
      dispatch(updateCompiledCode(JSON.stringify(logMessage) || "undefined"));
      originalLog.apply(console, args);
      dispatch(updateRunBtnLoading(false));
    };

    // console.error = (...args) => {
    //   capturedErrors.push(args.map(String).join(" "));
    //   dispatch(
    //     updateCompiledCode(JSON.stringify(capturedErrors) || "undefined")
    //   );
    //   originalConsoleError.apply(console, args);
    //   dispatch(updateRunBtnLoading(false));
    // };

    return () => {
      console.clear();
    };
  }, []);

  const evalCode = (code: string) => {
    window.onerror = function (message, lineno, colno) {
      dispatch(updateRunBtnLoading(false));
      dispatch(
        updateCompiledCode(`Global Error: ${message} at ${lineno}:${colno}`)
      );
    };

    window.onunhandledrejection = function (event) {
      const errorMessage =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason);
      dispatch(updateRunBtnLoading(false));
      dispatch(updateCompiledCode(`Unhandled Promise Error: ${errorMessage}`));
    };

    try {
      const result = eval(code);
      // Optionally check for promise
      if (result instanceof Promise) {
        result.catch((err) => {
          dispatch(updateRunBtnLoading(false));
          dispatch(updateCompiledCode(`Promise Error: ${err?.message || err}`));
        });
      }
    } catch (e: unknown) {
      dispatch(updateRunBtnLoading(false));

      const errorMessage = e instanceof Error ? e.message : String(e);
      const stack = (e as any).stack || "";

      // Extract line number from stack trace
      const match = stack.match(/<anonymous>:(\d+):\d+/);
      const lineNum = match ? parseInt(match[1]) : null;

      let codeLine = "";
      if (lineNum !== null) {
        const codeLines = code.split("\n");
        codeLine = codeLines[lineNum - 1]?.trim() || "";
      }

      const finalErrorMessage = lineNum
        ? `Error on line ${lineNum}: ${errorMessage}\n ${codeLine}`
        : `Error: ${errorMessage}`;

      dispatch(updateCompiledCode(finalErrorMessage));
    }
  };

  const handleCompile = () => {
    dispatch(updateCompiledCode("~~clear()~~"));
    dispatch(updateRunBtnLoading(true));
    evalCode(codeText);
  };

  return (
    <Button
      style={{ marginTop: "10px" }}
      variant="contained"
      color="primary"
      onClick={handleCompile}
      disabled={isRunBtnLoading}
    >
      Run
    </Button>
  );
};
