'use client'

import { useTHMStats } from '@/hooks/useTHMStats'
import { ExternalLink } from 'lucide-react'

const THMStats = () => {
  const { rank, badges, loading, error } = useTHMStats()

  if (loading) {
    return (
      <div className="bg-cyber-dark rounded-xl p-4 border border-gray-800 animate-pulse flex items-center gap-4">
        <div className="h-12 w-24 bg-gray-800 rounded" />
        <div className="flex-1">
          <div className="h-4 bg-gray-800 rounded w-20 mb-2" />
          <div className="h-3 bg-gray-800 rounded w-16" />
        </div>
      </div>
    )
  }

  if (error) {
    return null
  }

  return (
    <a
      href="https://tryhackme.com/p/METSAM"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-cyber-dark rounded-xl p-4 border border-gray-800 hover:border-red-500/50 transition-all flex items-center gap-4"
    >
      <img
        src="https://tryhackme-badges.s3.amazonaws.com/METSAM.png"
        alt="TryHackMe Badge"
        className="h-12 w-auto"
      />
      <div className="flex-1">
        <p className="text-white font-semibold text-sm flex items-center gap-2">
          TryHackMe
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
        </p>
        <p className="text-gray-400 font-mono text-xs">
          Rank #{rank?.toLocaleString() || '---'} • {badges.length} badges
        </p>
      </div>
    </a>
  )
}

export default THMStats
