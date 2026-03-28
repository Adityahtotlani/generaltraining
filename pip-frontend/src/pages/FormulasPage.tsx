import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { FormulaSummary, Formula, FormulaCostBreakdown } from '../types'
import StatusBadge from '../components/StatusBadge'
import { Link } from 'react-router-dom'

export default function FormulasPage() {
  const { data: formulas, loading } = useApi<FormulaSummary[]>('/formulas')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: formula } = useApi<Formula>(selectedId ? `/formulas/${selectedId}` : null)
  const { data: cost } = useApi<FormulaCostBreakdown>(selectedId ? `/formulas/${selectedId}/cost` : null)

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Formula Library</h1>
        <p className="text-stone-500 text-sm mt-1">Browse formulas and analyse cost-of-goods breakdown.</p>
      </div>

      <div className="flex gap-6">
        {/* Left: list */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            {loading && <p className="p-4 text-stone-400 text-sm">Loading…</p>}
            {formulas?.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedId(f.id)}
                className={`w-full text-left px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${
                  selectedId === f.id ? 'bg-brand-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-stone-900">{f.name}</p>
                <p className="text-xs text-stone-400 mt-0.5">
                  v{f.version} · {f.application_type.replace(/_/g, ' ')}
                </p>
                {f.tags.includes('non_compliant') && (
                  <StatusBadge status="non_compliant" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: detail */}
        <div className="flex-1 space-y-4">
          {!selectedId && (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
              Select a formula to view ingredients and cost analysis.
            </div>
          )}

          {formula && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-stone-900 text-lg">{formula.name}</h2>
                  <p className="text-xs text-stone-400">
                    v{formula.version} · {formula.application_type.replace(/_/g, ' ')} ·{' '}
                    {formula.perfumer && <>{formula.perfumer} · </>}
                    {formula.client}
                  </p>
                </div>
                <Link
                  to={`/compliance`}
                  onClick={() => {}}
                  className="text-xs text-brand-600 hover:underline"
                >
                  Check compliance →
                </Link>
              </div>
              {formula.brief_description && (
                <p className="text-sm text-stone-600 italic mb-3">{formula.brief_description}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {formula.tags.map((t) => (
                  <span key={t} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cost && (
            <div className="bg-white rounded-xl border border-stone-200">
              <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">Cost-of-Goods Breakdown</span>
                <span className="text-lg font-bold text-stone-900">
                  ${cost.total_cost_per_kg_usd.toFixed(2)}/kg
                </span>
              </div>

              <div className="divide-y divide-stone-50">
                {cost.ingredient_costs
                  .sort((a, b) => b.contribution_usd - a.contribution_usd)
                  .map((ic) => (
                    <div key={ic.ingredient_id} className="px-5 py-3 flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-stone-800">{ic.ingredient_name}</p>
                        <p className="text-xs text-stone-400">
                          {ic.percentage}% · ${ic.cost_per_kg_usd.toLocaleString()}/kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${ic.contribution_usd.toFixed(2)}</p>
                        <div className="flex items-center gap-1 justify-end">
                          <div
                            className="h-1.5 bg-brand-400 rounded-full"
                            style={{ width: `${Math.min(ic.contribution_pct_of_total * 1.2, 80)}px` }}
                          />
                          <p className="text-xs text-stone-400">{ic.contribution_pct_of_total}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {cost.optimization_suggestions.length > 0 && (
                <div className="px-5 py-4 bg-amber-50 border-t border-amber-100 rounded-b-xl">
                  <p className="text-xs font-medium text-amber-800 mb-2">Optimization Suggestions</p>
                  {cost.optimization_suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-amber-700">• {s}</p>
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
