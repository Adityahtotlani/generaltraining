from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
from app.routers import compliance, ingredients, formulas, brief, knowledge


class Settings(BaseSettings):
    cors_origins: str = "http://localhost:5173"
    app_env: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()

app = FastAPI(
    title="Perfumery Intelligence Platform",
    description=(
        "AI-powered co-pilot for DSM-Firmenich perfumers and Fragrance Development Managers. "
        "Covers formula compliance, ingredient substitution, brief translation, cost optimization, "
        "and the perfumer knowledge base."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compliance.router)
app.include_router(ingredients.router)
app.include_router(formulas.router)
app.include_router(brief.router)
app.include_router(knowledge.router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "Perfumery Intelligence Platform"}


@app.get("/")
def root():
    return {
        "name": "Perfumery Intelligence Platform (PIP)",
        "version": "0.1.0",
        "docs": "/docs",
        "built_for": "DSM-Firmenich — Perfumery & Beauty Division",
    }
