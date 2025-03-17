import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JsEditor } from "./components/editor/JsEditor";

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<JsEditor />} />
      </Routes>
    </BrowserRouter>
  );
};
