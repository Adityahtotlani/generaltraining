import { useState } from 'react'
import { post } from '../hooks/useApi'
import { BriefTranslationResponse, OlfactiveDirection } from '../types'

const EMOTIONS = ['joy', 'calm', 'focus', 'confidence', 'sensuality', 'nostalgia', 'energy', 'connection', 'wonder']
const APPLICATIONS = ['fine_fragrance', 'eau_de_toilette', 'body_lotion', 'shower_gel', 'candle', 'diffuser']

function DirectionCard({ dir }: { dir: OlfactiveDirection }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-brand-700">{dir.fragrance_family}</span>
        {dir.sub_family && (
          <span className="text-xs text-stone-400">/ {dir.sub_family}</span>
        )}
        <span className="ml-auto text-xs text-stone-400">
          Confidence: {(dir.confidence_score * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-sm text-stone-700 italic mb-4">"{dir.character_summary}"</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {(['suggested_top_notes', 'suggested_heart_notes', 'suggested_base_notes'] as const).map(
          (key, i) => (
            <div key={key}>
              <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">
                {['Top Notes', 'Heart Notes', 'Base Notes'][i]}
              </p>
              <ul className="space-y-1">
                {dir[key].map((note) => (
                  <li key={note} className="text-xs bg-stone-50 text-stone-700 px-2 py-1 rounded">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Key Accords</p>
        <div className="flex flex-wrap gap-1">
          {dir.key_accords.map((acc) => (
            <span key={acc} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
              {acc}
            </span>
          ))}
        </div>
      </div>

      {Object.keys(dir.emotion_mapping).length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Emotion Mapping (ScentMove®)</p>
          <div className="space-y-1">
            {Object.entries(dir.emotion_mapping).map(([emotion, rationale]) => (
              <div key={emotion} className="text-xs text-stone-600">
                <span className="font-medium capitalize">{emotion}:</span> {rationale}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-amber-50 rounded-lg p-3 mt-3">
        <p className="text-xs text-amber-700 font-medium mb-1">Perfumer Starting Point</p>
        <p className="text-xs text-amber-900">{dir.perfumer_starting_point}</p>
      </div>

      {dir.inspiration_references.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-stone-400 mb-1">References</p>
          <p className="text-xs text-stone-500">{dir.inspiration_references.join(' · ')}</p>
        </div>
      )}
    </div>
  )
}

export default function BriefPage() {
  const [briefText, setBriefText] = useState('')
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [application, setApplication] = useState('fine_fragrance')
  const [gender, setGender] = useState('')
  const [priceTier, setPriceTier] = useState('')
  const [cultural, setCultural] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BriefTranslationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  function toggleEmotion(e: string) {
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    )
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!briefText.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await post<BriefTranslationResponse>('/brief/translate', {
        brief_text: briefText,
        target_emotions: selectedEmotions,
        target_application: application,
        target_gender_positioning: gender || null,
        price_tier: priceTier || null,
        cultural_context: cultural || null,
        sustainability_priority: false,
      })
      setResult(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Translation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Brief Translator</h1>
        <p className="text-stone-500 text-sm mt-1">
          Convert qualitative consumer briefs into precise olfactive direction using the ScentMove® methodology.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-700 mb-1">Consumer / Client Brief</label>
          <textarea
            value={briefText}
            onChange={(e) => setBriefText(e.target.value)}
            rows={4}
            placeholder="e.g. 'A fragrance for a high-performance sportswear brand. Should feel fresh and energising — like early morning sea air with a sense of focus and clarity. Target: young urban professionals, unisex.'"
            className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1">Application</label>
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none"
            >
              {APPLICATIONS.map((a) => (
                <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1">Gender Positioning</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none"
            >
              <option value="">Not specified</option>
              <option value="feminine">Feminine</option>
              <option value="masculine">Masculine</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1">Price Tier</label>
            <select
              value={priceTier}
              onChange={(e) => setPriceTier(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none"
            >
              <option value="">Not specified</option>
              <option value="mass">Mass</option>
              <option value="prestige">Prestige</option>
              <option value="luxury">Luxury</option>
              <option value="ultra_luxury">Ultra Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1">Cultural Context</label>
            <input
              value={cultural}
              onChange={(e) => setCultural(e.target.value)}
              placeholder="e.g. Middle East, East Asia…"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs text-stone-500 mb-2">Target Emotions (ScentMove®)</label>
          <div className="flex flex-wrap gap-2">
            {EMOTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggleEmotion(e)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedEmotions.includes(e)
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-stone-200 text-stone-600 hover:border-brand-300'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !briefText.trim()}
          className="px-6 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Translating…' : 'Translate Brief'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-stone-900 mb-3">Primary Direction</h2>
            <DirectionCard dir={result.olfactive_direction} />
          </div>

          {result.alternative_directions.length > 0 && (
            <div>
              <h2 className="font-semibold text-stone-900 mb-3">Alternative Direction</h2>
              {result.alternative_directions.map((alt, i) => (
                <DirectionCard key={i} dir={alt} />
              ))}
            </div>
          )}

          {result.notes && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
              <strong>Notes: </strong>{result.notes}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
