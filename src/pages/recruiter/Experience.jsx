import { GraduationCap, Briefcase, Award, Calendar, ChevronRight } from 'lucide-react'

const Experience = () => {
  const education = [
    {
      period: '2024 - Actuel',
      title: 'Bachelor Cybersécurité',
      institution: 'Ynov Campus',
      description: 'Spécialisation en cybersécurité',
      current: true,
      tags: ['Pentest', 'SOC', 'Réseaux', 'Sécurité'],
    },
    {
      period: '2024',
      title: 'Baccalauréat Maths / SI',
      institution: 'Aisne',
      description: 'Baccalauréat général avec spécialités Mathématiques et Sciences de l\'Ingénieur. Formation solide en logique, analyse et résolution de problèmes techniques.',
      current: false,
      tags: ['Mathématiques', 'Sciences de l\'Ingénieur', 'Logique', 'Analyse'],
    },
  ]

  const projects = [
    {
      title: 'Lab SOC Personnel',
      type: 'Projet personnel',
      description: 'Mise en place d\'un environnement SOC complet avec SIEM, détection d\'intrusion et analyse de logs',
      highlights: [
        'Configuration ELK Stack pour la centralisation des logs',
        'Mise en place de règles de détection personnalisées',
        'Simulation d\'attaques pour tester la détection',
      ],
    },
    {
      title: 'Infrastructure Réseau Entreprise',
      type: 'Projet académique',
      description: 'Conception et déploiement d\'une infrastructure réseau sécurisée pour une entreprise fictive',
      highlights: [
        'Architecture réseau segmentée (VLAN, DMZ)',
        'Implémentation firewall et règles de filtrage',
        'Documentation technique complète',
      ],
    },
    {
      title: 'Scripts d\'Automatisation',
      type: 'Projet personnel',
      description: 'Collection de scripts pour automatiser les tâches de sécurité et d\'administration',
      highlights: [
        'Scripts de préparation VM pour pentest',
        'Automatisation de scans de vulnérabilités',
        'Outils d\'analyse et de reporting',
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Parcours & Expériences</h1>
        <p className="text-gray-400">Formation et projets significatifs</p>
      </section>

      {/* Timeline - Education */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-cyber-blue" />
          Formation
        </h2>
        <div className="space-y-6">
          {education.map((item, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-gray-700">
              {item.current && (
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyber-blue animate-pulse" />
              )}
              {!item.current && (
                <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gray-600" />
              )}
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 text-sm">{item.period}</span>
                {item.current && (
                  <span className="px-2 py-0.5 bg-cyber-blue/10 text-cyber-blue text-xs rounded">
                    En cours
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-cyber-blue">{item.institution}</p>
              <p className="text-gray-400 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cyber-blue" />
          Projets Significatifs
        </h2>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-cyber-darker rounded-lg p-5 border border-gray-700 hover:border-cyber-blue/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <span className="text-cyber-blue text-sm">{project.type}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <ul className="space-y-2">
                {project.highlights.map((highlight, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-cyber-blue mt-1">▹</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TryHackMe Stats */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-cyber-blue" />
          TryHackMe
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <a
            href="https://tryhackme.com/p/METSAM"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://tryhackme-badges.s3.amazonaws.com/METSAM.png"
              alt="TryHackMe Badge"
              className="h-auto max-w-full rounded-lg"
            />
          </a>
          <div className="text-center md:text-left">
            <p className="text-gray-300 mb-2">
              Participation active sur TryHackMe pour développer mes compétences pratiques en cybersécurité.
            </p>
            <p className="text-gray-500 text-sm">
              Rooms complétées en pentest, forensics, et défense.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experience
