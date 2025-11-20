from fastapi import FastAPI, Query, HTTPException # pyright: ignore[reportMissingImports]
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]
from py_finance import get_stock_history # pyright: ignore[reportMissingImports]
from ml_forecast.service import StockForecaster # pyright: ignore[reportMissingImports]
import logging

# Create FastAPI app
app = FastAPI(title="API")

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/data")
def get_data():
    return {"message": "Hello from Python API!"}

# @app.get("/api/stock/{symbol}", response_model=StockData)
# def get_stock(symbol: str):
#     """Get real-time stock data for a symbol (e.g., AAPL, GOOGL)"""
#     return get_stock_info(symbol)

@app.get("/api/stock/{symbol}/history")
def get_stock_history_endpoint(
    symbol: str,
    period: str = "1y",
    target_currency: Optional[str] = Query(None, description="Convert to currency (e.g., EUR, GBP, JPY)")
):
    """Get historical stock data with optional currency conversion"""
    return get_stock_history(symbol, period, target_currency)

@app.get("/api/stock/{symbol}/forecast")
def get_stock_forecast(
    symbol: str,
    period: str = "2y",
    retrain: bool = Query(False, description="Force retrain model")
):
    """
    Predict next day's closing price for a stock symbol.
    Uses 60-day lookback LSTM model.
    """
    try:
        forecaster = StockForecaster(symbol)
        
        if retrain or not forecaster.model:
            forecaster.train(period)
        
        forecast = forecaster.predict_next_day(period)
        return forecast
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import asyncio
import json
import random
from fastapi.responses import StreamingResponse # pyright: ignore[reportMissingImports]
import stockstir # pyright: ignore[reportMissingImports]

async def stock_generator():
    """Generates real-time stock updates using stockstir"""
    stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"]
    
    # Initialize previous prices for change calculation
    previous_prices = {symbol: 0.0 for symbol in stocks}
    
    # Initialize Stockstir
    s = stockstir.Stockstir()
    
    while True:
        data = []
        for stock in stocks:
            try:
                # Fetch real-time price using stockstir
                price_str = s.tools.get_single_price(stock)
                price = float(price_str)
                logger.debug(f"Price for {stock}: {price}")
                # Calculate change (mocked since we only get current price)
                # In a real scenario, we'd need yesterday's close or keep track of history
                prev_price = previous_prices[stock]
                if prev_price == 0:
                    change = 0.0
                else:
                    change = price - prev_price
                
                previous_prices[stock] = price
                
                data.append({
                    "symbol": stock,
                    "price": price,
                    "change": round(change, 2),
                    "timestamp": "now"
                })
            except Exception as e:
                print(f"Error fetching data for {stock}: {e}")
                # Fallback to random data if fetch fails
                price = round(random.uniform(100, 200), 2)
                change = round(random.uniform(-5, 5), 2)
                data.append({
                    "symbol": stock,
                    "price": price,
                    "change": change,
                    "timestamp": "now"
                })
        
        yield f"data: {json.dumps(data)}\n\n"
        # Wait for 5 minutes to avoid hitting rate limits too hard
        await asyncio.sleep(5 * 60)

@app.get("/api/sse/stocks")
async def sse_stocks():
    """Server-Sent Events endpoint for real-time stock updates"""
    return StreamingResponse(stock_generator(), media_type="text/event-stream")