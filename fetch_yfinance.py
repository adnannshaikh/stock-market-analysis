import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol, start_date="2023-01-01", end_date="2024-01-01"):
    stock = yf.Ticker(symbol)
    data = stock.history(start=start_date, end=end_date)

    if data.empty:
        print(f"Error: No data found for {symbol}")
        return

    # Save to CSV
    data.to_csv("stock_data.csv")
    print("Stock data saved as stock_data.csv")

# Example Usage
fetch_stock_data("AAPL")  # Fetch Apple stock data
