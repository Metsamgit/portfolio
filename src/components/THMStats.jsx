import { useTHMStats, getBadgeDisplayName } from '../hooks/useTHMStats'
import { Trophy, Award, ExternalLink, TrendingUp } from 'lucide-react'

const THMStats = ({ compact = false }) => {
  const { rank, badges, loading, error } = useTHMStats()

  // Trier les badges par date (plus récents en premier)
  const sortedBadges = [...badges].sort((a, b) => {
    if (!a.earnedAt) return 1
    if (!b.earnedAt) return -1
    return new Date(b.earnedAt) - new Date(a.earnedAt)
  })

  const recentBadges = sortedBadges.slice(0, compact ? 3 : 6)

  if (loading) {
    return (
      <div className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20 animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-1/3 mb-4" />
        <div className="h-20 bg-gray-800 rounded" />
      </div>
    )
  }

  if (error) {
    return null // Fail silently
  }

  if (compact) {
    return (
      <a
        href="https://tryhackme.com/p/METSAM"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-cyber-dark rounded-xl p-4 border border-cyber-green/20 hover:border-cyber-green/50 transition-all flex items-center gap-4"
      >
        <img
          src="https://tryhackme-badges.s3.amazonaws.com/METSAM.png"
          alt="TryHackMe Badge"
          className="h-16 w-auto"
        />
        <div className="flex-1">
          <p className="text-white font-semibold flex items-center gap-2">
            TryHackMe
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-cyber-green font-mono text-sm">
            Rank #{rank?.toLocaleString() || '---'}
          </p>
          <p className="text-gray-500 text-xs">
            {badges.length} badges
          </p>
        </div>
      </a>
    )
  }

  return (
    <div className="bg-cyber-dark rounded-xl border border-cyber-green/20 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Trophy className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-white font-semibold">TryHackMe Stats</h3>
            <p className="text-gray-500 text-sm font-mono">@METSAM</p>
          </div>
        </div>
        <a
          href="https://tryhackme.com/p/METSAM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-green transition-colors"
        >
          Voir profil
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Stats */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-cyber-darker rounded-lg p-4 text-center">
            <TrendingUp className="w-5 h-5 text-cyber-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">
              #{rank?.toLocaleString() || '---'}
            </p>
            <p className="text-gray-500 text-sm">Rang mondial</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4 text-center">
            <Award className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">
              {badges.length}
            </p>
            <p className="text-gray-500 text-sm">Badges</p>
          </div>
        </div>

        {/* Recent badges */}
        <div>
          <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Badges récents
          </p>
          <div className="flex flex-wrap gap-2">
            {recentBadges.map((badge, i) => (
              <span
                key={badge._id || i}
                className="px-3 py-1.5 bg-cyber-green/10 text-cyber-green text-sm rounded-full border border-cyber-green/20 font-mono"
              >
                {getBadgeDisplayName(badge.name)}
              </span>
            ))}
          </div>
        </div>

        {/* Badge image */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <a
            href="https://tryhackme.com/p/METSAM"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://tryhackme-badges.s3.amazonaws.com/METSAM.png"
              alt="TryHackMe Badge"
              className="h-auto max-w-full rounded-lg hover:scale-[1.02] transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default THMStats
