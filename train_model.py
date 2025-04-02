import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load stock data from CSV
def load_stock_data():
    df = pd.read_csv("stock_data.csv")  # Ensure you have this file with "Close" column
    return df[["Close"]].values

# Load and preprocess data
data = load_stock_data()
scaler = MinMaxScaler(feature_range=(0, 1))  # Normalize between 0 and 1
data_scaled = scaler.fit_transform(data)

# Prepare training dataset
X_train, y_train = [], []
for i in range(10, len(data_scaled)):  # Using 10-day historical data for predictions
    X_train.append(data_scaled[i-10:i])
    y_train.append(data_scaled[i])

X_train, y_train = np.array(X_train), np.array(y_train)

# Build LSTM Model
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(10, 1)),
    LSTM(50, return_sequences=False),
    Dense(25),
    Dense(1)
])

# Compile Model
model.compile(optimizer="adam", loss="mean_squared_error")

# Train Model
model.fit(X_train, y_train, epochs=10, batch_size=32)

# Save Model
model.save("stock_predictor.h5")

print("Model trained and saved as stock_predictor.h5")
