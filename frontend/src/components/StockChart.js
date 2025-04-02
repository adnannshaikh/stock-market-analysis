import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StockChart() {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [trend, setTrend] = useState("");
  const [shortTermAvg, setShortTermAvg] = useState(null);
  const [longTermAvg, setLongTermAvg] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!symbol) return;

    // Fetch Stock Price Data
    fetch(`http://127.0.0.1:8000/api/stock/${symbol}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          setData([]);
        } else {
          setData(result);
          setError("");
        }
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch stock data.");
      });

    // Fetch Stock Trend Data
    fetch(`http://127.0.0.1:8000/api/trend/${symbol}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.trend) {
          setTrend(result.trend);
          setShortTermAvg(result.short_term_avg);
          setLongTermAvg(result.long_term_avg);
        } else {
          setTrend("No trend data available");
        }
      })
      .catch((err) => {
        console.error("Trend Fetch Error:", err);
        setTrend("Failed to fetch trend data.");
      });

  }, [symbol]);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h2>{symbol} Stock Price</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Trend Information */}
      <div style={{ marginBottom: "20px", fontSize: "18px" }}>
        <strong>Market Trend:</strong> {trend}  
        {shortTermAvg && longTermAvg && (
          <p>
            📊 <strong>Short-term Avg:</strong> ${shortTermAvg.toFixed(2)} |  
            📉 <strong>Long-term Avg:</strong> ${longTermAvg.toFixed(2)}
          </p>
        )}
      </div>

      {/* Stock Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
