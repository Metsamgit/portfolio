const THM_USERNAME = process.env.THM_USERNAME || 'METSAM'

// Cache simple en mémoire
let cache = {
  rank: { data: null, timestamp: 0 },
  badges: { data: null, timestamp: 0 },
}
const CACHE_DURATION = 60 * 60 * 1000 // 1 heure

const isCacheValid = (cacheEntry) => {
  return cacheEntry.data && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION
}

export async function GET() {
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

    return Response.json({
      rank: rankData.userRank,
      badges: Array.isArray(badgesData) ? badgesData : [],
    })
  } catch (error) {
    console.error('Error fetching THM stats:', error)
    return Response.json(
      { error: 'Failed to fetch THM stats' },
      { status: 500 }
    )
  }
}
