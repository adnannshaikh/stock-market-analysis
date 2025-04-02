import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SentimentAnalysis from "./components/SentimentAnalysis";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />  {/* Added Login Route */}
        <Route path="/sentiment" element={<SentimentAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
