from fastapi import FastAPI, HTTPException
import requests
import os
import numpy as np
import yfinance as yf
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Load API Key for Alpha Vantage
API_KEY = os.getenv("STOCK_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load LSTM Model
try:
    model = load_model("stock_predictor.h5")
    print("✅ Model loaded successfully!")
except Exception as e:
    model = None
    print(f"⚠️ Error loading model: {e}")


def fetch_realtime_stock(symbol: str):
    """Fetch real-time stock price from Yahoo Finance."""
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock data not found")

        latest_price = data["Close"].iloc[-1]
        return {"symbol": symbol.upper(), "price": latest_price}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")


def fetch_historical_stock(symbol: str, period: str = "1m"):
    """Fetch historical stock data from Yahoo Finance."""
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period=period)

        if data.empty:
            print(f"⚠️ No stock data found for {symbol}. Possible reasons: Market closed, invalid symbol, or API limit.")
            raise HTTPException(status_code=404, detail="Stock data not available or API limit reached")

        # Print debug info
        print(f"✅ Successfully fetched data for {symbol}:")
        print(data.tail())  # Show last few rows in terminal

        stock_data = [
            {"date": date.strftime("%Y-%m-%d"), "close": float(row["Close"])}
            for date, row in data.iterrows()
        ]

        return stock_data

    except Exception as e:
        print(f"❌ Error fetching stock data for {symbol}: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")



@app.get("/api/realtime/{symbol}")
def get_realtime_stock_price(symbol: str):
    """API endpoint to fetch real-time stock price."""
    return fetch_realtime_stock(symbol)


@app.get("/api/stock/{symbol}/{timeframe}")
def get_stock_data(symbol: str, timeframe: str):
    function_map = {
        "1d": ("TIME_SERIES_INTRADAY", "Time Series (5min)", "5min"),
        "1w": ("TIME_SERIES_DAILY", "Time Series (Daily)", None),
        "1m": ("TIME_SERIES_DAILY_ADJUSTED", "Time Series (Daily)", None)
    }

    if timeframe not in function_map:
        return {"error": "Invalid timeframe. Use '1d', '1w', or '1m'."}

    function, key, interval = function_map[timeframe]

    params = {
        "function": function,
        "symbol": symbol,
        "apikey": API_KEY,
    }

    if interval:
        params["interval"] = interval  # Only add interval for intraday

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if key not in data:
        raise HTTPException(status_code=404, detail="Stock data not available or API limit reached")

    stock_data = [
        {"date": date, "close": float(details["4. close"])}
        for date, details in data[key].items()
    ]

    return stock_data[::-1]


@app.get("/api/trend/{symbol}")
def get_stock_trend(symbol: str):
    """Analyze short-term and long-term trends."""
    stock_data = fetch_historical_stock(symbol)

    prices = [d["close"] for d in stock_data if "close" in d]

    if len(prices) < 10:
        return {"trend": "Not enough data"}

    short_term = np.mean(prices[-5:])
    long_term = np.mean(prices[-10:])

    trend = "Bullish 📈" if short_term > long_term else "Bearish 📉"
    return {"trend": trend, "short_term_avg": short_term, "long_term_avg": long_term}


@app.get("/api/predict/{symbol}")
def predict_stock(symbol: str):
    """Use LSTM model to predict future stock price."""
    stock_data = fetch_historical_stock(symbol)

    stock_data = stock_data[-10:]  # Take the last 10 days

    if len(stock_data) < 10:
        raise HTTPException(status_code=400, detail="Not enough data for prediction")

    inputs = np.array([d["close"] for d in stock_data]).reshape(1, 10, 1)

    if model is None:
        raise HTTPException(status_code=500, detail="Prediction model not available")

    prediction = model.predict(inputs)
    return {"symbol": symbol.upper(), "predicted_price": float(prediction[0][0])}


@app.get("/api/sentiment/{symbol}")
def get_sentiment(symbol: str):
    """Simulated API for stock sentiment analysis (replace with actual logic)."""
    sentiment_data = {
        "symbol": symbol.upper(),
        "sentiment_score": 0.75,  # Example score
        "articles": [
            {"title": "Stock rises", "description": "Stock is performing well"},
            {"title": "Market fluctuates", "description": "Stock market volatility"},
        ],
    }
    return sentiment_data
