import { useState } from 'react'
import { FileText, ExternalLink, BookOpen, Flag, Clock, Tag, Eye } from 'lucide-react'
import WriteupModal from '../../components/WriteupModal'

const Writeups = () => {
  const [selectedWriteup, setSelectedWriteup] = useState(null)

  // Writeups CTF YNOV 25
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
            <span className="text-cyber-green">metsam@kali</span>:<span className="text-cyber-blue">~/writeups</span>$ cat README.md
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Writeups CTF</h1>
          <p className="text-gray-400">Documentation de mes challenges et machines résolues</p>
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

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Writeups', value: writeups.length, icon: FileText },
          { label: 'Platforms', value: '2+', icon: Flag },
          { label: 'En cours', value: '3', icon: Clock },
          { label: 'Categories', value: '5+', icon: Tag },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-cyber-dark rounded-xl p-4 border border-gray-800 text-center"
          >
            <stat.icon className="w-6 h-6 text-cyber-green mx-auto mb-2" />
            <p className="text-2xl font-mono font-bold text-white">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Writeups List */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Flag className="w-5 h-5 text-cyber-green" />
          Derniers writeups
        </h2>
        <div className="space-y-4">
          {writeups.map((writeup, i) => (
            <button
              key={i}
              onClick={() => setSelectedWriteup(writeup)}
              className="group block w-full bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/50 transition-all text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyber-green transition-colors">
                      {writeup.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded border ${getDifficultyColor(writeup.difficulty)}`}>
                      {writeup.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{writeup.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-cyber-blue text-sm font-mono">{writeup.platform}</span>
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
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-cyber-green transition-colors">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-mono">Preview</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-cyber-dark rounded-xl p-8 border border-dashed border-gray-700 text-center">
        <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Plus de writeups à venir</h3>
        <p className="text-gray-500">
          Je documente régulièrement mes challenges sur TryHackMe et HackTheBox.
          <br />
          Stay tuned!
        </p>
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

export default Writeups
