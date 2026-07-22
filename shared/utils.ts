
import { LogType } from './types'

export function getLogTypeLabel(type: LogType): string {
  const labels: Record<LogType, string> = {
    connection: 'Connexion joueur',
    disconnection: 'Déconnexion joueur',
    death: 'Décès joueur',
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
    ingame_shop: 'Boutique en jeu'
  }
  return labels[type] || 'Autre'
}

export function getLogTypeColor(type: LogType): string {
  const colors: Record<LogType, string> = {
    connection: 'bg-green-500/20 text-green-400 border-green-500/30',
    disconnection: 'bg-red-500/20 text-red-400 border-red-500/30',
    death: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    chat: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    command: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    other: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    company_event: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    case_management: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    ambulance_billing: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    anticheat: 'bg-red-700/20 text-red-400 border-red-700/30',
    ban: 'bg-red-900/20 text-red-400 border-red-900/30',
    staff_command: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    transaction: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    item_drop: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    screenshot: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    real_estate: 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30',
    casino_transaction: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    support_ticket: 'bg-blue-700/20 text-blue-400 border-blue-700/30',
    external_shop: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    ingame_shop: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  }
  return colors[type] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}
