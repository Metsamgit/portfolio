'use client'

import { useState } from 'react'
import { Github, ExternalLink, Flag, Eye, BookOpen, Server, Shield, Network, Cpu, HardDrive, Lock, Activity, Ban } from 'lucide-react'
import THMStats from '@/components/THMStats'
import WriteupModal from '@/components/WriteupModal'
import { useLanguage } from '@/contexts/LanguageContext'

// ============ LAB DATA ============
const labComponents = [
  {
    name: 'SIEM - Wazuh',
    description: 'Solution SIEM open source pour la detection et l\'analyse des menaces',
    icon: Shield,
    status: 'running',
    specs: [
      'Wazuh Manager (analyse des logs)',
      'Wazuh Indexer (stockage)',
      'Wazuh Dashboard (visualisation)',
      'Agents deployes sur VMs',
    ],
  },
  {
    name: 'IDS/IPS - Suricata',
    description: 'Detection d\'intrusion reseau avec regles Emerging Threats',
    icon: Eye,
    status: 'running',
    specs: [
      '47 000+ regles ET chargees',
      'Integration Wazuh (eve.json)',
      'Detection reseau temps reel',
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
      'Reseau NAT isole',
      'Stockage LVM',
      'Snapshots & backups',
    ],
  },
]

const securityMeasures = [
  {
    name: 'SSH Hardening',
    description: 'Authentification securisee et acces restreint',
    icon: Lock,
    status: 'active',
    details: ['Cles uniquement', 'Port custom', 'Root login [DISABLED]', 'AllowUsers [REDACTED]'],
  },
  {
    name: 'Anti-Bruteforce',
    description: 'Protection automatique contre les attaques',
    icon: Ban,
    status: 'active',
    details: ['Fail2ban actif', '150+ IPs bannies', 'Monitoring actif', 'Alertes temps reel'],
  },
  {
    name: 'Monitoring SOC',
    description: 'Surveillance centralisee et correlation',
    icon: Activity,
    status: 'active',
    details: ['Logs centralises', 'IDS/IPS alerts', 'MITRE ATT&CK', 'Vuln scanning'],
  },
]

const labMetrics = [
  { label: 'Alertes/jour', value: '100+', icon: Activity, color: 'theme-accent-green' },
  { label: 'IPs bloquees', value: '150+', icon: Ban, color: 'red-400' },
  { label: 'Regles IDS', value: '47k+', icon: Eye, color: 'theme-accent-blue' },
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
    description: 'Compromission complete d\'un domaine AD : de l\'injection SQL au controle total',
    content: [
      { type: 'heading', text: 'Cible' },
      { type: 'text', text: 'Machine eval.lan (192.168.46.128) - Environnement Active Directory' },
      { type: 'heading', text: '1. Reconnaissance' },
      { type: 'text', text: 'Scan nmap pour identifier les services ouverts sur la cible.' },
      { type: 'code', text: 'nmap -sV 192.168.46.128\n\nPorts decouverts:\n- SSH (22)\n- Kerberos (88)\n- MSRPC (135)\n- LDAP (389)\n- SMB (445)' },
      { type: 'heading', text: '2. Injection SQL' },
      { type: 'text', text: 'Utilisation de SQLMap sur un champ de recherche vulnerable sur la page principale du site.' },
      { type: 'code', text: 'sqlmap -u "http://target/search?q=test" --dbs\n\nCredentials extraits:\n→ ldap_reader : Reader123!' },
      { type: 'heading', text: '3. Enumeration LDAP' },
      { type: 'text', text: 'Avec les credentials ldap_reader, enumeration des utilisateurs du domaine.' },
      { type: 'code', text: 'ldapsearch -x -H ldap://192.168.46.128 \\\n  -D "ldap_reader@eval.lan" -w \'Reader123!\' \\\n  -b "DC=eval,DC=lan" "(objectClass=user)" \\\n  cn sAMAccountName info description' },
      { type: 'text', text: 'Le champ "description" indique "temp password = firstname + year" mais c\'est un piege. Le vrai indice est dans le champ "info" encode en Base64.' },
      { type: 'heading', text: '4. Decodage Base64' },
      { type: 'text', text: 'L\'utilisateur svc-itops a une valeur differente dans le champ info.' },
      { type: 'code', text: 'echo \'V2ludGVyMjAyNCE=\' | base64 -d\n→ Winter2024!\n\nCredentials: svc-itops / Winter2024!' },
      { type: 'heading', text: '5. Acces SMB' },
      { type: 'text', text: 'Test des credentials sur les partages SMB.' },
      { type: 'code', text: 'netexec smb 192.168.46.128 -u \'svc-itops\' \\\n  -p \'Winter2024!\' -d eval.lan --shares\n\n→ Acces READ,WRITE sur "Fileshare"' },
      { type: 'heading', text: '6. Exploration Fileshare' },
      { type: 'code', text: 'smbclient //192.168.46.128/Fileshare \\\n  -U \'svc-itops%Winter2024!\'\n\nsmb> get Pass.txt\n\nContenu: ADDC : root / yboost_ezyeval2026' },
      { type: 'heading', text: '7. Acces Root - Domain Compromis' },
      { type: 'code', text: 'ssh root@192.168.46.128\nPassword: yboost_ezyeval2026\n\n→ DOMAINE COMPROMIS' },
      { type: 'heading', text: 'Kill Chain' },
      { type: 'code', text: 'SQLi → ldap_reader:Reader123!\n  ↓\nEnumeration LDAP → Champ info Base64\n  ↓\nDecodage → svc-itops:Winter2024!\n  ↓\nSMB Fileshare → Pass.txt\n  ↓\nSSH root → DOMAINE COMPROMIS' },
      { type: 'heading', text: 'Bonus: Pass-the-Hash' },
      { type: 'text', text: 'Extraction du hash NTLM Administrator et validation du controle total via Pass-the-Hash.' },
      { type: 'heading', text: 'Competences' },
      { type: 'list', items: [
        'Injection SQL et extraction de donnees',
        'Enumeration LDAP Active Directory',
        'Analyse et decodage Base64',
        'Exploitation SMB et partages reseau',
        'Elevation de privileges',
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
    description: 'Challenge OSINT - Retrouver des informations sur un profil a partir de son pseudo',
    content: [
      { type: 'heading', text: 'Enonce' },
      { type: 'text', text: 'On nous donne un pseudo "@killcleaner" et on doit retrouver des informations sur cette personne.' },
      { type: 'heading', text: 'Resolution' },
      { type: 'text', text: 'Premiere etape : recherche du pseudo sur les reseaux sociaux. On trouve un compte Twitter avec ce pseudo.' },
      { type: 'text', text: 'En analysant les tweets, on trouve une reference a un compte Vinted. Sur Vinted, le profil revele plus d\'informations personnelles.' },
      { type: 'code', text: 'Pseudo Twitter: @killcleaner\nCompte Vinted trouve via bio Twitter\nLocalisation mentionnee dans les annonces' },
      { type: 'heading', text: 'Flag' },
      { type: 'flag', text: 'MUSIC{REDACTED}' },
      { type: 'heading', text: 'Competences' },
      { type: 'list', items: [
        'Recherche OSINT multi-plateformes',
        'Analyse de profils sociaux',
        'Correlation d\'informations entre sources',
        'Techniques de doxing ethique',
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
    description: 'Challenge combinant plusieurs techniques pour recuperer le flag',
    content: [
      { type: 'heading', text: 'Enonce' },
      { type: 'text', text: 'Un fichier mysterieux nous est fourni. A nous de trouver ce qu\'il cache.' },
      { type: 'heading', text: 'Resolution' },
      { type: 'text', text: 'Analyse du fichier avec differents outils pour identifier le type de donnees cachees.' },
      { type: 'code', text: '# Commandes utilisees\nfile mystery.bin\nstrings mystery.bin\nbinwalk mystery.bin' },
      { type: 'heading', text: 'Flag' },
      { type: 'flag', text: 'MUSIC{REDACTED}' },
      { type: 'heading', text: 'Competences' },
      { type: 'list', items: [
        'Analyse de fichiers binaires',
        'Steganographie',
        'Decodage multi-formats',
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
      { type: 'heading', text: 'Enonce' },
      { type: 'text', text: 'Un site web nous est donne. Il faut collecter des informations pour reconstituer le flag.' },
      { type: 'heading', text: 'Resolution' },
      { type: 'text', text: 'Exploration du site et de ses metadonnees pour trouver les indices caches.' },
      { type: 'heading', text: 'Flag' },
      { type: 'flag', text: 'MUSIC{REDACTED}' },
      { type: 'heading', text: 'Competences' },
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
    description: 'Challenge de decodage et cryptanalyse',
    content: [
      { type: 'heading', text: 'Enonce' },
      { type: 'text', text: 'Une chaine de caracteres encodee nous est fournie. Le titre suggere que le decimal n\'est pas la solution.' },
      { type: 'heading', text: 'Resolution' },
      { type: 'text', text: 'Identification du bon encodage en testant differentes bases et formats.' },
      { type: 'code', text: '# Test differents encodages\necho "data" | base64 -d\necho "data" | xxd -r -p' },
      { type: 'heading', text: 'Flag' },
      { type: 'flag', text: 'MUSIC{REDACTED}' },
      { type: 'heading', text: 'Competences' },
      { type: 'list', items: [
        'Identification d\'encodages',
        'Cryptanalyse basique',
        'Conversion entre bases numeriques',
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
  return colors[status] || 'text-theme-text-muted bg-theme-text-muted/10'
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
  const { t } = useLanguage()
  const [selectedWriteup, setSelectedWriteup] = useState(null)

  return (
    <div className="space-y-8">
      {/* ============ HERO SECTION ============ */}
      <section id="top" className="bg-theme-card rounded-xl p-6 md:p-8 border border-theme-accent-green/20 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-theme-accent-green font-mono text-lg">$</span>
              <h1 className="text-3xl font-bold text-theme-text font-mono">Nathan Jupin</h1>
            </div>
            <p className="text-theme-accent-green/80 font-mono text-lg mb-4">
              {t('visitor.subtitle')}
            </p>
            <p className="text-theme-text-secondary leading-relaxed mb-4">
              {t('visitor.intro')}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-theme-accent-blue/10 text-theme-accent-blue text-sm rounded font-mono border border-theme-accent-blue/20">
                SOC / Wazuh
              </span>
              <span className="px-3 py-1 bg-theme-accent-green/10 text-theme-accent-green text-sm rounded font-mono border border-theme-accent-green/20">
                Pentest
              </span>
              <span className="px-3 py-1 bg-theme-accent-purple/10 text-theme-accent-purple text-sm rounded font-mono border border-theme-accent-purple/20">
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
        <div className="bg-theme-card rounded-xl p-6 border border-theme-accent-green/20">
          <div className="font-mono">
            <p className="text-theme-text-muted mb-2">
              <span className="text-theme-accent-green">nathan@soc</span>:<span className="text-theme-accent-blue">~/lab</span>$ systemctl status wazuh-manager
            </p>
            <h2 className="text-2xl font-bold text-theme-text mb-2">{t('visitor.labTitle')}</h2>
            <p className="text-theme-text-secondary">{t('visitor.labDesc')}</p>
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
              <div className="bg-theme-card rounded-xl p-4 border border-theme-border hover:border-theme-accent-green/30 transition-colors h-full">
                <div className="flex items-center gap-2 text-theme-text-muted text-xs mb-2">
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
          <h3 className="text-lg font-semibold text-theme-text mb-4 font-mono flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-theme-accent-green" />
            {t('visitor.labComponents')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {labComponents.map((component, i) => (
              <div
                key={i}
                className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="bg-theme-card rounded-xl p-5 border border-theme-border hover:border-theme-accent-green/30 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <component.icon className="w-8 h-8 text-theme-accent-green" />
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(component.status)}`}>
                      {getStatusText(component.status)}
                    </span>
                  </div>
                  <h4 className="text-theme-text font-semibold mb-2">{component.name}</h4>
                  <p className="text-theme-text-secondary text-sm mb-4">{component.description}</p>
                  <div className="space-y-1">
                    {component.specs.map((spec, j) => (
                      <p key={j} className="text-theme-text-muted text-xs font-mono flex items-center gap-2">
                        <span className="text-theme-accent-green">▹</span>
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
          <h3 className="text-lg font-semibold text-theme-text mb-4 font-mono flex items-center gap-2">
            <Lock className="w-5 h-5 text-theme-accent-blue" />
            {t('visitor.security')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {securityMeasures.map((measure, i) => (
              <div
                key={i}
                className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="bg-theme-card rounded-xl p-5 border border-theme-border hover:border-theme-accent-blue/30 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <measure.icon className="w-6 h-6 text-theme-accent-blue" />
                    <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(measure.status)}`}>
                      {getStatusText(measure.status)}
                    </span>
                  </div>
                  <h4 className="text-theme-text font-semibold mb-2">{measure.name}</h4>
                  <p className="text-theme-text-secondary text-sm mb-3">{measure.description}</p>
                  <div className="space-y-1">
                    {measure.details.map((detail, j) => (
                      <p key={j} className="text-theme-text-muted text-xs font-mono flex items-center gap-2">
                        <span className="text-theme-accent-blue">→</span>
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
        <div className="bg-theme-card rounded-xl p-6 border border-theme-border">
          <h3 className="text-lg font-semibold text-theme-text mb-4 font-mono flex items-center gap-2">
            <Network className="w-5 h-5 text-theme-accent-green" />
            {t('visitor.mitreTitle')}
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
                className="px-3 py-1.5 bg-theme-bg-secondary rounded-lg border border-theme-border text-theme-text-secondary text-xs font-mono"
              >
                {technique}
              </span>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-theme-card rounded-xl p-6 border border-theme-border">
          <h3 className="text-lg font-semibold text-theme-text mb-4 font-mono flex items-center gap-2">
            <Cpu className="w-5 h-5 text-theme-accent-blue" />
            {t('visitor.infrastructure')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
            <div className="bg-theme-bg-secondary rounded-lg p-4">
              <p className="text-theme-text-muted mb-1">Serveur</p>
              <p className="text-theme-text">Dedie heberge</p>
              <p className="text-theme-text-muted text-xs">Multi-core / 64GB+ RAM</p>
            </div>
            <div className="bg-theme-bg-secondary rounded-lg p-4">
              <p className="text-theme-text-muted mb-1">Virtualisation</p>
              <p className="text-theme-text">Proxmox VE</p>
              <p className="text-theme-text-muted text-xs">Reseau isole NAT</p>
            </div>
            <div className="bg-theme-bg-secondary rounded-lg p-4">
              <p className="text-theme-text-muted mb-1">Monitoring</p>
              <p className="text-theme-text">Wazuh + Suricata</p>
              <p className="text-theme-text-muted text-xs">24/7 actif</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTF WRITEUPS SECTION ============ */}
      <section id="writeups" className="space-y-6 scroll-mt-24">
        <div className="bg-theme-card rounded-xl p-6 border border-theme-accent-green/20">
          <div className="font-mono">
            <p className="text-theme-text-muted mb-2">
              <span className="text-theme-accent-green">nathan@kali</span>:<span className="text-theme-accent-blue">~/writeups</span>$ cat README.md
            </p>
            <h2 className="text-2xl font-bold text-theme-text mb-2">{t('visitor.writeups')}</h2>
            <p className="text-theme-text-secondary">{t('visitor.writeupsDesc')}</p>
          </div>
        </div>

        {/* GitBook Link */}
        <div className="bg-gradient-to-r from-theme-accent-purple/10 to-theme-accent-blue/10 rounded-xl p-6 border border-theme-accent-purple/30">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <BookOpen className="w-12 h-12 text-theme-accent-purple" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-theme-text mb-1">{t('visitor.gitbookTitle')}</h3>
              <p className="text-theme-text-secondary">
                {t('visitor.gitbookDesc')}
              </p>
            </div>
            <a
              href="https://metsam-notes.gitbook.io/ctf-ynov-25/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-theme-accent-purple text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
            >
              {t('visitor.accessGitbook')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Writeups List */}
        <div>
          <h3 className="text-lg font-semibold text-theme-text mb-4 font-mono flex items-center gap-2">
            <Flag className="w-5 h-5 text-theme-accent-green" />
            CTF YNOV 25 - {writeups.length} writeups
          </h3>
          <div className="space-y-4">
            {writeups.map((writeup, i) => (
              <button
                key={i}
                onClick={() => setSelectedWriteup(writeup)}
                className="group block w-full bg-theme-card rounded-xl p-5 border border-theme-border hover:border-theme-accent-purple/50 transition-all text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-theme-text group-hover:text-theme-accent-purple transition-colors">
                        {writeup.title}
                      </h4>
                      <span className={`px-2 py-0.5 text-xs rounded border ${getDifficultyColor(writeup.difficulty)}`}>
                        {writeup.difficulty}
                      </span>
                    </div>
                    <p className="text-theme-text-secondary text-sm mb-3">{writeup.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-theme-accent-purple text-sm font-mono">{writeup.platform}</span>
                      <span className="text-theme-text-muted">•</span>
                      <span className="text-theme-text-muted text-sm">{writeup.date}</span>
                      <span className="text-theme-text-muted">•</span>
                      <div className="flex gap-2">
                        {writeup.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 bg-theme-bg-secondary text-theme-text-secondary text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-theme-text-muted group-hover:text-theme-accent-purple transition-colors">
                    <Eye className="w-5 h-5" />
                    <span className="text-sm font-mono">{t('visitor.preview')}</span>
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
            className="flex items-center gap-4 bg-theme-card rounded-xl p-5 border border-theme-border hover:border-red-500/50 transition-colors"
          >
            <div className="p-3 bg-red-500/10 rounded-lg">
              <Flag className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-theme-text font-semibold">TryHackMe</p>
              <p className="text-theme-text-secondary text-sm">@METSAM</p>
            </div>
            <ExternalLink className="w-4 h-4 text-theme-text-muted ml-auto" />
          </a>

          <a
            href="https://hackthebox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-theme-card rounded-xl p-5 border border-theme-border hover:border-green-500/50 transition-colors"
          >
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Flag className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-theme-text font-semibold">HackTheBox</p>
              <p className="text-theme-text-secondary text-sm">Profil HTB</p>
            </div>
            <ExternalLink className="w-4 h-4 text-theme-text-muted ml-auto" />
          </a>

          <a
            href="https://github.com/Metsamgit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-theme-card rounded-xl p-5 border border-theme-border hover:border-theme-accent-green/50 transition-colors"
          >
            <div className="p-3 bg-theme-accent-green/10 rounded-lg">
              <Github className="w-6 h-6 text-theme-accent-green" />
            </div>
            <div>
              <p className="text-theme-text font-semibold">GitHub</p>
              <p className="text-theme-text-secondary text-sm">@Metsamgit</p>
            </div>
            <ExternalLink className="w-4 h-4 text-theme-text-muted ml-auto" />
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
