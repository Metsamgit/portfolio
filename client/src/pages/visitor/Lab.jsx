import { Server, Monitor, Shield, Network, Database, Terminal, Cpu, HardDrive } from 'lucide-react'

const Lab = () => {
  const labComponents = [
    {
      name: 'SIEM - ELK Stack',
      description: 'Elasticsearch, Logstash, Kibana pour la centralisation et l\'analyse des logs',
      icon: Database,
      status: 'running',
      specs: ['Elasticsearch 8.x', 'Kibana dashboards', 'Logstash pipelines'],
    },
    {
      name: 'IDS/IPS - Suricata',
      description: 'Détection d\'intrusion réseau avec règles personnalisées',
      icon: Shield,
      status: 'running',
      specs: ['Rules ET Open', 'Custom signatures', 'EVE JSON logs'],
    },
    {
      name: 'Firewall - pfSense',
      description: 'Pare-feu et routage pour segmenter le lab',
      icon: Network,
      status: 'running',
      specs: ['VLANs', 'NAT/PAT', 'VPN'],
    },
    {
      name: 'Machines Cibles',
      description: 'VMs vulnérables pour la pratique du pentest',
      icon: Monitor,
      status: 'ready',
      specs: ['Metasploitable', 'DVWA', 'Custom VMs'],
    },
    {
      name: 'Kali Linux',
      description: 'Machine d\'attaque principale avec tous les outils',
      icon: Terminal,
      status: 'running',
      specs: ['Nmap', 'Metasploit', 'Burp Suite'],
    },
    {
      name: 'Windows AD',
      description: 'Environnement Active Directory pour tests',
      icon: Server,
      status: 'standby',
      specs: ['DC Windows Server', 'Clients W10', 'GPO testing'],
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      running: 'text-green-400 bg-green-400/10',
      ready: 'text-yellow-400 bg-yellow-400/10',
      standby: 'text-gray-400 bg-gray-400/10',
    }
    return colors[status] || colors.standby
  }

  const getStatusText = (status) => {
    const texts = {
      running: '● Running',
      ready: '○ Ready',
      standby: '◌ Standby',
    }
    return texts[status] || texts.standby
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <div className="font-mono">
          <p className="text-gray-500 mb-2">
            <span className="text-cyber-green">nathan@kali</span>:<span className="text-cyber-blue">~/lab</span>$ ./status.sh
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Mon Lab Cybersécurité</h1>
          <p className="text-gray-400">Infrastructure personnelle pour SOC et pentest</p>
        </div>
      </section>

      {/* Components Grid */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-cyber-green" />
          Composants du Lab
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labComponents.map((component, i) => (
            <div
              key={i}
              className="bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <component.icon className="w-8 h-8 text-cyber-green" />
                <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(component.status)}`}>
                  {getStatusText(component.status)}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2">{component.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{component.description}</p>
              <div className="space-y-1">
                {component.specs.map((spec, j) => (
                  <p key={j} className="text-gray-500 text-xs font-mono flex items-center gap-2">
                    <span className="text-cyber-green">▹</span>
                    {spec}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono">
          $ cat use_cases.txt
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'Blue Team / SOC',
              items: [
                'Analyse de logs avec ELK',
                'Détection d\'intrusion (Suricata)',
                'Threat hunting',
                'Incident response practice',
              ],
            },
            {
              title: 'Red Team / Pentest',
              items: [
                'Exploitation de vulnérabilités',
                'Post-exploitation',
                'Privilege escalation',
                'Active Directory attacks',
              ],
            },
          ].map((useCase, i) => (
            <div key={i} className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
              <h3 className="text-cyber-green font-semibold mb-3">{useCase.title}</h3>
              <ul className="space-y-2">
                {useCase.items.map((item, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-cyber-green">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware Specs */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-blue" />
          Hardware / Virtualisation
        </h2>
        <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Hypervisor</p>
            <p className="text-white">VMware / VirtualBox</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">RAM Total</p>
            <p className="text-white">32 GB alloués</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Storage</p>
            <p className="text-white">500 GB SSD</p>
          </div>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="text-center">
        <p className="text-gray-500 mb-4">
          Les configurations et scripts de ce lab sont disponibles sur GitHub
        </p>
        <a
          href="https://github.com/Metsamgit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green/10 text-cyber-green font-mono rounded-lg border border-cyber-green/30 hover:bg-cyber-green/20 transition-colors"
        >
          Voir les repos du lab
        </a>
      </section>
    </div>
  )
}

export default Lab
