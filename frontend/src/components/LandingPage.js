import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css"; // Custom styles

function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">📊 Stock Market Sentiment Analyzer</h1>
      <p className="lead">Analyze market sentiment based on the latest news and trends.</p>

      <div className="row mt-4">
        {/* Card 1: Market Sentiment */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title">📢 Market Sentiment</h5>
              <p className="card-text">Check stock market sentiment analysis based on real-time news.</p>
              <Link to="/sentiment" className="btn btn-primary">Analyze Sentiment</Link>
            </div>
          </div>
        </div>

        {/* Card 2: Sign Up */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title">📝 Sign Up</h5>
              <p className="card-text">Create an account to track your stocks and market insights.</p>
              <Link to="/signup" className="btn btn-success">Get Started</Link>
            </div>
          </div>
        </div>

        {/* Card 3: Login */}
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title">🔐 Login</h5>
              <p className="card-text">Already have an account? Login to access personalized insights.</p>
              <Link to="/login" className="btn btn-dark">Login</Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5">
        <p className="text-muted">📈 Built for stock market enthusiasts.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
