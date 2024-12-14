import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import Dashboard from "./components/Dashboard";
import LandigPage from "./components/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandigPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
