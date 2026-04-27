import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}

export default App;
