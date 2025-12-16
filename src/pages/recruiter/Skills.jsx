import { Shield, Terminal } from 'lucide-react'

const Skills = () => {
  const tools = [
    { name: 'Nmap', category: 'Recon' },
    { name: 'Burp Suite', category: 'Web' },
    { name: 'Wireshark', category: 'Network' },
    { name: 'Metasploit', category: 'Exploit' },
    { name: 'Splunk', category: 'SIEM' },
    { name: 'ELK Stack', category: 'SIEM' },
    { name: 'Volatility', category: 'Forensics' },
    { name: 'John/Hashcat', category: 'Crack' },
    { name: 'Ghidra', category: 'Reverse' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Ansible', category: 'Automation' },
    { name: 'pfSense', category: 'Firewall' },
  ]

  const certifications = [
    { name: 'En préparation', status: 'SOC Analyst'},
    { name: 'Objectif', status: 'OSCP'},
    { name: 'TryHackMe', status: 'Top 10%'},
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Compétences Techniques</h1>
        <p className="text-gray-400">Stack technique orientée cybersécurité</p>
      </section>

      {/* Tools */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyber-blue" />
          Outils & Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="group px-4 py-2 bg-cyber-darker rounded-lg border border-gray-700 hover:border-cyber-blue/50 transition-colors"
            >
              <span className="text-white font-medium">{tool.name}</span>
              <span className="text-gray-500 text-xs ml-2 group-hover:text-cyber-blue transition-colors">
                {tool.category}
              </span>
            </div>
          ))}
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
              <span className="text-3xl mb-2 block">{cert.icon}</span>
              <p className="text-white font-medium">{cert.status}</p>
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
