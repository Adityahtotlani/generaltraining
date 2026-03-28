"""
Sample knowledge base entries from perfumers and FDMs.
"""

KNOWLEDGE_ENTRIES: list[dict] = [
    {
        "id": "kb_001",
        "title": "Replacing Oakmoss in Modern Chypres",
        "entry_type": "technique",
        "author": "Marie Dupont",
        "content": (
            "Since IFRA 51 restricted oakmoss to 0.1% in leave-on applications, "
            "the classic chypre structure must be rebuilt using alternatives. "
            "The most effective approach combines: (1) Evernyl methyl ether (lab-created moss proxy), "
            "(2) a small amount of Iso E Super for the velvety woody backbone, "
            "(3) labdanum absolute for the mossy-amber depth, and "
            "(4) vetiver (Haiti origin) for the earthy-green facets. "
            "The key insight: you are not replacing oakmoss — you are reconstructing the olfactive impression "
            "it created using a palette of compliant materials. This requires an additional 3-4 formula "
            "iterations vs a standard development. Budget accordingly."
        ),
        "related_ingredients": ["ing_013", "ing_014"],
        "related_formulas": ["frm_003"],
        "olfactive_descriptors": ["oakmoss", "earthy", "green", "mossy"],
        "application_types": ["fine_fragrance"],
        "emotion_tags": ["nostalgia"],
        "created_at": "2024-02-10T09:30:00Z",
        "updated_at": "2024-02-10T09:30:00Z",
        "tags": ["chypre", "ifra51", "reformulation", "oakmoss_substitute"],
    },
    {
        "id": "kb_002",
        "title": "Ambroxan Dosing Strategy for Different Applications",
        "entry_type": "ingredient_insight",
        "author": "Lucas Schmidt",
        "content": (
            "Ambroxan is transformative but dosing is non-linear. "
            "In fine fragrance: 2-5% gives the clean amber skin effect. Above 6%, it becomes waxy and diffusive — "
            "useful in body care but can read as 'deodorant' in fine fragrance contexts. "
            "In body lotion: 1-3% is optimal; the skin-on-skin warmth amplifies the amber character. "
            "In candle/diffuser: use sparingly (0.5-1%) — heat amplification makes it overwhelming at higher doses. "
            "Synergy note: Ambroxan + Iso E Super creates a 'skin signature' effect popular in niche perfumery — "
            "start at 4% Ambroxan / 3% Iso E Super and adjust. "
            "This combination is the backbone of several bestselling DSM-Firmenich formulas."
        ),
        "related_ingredients": ["ing_011", "ing_014"],
        "related_formulas": ["frm_001"],
        "olfactive_descriptors": ["amber", "ambergris", "skin", "warm"],
        "application_types": ["fine_fragrance", "body_lotion", "candle"],
        "emotion_tags": ["sensuality", "confidence"],
        "created_at": "2024-05-22T14:00:00Z",
        "updated_at": "2024-05-22T14:00:00Z",
        "tags": ["ambroxan", "captive", "dosing", "application_specific"],
    },
    {
        "id": "kb_003",
        "title": "ScentMove® — Focus Accord Construction",
        "entry_type": "technique",
        "author": "Dr. Sarah Chen",
        "content": (
            "Based on DSM-Firmenich ScentMove® neuroscience research, fragrances targeting the 'focus' "
            "emotion cluster share a common olfactive signature: clean green-citrus top, "
            "transparent floral heart with high Hedione content, and a light woody-mineral base. "
            "Avoid heavy oriental, gourmand, or animalic elements — these activate the 'comfort/calm' "
            "pathway instead. "
            "Recommended starting accord: Bergamot FCF 8%, Hedione HC 12%, Linalool 0.3%, "
            "Javanol 2%, Iso E Super 2%, clean musk (Habanolide 4%). "
            "Clinical validation: EmotiON™ Focus fragrances built on this scaffold showed "
            "measurable improvement in speed of mental processing in controlled trials. "
            "Reference: EmotiCODE Focus program."
        ),
        "related_ingredients": ["ing_003", "ing_008", "ing_009", "ing_010"],
        "related_formulas": [],
        "olfactive_descriptors": ["fresh", "green", "citrus", "clean", "transparent"],
        "application_types": ["fine_fragrance", "candle", "diffuser"],
        "emotion_tags": ["focus", "energy"],
        "created_at": "2024-07-18T10:15:00Z",
        "updated_at": "2024-07-18T10:15:00Z",
        "tags": ["scentmove", "emotiON", "wellness", "neuroscience", "focus"],
    },
    {
        "id": "kb_004",
        "title": "Sustainable Musk Strategy — Replacing Galaxolide",
        "entry_type": "technique",
        "author": "Lucas Schmidt",
        "content": (
            "Galaxolide (HHCB) is widely used but has IFRA 51 restrictions and very low biodegradability (32%). "
            "For sustainability-focused reformulations, the following replacements work well: "
            "(1) Habanolide — closest olfactive match, macrocyclic, biodegradability 78%. Use at 1.2x the Galaxolide dose. "
            "(2) Ethylene Brassylate — sweeter, more powdery, biodegradability 82%. Excellent in body care contexts. "
            "(3) Ambrettolide — macrocyclic, very natural-smelling, highest biodegradability. More expensive. "
            "The blend approach (50% Habanolide + 30% Ethylene Brassylate + 20% Ambrettolide) provides "
            "the most seamless olfactive transition from Galaxolide while achieving >80% average biodegradability. "
            "Always run a panel evaluation against the original — musk changes affect longevity perception."
        ),
        "related_ingredients": ["ing_004", "ing_005", "ing_012"],
        "related_formulas": [],
        "olfactive_descriptors": ["musk", "clean", "powdery"],
        "application_types": ["body_lotion", "shower_gel", "laundry", "fine_fragrance"],
        "emotion_tags": ["calm"],
        "created_at": "2024-09-05T16:00:00Z",
        "updated_at": "2024-09-05T16:00:00Z",
        "tags": ["sustainability", "musk", "galaxolide_replacement", "biodegradability"],
    },
]

KNOWLEDGE_BY_ID: dict[str, dict] = {e["id"]: e for e in KNOWLEDGE_ENTRIES}
