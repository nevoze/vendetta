
import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { LogType } from '../../shared/types.js'
import { getLogTypeLabel, getLogTypeColor } from '../../shared/utils.js'
import { Search, Filter } from 'lucide-react'

export default function Logs() {
  const { logs, totalLogs, fetchLogs } = useStore()
  const [filters, setFilters] = useState({
    type: '' as LogType | '',
    playerName: '',
    limit: 20,
    offset: 0,
  })

  useEffect(() => {
    fetchLogs(filters)
  }, [filters, fetchLogs])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, offset: 0 }))
  }

  const nextPage = () => {
    if (filters.offset + filters.limit < totalLogs) {
      handleFilterChange('offset', filters.offset + filters.limit)
    }
  }

  const prevPage = () => {
    if (filters.offset > 0) {
      handleFilterChange('offset', Math.max(0, filters.offset - filters.limit))
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Logs</h2>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <span className="text-slate-300 font-medium">Filtres:</span>
          </div>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les types</option>
            {Object.entries({
              connection: 'Connexion',
              disconnection: 'Déconnexion',
              death: 'Mort',
              chat: 'Chat',
              command: 'Commande',
              other: 'Autre',
              company_event: 'Événements société',
              case_management: 'Gestion de cas',
              ambulance_billing: 'Facturation ambulance',
              anticheat: 'Anti-triche',
              ban: 'Bannissement',
              staff_command: 'Commandes staff',
              transaction: 'Transactions',
              item_drop: 'Objets drop',
              screenshot: 'Captures d\'écran',
              warning: 'Avertissements',
              real_estate: 'Immobilier',
              casino_transaction: 'Transactions casino',
              support_ticket: 'Tickets support',
              external_shop: 'Boutique externe',
              ingame_shop: 'Boutique en jeu',
            } as Record<LogType, string>).map(([type, label]) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un joueur..."
              value={filters.playerName}
              onChange={(e) => handleFilterChange('playerName', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Joueur</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLogTypeColor(log.type)}`}>
                      {getLogTypeLabel(log.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(log.timestamp).toLocaleString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {log.playerName || '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono">
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Affichage {filters.offset + 1} - {Math.min(filters.offset + filters.limit, totalLogs)} sur {totalLogs}
          </p>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={filters.offset === 0}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Précédent
            </button>
            <button
              onClick={nextPage}
              disabled={filters.offset + filters.limit >= totalLogs}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
