import { useState, useEffect } from 'react'

// URL de l'API - fallback sur prod si pas de .env
const API_URL = import.meta.env.VITE_API_URL || 'http://quantum-network.fr:3001'

export const useTHMStats = () => {
  const [stats, setStats] = useState({
    rank: null,
    badges: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/thm/stats`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch THM stats')
        }

        setStats({
          rank: data.rank,
          badges: data.badges || [],
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error('THM fetch error:', err)
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch THM stats',
        }))
      }
    }

    fetchStats()
  }, [])

  return stats
}

// Badge name to readable name mapping
export const badgeNames = {
  'first-4-rooms': 'First 4 Rooms',
  'terminaled': 'Terminaled',
  'blue': 'Blue',
  'ohsint': 'OhSINT',
  'dvwa': 'DVWA',
  'kenobi': 'Kenobi',
  'ice': 'Ice',
  'basic-pentesting': 'Basic Pentesting',
  'linux-fundamentals': 'Linux Fundamentals',
  'windows-fundamentals': 'Windows Fundamentals',
  'intro-to-cyber': 'Intro to Cyber',
  'web-fundamentals': 'Web Fundamentals',
  'soc-sim-first-alert-closed': 'SOC Sim: First Alert',
  'soc-sim-first-scenario-completed': 'SOC Sim: Scenario Done',
  'soc-sim-100-percent-true-positive-rate': 'SOC Sim: 100% TP Rate',
  '3-day-streak': '3 Day Streak',
  '7-day-streak': '7 Day Streak',
  '30-day-streak': '30 Day Streak',
}

export const getBadgeDisplayName = (badgeName) => {
  return badgeNames[badgeName] || badgeName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
