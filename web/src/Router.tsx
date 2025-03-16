import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JsEditor } from "./components/editor/JsEditor";

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/codeZinga">
      <Routes>
        <Route path="/" element={<JsEditor />} />
      </Routes>
    </BrowserRouter>
  );
};
