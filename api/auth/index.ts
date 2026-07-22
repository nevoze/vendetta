
import express from 'express'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../../.env') })

const router = express.Router()

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const DISCORD_STAFF_ROLE_ID = process.env.DISCORD_STAFF_ROLE_ID

router.get('/discord', (req, res) => {
  const redirectUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI as string)}&response_type=code&scope=identify%20guilds.members.read`
  res.redirect(redirectUrl)
})

router.get('/discord/callback', async (req, res) => {
  const { code } = req.query

  console.log('Code reçu:', code)
  console.log('Discord Client ID:', DISCORD_CLIENT_ID)
  console.log('Discord Redirect URI:', DISCORD_REDIRECT_URI)

  try {
    // Échange du code contre un token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID as string,
        client_secret: DISCORD_CLIENT_SECRET as string,
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: DISCORD_REDIRECT_URI as string,
      }),
    })
    const tokenData = await tokenResponse.json() as any
    console.log('Token response:', tokenData)
    const accessToken = tokenData.access_token

    if (!accessToken) {
      return res.status(400).json({ success: false, error: 'Impossible de récupérer le token Discord' })
    }

    // Récupération des infos utilisateur
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const userData = await userResponse.json() as any
    console.log('User data:', userData)

    // Vérification du rôle staff dans le serveur
    const memberResponse = await fetch(`https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    
    console.log('Member response status:', memberResponse.status)
    if (!memberResponse.ok) {
      const errorText = await memberResponse.text()
      console.error('Member error:', errorText)
      return res.status(403).json({ success: false, error: 'Tu n\'es pas sur le serveur Discord' })
    }

    const memberData = await memberResponse.json() as any
    console.log('Member data:', memberData)
    const hasStaffRole = memberData.roles.includes(DISCORD_STAFF_ROLE_ID)

    if (!hasStaffRole) {
      return res.status(403).json({ success: false, error: 'Tu n\'as pas le rôle staff' })
    }

    // Authentification réussie
    res.json({ success: true, user: userData })
  } catch (error) {
    console.error('Erreur OAuth Discord:', error)
    res.status(500).json({ success: false, error: 'Erreur serveur' })
  }
})

export default router
