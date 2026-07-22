
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Logs from './pages/Logs'
import Settings from './pages/Settings'
import AuthLogin from './pages/AuthLogin'
import AuthCallback from './pages/AuthCallback'
import { LayoutDashboard, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react'
import { useStore } from './store'

function App() {
  const { isAuthenticated, setAuthenticated } = useStore()

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<AuthLogin />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-8">Vendetta RS6 Logs</h1>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <LayoutDashboard size={20} />
                Tableau de bord
              </NavLink>
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <FileText size={20} />
                Logs
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <SettingsIcon size={20} />
                Paramètres
              </NavLink>
            </nav>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </aside>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
