import { useEffect, useState } from 'react'
import { Github, Star, GitFork, ExternalLink, Code, Folder } from 'lucide-react'

const Projects = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('https://api.github.com/users/Metsamgit/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Projets mis en avant manuellement (à personnaliser)
  const featuredProjects = [
    {
      title: 'VM Setup Scripts',
      description: 'Scripts d\'automatisation pour préparer des VMs de pentest et d\'analyse',
      tags: ['Bash', 'Automation', 'Security'],
      github: 'https://github.com/Metsamgit/vm-setup-scripts',
      featured: true,
    },
    {
      title: 'SOC Lab',
      description: 'Configuration complète d\'un lab SOC avec SIEM, IDS et monitoring',
      tags: ['ELK', 'Suricata', 'Docker'],
      github: 'https://github.com/Metsamgit/soc-lab',
      featured: true,
    },
    {
      title: 'Network Infrastructure',
      description: 'Projet de création d\'infrastructure réseau sécurisée pour entreprise',
      tags: ['Network', 'Firewall', 'VLAN'],
      github: 'https://github.com/Metsamgit/network-infra',
      featured: true,
    },
  ]

  const getLanguageColor = (lang) => {
    const colors = {
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      Shell: '#89e051',
      Bash: '#89e051',
      PowerShell: '#012456',
      HTML: '#e34c26',
      CSS: '#563d7c',
      default: '#00ff88',
    }
    return colors[lang] || colors.default
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <div className="font-mono">
          <p className="text-gray-500 mb-2">
            <span className="text-cyber-green">metsam@kali</span>:<span className="text-cyber-blue">~/projects</span>$ ls -la
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Projets GitHub</h1>
          <p className="text-gray-400">Repositories publics et projets personnels en cybersécurité</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Projets mis en avant
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <a
              key={i}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-cyber-dark rounded-xl p-5 border border-cyber-green/30 hover:border-cyber-green transition-all card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <Folder className="w-8 h-8 text-cyber-green" />
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-cyber-green transition-colors" />
              </div>
              <h3 className="text-white font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* GitHub Repos */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Github className="w-5 h-5 text-white" />
          Tous les repositories
        </h2>

        {loading ? (
          <div className="bg-cyber-dark rounded-xl p-8 border border-gray-800 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyber-green border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400 font-mono">Fetching repositories...</p>
          </div>
        ) : repos.length === 0 ? (
          <div className="bg-cyber-dark rounded-xl p-8 border border-gray-800 text-center">
            <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun repository public trouvé</p>
            <a
              href="https://github.com/Metsamgit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-cyber-green hover:underline"
            >
              Voir le profil GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold group-hover:text-cyber-green transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'Pas de description'}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-500">
                    <Star className="w-4 h-4" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <GitFork className="w-4 h-4" />
                    {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* GitHub Profile Link */}
      <section className="text-center">
        <a
          href="https://github.com/Metsamgit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green/10 text-cyber-green font-mono rounded-lg border border-cyber-green/30 hover:bg-cyber-green/20 transition-colors"
        >
          <Github className="w-5 h-5" />
          Voir tout sur GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  )
}

export default Projects
