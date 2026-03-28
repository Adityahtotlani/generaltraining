"""
Sample formula library — representative fragrance formulas for demonstration.
"""
from datetime import datetime

FORMULAS: list[dict] = [
    {
        "id": "frm_001",
        "name": "Soir de Velours",
        "version": "3.2",
        "application_type": "fine_fragrance",
        "brief_description": "A luxurious oriental floral with sandalwood heart and amber base. Designed for prestige feminines.",
        "perfumer": "Marie Dupont",
        "client": "Maison Élégance",
        "created_at": "2023-06-15T09:00:00Z",
        "updated_at": "2024-01-20T14:30:00Z",
        "ingredients": [
            {"ingredient_id": "ing_001", "percentage": 3.5},   # Rose Absolute
            {"ingredient_id": "ing_002", "percentage": 1.2},   # Jasmine Absolute
            {"ingredient_id": "ing_003", "percentage": 8.0},   # Hedione
            {"ingredient_id": "ing_007", "percentage": 0.6},   # Sandalwood (RESTRICTED @ 0.5%)
            {"ingredient_id": "ing_011", "percentage": 4.0},   # Ambroxan
            {"ingredient_id": "ing_010", "percentage": 0.8},   # Linalool (RESTRICTED @ 0.5%)
            {"ingredient_id": "ing_015", "percentage": 2.5},   # Patchouli
            {"ingredient_id": "ing_005", "percentage": 1.5},   # Galaxolide (RESTRICTED @ 1.0%)
            {"ingredient_id": "ing_009", "percentage": 5.0},   # Bergamot (RESTRICTED @ 0.4%)
            {"ingredient_id": "ing_014", "percentage": 3.0},   # Iso E Super
        ],
        "notes": "Version 3.2 reformulation in progress — IFRA 51 compliance issues flagged.",
        "tags": ["oriental", "floral", "feminine", "prestige", "needs_reformulation"],
    },
    {
        "id": "frm_002",
        "name": "Forêt Fraîche",
        "version": "1.0",
        "application_type": "body_lotion",
        "brief_description": "Fresh fougère with clean musks and green accords. Gender-neutral, wellness positioning.",
        "perfumer": "Lucas Schmidt",
        "client": "Nordic Wellness Co.",
        "created_at": "2024-03-01T11:00:00Z",
        "updated_at": "2024-03-01T11:00:00Z",
        "ingredients": [
            {"ingredient_id": "ing_003", "percentage": 15.0},  # Hedione
            {"ingredient_id": "ing_004", "percentage": 6.0},   # Habanolide
            {"ingredient_id": "ing_012", "percentage": 4.0},   # Ethylene Brassylate
            {"ingredient_id": "ing_009", "percentage": 0.3},   # Bergamot FCF
            {"ingredient_id": "ing_010", "percentage": 0.4},   # Linalool (at limit)
            {"ingredient_id": "ing_014", "percentage": 5.0},   # Iso E Super
            {"ingredient_id": "ing_008", "percentage": 3.0},   # Javanol
        ],
        "notes": "Designed for leave-on application. Fully compliant with IFRA 51 leave-on limits.",
        "tags": ["fougere", "fresh", "unisex", "wellness", "compliant"],
    },
    {
        "id": "frm_003",
        "name": "Chypre Classique 1972",
        "version": "legacy",
        "application_type": "fine_fragrance",
        "brief_description": "Archive formula. Classic chypre accord with oakmoss, bergamot, labdanum base.",
        "perfumer": "Henri Leclerc (legacy)",
        "client": "Archive",
        "created_at": "1972-01-01T00:00:00Z",
        "updated_at": "1972-01-01T00:00:00Z",
        "ingredients": [
            {"ingredient_id": "ing_013", "percentage": 2.5},   # Oakmoss (RESTRICTED @ 0.1%)
            {"ingredient_id": "ing_009", "percentage": 12.0},  # Bergamot (RESTRICTED @ 0.4%)
            {"ingredient_id": "ing_015", "percentage": 6.0},   # Patchouli
            {"ingredient_id": "ing_001", "percentage": 2.0},   # Rose Absolute
            {"ingredient_id": "ing_005", "percentage": 3.0},   # Galaxolide (RESTRICTED @ 1.0%)
            {"ingredient_id": "ing_006", "percentage": 1.0},   # Musk Ambrette (BANNED)
        ],
        "notes": "LEGACY — NOT FOR PRODUCTION. Multiple IFRA violations including banned ingredient.",
        "tags": ["chypre", "legacy", "archive", "non_compliant"],
    },
]

FORMULAS_BY_ID: dict[str, dict] = {f["id"]: f for f in FORMULAS}
