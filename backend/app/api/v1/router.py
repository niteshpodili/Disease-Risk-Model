from fastapi import APIRouter
from backend.app.api.v1.endpoints import health, analyze, model

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(analyze.router, tags=["Analysis"])
api_router.include_router(model.router, tags=["Model"])
