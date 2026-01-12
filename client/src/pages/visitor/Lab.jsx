import { Server, Shield, Network, Cpu, HardDrive, Lock, Activity, Eye, Ban } from 'lucide-react'

const Lab = () => {
  const labComponents = [
    {
      name: 'SIEM - Wazuh',
      description: 'Solution SIEM open source pour la détection et l\'analyse des menaces',
      icon: Shield,
      status: 'running',
      specs: [
        'Wazuh Manager (analyse des logs)',
        'Wazuh Indexer (stockage)',
        'Wazuh Dashboard (visualisation)',
        'Agents déployés sur VMs',
      ],
    },
    {
      name: 'IDS/IPS - Suricata',
      description: 'Détection d\'intrusion réseau avec règles Emerging Threats',
      icon: Eye,
      status: 'running',
      specs: [
        '47 000+ règles ET chargées',
        'Intégration Wazuh (eve.json)',
        'Détection réseau temps réel',
        'Mapping MITRE ATT&CK',
      ],
    },
    {
      name: 'Hyperviseur - Proxmox',
      description: 'Virtualisation des machines pour l\'infrastructure SOC',
      icon: Server,
      status: 'running',
      specs: [
        'Multi-VMs de lab',
        'Réseau NAT isolé',
        'Stockage LVM',
        'Snapshots & backups',
      ],
    },
  ]

  const securityMeasures = [
    {
      name: 'SSH Hardening',
      description: 'Authentification sécurisée par clés cryptographiques',
      icon: Lock,
      status: 'active',
      details: ['Clés asymétriques uniquement', 'Port non-standard', 'Root login désactivé', 'AllowUsers restreint'],
    },
    {
      name: 'Anti-Bruteforce',
      description: 'Protection automatique contre les attaques par force brute',
      icon: Ban,
      status: 'active',
      details: ['Fail2ban actif', '150+ IPs bannies', 'Monitoring SSH', 'Alertes temps réel'],
    },
    {
      name: 'Monitoring SOC',
      description: 'Surveillance centralisée et corrélation des événements',
      icon: Activity,
      status: 'active',
      details: ['Logs centralisés', 'Alertes Suricata', 'MITRE ATT&CK mapping', 'Scan vulnérabilités'],
    },
  ]

  const metrics = [
    { label: 'Alertes/jour', value: '100+', icon: Activity, color: 'cyber-green' },
    { label: 'IPs bloquées', value: '150+', icon: Ban, color: 'red-400' },
    { label: 'Règles IDS', value: '47k+', icon: Eye, color: 'cyber-blue' },
    { label: 'VMs actives', value: '3+', icon: Server, color: 'purple-400' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      running: 'text-green-400 bg-green-400/10',
      active: 'text-green-400 bg-green-400/10',
      ready: 'text-yellow-400 bg-yellow-400/10',
    }
    return colors[status] || 'text-gray-400 bg-gray-400/10'
  }

  const getStatusText = (status) => {
    const texts = {
      running: '● Running',
      active: '● Active',
      ready: '○ Ready',
    }
    return texts[status] || '◌ Standby'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <div className="font-mono">
          <p className="text-gray-500 mb-2">
            <span className="text-cyber-green">nathan@soc</span>:<span className="text-cyber-blue">~/lab</span>$ systemctl status wazuh-manager
          </p>
          <h1 className="text-2xl font-bold text-white mb-2">Mon Lab SOC</h1>
          <p className="text-gray-400">Infrastructure de sécurité sur serveur dédié</p>
        </div>
      </section>

      {/* Metrics */}
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

      {/* Use Cases */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono">
          $ cat use_cases.txt
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
            <h3 className="text-cyber-green font-semibold mb-3">Blue Team / SOC</h3>
            <ul className="space-y-2">
              {[
                'Monitoring avec Wazuh',
                'Détection d\'intrusion (Suricata)',
                'Analyse de logs centralisée',
                'Incident response practice',
              ].map((item, j) => (
                <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-cyber-green">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4 border border-gray-700">
            <h3 className="text-cyber-green font-semibold mb-3">Détections actives</h3>
            <ul className="space-y-2">
              {[
                'Brute force SSH',
                'Scans de ports',
                'Authentifications suspectes',
                'Trafic réseau anormal',
              ].map((item, j) => (
                <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-cyber-green">→</span>
                  {item}
                </li>
              ))}
            </ul>
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
            'Brute Force (T1110)',
            'SSH (T1021.004)',
            'Network Sniffing (T1040)',
            'Remote Services (T1021)',
            'System Information Discovery (T1082)',
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

      {/* Infrastructure */}
      <section className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-blue" />
          Infrastructure
        </h2>
        <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Serveur</p>
            <p className="text-white">Dédié hébergé</p>
            <p className="text-gray-500 text-xs">Multi-core / 64GB+ RAM</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Virtualisation</p>
            <p className="text-white">Proxmox VE</p>
            <p className="text-gray-500 text-xs">Réseau isolé NAT</p>
          </div>
          <div className="bg-cyber-darker rounded-lg p-4">
            <p className="text-gray-500 mb-1">Monitoring</p>
            <p className="text-white">Wazuh + Suricata</p>
            <p className="text-gray-500 text-xs">24/7 actif</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Lab
