import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_SERVER_API_URL
const API_TOKEN = import.meta.env.VITE_SERVER_API_TOKEN

export const useServerStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skip if no API URL configured
    if (!API_URL) {
      setLoading(false)
      setError('API not configured')
      return
    }

    const fetchStats = async () => {
      try {
        const [serverRes, wazuhRes] = await Promise.all([
          fetch(`${API_URL}/api/server/status`, {
            headers: { 'x-api-token': API_TOKEN }
          }),
          fetch(`${API_URL}/api/wazuh/stats`, {
            headers: { 'x-api-token': API_TOKEN }
          })
        ])

        if (!serverRes.ok) throw new Error('Server unreachable')

        const server = await serverRes.json()
        const wazuh = await wazuhRes.json()
        setStats({ server, wazuh })
        setError(null)
      } catch (e) {
        setError(e.message)
        setStats(null)
      }
      setLoading(false)
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000) // refresh toutes les minutes
    return () => clearInterval(interval)
  }, [])

  return { stats, loading, error }
}
