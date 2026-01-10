import { Shield, Terminal, Search, Server } from 'lucide-react'

const Skills = () => {
  const skillDomains = [
    {
      name: 'SOC / Blue Team',
      icon: Shield,
      color: 'blue',
      description: 'Analyse de logs, détection d\'intrusions, SIEM',
      tools: [
        { name: 'Splunk', proficiency: 'advanced' },
        { name: 'ELK Stack', proficiency: 'advanced' },
        { name: 'Suricata', proficiency: 'intermediate' },
        { name: 'Wireshark', proficiency: 'advanced' },
        { name: 'Zeek', proficiency: 'intermediate' },
      ]
    },
    {
      name: 'Penetration Testing',
      icon: Terminal,
      color: 'green',
      description: 'Red team, exploitation, tests d\'intrusion',
      tools: [
        { name: 'Nmap', proficiency: 'advanced' },
        { name: 'Burp Suite', proficiency: 'advanced' },
        { name: 'Metasploit', proficiency: 'intermediate' },
        { name: 'SQLMap', proficiency: 'intermediate' },
        { name: 'Hydra', proficiency: 'intermediate' },
      ]
    },
    {
      name: 'Forensics / Reverse',
      icon: Search,
      color: 'purple',
      description: 'Analyse forensique, reverse engineering',
      tools: [
        { name: 'Volatility', proficiency: 'intermediate' },
        { name: 'Autopsy', proficiency: 'intermediate' },
        { name: 'Ghidra', proficiency: 'beginner' },
        { name: 'John/Hashcat', proficiency: 'intermediate' },
        { name: 'FTK Imager', proficiency: 'intermediate' },
      ]
    },
    {
      name: 'Infrastructure / DevOps',
      icon: Server,
      color: 'orange',
      description: 'Administration système, automatisation',
      tools: [
        { name: 'Docker', proficiency: 'advanced' },
        { name: 'Ansible', proficiency: 'intermediate' },
        { name: 'pfSense', proficiency: 'advanced' },
        { name: 'Linux', proficiency: 'advanced' },
        { name: 'Git', proficiency: 'advanced' },
      ]
    },
  ]

  const proficiencyColors = {
    beginner: 'text-gray-600',
    intermediate: 'text-cyber-blue',
    advanced: 'text-cyber-green'
  }

  const proficiencyLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé'
  }

  const renderProficiency = (level) => {
    const dots = level === 'beginner' ? 1 : level === 'intermediate' ? 2 : 3
    return (
      <div className="flex gap-1 items-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < dots ? proficiencyColors[level] : 'text-gray-800'
            } ${i < dots ? 'opacity-100' : 'opacity-30'}`}
            style={{
              backgroundColor: i < dots
                ? (level === 'advanced' ? '#00ff88' : level === 'intermediate' ? '#00d4ff' : '#6b7280')
                : '#374151'
            }}
          />
        ))}
      </div>
    )
  }

  const certifications = [
    { name: 'En préparation', status: 'SOC Analyst'},
    { name: 'Objectif 2026', status: 'OSCP'},
    { name: 'TryHackMe', status: 'Top 10%'},
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Compétences Techniques</h1>
        <p className="text-gray-400">Organisées par domaine d'expertise</p>
      </section>

      {/* Skill Domains */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillDomains.map((domain, i) => (
          <section
            key={i}
            className="bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <domain.icon className={`w-6 h-6 text-cyber-${domain.color}`} />
              <h2 className="text-lg font-semibold text-white">{domain.name}</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">{domain.description}</p>

            <div className="space-y-3">
              {domain.tools.map((tool, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between px-3 py-2 bg-cyber-darker rounded-lg border border-gray-700/50"
                >
                  <span className="text-white font-medium text-sm">{tool.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${proficiencyColors[tool.proficiency]} hidden sm:inline`}>
                      {proficiencyLabels[tool.proficiency]}
                    </span>
                    {renderProficiency(tool.proficiency)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Proficiency Legend */}
      <section className="bg-cyber-dark rounded-xl p-4 border border-gray-800">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <div className="w-2 h-2 rounded-full bg-gray-800 opacity-30" />
              <div className="w-2 h-2 rounded-full bg-gray-800 opacity-30" />
            </div>
            <span className="text-gray-400">Débutant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyber-blue" />
              <div className="w-2 h-2 rounded-full bg-cyber-blue" />
              <div className="w-2 h-2 rounded-full bg-gray-800 opacity-30" />
            </div>
            <span className="text-gray-400">Intermédiaire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyber-green" />
              <div className="w-2 h-2 rounded-full bg-cyber-green" />
              <div className="w-2 h-2 rounded-full bg-cyber-green" />
            </div>
            <span className="text-gray-400">Avancé</span>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyber-blue" />
          Certifications & Objectifs
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="bg-cyber-darker rounded-lg p-4 border border-gray-700 text-center"
            >
              <p className="text-white font-medium text-lg mb-1">{cert.status}</p>
              <p className="text-gray-500 text-sm">{cert.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Soft Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Curiosité technique',
            'Résolution de problèmes',
            'Veille sécurité',
            'Travail en équipe',
            'Autonomie',
            'Documentation',
            'Adaptabilité',
            'Communication',
          ].map((skill, i) => (
            <div
              key={i}
              className="px-4 py-3 bg-cyber-darker rounded-lg border border-gray-700 text-center text-gray-300 text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Skills
