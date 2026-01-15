import { useState } from 'react'
import { Shield, Terminal, Search, Server } from 'lucide-react'

const Skills = () => {
  const [hoveredTool, setHoveredTool] = useState(null)

  const skillDomains = [
    {
      name: 'SOC / Blue Team',
      icon: Shield,
      color: 'cyber-blue',
      description: 'SIEM, détection d\'intrusions, monitoring en production',
      tools: [
        { name: 'Wazuh', detail: 'Déployé en production sur serveur dédié - SIEM + agents sur VMs' },
        { name: 'Suricata', detail: 'IDS/IPS en production avec 47k+ règles Emerging Threats' },
        { name: 'Wireshark', detail: 'Analyse de trafic réseau, CTF et troubleshooting' },
        { name: 'ELK Stack', detail: 'Stack de logs pour centralisation et visualisation' },
      ]
    },
    {
      name: 'Penetration Testing',
      icon: Terminal,
      color: 'cyber-green',
      description: 'Red team, exploitation, tests d\'intrusion',
      tools: [
        { name: 'Nmap', detail: 'Reconnaissance réseau, scan de ports et services' },
        { name: 'Burp Suite', detail: 'Tests d\'intrusion web, interception de requêtes' },
        { name: 'Metasploit', detail: 'Framework d\'exploitation pour CTF' },
        { name: 'SQLMap', detail: 'Détection et exploitation d\'injections SQL' },
        { name: 'Hydra', detail: 'Bruteforce d\'authentification' },
      ]
    },
    {
      name: 'Forensics / Reverse',
      icon: Search,
      color: 'purple-400',
      description: 'Analyse forensique, reverse engineering',
      tools: [
        { name: 'Volatility', detail: 'Analyse de dumps mémoire pour CTF forensics' },
        { name: 'Autopsy', detail: 'Investigation de systèmes de fichiers' },
        { name: 'Ghidra', detail: 'Reverse engineering de binaires' },
        { name: 'John/Hashcat', detail: 'Cracking de mots de passe et hashes' },
        { name: 'FTK Imager', detail: 'Acquisition et analyse d\'images disque' },
      ]
    },
    {
      name: 'Infrastructure / Virtualisation',
      icon: Server,
      color: 'orange-400',
      description: 'Serveurs dédiés, VMs, automatisation',
      tools: [
        { name: 'Proxmox', detail: 'Gestion de VMs en production pour clients sur serveur dédié' },
        { name: 'Docker', detail: 'Conteneurisation d\'applications et services' },
        { name: 'Linux Admin', detail: 'Administration serveurs Debian/Ubuntu en prod' },
        { name: 'Fail2ban', detail: 'Anti-bruteforce configuré avec 150+ IPs bannies' },
        { name: 'Ansible', detail: 'Automatisation de déploiements' },
      ]
    },
  ]

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
        <p className="text-gray-400">Survolez un outil pour voir les détails</p>
      </section>

      {/* Skill Domains */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillDomains.map((domain, i) => (
          <section
            key={i}
            className="bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <domain.icon className={`w-6 h-6 text-${domain.color}`} />
              <h2 className="text-lg font-semibold text-white">{domain.name}</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">{domain.description}</p>

            <div className="flex flex-wrap gap-2">
              {domain.tools.map((tool, j) => {
                const toolId = `${i}-${j}`
                return (
                  <div
                    key={j}
                    className="relative"
                    onMouseEnter={() => setHoveredTool(toolId)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <span
                      className={`px-3 py-1.5 bg-cyber-darker rounded-lg border border-gray-700 text-white text-sm font-medium cursor-default transition-all ${
                        hoveredTool === toolId ? 'border-gray-500 bg-gray-800' : 'hover:border-gray-600'
                      }`}
                    >
                      {tool.name}
                    </span>

                    {/* Tooltip */}
                    {hoveredTool === toolId && (
                      <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                        <p className="text-gray-300 text-xs leading-relaxed">{tool.detail}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                          <div className="border-8 border-transparent border-t-gray-700" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

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
