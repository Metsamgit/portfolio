import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const THM_USERNAME = process.env.THM_USERNAME || 'METSAM'

// Cache pour les données THM (1h)
const cache = {
  rank: { data: null, timestamp: 0 },
  badges: { data: null, timestamp: 0 },
}
const CACHE_DURATION = 60 * 60 * 1000 // 1 heure

app.use(cors())
app.use(express.json())

// Fonction pour vérifier si le cache est valide
const isCacheValid = (cacheEntry) => {
  return cacheEntry.data && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION
}

// Endpoint pour le rank THM
app.get('/api/thm/rank', async (req, res) => {
  try {
    if (isCacheValid(cache.rank)) {
      return res.json(cache.rank.data)
    }

    const response = await fetch(`https://tryhackme.com/api/user/rank/${THM_USERNAME}`)
    const data = await response.json()

    cache.rank = { data, timestamp: Date.now() }
    res.json(data)
  } catch (error) {
    console.error('Error fetching THM rank:', error)
    res.status(500).json({ error: 'Failed to fetch THM rank' })
  }
})

// Endpoint pour les badges THM
app.get('/api/thm/badges', async (req, res) => {
  try {
    if (isCacheValid(cache.badges)) {
      return res.json(cache.badges.data)
    }

    const response = await fetch(`https://tryhackme.com/api/badges/get/${THM_USERNAME}`)
    const data = await response.json()

    cache.badges = { data, timestamp: Date.now() }
    res.json(data)
  } catch (error) {
    console.error('Error fetching THM badges:', error)
    res.status(500).json({ error: 'Failed to fetch THM badges' })
  }
})

// Endpoint combiné pour toutes les stats THM
app.get('/api/thm/stats', async (req, res) => {
  try {
    const [rankData, badgesData] = await Promise.all([
      isCacheValid(cache.rank)
        ? Promise.resolve(cache.rank.data)
        : fetch(`https://tryhackme.com/api/user/rank/${THM_USERNAME}`).then(r => r.json()),
      isCacheValid(cache.badges)
        ? Promise.resolve(cache.badges.data)
        : fetch(`https://tryhackme.com/api/badges/get/${THM_USERNAME}`).then(r => r.json()),
    ])

    // Mettre à jour le cache
    if (!isCacheValid(cache.rank)) {
      cache.rank = { data: rankData, timestamp: Date.now() }
    }
    if (!isCacheValid(cache.badges)) {
      cache.badges = { data: badgesData, timestamp: Date.now() }
    }

    res.json({
      rank: rankData.userRank,
      badges: Array.isArray(badgesData) ? badgesData : [],
    })
  } catch (error) {
    console.error('Error fetching THM stats:', error)
    res.status(500).json({ error: 'Failed to fetch THM stats' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`)
})
