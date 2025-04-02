import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css"; 

function LandingPage() {
  const [symbol, setSymbol] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (symbol.trim()) {
      navigate(`/stock/${symbol.toUpperCase()}`);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">📊 Stock Market Sentiment Analyzer</h1>
      <p className="lead">Analyze market sentiment based on the latest news and trends.</p>

      <div className="row mt-4">
        {/* Market Sentiment Card */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title">📢 Market Sentiment</h5>
              <p className="card-text">Check stock market sentiment analysis based on real-time news.</p>
              <Link to="/sentiment" className="btn btn-primary">Analyze Sentiment</Link>
            </div>
          </div>
        </div>

        {/* Real-time Data with Search Box */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title">📈 Real-Time Stock Data</h5>
              <p className="card-text">Enter a stock symbol to view real-time data.</p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Stock Symbol (e.g., AAPL)"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>View Chart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5">
        <p className="text-muted">📈 Built for stock market enthusiasts.</p>
        <p className="small">© {new Date().getFullYear()} Stock Market Analyzer. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
