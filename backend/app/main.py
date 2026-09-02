from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from backend.app.core.config import settings
from backend.app.core.security import SecurityHeadersMiddleware, limiter
from backend.app.database.session import init_db
from backend.app.api.v1.router import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables on startup
    init_db()
    print("[FastAPI] Database initialized successfully.")
    yield
    print("[FastAPI] Application shutdown.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="SIH26139: Hybrid Classical Machine Learning & Qiskit Quantum Simulation for Heart Disease Risk Analysis",
    version="1.0.0",
    lifespan=lifespan
)

# SlowAPI State & Handler
app.state.limiter = limiter
@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Please wait before submitting another analysis."}
    )

# Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", summary="Root Endpoint")
def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "sih_reference": settings.SIH_REFERENCE,
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR
    }
