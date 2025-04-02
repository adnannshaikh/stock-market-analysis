import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import StockPage from "./components/StockPage";
import SentimentAnalysis from "./components/SentimentAnalysis";
import Auth from "./components/Auth";
import StockChart from "./components/StockChart"; // Import StockChart

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/sentiment" element={<SentimentAnalysis />} />
        <Route path="/stock/:symbol" element={<StockChart />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
