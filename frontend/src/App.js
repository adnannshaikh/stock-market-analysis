import React, { useState } from "react";
import "./App.css";

function App() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);

  const fetchSentiment = async () => {
    if (!symbol) return;
    const response = await fetch(`http://127.0.0.1:5000/sentiment/${symbol}`);
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="container">
      <h1>Stock Market Sentiment Analysis</h1>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={fetchSentiment}>Analyze</button>

      {data && (
        <div className="result">
          <h2>Sentiment for {data.symbol}</h2>
          <p>Overall Sentiment Score: {data.sentiment_score}</p>
          <h3>Related News Articles</h3>
          <ul>
            {data.articles.map((article, index) => (
              <li key={index}>
                <strong>{article.title}</strong>: {article.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
