"use client";

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import Game from "./pages/Game";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
        
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     {/* <Route path="/" element={<LandingPage />} /> */}
    //     {/* <Route path="/game" element={<Game />} /> */}
    //     {/* <Route path="/login" element={<Login />} /> */}
    //     {/* <Route path="/register" element={<Register />} /> */}
    //   </Routes>
    // </Router>
    
  );
}
