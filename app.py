from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import requests
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

app = Flask(__name__)
CORS(app)
NEWS_API_KEY = "51f49c3eb16247e5967b8c35ae79fd99"  # Replace with your API Key


# Function to fetch latest news for a stock symbol
def get_stock_news(symbol):
    url = f"https://newsapi.org/v2/everything?q={symbol}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    news_data = response.json()

    articles = []
    if "articles" in news_data:
        for article in news_data["articles"][:5]:  # Get top 5 articles
            articles.append({"title": article["title"], "description": article["description"]})

    return articles


# Function to analyze sentiment
def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    sentiment_score = sia.polarity_scores(text)["compound"]
    return sentiment_score


# API Endpoint for Market Sentiment Analysis
@app.route('/sentiment/<symbol>', methods=['GET'])
def get_market_sentiment(symbol):
    try:
        news_articles = get_stock_news(symbol)

        sentiment_scores = []
        for article in news_articles:
            text = article["title"] + " " + (article["description"] or "")
            sentiment_score = analyze_sentiment(text)
            sentiment_scores.append(sentiment_score)

        # Calculate overall sentiment
        overall_sentiment = sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0

        return jsonify({"symbol": symbol, "sentiment_score": round(overall_sentiment, 2), "articles": news_articles})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
