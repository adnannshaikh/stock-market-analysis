import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const StockPage = () => {
  const { symbol } = useParams();
  const [timeframe, setTimeframe] = useState("1d"); // Default: 1 Day
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/stock/${symbol}/${timeframe}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to fetch stock data.");

        setStockData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [symbol, timeframe]); // Refetch on timeframe change

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">📈 {symbol} Stock Data</h2>

      {loading && <p className="text-primary">Fetching data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card shadow-lg p-4">
        <h3 className="text-success">
          {stockData.length > 0 ? `$${stockData[stockData.length - 1].close.toFixed(2)}` : "Loading..."}
        </h3>
        <p className="text-muted">Updating every 5 seconds</p>

        {/* Timeframe Selector */}
        <div className="btn-group my-3">
          <button className={`btn ${timeframe === "1d" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTimeframe("1d")}>
            1 Day
          </button>
          <button className={`btn ${timeframe === "1w" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTimeframe("1w")}>
            1 Week
          </button>
          <button className={`btn ${timeframe === "1m" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTimeframe("1m")}>
            1 Month
          </button>
        </div>

        {/* Stock Price Chart */}
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => tick.split(" ")[0]} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Link to="/" className="btn btn-secondary mt-3">Go Back</Link>
    </div>
  );
};

export default StockPage;
