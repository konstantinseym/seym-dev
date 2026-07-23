import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import { LENIS_OPTIONS } from "./config/lenis.config";
import Home from "./pages/Home";
import Project from "./pages/Project";

export default function App() {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:name" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}
