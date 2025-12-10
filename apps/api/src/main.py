from fastapi import FastAPI
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]
import logging
from .routes.about import router as about_router
from .routes.stocks import router as stocks_router

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

app.include_router(about_router, prefix="/api", tags=["info"])
app.include_router(stocks_router, prefix="/api", tags=["stocks"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/data")
def get_data():
    return {"message": "Hello from Python API!"}