import { useState } from 'react'
import { useApi, post } from '../hooks/useApi'
import { Ingredient, SubstitutionCandidate } from '../types'
import StatusBadge from '../components/StatusBadge'

export default function IngredientsPage() {
  const { data: ingredients, loading } = useApi<Ingredient[]>('/ingredients')
  const [selected, setSelected] = useState<Ingredient | null>(null)
  const [substitutes, setSubstitutes] = useState<SubstitutionCandidate[] | null>(null)
  const [subLoading, setSubLoading] = useState(false)
  const [filter, setFilter] = useState('')

  const filtered = ingredients?.filter(
    (i) =>
      i.common_name.toLowerCase().includes(filter.toLowerCase()) ||
      i.olfactive_descriptors.some((d) => d.includes(filter.toLowerCase()))
  )

  async function loadSubstitutes(ing: Ingredient) {
    setSelected(ing)
    setSubstitutes(null)
    setSubLoading(true)
    try {
      const result = await post<SubstitutionCandidate[]>(`/ingredients/${ing.id}/substitutes`, {
        ingredient_id: ing.id,
        reason: ing.regulatory_status === 'restricted' || ing.regulatory_status === 'banned' ? 'restricted' : 'cost',
        target_application: 'fine_fragrance',
        top_n: 5,
      })
      setSubstitutes(result)
    } catch {
      setSubstitutes([])
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Ingredient Library</h1>
        <p className="text-stone-500 text-sm mt-1">
          Browse raw materials with IFRA status, sustainability scores, and AI-ranked substitutions.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: Ingredient list */}
        <div className="w-80 shrink-0">
          <input
            type="text"
            placeholder="Search by name or descriptor…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden max-h-[calc(100vh-260px)] overflow-y-auto">
            {loading && <p className="p-4 text-stone-400 text-sm">Loading…</p>}
            {filtered?.map((ing) => (
              <button
                key={ing.id}
                onClick={() => loadSubstitutes(ing)}
                className={`w-full text-left px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${
                  selected?.id === ing.id ? 'bg-brand-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-stone-900 truncate">{ing.common_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={ing.regulatory_status} />
                  <span className="text-xs text-stone-400">{ing.fragrance_family}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detail + substitutes */}
        <div className="flex-1 space-y-4">
          {!selected && (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
              Select an ingredient to view details and find substitutes.
            </div>
          )}

          {selected && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-stone-900">{selected.common_name}</h2>
                  <p className="text-xs text-stone-400 mt-0.5 font-mono">{selected.inci_name}</p>
                </div>
                <StatusBadge status={selected.regulatory_status} size="md" />
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-stone-400">Cost</p>
                  <p className="font-medium">${selected.cost_per_kg_usd.toLocaleString()}/kg</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Sustainability</p>
                  <p
                    className={`font-medium ${
                      selected.sustainability_score >= 75 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {selected.sustainability_score}/100
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Biodegradability</p>
                  <p className="font-medium">{selected.biodegradability_score}%</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {selected.olfactive_descriptors.map((d) => (
                  <span key={d} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                    {d}
                  </span>
                ))}
              </div>

              {selected.ifra_limit_pct !== undefined && (
                <p className="text-xs text-amber-700 bg-amber-50 rounded p-2">
                  IFRA limit: max {selected.ifra_limit_pct}% in leave-on · {selected.ifra_amendment}
                </p>
              )}
              {selected.notes && (
                <p className="text-xs text-stone-500 mt-2">{selected.notes}</p>
              )}
            </div>
          )}

          {/* Substitutes */}
          {selected && (
            <div className="bg-white rounded-xl border border-stone-200">
              <div className="px-5 py-3 border-b border-stone-100 text-sm font-medium text-stone-700">
                AI-Ranked Substitutes
              </div>
              {subLoading && <p className="p-4 text-stone-400 text-sm">Finding substitutes…</p>}
              {substitutes?.length === 0 && (
                <p className="p-4 text-stone-400 text-sm">No suitable substitutes found.</p>
              )}
              {substitutes?.map((sub, i) => (
                <div key={i} className="px-5 py-4 border-b border-stone-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900">{sub.ingredient.common_name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{sub.recommendation_reason}</p>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <p className="text-xs text-stone-400">Similarity</p>
                      <p className="text-sm font-medium">{(sub.olfactive_similarity_score * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <StatusBadge status={sub.regulatory_status} />
                    <span
                      className={`text-xs font-medium ${
                        sub.cost_delta_pct < 0 ? 'text-emerald-600' : 'text-stone-500'
                      }`}
                    >
                      {sub.cost_delta_pct > 0 ? '+' : ''}{sub.cost_delta_pct.toFixed(0)}% cost
                    </span>
                    <span className="text-xs text-stone-400">
                      Sustainability: {sub.sustainability_score}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
