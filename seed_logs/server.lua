
-- Configuration: MET TON URL NGROK ICI, SANS ESPACES NI BACKTICKS !
local API_URL = "https://steadfast-outlet-disregard.ngrok-free.dev/api/logs"

print("=====================================")
print("[seed-logs] DEMARRAGE DU SCRIPT...")
print("=====================================")

-- Fonction de test de connexion (pour vérifier que PerformHttpRequest marche)
local function testConnection()
    print("[seed-logs] Test de connexion à l'API...")
    PerformHttpRequest(API_URL, function(err, text, headers)
        print("[seed-logs] Réponse test: err=" .. tostring(err))
        print("[seed-logs] Réponse test: text=" .. tostring(text))
    end, "GET")
end

-- Fonction pour envoyer un log
local function sendLog(logType, playerName, playerId, message)
    print("[seed-logs] → sendLog appelé: type=" .. logType .. ", player=" .. playerName)
    
    local payload = json.encode({
        type = logType,
        playerName = playerName,
        playerId = playerId,
        message = message
    })
    
    print("[seed-logs] → Payload: " .. payload)
    
    PerformHttpRequest(API_URL, function(err, text, headers)
        print("[seed-logs] → Réponse API: err=" .. tostring(err) .. ", code=" .. tostring(headers["Status-Code"]))
        print("[seed-logs] → Réponse texte: " .. tostring(text))
    end, "POST", payload, { ["Content-Type"] = "application/json" })
end

-- Commande de test simple (tout le monde peut l'utiliser)
RegisterCommand("logtest", function(source, args, rawCommand)
    print("[seed-logs] → Commande /logtest appelée !")
    local name = "Console"
    if source ~= 0 then
        name = GetPlayerName(source)
    end
    sendLog("command", name, source, "Test de commande /logtest")
end, false) -- false = pas réservé aux admins

-- Event de connexion (simple)
AddEventHandler("playerJoining", function(tempSource, oldId)
    print("[seed-logs] → Event playerJoining !")
    local src = source
    local name = GetPlayerName(src)
    sendLog("connection", name, src, name .. " a rejoint le serveur")
end)

-- Event de déconnexion
AddEventHandler("playerDropped", function(reason)
    print("[seed-logs] → Event playerDropped !")
    local src = source
    local name = GetPlayerName(src)
    sendLog("disconnection", name, src, name .. " a quitté (raison: " .. reason .. ")")
end)

-- Event de chat
AddEventHandler("chatMessage", function(source, author, text)
    print("[seed-logs] → Event chatMessage !")
    sendLog("chat", author, source, "[" .. author .. "] " .. text)
end)

-- Test de connexion immédiat au démarrage
testConnection()

print("=====================================")
print("[seed-logs] SCRIPT PRÊT ! Tapez /logtest en jeu !")
print("=====================================")
