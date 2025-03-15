import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JsEditor } from "./editor/JsEditor";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JsEditor />} />
      </Routes>
    </BrowserRouter>
  );
};
