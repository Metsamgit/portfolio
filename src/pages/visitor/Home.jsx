import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Terminal, Activity, Target, Zap } from 'lucide-react'
import THMStats from '../../components/THMStats'
import { useTHMStats } from '../../hooks/useTHMStats'

const Home = () => {
  const [stats, setStats] = useState({
    repos: 0,
    commits: 0,
  })

  const { rank: thmRank, badges: thmBadges, loading: thmLoading } = useTHMStats()

  const [typedCommand, setTypedCommand] = useState('')
  const fullCommand = 'whoami && cat /etc/motd'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  // Fetch GitHub stats (basique)
  useEffect(() => {
    fetch('https://api.github.com/users/Metsamgit')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, repos: data.public_repos || 0 }))
      })
      .catch(() => {})
  }, [])

  const quickLinks = [
    {
      title: 'Projets GitHub',
      desc: 'Scripts, labs, et outils de sécurité',
      to: '/visitor/projects',
      icon: Github,
      color: 'cyber-green',
    },
    {
      title: 'Writeups',
      desc: 'CTF et challenges documentés',
      to: '/visitor/writeups',
      icon: Terminal,
      color: 'cyber-purple',
    },
    {
      title: 'Mon Lab',
      desc: 'Infrastructure SOC et pentest',
      to: '/visitor/lab',
      icon: Activity,
      color: 'cyber-blue',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Terminal Hero */}
      <section className="bg-cyber-dark rounded-xl border border-cyber-green/20 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-cyber-darker border-b border-cyber-green/20">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-cyber-green/60 font-mono text-sm ml-2">metsam@kali:~</span>
        </div>

        {/* Terminal content */}
        <div className="p-6 font-mono text-sm">
          <div className="text-gray-500 mb-2">
            <span className="text-cyber-green">metsam@kali</span>
            <span className="text-white">:</span>
            <span className="text-cyber-blue">~</span>
            <span className="text-white">$ </span>
            <span className="text-gray-300">{typedCommand}</span>
            <span className="animate-blink text-cyber-green">▋</span>
          </div>

          <div className="mt-4 space-y-2 text-gray-300">
            <p><span className="text-cyber-green">USER:</span> METSAM</p>
            <p><span className="text-cyber-green">ROLE:</span> Cybersecurity Student @ Ynov</p>
            <p><span className="text-cyber-green">FOCUS:</span> SOC Analysis | Penetration Testing</p>
            <p><span className="text-cyber-green">STATUS:</span> <span className="text-green-400">● Active</span></p>
          </div>

          <div className="mt-6 p-4 border border-cyber-green/20 rounded-lg bg-cyber-darker/50">
            <p className="text-cyber-green mb-2">╔══════════════════════════════════════════╗</p>
            <p className="text-white">  Bienvenue sur mon portfolio cybersec.</p>
            <p className="text-gray-400">  Ici tu trouveras mes projets, writeups,</p>
            <p className="text-gray-400">  et mon lab personnel.</p>
            <p className="text-cyber-green mt-2">╚══════════════════════════════════════════╝</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Repos GitHub', value: stats.repos, icon: Github },
          { label: 'THM Rank', value: thmLoading ? '...' : `#${thmRank?.toLocaleString() || '?'}`, icon: Target },
          { label: 'THM Badges', value: thmLoading ? '...' : thmBadges?.length || 0, icon: Zap },
          { label: 'Status', value: 'Active', icon: Activity },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-cyber-dark rounded-xl p-4 border border-cyber-green/20 hover:border-cyber-green/40 transition-colors"
          >
            <stat.icon className="w-5 h-5 text-cyber-green mb-2" />
            <p className="text-2xl font-mono font-bold text-white">{stat.value}</p>
            <p className="text-gray-500 text-sm font-mono">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-3 gap-6">
        {quickLinks.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            className={`group bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-${link.color}/50 transition-all hover:glow-green`}
          >
            <link.icon className={`w-8 h-8 text-${link.color} mb-4 group-hover:scale-110 transition-transform`} />
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              {link.title}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-gray-400 text-sm font-mono">{link.desc}</p>
          </Link>
        ))}
      </section>

      {/* TryHackMe Stats */}
      <THMStats />

      {/* Recent Activity Placeholder */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <span className="text-cyber-green">$</span> recent_activity --limit 5
        </h2>
        <div className="space-y-3 font-mono text-sm">
          {[
            { action: 'push', target: 'vm-setup-scripts', time: 'récemment' },
            { action: 'complete', target: 'THM: Blue Room', time: '2 jours' },
            { action: 'update', target: 'soc-lab-config', time: '1 semaine' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400">
              <span className="text-cyber-green">[{item.action}]</span>
              <span className="text-white">{item.target}</span>
              <span className="text-gray-600">• {item.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
