
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { setAuthenticated } = useStore()

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (!code) {
        navigate('/')
        return
      }

      try {
        const response = await fetch(`/api/auth/discord/callback?code=${code}`)
        const data = await response.json()

        if (data.success) {
          setAuthenticated(true)
          navigate('/')
        } else {
          alert(data.error || 'Erreur de connexion')
          navigate('/')
        }
      } catch (error) {
        console.error('Erreur callback OAuth:', error)
        alert('Erreur serveur')
        navigate('/')
      }
    }

    handleCallback()
  }, [navigate, setAuthenticated])

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center text-white font-mono">
      Connexion en cours...
    </div>
  )
}
