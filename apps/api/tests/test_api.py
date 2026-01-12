import pytest
from fastapi.testclient import TestClient
from src.main import app


client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_get_data():
    response = client.get("/api/data")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from Python API!"}


def test_get_about():
    response = client.get("/api/about")
    assert response.status_code == 200
    data = response.json()
    assert data["project_name"] == "AI Stocks"
    assert "Next.js" in data["frontend_stack"]
    assert "FastAPI" in data["backend_stack"]
    assert "description" in data
