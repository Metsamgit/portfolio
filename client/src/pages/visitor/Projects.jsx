import { useEffect, useState } from 'react'
import { Github, Star, GitFork, ExternalLink, Code, Folder, FileText, Flag, Clock, Tag, Eye, BookOpen } from 'lucide-react'
import WriteupModal from '../../components/WriteupModal'

const Projects = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedWriteup, setSelectedWriteup] = useState(null)

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

  // Projets mis en avant
  const featuredProjects = [
    {
      title: 'VM Setup Scripts',
      description: 'Scripts d\'automatisation pour préparer des VMs de pentest et d\'analyse',
      tags: ['Bash', 'Automation', 'Security'],
      github: 'https://github.com/Metsamgit/vm-setup-scripts',
    },
    {
      title: 'SOC Lab',
      description: 'Configuration complète d\'un lab SOC avec SIEM, IDS et monitoring',
      tags: ['ELK', 'Suricata', 'Docker'],
      github: 'https://github.com/Metsamgit/soc-lab',
    },
    {
      title: 'Network Infrastructure',
      description: 'Projet de création d\'infrastructure réseau sécurisée pour entreprise',
      tags: ['Network', 'Firewall', 'VLAN'],
      github: 'https://github.com/Metsamgit/network-infra',
    },
  ]

  // Writeups CTF
  const writeups = [
    {
      title: 'KillCleaner',
      platform: 'CTF YNOV 25',
      difficulty: 'Easy',
      tags: ['OSINT', 'Twitter', 'Vinted', 'Social Engineering'],
      date: '2025',
      category: 'OSINT',
      description: 'Challenge OSINT - Retrouver des informations sur un profil à partir de son pseudo',
      summary: `Challenge d'OSINT où il fallait retrouver des informations sur l'utilisateur "@killcleaner" à travers différentes plateformes comme Twitter et Vinted. L'objectif était de reconstituer son identité à partir de traces numériques.`,
      skills: [
        'Recherche OSINT',
        'Analyse de profils sociaux',
        'Corrélation d\'informations',
        'Techniques de doxing éthique',
      ],
      link: 'https://metsam-notes.gitbook.io/ctf-ynov-25/',
    },
    {
      title: '2HOLD2HANDLE',
      platform: 'CTF YNOV 25',
      difficulty: 'Medium',
      tags: ['Crypto', 'Stegano', 'Misc'],
      date: '2025',
      category: 'Misc',
      description: 'Challenge combinant plusieurs techniques pour récupérer le flag',
      summary: `Challenge multi-étapes nécessitant de combiner plusieurs compétences pour extraire et décoder le flag caché.`,
      skills: [
        'Analyse de fichiers',
        'Décodage',
        'Pensée latérale',
      ],
      link: 'https://metsam-notes.gitbook.io/ctf-ynov-25/2hold2handle',
    },
    {
      title: 'Factz',
      platform: 'CTF YNOV 25',
      difficulty: 'Easy',
      tags: ['Web', 'OSINT', 'Recon'],
      date: '2025',
      category: 'Web/OSINT',
      description: 'Challenge de reconnaissance et collecte d\'informations',
      summary: `Challenge axé sur la collecte de faits et d'informations pour reconstituer le flag.`,
      skills: [
        'Reconnaissance web',
        'Analyse de données',
        'Recherche d\'informations',
      ],
      link: 'https://metsam-notes.gitbook.io/ctf-ynov-25/factz',
    },
    {
      title: 'decisnotdec',
      platform: 'CTF YNOV 25',
      difficulty: 'Medium',
      tags: ['Crypto', 'Encoding', 'Reverse'],
      date: '2025',
      category: 'Crypto',
      description: 'Challenge de décodage et cryptanalyse',
      summary: `Challenge où le décimal n'est pas la solution évidente. Il fallait identifier le bon encodage et décoder le message pour obtenir le flag.`,
      skills: [
        'Identification d\'encodages',
        'Cryptanalyse basique',
        'Conversion de bases',
      ],
      link: 'https://metsam-notes.gitbook.io/ctf-ynov-25/decisnotdec',
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

  const getDifficultyColor = (diff) => {
    const colors = {
      Easy: 'text-green-400 bg-green-400/10 border-green-400/30',
      Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
      Hard: 'text-red-400 bg-red-400/10 border-red-400/30',
      Insane: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    }
    return colors[diff] || colors.Easy
  }

  return (
    <div className="space-y-8">
      {/* Header with Tabs */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <div className="font-mono mb-4">
          <p className="text-gray-500 mb-2">
            <span className="text-cyber-green">nathan@kali</span>:<span className="text-cyber-blue">~/projects</span>$ ls -la
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Projets & Writeups</h1>
          <p className="text-gray-400">Repositories GitHub et CTF documentés</p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-t-lg font-mono text-sm transition-colors ${
              activeTab === 'projects'
                ? 'bg-cyber-green/10 text-cyber-green border-b-2 border-cyber-green'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4 inline mr-2" />
            GitHub Projects
          </button>
          <button
            onClick={() => setActiveTab('writeups')}
            className={`px-4 py-2 rounded-t-lg font-mono text-sm transition-colors ${
              activeTab === 'writeups'
                ? 'bg-cyber-purple/10 text-cyber-purple border-b-2 border-cyber-purple'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            CTF Writeups
          </button>
        </div>
      </section>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <>
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
                  className="group bg-cyber-dark rounded-xl p-5 border border-cyber-green/30 hover:border-cyber-green transition-all"
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
        </>
      )}

      {/* Writeups Tab */}
      {activeTab === 'writeups' && (
        <>
          {/* GitBook Link */}
          <section className="bg-gradient-to-r from-cyber-purple/10 to-cyber-blue/10 rounded-xl p-6 border border-cyber-purple/30">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <BookOpen className="w-12 h-12 text-cyber-purple" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-white mb-1">GitBook - Documentation complète</h2>
                <p className="text-gray-400">
                  Tous mes writeups détaillés sont disponibles sur mon GitBook
                </p>
              </div>
              <a
                href="https://metsam-notes.gitbook.io/ctf-ynov-25/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-cyber-purple text-white font-semibold rounded-lg hover:bg-cyber-purple/80 transition-colors"
              >
                Accéder au GitBook
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* Writeups List */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
              <Flag className="w-5 h-5 text-cyber-green" />
              CTF YNOV 25 - {writeups.length} writeups
            </h2>
            <div className="space-y-4">
              {writeups.map((writeup, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedWriteup(writeup)}
                  className="group block w-full bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-purple/50 transition-all text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyber-purple transition-colors">
                          {writeup.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded border ${getDifficultyColor(writeup.difficulty)}`}>
                          {writeup.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{writeup.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-cyber-purple text-sm font-mono">{writeup.platform}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500 text-sm">{writeup.date}</span>
                        <span className="text-gray-600">•</span>
                        <div className="flex gap-2">
                          {writeup.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-cyber-purple transition-colors">
                      <Eye className="w-5 h-5" />
                      <span className="text-sm font-mono">Preview</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Platforms */}
          <section className="grid md:grid-cols-2 gap-4">
            <a
              href="https://tryhackme.com/p/METSAM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-colors"
            >
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Flag className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-white font-semibold">TryHackMe</p>
                <p className="text-gray-400 text-sm">@METSAM</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
            </a>

            <a
              href="https://hackthebox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-green-500/50 transition-colors"
            >
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Flag className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-white font-semibold">HackTheBox</p>
                <p className="text-gray-400 text-sm">Profil HTB</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
            </a>
          </section>
        </>
      )}

      {/* Modal */}
      <WriteupModal
        writeup={selectedWriteup}
        isOpen={!!selectedWriteup}
        onClose={() => setSelectedWriteup(null)}
      />
    </div>
  )
}

export default Projects
