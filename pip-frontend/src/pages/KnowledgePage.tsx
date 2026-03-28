import { useState } from 'react'
import { post } from '../hooks/useApi'
import { KnowledgeEntry } from '../types'

const ENTRY_TYPES = ['technique', 'ingredient_insight', 'formula_note', 'trend']
const EMOTIONS = ['joy', 'calm', 'focus', 'confidence', 'sensuality', 'nostalgia', 'energy']

export default function KnowledgePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<KnowledgeEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<KnowledgeEntry | null>(null)

  async function search() {
    setLoading(true)
    try {
      const res = await post<KnowledgeEntry[]>('/knowledge/search', {
        query,
        top_n: 20,
      })
      setResults(res)
    } finally {
      setLoading(false)
    }
  }

  // Load all on mount
  useState(() => {
    search()
  })

  const entryTypeColor: Record<string, string> = {
    technique: 'bg-purple-100 text-purple-800',
    ingredient_insight: 'bg-blue-100 text-blue-800',
    formula_note: 'bg-amber-100 text-amber-800',
    trend: 'bg-emerald-100 text-emerald-800',
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Perfumer Knowledge Base</h1>
        <p className="text-stone-500 text-sm mt-1">
          Captured expertise from master perfumers and Fragrance Development Managers.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder="Search by keyword, descriptor, emotion…"
          className="flex-1 px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          onClick={search}
          disabled={loading}
          className="px-5 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Results list */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden max-h-[calc(100vh-260px)] overflow-y-auto">
            {results?.length === 0 && (
              <p className="p-4 text-stone-400 text-sm">No results found.</p>
            )}
            {results?.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry)}
                className={`w-full text-left px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${
                  selected?.id === entry.id ? 'bg-brand-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-stone-900 leading-snug">{entry.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      entryTypeColor[entry.entry_type] ?? 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {entry.entry_type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs text-stone-400">{entry.author}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="flex-1">
          {!selected && (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
              Select an entry to read.
            </div>
          )}
          {selected && (
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-stone-900 text-lg">{selected.title}</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    By {selected.author} · {new Date(selected.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    entryTypeColor[selected.entry_type] ?? 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {selected.entry_type.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="prose prose-sm max-w-none text-stone-700 leading-relaxed mb-5">
                {selected.content.split('\n').map((para, i) => (
                  <p key={i} className="mb-2">{para}</p>
                ))}
              </div>

              {selected.olfactive_descriptors.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-stone-400 mb-1">Olfactive Descriptors</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.olfactive_descriptors.map((d) => (
                      <span key={d} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.emotion_tags.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-stone-400 mb-1">Emotion Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.emotion_tags.map((e) => (
                      <span key={e} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {selected.tags.map((t) => (
                    <span key={t} className="text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
