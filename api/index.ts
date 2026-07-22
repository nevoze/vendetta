
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { insertLog, getLogs } from './db.js'
import { PostLogsBody, GetLogsQuery, LogType } from '../shared/types.js'
import authRouter from './auth/index.js'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../.env') })

const app = express()
const PORT = 3001

// Middleware
app.use(express.json())

// API Routes
app.use('/api/auth', authRouter)
app.get('/api/logs', async (req, res) => {
  const params: GetLogsQuery = {
    type: req.query.type as LogType,
    playerName: req.query.playerName as string,
    startDate: req.query.startDate as string,
    endDate: req.query.endDate as string,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
  }
  const result = await getLogs(params)
  res.json(result)
})

app.post('/api/logs', async (req, res) => {
  const body: PostLogsBody = req.body
  try {
    const id = await insertLog(body)
    res.json({ success: true, id })
  } catch (e) {
    console.error('Error inserting log', e)
    res.status(500).json({ success: false, error: 'Failed to insert log' })
  }
})

// Servir les fichiers statiques du build frontend (si besoin)
app.use(express.static(join(__dirname, '../dist')))

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
