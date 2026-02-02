import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home Page
import Profile from "./pages/Profile"; // Import Profile Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;