import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import ComponentGallery from "./pages/ComponentGallery";
import { ResumeProvider } from "./contexts/ResumeContext";
function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<ComponentGallery />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
