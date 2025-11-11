# packages/py-finance/src/py_finance/stock_service.py
import yfinance as yf # pyright: ignore[reportMissingImports]
import requests
from pydantic import BaseModel # pyright: ignore[reportMissingImports]
from datetime import datetime, timedelta
from typing import List, Optional

class StockPricePoint(BaseModel):
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: int

class StockHistory(BaseModel):
    symbol: str
    native_currency: str
    target_currency: Optional[str] = None
    exchange_rate: Optional[float] = None
    period: str
    data: List[StockPricePoint]

def get_exchange_rate(from_currency: str, to_currency: str) -> float:
    """Fetch real-time exchange rate using a free API."""
    try:
        # Use a free exchange rate API
        response = requests.get(
            f"https://api.exchangerate-api.com/v4/latest/{from_currency}",
            timeout=5
        )
        response.raise_for_status()
        return response.json()["rates"][to_currency]
    except Exception as e:
        raise ValueError(f"Failed to get exchange rate: {e}")

def get_stock_history(
    symbol: str, 
    period: str = "1y", 
    target_currency: Optional[str] = None
) -> StockHistory:
    """Fetch historical stock data with optional currency conversion."""
    ticker = yf.Ticker(symbol)
    hist = ticker.history(period=period, interval="1d")
    
    if hist.empty:
        raise ValueError(f"No data found for symbol: {symbol}")
    
    info = ticker.info
    native_currency = info.get("currency", "USD")
    
    # Convert currency if requested
    exchange_rate = None
    if target_currency and target_currency.upper() != native_currency:
        exchange_rate = get_exchange_rate(native_currency, target_currency.upper())
    
    # Convert DataFrame to list of dicts
    data = []
    for date, row in hist.iterrows():
        open_price = row["Open"]
        high_price = row["High"]
        low_price = row["Low"]
        close_price = row["Close"]
        
        # Apply conversion if needed
        if exchange_rate:
            open_price *= exchange_rate
            high_price *= exchange_rate
            low_price *= exchange_rate
            close_price *= exchange_rate
        
        data.append(StockPricePoint(
            date=date.strftime("%Y-%m-%d"),
            open=round(open_price, 4),
            high=round(high_price, 4),
            low=round(low_price, 4),
            close=round(close_price, 4),
            volume=int(row["Volume"]),
        ))
    
    return StockHistory(
        symbol=symbol.upper(),
        native_currency=native_currency,
        target_currency=target_currency.upper() if target_currency else None,
        exchange_rate=exchange_rate,
        period=period,
        data=data,
    )