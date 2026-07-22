
import { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../../.env') })

// Pour Vercel, utilisation de /tmp pour stockage temporaire (non persistant)
const LOGS_FILE = path.join('/tmp', 'logs.json')

async function initLogsFile() {
  try {
    await fs.access(LOGS_FILE)
  } catch {
    await fs.writeFile(LOGS_FILE, JSON.stringify([]), 'utf-8')
  }
}

async function readLogs() {
  await initLogsFile()
  const data = await fs.readFile(LOGS_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeLogs(logs: any[]) {
  await initLogsFile()
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8')
}

async function insertLog(log: any) {
  const newLog = {
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

async function getLogs(params: any) {
  let logs: any[] = await readLogs()

  if (params.type) {
    logs = logs.filter((log: any) => log.type === params.type)
  }
  if (params.playerName) {
    logs = logs.filter((log: any) => log.playerName?.toLowerCase().includes(params.playerName.toLowerCase()))
  }
  if (params.startDate) {
    logs = logs.filter((log: any) => new Date(log.timestamp) >= new Date(params.startDate))
  }
  if (params.endDate) {
    logs = logs.filter((log: any) => new Date(log.timestamp) <= new Date(params.endDate))
  }

  const total = logs.length
  const limit = params.limit ? parseInt(params.limit) : 20
  const offset = params.offset ? parseInt(params.offset) : 0
  const paginatedLogs = logs.slice(offset, offset + limit)

  return { logs: paginatedLogs, total }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const body = req.body
      const id = await insertLog(body)
      res.status(200).json({ success: true, id })
    } else if (req.method === 'GET') {
      const params = {
        type: req.query.type as string,
        playerName: req.query.playerName as string,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        limit: req.query.limit as string,
        offset: req.query.offset as string
      }
      const data = await getLogs(params)
      res.status(200).json(data)
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Erreur logs:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
