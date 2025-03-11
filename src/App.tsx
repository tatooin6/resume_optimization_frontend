import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import ComponentGallery from "./pages/ComponentGallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<ComponentGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
