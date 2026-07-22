
import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';
import { Log, GetLogsQuery, PostLogsBody, GetLogsResponse } from '../../shared/types.js';

// Pour Vercel, utilisation de /tmp pour stockage temporaire (non persistant)
const LOGS_FILE = path.join('/tmp', 'logs.json');

async function initLogsFile() {
  try {
    await fs.access(LOGS_FILE);
  } catch {
    await fs.writeFile(LOGS_FILE, JSON.stringify([]), 'utf-8');
  }
}

async function readLogs(): Promise<Log[]> {
  await initLogsFile();
  const data = await fs.readFile(LOGS_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeLogs(logs: Log[]) {
  await initLogsFile();
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

async function insertLog(log: PostLogsBody) {
  const newLog: Log = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: log.type,
    playerName: log.playerName,
    playerId: log.playerId,
    message: log.message,
    metadata: log.metadata ? JSON.stringify(log.metadata) : undefined
  };
  const logs = await readLogs();
  logs.unshift(newLog);
  await writeLogs(logs);
  return newLog.id;
}

async function getLogs(params: GetLogsQuery): Promise<GetLogsResponse> {
  let logs = await readLogs();

  if (params.type) {
    logs = logs.filter(log => log.type === params.type);
  }
  if (params.playerName) {
    logs = logs.filter(log => log.playerName?.toLowerCase().includes(params.playerName!.toLowerCase()));
  }
  if (params.startDate) {
    logs = logs.filter(log => new Date(log.timestamp) >= new Date(params.startDate!));
  }
  if (params.endDate) {
    logs = logs.filter(log => new Date(log.timestamp) <= new Date(params.endDate!));
  }

  const total = logs.length;
  const limit = params.limit || 20;
  const offset = params.offset || 0;
  const paginatedLogs = logs.slice(offset, offset + limit);

  return { logs: paginatedLogs, total };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const body: PostLogsBody = req.body;
      const id = await insertLog(body);
      res.status(200).json({ success: true, id });
    } else if (req.method === 'GET') {
      const params: GetLogsQuery = {
        type: req.query.type as any,
        playerName: req.query.playerName as string,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };
      const result = await getLogs(params);
      res.status(200).json(result);
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (e) {
    console.error('Error in logs handler', e);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
