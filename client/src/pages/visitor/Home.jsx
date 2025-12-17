import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Terminal, Activity, Folder, Star } from 'lucide-react'
import THMStats from '../../components/THMStats'

const Home = () => {
  const [stats, setStats] = useState({ repos: 0 })
  const [recentRepos, setRecentRepos] = useState([])

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

  // Fetch GitHub stats et repos récents
  useEffect(() => {
    fetch('https://api.github.com/users/Metsamgit')
      .then(res => res.json())
      .then(data => {
        setStats({ repos: data.public_repos || 0 })
      })
      .catch(() => {})

    fetch('https://api.github.com/users/Metsamgit/repos?sort=updated&per_page=3')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecentRepos(data)
        }
      })
      .catch(() => {})
  }, [])

  const sections = [
    {
      title: 'Projets GitHub',
      stat: stats.repos,
      desc: 'Scripts, labs, et outils',
      to: '/visitor/projects',
      icon: Github,
    },
    {
      title: 'Writeups',
      stat: 4,
      desc: 'CTF documentés',
      to: '/visitor/writeups',
      icon: Terminal,
    },
    {
      title: 'Mon Lab',
      stat: null,
      desc: 'Infrastructure SOC',
      to: '/visitor/lab',
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Terminal Hero */}
      <section className="bg-cyber-dark rounded-xl border border-cyber-green/20 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-cyber-darker border-b border-cyber-green/20">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-cyber-green/60 font-mono text-sm ml-2">metsam@kali:~</span>
        </div>

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

      {/* Navigation unifiée */}
      <section className="grid md:grid-cols-3 gap-4">
        {sections.map((section, i) => (
          <Link
            key={i}
            to={section.to}
            className="group bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <section.icon className="w-6 h-6 text-cyber-green" />
              {section.stat !== null && (
                <span className="text-2xl font-mono font-bold text-white">{section.stat}</span>
              )}
            </div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              {section.title}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyber-green" />
            </h3>
            <p className="text-gray-500 text-sm font-mono">{section.desc}</p>
          </Link>
        ))}
      </section>

      {/* Projets GitHub récents */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Star className="w-5 h-5 text-cyber-green" />
          Projets récents
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recentRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <Folder className="w-6 h-6 text-cyber-green" />
                <ExternalLink className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-cyber-green transition-colors">
                {repo.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {repo.description || 'Pas de description'}
              </p>
              {repo.language && (
                <p className="text-cyber-green/70 text-xs mt-2 font-mono">{repo.language}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Plateformes */}
      <section className="flex flex-wrap gap-4">
        <THMStats />
        <a
          href="https://github.com/Metsamgit"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-cyber-dark rounded-xl p-4 border border-gray-800 hover:border-cyber-green/50 transition-all flex items-center gap-4"
        >
          <Github className="w-10 h-10 text-white" />
          <div>
            <p className="text-white font-semibold text-sm flex items-center gap-2">
              GitHub
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
            <p className="text-gray-400 font-mono text-xs">@Metsamgit</p>
          </div>
        </a>
      </section>
    </div>
  )
}

export default Home
