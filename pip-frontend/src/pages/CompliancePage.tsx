import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { LibraryScanResult, FormulaComplianceReport } from '../types'
import StatusBadge from '../components/StatusBadge'

export default function CompliancePage() {
  const { data: scan, loading: scanLoading } = useApi<LibraryScanResult[]>('/compliance/scan')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: report, loading: reportLoading } = useApi<FormulaComplianceReport>(
    selectedId ? `/compliance/${selectedId}` : null
  )

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Formula Compliance Monitor</h1>
        <p className="text-stone-500 text-sm mt-1">
          Real-time IFRA 51 and EU CLP allergen compliance across the formula library.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: Library scan list */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 text-xs text-stone-500 uppercase tracking-wide font-medium">
              Formula Library
            </div>
            {scanLoading && <p className="p-4 text-stone-400 text-sm">Loading…</p>}
            {scan?.map((row) => (
              <button
                key={row.formula_id}
                onClick={() => setSelectedId(row.formula_id)}
                className={`w-full text-left px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${
                  selectedId === row.formula_id ? 'bg-brand-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-stone-900 truncate">{row.formula_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={row.overall_status} />
                  {row.critical_flags > 0 && (
                    <span className="text-xs text-red-600">{row.critical_flags} critical</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detail report */}
        <div className="flex-1">
          {!selectedId && (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
              Select a formula to view its compliance report.
            </div>
          )}
          {reportLoading && (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
              Checking compliance…
            </div>
          )}
          {report && !reportLoading && (
            <div className="bg-white rounded-xl border border-stone-200">
              <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-stone-900">{report.formula_name}</h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {report.application_type.replace(/_/g, ' ')} · Checked {new Date(report.checked_at).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={report.overall_status} size="md" />
              </div>

              {/* Summary row */}
              <div className="grid grid-cols-2 gap-px bg-stone-100 border-b border-stone-100">
                <div className="bg-white px-5 py-3">
                  <p className="text-xs text-stone-400">COGs ($/kg)</p>
                  <p className="text-lg font-semibold">${report.total_cost_per_kg_usd.toFixed(2)}</p>
                </div>
                <div className="bg-white px-5 py-3">
                  <p className="text-xs text-stone-400">Sustainability Score</p>
                  <p
                    className={`text-lg font-semibold ${
                      report.sustainability_score >= 75
                        ? 'text-emerald-600'
                        : report.sustainability_score >= 50
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {report.sustainability_score}/100
                  </p>
                </div>
              </div>

              {/* Flags */}
              {report.flags.length === 0 ? (
                <div className="p-5 text-emerald-600 text-sm font-medium">
                  No compliance issues found. Formula is fully IFRA 51 compliant.
                </div>
              ) : (
                <div className="divide-y divide-stone-50">
                  {report.flags.map((flag, i) => (
                    <div key={i} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <StatusBadge status={flag.severity} />
                            <span className="font-medium text-sm">{flag.ingredient_name}</span>
                            <span className="text-xs text-stone-400">{flag.issue_type.replace(/_/g, ' ')}</span>
                          </div>
                          {flag.issue_type !== 'eu_allergen_declaration_required' && (
                            <p className="text-xs text-stone-500 mb-2">
                              Current: <strong>{flag.current_pct}%</strong>
                              {flag.limit_pct !== undefined && (
                                <> · Limit: <strong>{flag.limit_pct}%</strong></>
                              )}
                              {flag.amendment && <> · {flag.amendment}</>}
                            </p>
                          )}
                          <p className="text-xs text-stone-600 bg-stone-50 rounded p-2">
                            {flag.remediation}
                          </p>
                        </div>
                      </div>
                    </div>
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
