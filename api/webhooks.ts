
import { LogType, Log } from '../shared/types'
import { getLogTypeLabel } from '../shared/utils.js'

export const WEBHOOKS: Record<LogType, string> = {
  connection: 'https://discord.com/api/webhooks/1520483498140373042/JJLofUPaUiK5BRt-dbdJbAWVNC2uLDAaRWUQzETdGyeaO3Wbqo1S-XVKdOJmhv1wIlkS',
  disconnection: 'https://discord.com/api/webhooks/1524855481745539172/KEgV0INu4Reu4ir19yEQJ5XwNWa8xl3gR6CxY7iebIEerUvIym2x3DNtVqxXuhX4PwNc',
  death: 'https://discord.com/api/webhooks/1524855602470453248/KujXgyqac6VR2UirXDUmCHLICJbXw5f6rQm3dQALE7uXSQvrv0dEOMQLmHbvBe8q1eqP',
  chat: 'https://discord.com/api/webhooks/1524857506818429098/m32ZLns4mfjciP3-6gqi0tCQrozOxwM7IsLHoCp1urvPXA45jdCjYpMwYtEsRoKcUzIP',
  command: 'https://discord.com/api/webhooks/1524857506818429098/m32ZLns4mfjciP3-6gqi0tCQrozOxwM7IsLHoCp1urvPXA45jdCjYpMwYtEsRoKcUzIP',
  other: 'https://discord.com/api/webhooks/1524857506818429098/m32ZLns4mfjciP3-6gqi0tCQrozOxwM7IsLHoCp1urvPXA45jdCjYpMwYtEsRoKcUzIP',
  company_event: 'https://discord.com/api/webhooks/1524856089919750210/f3KOsEPS5jUSems3mxbV3AiLPisk9NGq9rW_cbVyZQoZdq8ycqeKuAFpUtVFxiYJShmB',
  case_management: 'https://discord.com/api/webhooks/1524855686935220334/wuwgXAbohZlyKGNpBhEkqdDH1lvBkzHFegBe7xnR5xQC_JTOBEWX71qRs5F1VJ0TzR0e',
  ambulance_billing: 'https://discord.com/api/webhooks/1524856177618587843/9vxj5DEgCwsD5eLzeL2MJEtZnpG5YxMZUeOKog3Nu1FugMjK0uT3Qy1hegywHITCTYZO',
  anticheat: 'https://discord.com/api/webhooks/1524856264021115071/V2ezosWM7GpySoB2JTQFz7A1g5b9mmXNEOTpueFEJpDoxWR3opwWPKGann3rpH3BnlCN',
  ban: 'https://discord.com/api/webhooks/1524855260206862346/XnMAvUMbDjG_i4uw4p9cSkSTtHzxtkznlLdDLugj6v0Ab-8AKoSHmOgTsThL7lAwU50N',
  staff_command: 'https://discord.com/api/webhooks/1524856363396894760/VbnqmTYudwfWb0SnjjpUFqH9G6UtX5Sy6degM-Hd73h_lsXVeyrexZSeDhumeihfvq0d',
  transaction: 'https://discord.com/api/webhooks/1524856465066561606/SwGzXh0HglROI_M2DgRk0jI3Ny8EP54K1YuLX1T0oVElLQ21ibl7Q9VV_mE0Q8PzpJjn',
  item_drop: 'https://discord.com/api/webhooks/1524856570263900322/prkzRWruhfy9Q8mX4H3qOVMvXVzLVSS9zX1dFB5h28Iu1CdvtdvC8bisov_jffVLXXY0',
  screenshot: 'https://discord.com/api/webhooks/1524856661947318424/0tUN_jw8Q1mfmPvS8PIWLtu3DXe0GaEQB6MTsrEzDMBGZbCniK1MqwKZC2s3A60picEk',
  warning: 'https://discord.com/api/webhooks/1524855260206862346/XnMAvUMbDjG_i4uw4p9cSkSTtHzxtkznlLdDLugj6v0Ab-8AKoSHmOgTsThL7lAwU50N',
  real_estate: 'https://discord.com/api/webhooks/1524856753018110054/CHg8yMLY3pImsUscpTsLNmgH7IQgREWUvGYZgwvdchT8qGV51b9boSGF1lbGxVSkDOB6',
  casino_transaction: 'https://discord.com/api/webhooks/1524856968202948738/QPKxjHYdD5qWPD7mru8CfgpvkceqBOi0ePqDvfjvTSr72G0pTqIuUVkKhTm-6qNcHm4r',
  support_ticket: 'https://discord.com/api/webhooks/1524856828188688527/4o6lm-MH2sEnjg_nmjsZ_XrEMeBklbgvVcZHfrFUeVVHGcWB-tIEbOrr4sgWaWeDeNsd',
  external_shop: 'https://discord.com/api/webhooks/1524857304132878506/Co0R_0zsyc1Ty2PpZiL6Zv4EcEG9TL6Nko-XMAFBgSYgV6lnPNiMfAxYcO0M49TrqKKn',
  ingame_shop: 'https://discord.com/api/webhooks/1524857410693365811/i4s_NDPdf4GLABhoDy6r1QggIMlQJWLoxXwcus9pvjT72GO5c5YrakEIy8-2UvarMpLp'
}

function getDiscordColor(type: LogType): number {
  const colors: Record<LogType, number> = {
    connection: 0x22c55e,
    disconnection: 0xef4444,
    death: 0xf97316,
    chat: 0x3b82f6,
    command: 0xa855f7,
    other: 0x6b7280,
    company_event: 0x14b8a6,
    case_management: 0xf59e0b,
    ambulance_billing: 0x06b6d4,
    anticheat: 0xdc2626,
    ban: 0x991b1b,
    staff_command: 0x8b5cf6,
    transaction: 0x10b981,
    item_drop: 0xfbbf24,
    screenshot: 0x84cc16,
    warning: 0xf59e0b,
    real_estate: 0x059669,
    casino_transaction: 0x7c3aed,
    support_ticket: 0x2563eb,
    external_shop: 0xdb2777,
    ingame_shop: 0xdb2777
  }
  return colors[type] || 0x6b7280
}

export async function sendDiscordWebhook(log: Log): Promise<void> {
  const webhookUrl = WEBHOOKS[log.type] || WEBHOOKS.other
  
  const embed = {
    title: getLogTypeLabel(log.type),
    description: log.message,
    color: getDiscordColor(log.type),
    timestamp: log.timestamp,
    fields: [] as any[]
  }
  
  if (log.playerName) {
    embed.fields.push({
      name: 'Joueur',
      value: log.playerName,
      inline: true
    })
  }
  
  if (log.playerId) {
    embed.fields.push({
      name: 'ID Joueur',
      value: String(log.playerId),
      inline: true
    })
  }
  
  if (log.metadata) {
    try {
      const metadata = JSON.parse(log.metadata)
      for (const [key, value] of Object.entries(metadata)) {
        embed.fields.push({
          name: key,
          value: String(value),
          inline: true
        })
      }
    } catch (e) {
      // Ignore metadata parsing errors
    }
  }
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    })
  } catch (e) {
    console.error('Failed to send Discord webhook:', e)
  }
}
