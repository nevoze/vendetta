
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'
import { Log, GetLogsQuery, PostLogsBody } from '../shared/types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const LOGS_FILE = join(__dirname, '../logs.json')

async function initLogsFile() {
  try {
    await fs.access(LOGS_FILE)
  } catch {
    await fs.writeFile(LOGS_FILE, JSON.stringify([]), 'utf-8')
  }
}

async function readLogs(): Promise<Log[]> {
  await initLogsFile()
  const data = await fs.readFile(LOGS_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeLogs(logs: Log[]) {
  await initLogsFile()
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8')
}

export async function insertLog(log: PostLogsBody) {
  const newLog: Log = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: log.type,
    playerName: log.playerName,
    playerId: log.playerId,
    message: log.message,
    metadata: log.metadata ? JSON.stringify(log.metadata) : undefined
  }
  const logs = await readLogs()
  logs.unshift(newLog)
  await writeLogs(logs)
  
  return newLog.id
}

export async function getLogs(params: GetLogsQuery) {
  let logs = await readLogs()

  if (params.type) {
    logs = logs.filter(log => log.type === params.type)
  }
  if (params.playerName) {
    logs = logs.filter(log => log.playerName?.toLowerCase().includes(params.playerName!.toLowerCase()))
  }
  if (params.startDate) {
    logs = logs.filter(log => new Date(log.timestamp) >= new Date(params.startDate!))
  }
  if (params.endDate) {
    logs = logs.filter(log => new Date(log.timestamp) <= new Date(params.endDate!))
  }

  const total = logs.length
  const limit = params.limit || 20
  const offset = params.offset || 0
  const paginatedLogs = logs.slice(offset, offset + limit)

  return { logs: paginatedLogs, total }
}
