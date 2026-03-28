"""
Brief-to-olfactive translator using Claude AI.
Maps qualitative/emotional consumer briefs to olfactive direction,
grounded in DSM-Firmenich's ScentMove® emotion-to-scent lexicon.
"""
import os
import json
import anthropic
from app.models.brief import BriefTranslationRequest, BriefTranslationResponse, OlfactiveDirection

SCENTMOVE_CONTEXT = """
DSM-Firmenich ScentMove® Emotion-to-Scent Lexicon (proprietary research, 40,000+ fragrances, 1M+ consumers):

Emotion → Olfactive Signature:
- joy: bright citrus, fruity florals, clean musks, sparkling aldehydes
- calm: lavender, chamomile, sandalwood, soft musks, light wood
- focus: clean green-citrus, transparent floral (Hedione), light woody-mineral
- confidence: dark woods, leather, vetiver, spicy amber, bold florals
- sensuality: amber, musk, jasmine indolic, vanilla, sandalwood
- nostalgia: powdery iris, violet, old rose, aldehydic florals, white musk
- energy: ozonic, aquatic, mint, sharp citrus, fresh galbanum
- connection: warm spice, benzoin, vanilla, soft amber, tonka bean
- wonder: rare naturals, unexpected accords, ozonic + floral, surreal combinations

Application-specific constraints:
- leave-on (fine fragrance, body lotion): IFRA allergen limits apply
- rinse-off (shower gel, shampoo): higher thresholds
- ambient (candle, diffuser): heat-stability required, avoid volatile top notes

Cultural calibrations:
- Middle East: heavier base, oud, intense amber, rich orientals preferred
- East Asia: lighter touch, clean florals, aquatic, less animalic
- Europe: classic floral/chypre/fougère, naturals valued
- North America: fresh clean, laundry-fresh musks, accessible florals
"""


def translate_brief(request: BriefTranslationRequest) -> BriefTranslationResponse:
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

    prompt = f"""You are a senior Fragrance Development Manager at DSM-Firmenich, trained in the ScentMove® emotion-to-scent methodology and classical perfumery.

{SCENTMOVE_CONTEXT}

A client has submitted the following brief. Translate it into a precise olfactive direction that a master perfumer can act on immediately.

BRIEF:
"{request.brief_text}"

Additional parameters:
- Target application: {request.target_application}
- Target emotions: {", ".join(request.target_emotions) if request.target_emotions else "not specified — infer from brief"}
- Gender positioning: {request.target_gender_positioning or "not specified"}
- Price tier: {request.price_tier or "not specified"}
- Cultural context: {request.cultural_context or "global"}
- Sustainability priority: {request.sustainability_priority}

Respond with a JSON object matching exactly this structure:
{{
  "olfactive_direction": {{
    "fragrance_family": "<primary family>",
    "sub_family": "<optional sub-family>",
    "character_summary": "<2-3 sentence poetic but precise description>",
    "key_accords": ["<accord1>", "<accord2>", "<accord3>"],
    "suggested_top_notes": ["<ingredient or category>", ...],
    "suggested_heart_notes": ["<ingredient or category>", ...],
    "suggested_base_notes": ["<ingredient or category>", ...],
    "emotion_mapping": {{
      "<emotion>": "<olfactive rationale>"
    }},
    "inspiration_references": ["<existing fragrance name>", ...],
    "perfumer_starting_point": "<1 paragraph actionable direction for the perfumer>",
    "confidence_score": <0.0-1.0>
  }},
  "alternative_directions": [
    {{
      "fragrance_family": "...",
      "sub_family": "...",
      "character_summary": "...",
      "key_accords": [],
      "suggested_top_notes": [],
      "suggested_heart_notes": [],
      "suggested_base_notes": [],
      "emotion_mapping": {{}},
      "inspiration_references": [],
      "perfumer_starting_point": "...",
      "confidence_score": 0.0
    }}
  ],
  "notes": "<any important caveats or regulatory notes>"
}}

Return only valid JSON."""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()
    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    data = json.loads(raw)

    primary = OlfactiveDirection(**data["olfactive_direction"])
    alternatives = [OlfactiveDirection(**alt) for alt in data.get("alternative_directions", [])]

    return BriefTranslationResponse(
        original_brief=request.brief_text,
        olfactive_direction=primary,
        alternative_directions=alternatives,
        notes=data.get("notes"),
    )
