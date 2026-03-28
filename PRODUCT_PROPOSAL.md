# Product Proposal
## Perfumery Intelligence Platform (PIP)
### Presented to: DSM-Firmenich — Perfumery & Beauty Division
### Date: March 2026 | Version 1.0 | Confidential

---

## Executive Summary

DSM-Firmenich is the world's most scientifically advanced fragrance house — yet the daily workflows of its perfumers and Fragrance Development Managers still rely heavily on tribal knowledge, manual compliance checking, and disconnected tooling.

**The Perfumery Intelligence Platform (PIP)** is a purpose-built web application that acts as an AI co-pilot for DSM-Firmenich's P&B division. It accelerates fragrance creation, automates regulatory compliance tracking, reduces cost-of-goods, and preserves the institutional knowledge of master perfumers at scale.

PIP is not a replacement for the perfumer. It is the platform that makes every perfumer and FDM faster, more consistent, and more commercially effective.

**Proposed engagement:** 6-month build (Phase 1) → production rollout → ongoing SaaS licensing.

---

## 1. The Problem

### 1.1 Regulatory Pressure is Compressing Margins and Timelines

IFRA Amendment 51 (2023) introduced the most sweeping ingredient restrictions in the organisation's history. The EU CLP Regulation will expand mandatory allergen labelling to 80 substances by 2026 — up from 26 today. Every formula in DSM-Firmenich's library must be evaluated, flagged, and in many cases reformulated.

Today, this process is:
- **Manual** — compliance is checked formula-by-formula, often in spreadsheets
- **Reactive** — violations surface late in the development cycle, after significant perfumer time has been spent
- **Inconsistent** — different FDMs apply different interpretations of IFRA guidance

The financial consequence: rework cycles, delayed client deliveries, and reputational risk if a non-compliant formula reaches market.

### 1.2 A Global Formula Library With No Intelligence Layer

DSM-Firmenich holds one of the largest proprietary formula libraries in the world — built over decades. Yet searching it, learning from it, and extracting cost or sustainability insights from it requires manual cross-referencing across disconnected systems.

There is no unified interface to ask: *"Which of our existing formulas could be adapted for this brief?"* or *"What is the sustainability profile of every formula we've delivered to this client in the past two years?"*

### 1.3 Master Perfumer Knowledge is Concentrated and At Risk

The world's supply of classically trained master perfumers is structurally limited. DSM-Firmenich's competitive advantage is partly encoded in the intuition, technique memory, and olfactive vocabulary of a small number of senior individuals.

When a master perfumer retires, that knowledge — accumulated over 30+ years — largely walks out the door. There is currently no systematic mechanism to capture, structure, and transfer it.

### 1.4 Consumer Briefs Are Olfactively Vague

Brand clients submit briefs like *"something that makes you feel confident but approachable, like a successful woman on a Sunday morning."* Translating this into a starting formula structure takes hours of FDM interpretation before a perfumer can begin working.

DSM-Firmenich has built the world's most rigorous emotion-to-scent research programme (ScentMove®, EmotiON™) — but this knowledge is not yet embedded in a tool that FDMs can use on demand to accelerate the translation workflow.

---

## 2. The Solution

### Perfumery Intelligence Platform (PIP)

PIP is a browser-based application deployed internally across DSM-Firmenich's perfumery teams. It integrates five functional modules into a single workflow environment.

```
┌─────────────────────────────────────────────────────────┐
│              Perfumery Intelligence Platform             │
│                                                         │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  Compliance   │  │  Ingredient  │  │   Brief     │  │
│  │   Monitor     │  │  Substitutor │  │ Translator  │  │
│  └───────────────┘  └──────────────┘  └─────────────┘  │
│                                                         │
│  ┌───────────────────────┐  ┌──────────────────────┐   │
│  │   Cost Optimizer      │  │  Knowledge Base       │   │
│  └───────────────────────┘  └──────────────────────┘   │
│                                                         │
│  ──── Powered by: Claude AI · pgvector · IFRA API ────  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Product Modules

### Module 1 — Formula Compliance Monitor

**What it does:** Continuously evaluates every formula in the library against the current IFRA amendment, EU allergen labelling thresholds, and banned ingredient lists. Surfaces violations before they reach the client.

**Key features:**
- Library-wide dashboard: instant view of compliant vs. flagged formulas
- Per-formula report: severity-ranked flags (critical / warning / info) with specific remediation guidance
- Amendment change tracking: when IFRA publishes a new amendment, PIP automatically re-evaluates the entire library and generates an impact report
- Application-type awareness: leave-on limits ≠ rinse-off limits ≠ ambient limits — correctly enforced per formula

**Business impact:**
- Eliminates reactive compliance rework late in development cycles
- Reduces risk of non-compliant formulas reaching brand clients
- Compresses reformulation timelines by surfacing issues at creation time

---

### Module 2 — Ingredient Substitution Engine

**What it does:** Given a restricted, banned, or cost-prohibitive ingredient, surfaces ranked alternative materials by olfactive character match, compliance status, cost delta, and sustainability score.

**Key features:**
- Olfactive similarity scoring: vector embeddings over descriptor profiles (rose / woody / musk / etc.)
- Multi-criterion ranking: perfumers can weight by similarity, cost, or sustainability depending on brief
- Captive molecule prioritisation: DSM-Firmenich's own IP (Javanol®, Ambroxan®, Heliobliss®) is surfaced first where olfactively appropriate — directly supporting margin improvement
- Contextual filtering: substitutes are validated for the target application type

**Business impact:**
- Accelerates reformulation of restricted formulas
- Increases usage of DSM-Firmenich captive molecules (higher margins, differentiation)
- Reduces COGs by surfacing lower-cost equivalents without olfactive sacrifice

---

### Module 3 — Brief-to-Olfactive Translator

**What it does:** Converts qualitative consumer or brand briefs — written in marketing language — into precise olfactive direction that a perfumer can act on immediately. Grounded in DSM-Firmenich's proprietary ScentMove® emotion-to-scent lexicon.

**Key features:**
- Natural language brief input (any format — formal brief document, email excerpt, bullet points)
- Emotion selection mapped to ScentMove® nine-category lexicon
- Output: fragrance family, key accords, suggested top/heart/base structure, ScentMove® emotion rationale, reference fragrances, and a one-paragraph perfumer starting point
- Application, gender positioning, price tier, and cultural context modifiers
- Alternative directions: two or three parallel olfactive interpretations of the same brief

**Business impact:**
- Compresses brief interpretation time from hours to minutes
- Standardises how FDMs translate briefs — reducing interpretation variance across offices
- Creates a structured audit trail of brief-to-direction decisions

---

### Module 4 — Formula Cost Optimizer

**What it does:** Produces a real-time COGs breakdown for any formula, identifies the top cost drivers, and surfaces specific substitution opportunities that could reduce cost while preserving the olfactive profile.

**Key features:**
- Per-ingredient cost contribution ($/kg × % usage)
- Visual breakdown: highest-cost materials ranked with contribution percentage
- Opportunity flagging: naturals where captive/synthetic alternatives exist at lower cost with similar olfactive profile
- Combined compliance + cost flag: when a restricted ingredient is also a cost driver, one substitution solves both problems
- Client cost tier validation: confirm whether a formula's COGs are compatible with the target price tier (mass / prestige / luxury)

**Business impact:**
- Reduces time-to-COGs approval in client development cycles
- Directly supports margin targets in consumer fragrance (largest volume segment)
- Creates accountability and traceability for cost decisions

---

### Module 5 — Perfumer Knowledge Base

**What it does:** A searchable, structured repository of perfumer expertise — techniques, ingredient insights, application-specific guidance, trend observations — captured directly from DSM-Firmenich's master perfumers and FDMs.

**Key features:**
- Rich entry types: technique notes, ingredient insights, formula annotations, trend observations
- Multi-dimensional tagging: olfactive descriptors, emotion tags, application types, regulatory context
- Full-text search across all entries
- Knowledge attribution: entries are author-attributed, preserving the voice of the perfumer
- Linked to formulas and ingredients: entries surface contextually when viewing relevant materials

**Business impact:**
- Preserves institutional knowledge as senior perfumers approach retirement
- Accelerates onboarding of junior perfumers and new FDMs
- Creates a living memory of DSM-Firmenich's olfactive philosophy

---

## 4. Architecture & Technology

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser (React + TypeScript + Tailwind CSS)                    │
│  Vite · React Router · Tailwind — deployed on internal CDN      │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTPS / REST
┌────────────────────────────────▼────────────────────────────────┐
│  API Layer (Python 3.11 · FastAPI · Pydantic v2)                │
│  JWT authentication · Role-based access (perfumer / FDM / admin)│
└──────┬──────────────────┬──────────────┬───────────────────────┘
       │                  │              │
┌──────▼──────┐  ┌────────▼──────┐  ┌───▼────────────────────┐
│ PostgreSQL  │  │   pgvector    │  │  Anthropic Claude API  │
│ (formulas, │  │ (olfactive    │  │  claude-opus-4-6       │
│ ingredients,│  │  embeddings)  │  │  Brief translation     │
│ knowledge)  │  └───────────────┘  └────────────────────────┘
└─────────────┘
       │
┌──────▼──────────────────────────────────────────────────────┐
│  IFRA Amendment Feed (scrape/API) — auto-refresh on publish  │
└─────────────────────────────────────────────────────────────┘
```

### Why These Technology Choices

| Choice | Rationale |
|---|---|
| **FastAPI** | Type-safe, async Python API with automatic OpenAPI docs — ideal for a data-heavy internal tool |
| **pgvector** | Keeps olfactive similarity search co-located with the formula database — no separate vector store to maintain |
| **Claude API (Opus 4.6)** | Best-in-class reasoning for brief translation; DSM-Firmenich's ScentMove® context fits naturally in system prompts |
| **React + Tailwind** | Fast iteration on complex UI; Tailwind's utility classes are ideal for dense data interfaces |
| **PostgreSQL** | Mature, auditable, GDPR-compliant — appropriate for a regulated-industry formula database |

### Security & Data Handling
- Formula library data is proprietary IP — all data stored within DSM-Firmenich's cloud tenant
- Claude API calls for brief translation send only the client brief text — no formula or ingredient IP is transmitted
- Role-based access: perfumers can read and annotate; FDMs can create briefs; admins manage the library
- Full audit log on all formula reads and edits

---

## 5. Competitive Landscape

| Player | Product | Limitation vs. PIP |
|---|---|---|
| **Givaudan** | Carto (formula creation AI) | Internal tool only; not available to DSM-Firmenich |
| **Symrise + IBM** | Philyra | Focused on formula generation, not compliance or knowledge capture |
| **IFF** | Proprietary AI tools | Internal; no cross-house tool |
| **DSM-Firmenich** | AI Formulae Generator, Scentmate | Formulae Generator is generation-focused; Scentmate is external/SME-facing. **No internal co-pilot for the full workflow exists.** |
| **Generic PLM tools** | SAP, Oracle | No olfactive intelligence; not built for fragrance workflows |

**PIP addresses the gap between DSM-Firmenich's existing AI investments (which are impressive) and the daily workflow needs of its internal perfumers and FDMs.** It is complementary to — not competing with — the AI Formulae Generator or Scentmate.

---

## 6. Implementation Plan

### Phase 1 — Foundation (Months 1–3)
| Milestone | Deliverable |
|---|---|
| M1.1 | Formula Compliance Monitor (IFRA 51 + EU CLP 2026) — live across full formula library |
| M1.2 | Ingredient Library with regulatory status, sustainability scores, cost data |
| M1.3 | Ingredient Substitution Engine (olfactive similarity + compliance filter) |
| M1.4 | Formula Cost Optimizer |
| M1.5 | Production database ingestion — import existing formula library |

**Success criteria:** 100% of formulas in the library have a compliance status. FDMs report compliance check time reduced by >60%.

---

### Phase 2 — Intelligence (Months 4–5)
| Milestone | Deliverable |
|---|---|
| M2.1 | Brief-to-Olfactive Translator (ScentMove® integration, Claude API) |
| M2.2 | Perfumer Knowledge Base — structured capture and search |
| M2.3 | Knowledge seeding workshops with 3–5 master perfumers (structured interviews → knowledge entries) |
| M2.4 | Role-based access control + audit logging |

**Success criteria:** Brief translation used on >50% of new development briefs in pilot team. Knowledge base has >50 entries.

---

### Phase 3 — Scale & Integration (Month 6)
| Milestone | Deliverable |
|---|---|
| M3.1 | SSO integration (Azure AD / corporate identity) |
| M3.2 | IFRA amendment auto-refresh (webhook or scheduled pull) |
| M3.3 | Rollout to all P&B offices (Paris, New York, Geneva, Singapore) |
| M3.4 | Analytics dashboard: platform usage, compliance improvement metrics, cost savings tracked |
| M3.5 | API endpoints for integration with existing DSM-Firmenich R&D systems |

**Success criteria:** >80% of active perfumers and FDMs using PIP weekly. First quantified COGs reduction attributed to platform recommendations.

---

## 7. Commercial Model

### Development Engagement (One-Time)

| Phase | Scope | Investment |
|---|---|---|
| Phase 1 (3 months) | Compliance + Ingredients + Cost modules | €180,000 |
| Phase 2 (2 months) | Brief Translator + Knowledge Base | €120,000 |
| Phase 3 (1 month) | Scale, SSO, integrations, rollout | €60,000 |
| **Total build** | | **€360,000** |

### SaaS Licensing (Annual, Post-Launch)

| Tier | Users | Annual Fee |
|---|---|---|
| Pilot | Up to 25 users (one office) | €48,000/year |
| Division | Up to 100 users (P&B global) | €144,000/year |
| Enterprise | Unlimited users + API access | €240,000/year |

Includes: hosting infrastructure, IFRA amendment updates, Claude API costs, support SLA (business hours), and one major feature release per quarter.

### ROI Framework

| Value Driver | Conservative Estimate |
|---|---|
| Compliance rework reduction | 20 reformulations avoided/year × €8,000 avg cost = **€160,000** |
| Brief-to-formula cycle compression | 2 hrs saved/brief × 500 briefs/year × €150/hr FDM cost = **€150,000** |
| Captive molecule uptake | 5% increase in Javanol/Ambroxan usage in reformulations → margin uplift |
| Knowledge transfer (risk reduction) | Reduction in IP risk from perfumer departures — **unquantified but strategic** |
| **Conservative Year 1 ROI** | **>€300,000 in identified savings vs. €144,000 SaaS fee** |

---

## 8. Why Now

Three forces make 2026 the right moment for this investment:

1. **IFRA 51 and EU CLP 2026 create an immediate, quantifiable compliance burden** — the formula library must be audited regardless. PIP makes that audit automatic, not manual, and keeps it current.

2. **DSM-Firmenich has already proven willingness to invest in AI-first tools** — the AI Formulae Generator, d-lab at EPFL, and Scentmate demonstrate an organisation culturally ready to adopt internal AI platforms.

3. **The master perfumer succession risk is present today** — several of the most experienced perfumers in the industry are in the latter stages of their careers. Every year of delay is institutional knowledge at risk.

---

## 9. Next Steps

| Action | Owner | Timeline |
|---|---|---|
| Technical discovery session — formula library schema, existing systems | DSM-Firmenich IT + PIP team | Week 1 |
| ScentMove® data licensing discussion — embed lexicon in Brief Translator | DSM-Firmenich R&D | Week 1 |
| Pilot perfumer identification (3–5 users for Phase 1 testing) | P&B Division Lead | Week 2 |
| NDA and IP framework agreement | Legal | Week 2 |
| Phase 1 statement of work sign-off | Both parties | Week 3 |
| Phase 1 development kickoff | PIP team | Week 4 |

---

## Appendix A — Current Platform State

A working prototype of PIP has been built and is available for demonstration. The prototype covers all five modules with sample data representative of a real fragrance library (15 ingredients including Ambroxan®, Javanol®, Oakmoss, Rose Absolute; 3 formulas including a non-compliant legacy chypre; 4 knowledge base entries from simulated perfumer sessions).

**Repository:** `adityahtotlani/generaltraining` — branch `claude/dsm-firmenich-research-8UKCK`

To run the prototype locally:
```bash
# Backend
cd pip-backend && pip install -r requirements.txt
cp .env.example .env   # add ANTHROPIC_API_KEY
uvicorn app.main:app --reload
# → http://localhost:8000/docs

# Frontend
cd pip-frontend && npm install && npm run dev
# → http://localhost:5173
```

---

## Appendix B — Key Research Sources

- DSM-Firmenich FY 2025 Full Year Results & Integrated Annual Report
- IFRA Amendment 51 (2023) — full restricted substances list
- EU CLP Regulation — allergen labelling expansion to 80 substances (effective 2026)
- DSM-Firmenich AI Formulae Generator — Digital Innovation of the Year 2021
- Scentmate — world's first digital fragrance house (BCG Case Study, 2022)
- ScentMove® / EmotiON™ platform — University of Geneva co-development
- Global fragrance market: ~$76B (2025) → $121B+ (2031) at 8%+ CAGR (Accio, 2026)

---

*Prepared by: Perfumery Intelligence Platform Team*
*Classification: Confidential — for DSM-Firmenich internal review only*
