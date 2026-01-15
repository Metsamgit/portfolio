import { useState } from 'react'
import { ExternalLink, Flag, Eye, BookOpen } from 'lucide-react'
import WriteupModal from '../../components/WriteupModal'

const Projects = () => {
  const [selectedWriteup, setSelectedWriteup] = useState(null)

  // Writeups CTF - Format du content:
  // { type: 'heading', text: 'Titre' }
  // { type: 'text', text: 'Paragraphe...' }
  // { type: 'code', text: 'code ici' }
  // { type: 'flag', text: 'FLAG{...}' }
  // { type: 'list', items: ['item1', 'item2'] }
  // { type: 'image', src: '/images/screenshot.png', alt: 'description' }
  const writeups = [
    {
      title: 'KillCleaner',
      platform: 'CTF YNOV 25',
      difficulty: 'Easy',
      tags: ['OSINT', 'Twitter', 'Vinted', 'Social Engineering'],
      date: '2025',
      category: 'OSINT',
      description: 'Challenge OSINT - Retrouver des informations sur un profil à partir de son pseudo',
      content: [
        { type: 'heading', text: 'Énoncé' },
        { type: 'text', text: 'On nous donne un pseudo "@killcleaner" et on doit retrouver des informations sur cette personne.' },
        { type: 'heading', text: 'Résolution' },
        { type: 'text', text: 'Première étape : recherche du pseudo sur les réseaux sociaux. On trouve un compte Twitter avec ce pseudo.' },
        { type: 'text', text: 'En analysant les tweets, on trouve une référence à un compte Vinted. Sur Vinted, le profil révèle plus d\'informations personnelles.' },
        { type: 'code', text: 'Pseudo Twitter: @killcleaner\nCompte Vinted trouvé via bio Twitter\nLocalisation mentionnée dans les annonces' },
        { type: 'heading', text: 'Flag' },
        { type: 'flag', text: 'MUSIC{REDACTED}' },
        { type: 'heading', text: 'Compétences' },
        { type: 'list', items: [
          'Recherche OSINT multi-plateformes',
          'Analyse de profils sociaux',
          'Corrélation d\'informations entre sources',
          'Techniques de doxing éthique',
        ]},
      ],
    },
    {
      title: '2HOLD2HANDLE',
      platform: 'CTF YNOV 25',
      difficulty: 'Medium',
      tags: ['Crypto', 'Stegano', 'Misc'],
      date: '2025',
      category: 'Misc',
      description: 'Challenge combinant plusieurs techniques pour récupérer le flag',
      content: [
        { type: 'heading', text: 'Énoncé' },
        { type: 'text', text: 'Un fichier mystérieux nous est fourni. À nous de trouver ce qu\'il cache.' },
        { type: 'heading', text: 'Résolution' },
        { type: 'text', text: 'Analyse du fichier avec différents outils pour identifier le type de données cachées.' },
        { type: 'code', text: '# Commandes utilisées\nfile mystery.bin\nstrings mystery.bin\nbinwalk mystery.bin' },
        { type: 'heading', text: 'Flag' },
        { type: 'flag', text: 'MUSIC{REDACTED}' },
        { type: 'heading', text: 'Compétences' },
        { type: 'list', items: [
          'Analyse de fichiers binaires',
          'Stéganographie',
          'Décodage multi-formats',
        ]},
      ],
    },
    {
      title: 'Factz',
      platform: 'CTF YNOV 25',
      difficulty: 'Easy',
      tags: ['Web', 'OSINT', 'Recon'],
      date: '2025',
      category: 'Web/OSINT',
      description: 'Challenge de reconnaissance et collecte d\'informations',
      content: [
        { type: 'heading', text: 'Énoncé' },
        { type: 'text', text: 'Un site web nous est donné. Il faut collecter des informations pour reconstituer le flag.' },
        { type: 'heading', text: 'Résolution' },
        { type: 'text', text: 'Exploration du site et de ses métadonnées pour trouver les indices cachés.' },
        { type: 'heading', text: 'Flag' },
        { type: 'flag', text: 'MUSIC{REDACTED}' },
        { type: 'heading', text: 'Compétences' },
        { type: 'list', items: [
          'Reconnaissance web',
          'Analyse de code source',
          'Collecte d\'informations',
        ]},
      ],
    },
    {
      title: 'decisnotdec',
      platform: 'CTF YNOV 25',
      difficulty: 'Medium',
      tags: ['Crypto', 'Encoding', 'Reverse'],
      date: '2025',
      category: 'Crypto',
      description: 'Challenge de décodage et cryptanalyse',
      content: [
        { type: 'heading', text: 'Énoncé' },
        { type: 'text', text: 'Une chaîne de caractères encodée nous est fournie. Le titre suggère que le décimal n\'est pas la solution.' },
        { type: 'heading', text: 'Résolution' },
        { type: 'text', text: 'Identification du bon encodage en testant différentes bases et formats.' },
        { type: 'code', text: '# Test différents encodages\necho "data" | base64 -d\necho "data" | xxd -r -p' },
        { type: 'heading', text: 'Flag' },
        { type: 'flag', text: 'MUSIC{REDACTED}' },
        { type: 'heading', text: 'Compétences' },
        { type: 'list', items: [
          'Identification d\'encodages',
          'Cryptanalyse basique',
          'Conversion entre bases numériques',
        ]},
      ],
    },
  ]

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
      {/* Header */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <div className="font-mono">
          <p className="text-gray-500 mb-2">
            <span className="text-cyber-green">nathan@kali</span>:<span className="text-cyber-blue">~/writeups</span>$ cat README.md
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">CTF Writeups</h1>
          <p className="text-gray-400">Challenges résolus et documentés</p>
        </div>
      </section>

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
