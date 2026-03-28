import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', exact: true },
  { to: '/compliance', label: 'Compliance' },
  { to: '/ingredients', label: 'Ingredients' },
  { to: '/formulas', label: 'Formulas' },
  { to: '/brief', label: 'Brief Translator' },
  { to: '/knowledge', label: 'Knowledge Base' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">PIP</span>
          </div>
          <div>
            <span className="font-semibold text-stone-900 text-sm">Perfumery Intelligence Platform</span>
            <span className="ml-2 text-stone-400 text-xs">DSM-Firmenich</span>
          </div>
        </div>
        <span className="text-xs text-stone-400">v0.1.0 — Perfumery &amp; Beauty Division</span>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-52 min-h-[calc(100vh-53px)] bg-white border-r border-stone-200 pt-4 px-3 shrink-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
