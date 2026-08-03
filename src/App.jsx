import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import { LENIS_OPTIONS } from "./config/lenis.config";
import MetaGate from "./components/MetaGate";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";

export default function App() {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <BrowserRouter>
        <MetaGate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/portfolio/:name" element={<Project />} />
          </Routes>
        </MetaGate>
      </BrowserRouter>
    </ReactLenis>
  );
}
