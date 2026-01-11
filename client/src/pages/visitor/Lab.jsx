import { Server, Monitor, Shield, Network, Database, Terminal, Cpu, HardDrive, Activity, Clock, MemoryStick } from 'lucide-react'
import { useServerStats } from '../../hooks/useServerStats'

const Lab = () => {
  const { stats, loading, error } = useServerStats()

  const labComponents = [
    {
      name: 'SIEM - Wazuh',
      description: 'Monitoring de sécurité et détection d\'intrusions en production',
      icon: Shield,
      status: 'running',
      specs: ['Wazuh Manager', 'Agents sur VMs', 'Alertes temps réel'],
    },
    {
      name: 'IDS/IPS - Suricata',
      description: 'Détection d\'intrusion réseau avec règles personnalisées',
      icon: Network,
      status: 'running',
      specs: ['Rules ET Open', 'Custom signatures', 'EVE JSON logs'],
    },
    {
      name: 'SIEM - Splunk',
      description: 'Analyse de logs et dashboards pour le lab local',
      icon: Database,
      status: 'running',
      specs: ['Splunk Enterprise', 'Custom dashboards', 'Alerting'],
    },
    {
      name: 'Firewall - pfSense',
      description: 'Pare-feu et routage pour segmenter le lab',
      icon: Shield,
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

      {/* Live Infrastructure Stats */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-green" />
            Serveur Dédié - Live
          </h2>
          {!loading && !error && stats?.server?.status === 'online' && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-mono flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online
            </span>
          )}
          {error && (
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full font-mono">
              Offline
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-cyber-green border-t-transparent rounded-full" />
          </div>
        ) : error ? (
          <p className="text-gray-500 text-sm font-mono py-4">
            Serveur non accessible - les stats seront disponibles quand l'API sera configurée
          </p>
        ) : stats ? (
          <>
            {/* Server Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  Uptime
                </div>
                <p className="text-2xl font-bold text-white font-mono">{stats.server.uptime}j</p>
              </div>
              <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Cpu className="w-3 h-3" />
                  CPU Load
                </div>
                <p className="text-2xl font-bold text-white font-mono">{stats.server.cpu}</p>
              </div>
              <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <MemoryStick className="w-3 h-3" />
                  RAM
                </div>
                <p className="text-2xl font-bold text-white font-mono">{stats.server.memory}%</p>
              </div>
              <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Server className="w-3 h-3" />
                  VMs Actives
                </div>
                <p className="text-2xl font-bold text-white font-mono">{stats.server.vms}</p>
              </div>
            </div>

            {/* Wazuh Stats */}
            {stats.wazuh && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-cyber-blue" />
                    <span className="text-gray-400 text-sm">Agents Wazuh</span>
                  </div>
                  <p className="text-3xl font-bold text-white font-mono">
                    <span className="text-cyber-green">{stats.wazuh.agents.active}</span>
                    <span className="text-gray-500 text-lg">/{stats.wazuh.agents.total}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">agents actifs</p>
                </div>
                <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-cyber-blue" />
                    <span className="text-gray-400 text-sm">Alertes aujourd'hui</span>
                  </div>
                  <p className="text-3xl font-bold text-white font-mono">{stats.wazuh.alerts.today}</p>
                  {stats.wazuh.alerts.critical > 0 && (
                    <p className="text-red-400 text-xs mt-1">{stats.wazuh.alerts.critical} critiques</p>
                  )}
                  {stats.wazuh.alerts.critical === 0 && (
                    <p className="text-green-400 text-xs mt-1">0 critique</p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : null}
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
                'Monitoring avec Wazuh',
                'Détection d\'intrusion (Suricata)',
                'Analyse de logs avec Splunk',
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
          Infrastructure
        </h2>
        <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Serveur Dédié</p>
            <p className="text-white">Production VMs</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Lab Local</p>
            <p className="text-white">VMware / VirtualBox</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Monitoring</p>
            <p className="text-white">Wazuh + Suricata</p>
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
