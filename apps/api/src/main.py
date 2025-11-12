from fastapi import FastAPI, Query # pyright: ignore[reportMissingImports]
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]
from py_finance import get_stock_history # pyright: ignore[reportMissingImports]

# Create FastAPI app
app = FastAPI(title="API")

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