# Perfumery Intelligence Platform (PIP)
### Built for DSM-Firmenich — Perfumery & Beauty Division

A web-based co-pilot for perfumers and Fragrance Development Managers (FDMs) that accelerates fragrance creation, ensures regulatory compliance, and captures institutional knowledge at scale.

---

## Problem Space

DSM-Firmenich operates with 4,000+ fragrance ingredients, millions of possible formula combinations, and a constantly evolving regulatory landscape (IFRA amendments, EU allergen expansion to 80 substances by 2026). The company's master perfumers hold irreplaceable institutional knowledge that is difficult to transfer. At the same time, brand clients demand faster turnaround, lower cost-of-goods, and sustainability credentials on every formula.

**Core pain points this platform addresses:**
- Regulatory compliance tracking across an entire formula library
- Restricted ingredient substitution while preserving olfactive character
- Consumer brief translation (emotional → olfactive direction)
- Formula cost optimization against COGs constraints
- Sustainability scoring per formula
- Institutional knowledge capture from master perfumers

---

## Architecture

```
pip-backend/      Python FastAPI — REST API + AI services
pip-frontend/     React + TypeScript — Web UI
```

### Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | Python 3.11, FastAPI, Pydantic v2 |
| AI Layer | Claude API (Anthropic) — brief translation, substitution |
| Database | PostgreSQL + pgvector (olfactive embeddings) |
| Auth | JWT (planned) |

---

## Modules

### 1. Formula Compliance Monitor
Real-time IFRA amendment tracking. Auto-flags formulas that violate current or upcoming ingredient limits. Surfaces affected formulas across the entire library.

### 2. Ingredient Substitution Engine
Given a restricted or expensive ingredient, surfaces ranked alternatives by:
- Olfactive character match (cosine similarity on descriptor embeddings)
- Cost delta (cheaper / equivalent / premium)
- Regulatory status (IFRA compliant, EU allergen safe)
- Sustainability score

### 3. Brief-to-Olfactive Translator
Input: qualitative/emotional consumer brief (free text + optional mood keywords)
Output: olfactive direction — fragrance family, key accords, suggested top/heart/base structure, emotion-to-scent mapping via DSM-Firmenich's ScentMove® lexicon.

### 4. Formula Cost Optimizer
COGs breakdown by ingredient. Surfaces cost-reduction paths while preserving the target olfactive profile. Models naturals vs. synthetics trade-offs.

### 5. Sustainability Dashboard
Per-ingredient: biodegradability rating, carbon footprint estimate, sourcing ethics score.
Per-formula: aggregate sustainability score. Benchmarked against industry targets.

### 6. Perfumer Knowledge Base
Structured capture of perfumer annotations, creation rationale, and historical formula context. Searchable by olfactive descriptor, ingredient, application type, and emotional target.

---

## Getting Started

### Backend
```bash
cd pip-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # add your ANTHROPIC_API_KEY
uvicorn app.main:app --reload
```
API docs available at `http://localhost:8000/docs`

### Frontend
```bash
cd pip-frontend
npm install
npm run dev
```
App available at `http://localhost:5173`

---

## Research Basis

This platform is grounded in publicly available DSM-Firmenich research and industry analysis:
- DSM-Firmenich FY 2025 Full Year Results & Integrated Annual Report
- Firmenich AI Formulae Generator (won Digital Innovation of the Year, 2021)
- Scentmate — world's first digital fragrance house (launched 2021)
- ScentMove® / EmotiON™ emotion-to-scent platform (40,000+ fragrances, 1M+ consumers)
- IFRA Amendment 51 (2023) regulatory framework
- EU CLP Regulation allergen labeling expansion (2026)
- Global fragrance market: ~$76B (2025) → $121B+ (2031) at 8%+ CAGR
