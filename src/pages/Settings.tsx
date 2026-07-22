
import { useState } from 'react'
import { useStore } from '../store'
import { Save } from 'lucide-react'

export default function Settings() {
  const { apiKey, setApiKey } = useStore()
  const [inputKey, setInputKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setApiKey(inputKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Paramètres</h2>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 max-w-2xl">
        <h3 className="text-xl font-semibold mb-6">Configuration du serveur FiveM</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">Clé API</label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Entrez votre clé API..."
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
          >
            <Save size={20} />
            {saved ? 'Sauvegardé !' : 'Sauvegarder'}
          </button>
        </div>

        <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
          <h4 className="text-lg font-semibold mb-4">Script FiveM d'exemple (Lua)</h4>
          <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300">
{`-- Exemple de script FiveM pour envoyer les logs
local API_KEY = "VOTRE_CLE_API"
local API_URL = "http://localhost:3001/api/logs"

function SendLog(type, playerName, playerId, message)
    PerformHttpRequest(API_URL, function(err, text, headers) end, 'POST', json.encode({
        type = type,
        playerName = playerName,
        playerId = playerId,
        message = message,
        apiKey = API_KEY
    }), { ["Content-Type"] = "application/json" })
end

-- Exemple d'utilisation pour les connexions
AddEventHandler('playerConnecting', function()
    local playerName = GetPlayerName(source)
    SendLog('connection', playerName, source, playerName .. ' a rejoint le serveur')
end)

AddEventHandler('playerDropped', function()
    local playerName = GetPlayerName(source)
    SendLog('disconnection', playerName, source, playerName .. ' a quitté le serveur')
end)`}
          </pre>
        </div>
      </div>
    </div>
  )
}
