
export type LogType = 
  | 'connection' 
  | 'disconnection' 
  | 'death' 
  | 'chat' 
  | 'command' 
  | 'other'
  | 'company_event'
  | 'case_management'
  | 'ambulance_billing'
  | 'anticheat'
  | 'ban'
  | 'staff_command'
  | 'transaction'
  | 'item_drop'
  | 'screenshot'
  | 'warning'
  | 'real_estate'
  | 'casino_transaction'
  | 'support_ticket'
  | 'external_shop'
  | 'ingame_shop';


export interface Log {
  id: string;
  type: LogType;
  timestamp: string;
  playerName?: string;
  playerId?: number;
  message: string;
  metadata?: string;
}

export interface GetLogsQuery {
  type?: LogType;
  playerName?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export interface GetLogsResponse {
  logs: Log[];
  total: number;
}

export interface PostLogsBody {
  type: LogType;
  playerName?: string;
  playerId?: number;
  message: string;
  metadata?: Record<string, any>;
  apiKey?: string;
}
