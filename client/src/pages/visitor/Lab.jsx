import { Server, Shield, Network, Cpu, HardDrive, Lock, Activity, AlertTriangle, Eye, Ban } from 'lucide-react'

const Lab = () => {
  const labComponents = [
    {
      name: 'SIEM - Wazuh 4.14',
      description: 'Solution SIEM open source pour la détection et l\'analyse des menaces',
      icon: Shield,
      status: 'running',
      specs: [
        'Wazuh Manager (analyse des logs)',
        'Wazuh Indexer (OpenSearch)',
        'Wazuh Dashboard (visualisation)',
        'Agents déployés sur VMs',
      ],
    },
    {
      name: 'IDS/IPS - Suricata 6.0',
      description: 'Détection d\'intrusion réseau avec règles Emerging Threats',
      icon: Eye,
      status: 'running',
      specs: [
        '47 472 règles ET chargées',
        'Intégration Wazuh (eve.json)',
        'Détection réseau temps réel',
        'Mapping MITRE ATT&CK',
      ],
    },
    {
      name: 'Hyperviseur - Proxmox VE 9.1',
      description: 'Virtualisation des machines pour l\'infrastructure SOC',
      icon: Server,
      status: 'running',
      specs: [
        'Ryzen 7 Pro 8700GE (8c/16t)',
        '64 GB RAM DDR5',
        'Réseau NAT isolé (10.10.10.0/24)',
        '2 VMs en production',
      ],
    },
  ]

  const securityMeasures = [
    {
      name: 'SSH Hardening',
      description: 'Authentification sécurisée par clés cryptographiques',
      icon: Lock,
      status: 'active',
      details: ['Clés ED25519 uniquement', 'Port custom 2222', 'Root login désactivé', 'AllowUsers restreint'],
    },
    {
      name: 'Anti-Bruteforce',
      description: 'Protection automatique contre les attaques par force brute',
      icon: Ban,
      status: 'active',
      details: ['Fail2ban actif', '154+ IPs bannies', 'Monitoring SSH', 'Alertes temps réel'],
    },
    {
      name: 'Monitoring SOC',
      description: 'Surveillance centralisée et corrélation des événements',
      icon: Activity,
      status: 'active',
      details: ['Logs centralisés Wazuh', 'Alertes Suricata', 'MITRE ATT&CK mapping', 'Vulnérabilités trackées'],
    },
  ]

  const metrics = [
    { label: 'Événements 24h', value: '102', icon: Activity, color: 'cyber-green' },
    { label: 'IPs bloquées', value: '154+', icon: Ban, color: 'red-400' },
    { label: 'Vulnérabilités', value: '231', icon: AlertTriangle, color: 'yellow-400' },
    { label: 'Règles IDS', value: '47k+', icon: Eye, color: 'cyber-blue' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      running: 'text-green-400 bg-green-400/10',
      active: 'text-green-400 bg-green-400/10',
      ready: 'text-yellow-400 bg-yellow-400/10',
      standby: 'text-gray-400 bg-gray-400/10',
    }
    return colors[status] || colors.standby
  }

  const getStatusText = (status) => {
    const texts = {
      running: '● Running',
      active: '● Active',
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
            <span className="text-cyber-green">nathan@proxmox</span>:<span className="text-cyber-blue">~/soc</span>$ wazuh-control status
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Infrastructure SOC - Production</h1>
          <p className="text-gray-400">Serveur dédié Hetzner avec stack Wazuh + Suricata</p>
        </div>
      </section>

      {/* Live Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-cyber-dark rounded-xl p-4 border border-gray-800 hover:border-cyber-green/30 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <metric.icon className={`w-4 h-4 text-${metric.color}`} />
              {metric.label}
            </div>
            <p className={`text-3xl font-bold font-mono text-${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </section>

      {/* Lab Components */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-cyber-green" />
          Composants du Lab
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
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

      {/* Security Hardening */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Lock className="w-5 h-5 text-cyber-blue" />
          Sécurisation
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {securityMeasures.map((measure, i) => (
            <div
              key={i}
              className="bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-blue/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <measure.icon className="w-6 h-6 text-cyber-blue" />
                <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(measure.status)}`}>
                  {getStatusText(measure.status)}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2">{measure.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{measure.description}</p>
              <div className="space-y-1">
                {measure.details.map((detail, j) => (
                  <p key={j} className="text-gray-500 text-xs font-mono flex items-center gap-2">
                    <span className="text-cyber-blue">→</span>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VMs Details */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono">
          $ cat /etc/vms.conf
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-cyber-green font-semibold">VM Wazuh + Suricata</h3>
              <span className="text-xs font-mono text-gray-500">10.10.10.4</span>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-gray-400"><span className="text-gray-500">CPU:</span> 4 vCPU</p>
              <p className="text-gray-400"><span className="text-gray-500">RAM:</span> 8 GB</p>
              <p className="text-gray-400"><span className="text-gray-500">Disk:</span> 100 GB SSD</p>
              <p className="text-gray-400"><span className="text-gray-500">Role:</span> SIEM + IDS/IPS</p>
            </div>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-cyber-green font-semibold">VM FiveM Dev</h3>
              <span className="text-xs font-mono text-gray-500">10.10.10.3</span>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-gray-400"><span className="text-gray-500">CPU:</span> 6 vCPU</p>
              <p className="text-gray-400"><span className="text-gray-500">RAM:</span> 16 GB</p>
              <p className="text-gray-400"><span className="text-gray-500">Disk:</span> 60 GB SSD</p>
              <p className="text-gray-400"><span className="text-gray-500">Agent:</span> Wazuh monitored</p>
            </div>
          </div>
        </div>
      </section>

      {/* MITRE ATT&CK */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Network className="w-5 h-5 text-cyber-green" />
          Détections MITRE ATT&CK
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Valid Accounts (T1078)',
            'Password Guessing (T1110.001)',
            'SSH (T1021.004)',
            'Network Sniffing (T1040)',
            'Brute Force (T1110)',
            'Remote Services (T1021)',
          ].map((technique, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-cyber-darker rounded-lg border border-gray-700 text-gray-300 text-xs font-mono"
            >
              {technique}
            </span>
          ))}
        </div>
      </section>

      {/* Hardware Specs */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-blue" />
          Serveur Dédié - Hetzner
        </h2>
        <div className="grid md:grid-cols-4 gap-4 font-mono text-sm">
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">CPU</p>
            <p className="text-white">Ryzen 7 Pro 8700GE</p>
            <p className="text-gray-500 text-xs">8 cores / 16 threads</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">RAM</p>
            <p className="text-white">64 GB DDR5</p>
            <p className="text-gray-500 text-xs">ECC Memory</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Storage</p>
            <p className="text-white">NVMe SSD</p>
            <p className="text-gray-500 text-xs">LVM Managed</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Network</p>
            <p className="text-white">1 Gbit/s</p>
            <p className="text-gray-500 text-xs">NAT Bridge vmbr1</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Lab
