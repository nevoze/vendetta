
import { useEffect } from 'react'
import { useStore } from '../store'
import { Log } from '../../shared/types'
import { getLogTypeLabel, getLogTypeColor } from '../../shared/utils'
import { Users, Skull, MessageSquare, Activity } from 'lucide-react'

export default function Dashboard() {
  const { logs, totalLogs, fetchLogs } = useStore()

  useEffect(() => {
    fetchLogs({ limit: 10 })
  }, [fetchLogs])

  const stats = {
    connections: logs.filter(l => l.type === 'connection').length,
    deaths: logs.filter(l => l.type === 'death').length,
    chat: logs.filter(l => l.type === 'chat').length,
  }

  const getBadgeColor = (type: Log['type']) => {
    const color = getLogTypeColor(type)
    return color.replace(' border-', ' ')
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Connexions</p>
              <p className="text-3xl font-bold">{stats.connections}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Skull className="text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Morts</p>
              <p className="text-3xl font-bold">{stats.deaths}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <MessageSquare className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Messages</p>
              <p className="text-3xl font-bold">{stats.chat}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-500/20 rounded-lg">
              <Activity className="text-slate-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total logs</p>
              <p className="text-3xl font-bold">{totalLogs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold">Dernières activités</h3>
        </div>
        <div className="divide-y divide-slate-700">
          {logs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-slate-700/50">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(log.type)}`}>
                  {getLogTypeLabel(log.type)}
                </span>
                <span className="text-slate-400 text-sm">
                  {new Date(log.timestamp).toLocaleString('fr-FR')}
                </span>
                {log.playerName && (
                  <span className="text-white font-medium">{log.playerName}</span>
                )}
              </div>
              <p className="mt-2 text-slate-300 font-mono">{log.message}</p>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              Aucun log pour le moment
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
