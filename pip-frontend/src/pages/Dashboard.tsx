import { useApi } from '../hooks/useApi'
import { LibraryScanResult } from '../types'
import StatusBadge from '../components/StatusBadge'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { data: scan, loading } = useApi<LibraryScanResult[]>('/compliance/scan')

  const critical = scan?.filter((f) => f.critical_flags > 0).length ?? 0
  const warnings = scan?.filter((f) => f.warning_flags > 0 && f.critical_flags === 0).length ?? 0
  const compliant = scan?.filter((f) => f.overall_status === 'compliant').length ?? 0

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">
          Perfumery Intelligence Platform — DSM-Firmenich Perfumery &amp; Beauty Division
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Formulas Scanned</p>
          <p className="text-3xl font-bold text-stone-900">{scan?.length ?? '—'}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-5">
          <p className="text-xs text-red-500 uppercase tracking-wide mb-1">Critical Issues</p>
          <p className="text-3xl font-bold text-red-600">{loading ? '—' : critical}</p>
          <p className="text-xs text-stone-400 mt-1">formulas with IFRA violations</p>
        </div>
        <div className="bg-white rounded-xl border border-emerald-200 p-5">
          <p className="text-xs text-emerald-600 uppercase tracking-wide mb-1">Fully Compliant</p>
          <p className="text-3xl font-bold text-emerald-600">{loading ? '—' : compliant}</p>
          <p className="text-xs text-stone-400 mt-1">formulas — no action needed</p>
        </div>
      </div>

      {/* Formula library scan */}
      <div className="bg-white rounded-xl border border-stone-200">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Formula Library — Compliance Scan</h2>
          <Link to="/compliance" className="text-sm text-brand-600 hover:underline">
            View details →
          </Link>
        </div>
        {loading && <p className="p-5 text-stone-400 text-sm">Scanning library…</p>}
        {scan && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-stone-400 uppercase border-b border-stone-100">
                <th className="px-5 py-3">Formula</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Critical</th>
                <th className="px-5 py-3 text-center">Warnings</th>
                <th className="px-5 py-3 text-right">Sustainability</th>
                <th className="px-5 py-3 text-right">COGs ($/kg)</th>
              </tr>
            </thead>
            <tbody>
              {scan.map((row) => (
                <tr key={row.formula_id} className="border-b border-stone-50 hover:bg-stone-50">
                  <td className="px-5 py-3 font-medium">
                    <Link to={`/formulas/${row.formula_id}`} className="hover:text-brand-600">
                      {row.formula_name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.overall_status} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    {row.critical_flags > 0 ? (
                      <span className="text-red-600 font-medium">{row.critical_flags}</span>
                    ) : (
                      <span className="text-stone-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {row.warning_flags > 0 ? (
                      <span className="text-amber-600 font-medium">{row.warning_flags}</span>
                    ) : (
                      <span className="text-stone-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={
                        row.sustainability_score >= 75
                          ? 'text-emerald-600'
                          : row.sustainability_score >= 50
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }
                    >
                      {row.sustainability_score}
                    </span>
                    <span className="text-stone-300 text-xs">/100</span>
                  </td>
                  <td className="px-5 py-3 text-right text-stone-700">
                    ${row.total_cost_per_kg_usd.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[
          {
            to: '/brief',
            title: 'Brief Translator',
            desc: 'Convert emotional consumer briefs into olfactive direction using ScentMove® methodology.',
          },
          {
            to: '/ingredients',
            title: 'Ingredient Library',
            desc: 'Browse 4,000+ raw materials with IFRA status, sustainability scores, and substitution recommendations.',
          },
          {
            to: '/knowledge',
            title: 'Perfumer Knowledge Base',
            desc: 'Search captured expertise from master perfumers and FDMs.',
          },
          {
            to: '/formulas',
            title: 'Formula Cost Optimizer',
            desc: 'Analyse COGs drivers and surface cost reduction opportunities.',
          },
        ].map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white rounded-xl border border-stone-200 p-5 hover:border-brand-300 transition-colors"
          >
            <h3 className="font-semibold text-stone-900 mb-1">{card.title}</h3>
            <p className="text-stone-500 text-sm">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
