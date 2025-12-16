import { useState, useEffect } from 'react'

const THM_USERNAME = 'METSAM'

// CORS proxy pour contourner les restrictions
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

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
        // Fetch rank via CORS proxy
        const rankRes = await fetch(
          `${CORS_PROXY}${encodeURIComponent(`https://tryhackme.com/api/user/rank/${THM_USERNAME}`)}`
        )
        const rankData = await rankRes.json()

        // Fetch badges via CORS proxy
        const badgesRes = await fetch(
          `${CORS_PROXY}${encodeURIComponent(`https://tryhackme.com/api/badges/get/${THM_USERNAME}`)}`
        )
        const badgesData = await badgesRes.json()

        setStats({
          rank: rankData.userRank,
          badges: Array.isArray(badgesData) ? badgesData : [],
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
