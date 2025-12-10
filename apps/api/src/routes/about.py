from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class AboutResponse(BaseModel):
    project_name: str
    frontend_stack: List[str]
    backend_stack: List[str]
    description: str

@router.get("/about", response_model=AboutResponse)
async def get_about():
    """
    Get information about the project, including stack and description.
    """
    return AboutResponse(
        project_name="AI Stocks",
        frontend_stack=["Next.js", "Bun", "TailwindCSS"],
        backend_stack=["FastAPI", "uv"],
        description="A modern fintech dashboard for real-time stock monitoring and forecasting. Built with a modular clean architecture to demonstrate scalable, high-performance full-stack development."
    )
