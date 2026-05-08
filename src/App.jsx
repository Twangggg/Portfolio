import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";

function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconceptforpersonaluse-RAtYzrKI8rT6HVspQbsJBH05/"
        className="fixed inset-0 z-0 w-full h-full"
        style={{ border: "none" }}
        title="3D background"
        aria-hidden="true"
        scrolling="no"
      />
      <div className="relative z-10 h-full pointer-events-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
