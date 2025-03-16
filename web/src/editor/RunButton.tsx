import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCompiledCode, updateRunBtnLoading } from "../slice/editorSlice";
import {
  codeTextSelector,
  isRunBtnLoadingSelector,
} from "../selector/selector";
import { useEffect } from "react";

export const RunButton: React.FC = () => {
  const dispatch = useDispatch();

  const codeText = useSelector(codeTextSelector);
  const isRunBtnLoading = useSelector(isRunBtnLoadingSelector);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args) => {
      const logMessage = args.join(" ");
      dispatch(updateCompiledCode(logMessage));
      originalLog.apply(console, args); // Keep showing logs in DevTools too
      dispatch(updateRunBtnLoading(false));
    };

    // Cleanup (restore original console.log when component unmounts)
    return () => {
      console.log = originalLog;
    };
  }, [console.log]);

  const evalCode = (code: string) => {
    try {
      eval(code);
    } catch (e) {
      console.log(e);
      dispatch(updateRunBtnLoading(false));
    }
  };

  const handleCompile = () => {
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
