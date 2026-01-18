'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

const translations = {
  fr: {
    landing: {
      subtitle: 'Etudiant Cybersecurite @ Ynov - SOC & Pentest',
      selectAccess: 'Selectionner un acces :',
      recruiter: 'Recruteur',
      recruiterDesc: 'CV, competences techniques, experiences et formations',
      visitor: 'Visiteur',
      visitorDesc: 'Projets, writeups CTF, labs et stats TryHackMe',
      noCookies: 'Pas de cookies, pas de tracking.',
    },
    nav: {
      back: 'retour',
      profile: 'Profil',
      skills: 'Competences',
      experience: 'Parcours',
      contact: 'Contact',
      home: 'Accueil',
      labSoc: 'Lab SOC',
      writeups: 'Writeups',
      downloadCV: 'Telecharger CV',
      recruiterView: 'Recruteur',
      visitorView: 'Visiteur',
    },
    recruiter: {
      title: 'Etudiant en Cybersecurite',
      location: 'Lille',
      target: 'SOC Analyst / Pentester',
      year: 'Annee',
      yearValue: 'B2',
      yearSub: 'Ynov Cyber',
      orientation: 'Orientation',
      orientationValue: 'SOC',
      orientationSub: '& Pentest',
      projects: 'Projets',
      projectsValue: '5+',
      projectsSub: 'GitHub',
      available: 'Disponible',
      availableValue: 'Oui',
      availableSub: 'Stage/Alternance',
      lookingFor: 'Ce que je recherche',
      lookingForItems: [
        { title: 'Stage / Alternance', desc: 'Disponible pour integrer une equipe SOC ou une equipe de pentest' },
        { title: 'Environnement technique', desc: 'Entreprise avec une stack securite moderne et des defis stimulants' },
        { title: 'Montee en competences', desc: 'Accompagnement pour preparer des certifications (SOC, OSCP...)' },
        { title: 'Projets concrets', desc: 'Participation a des audits, analyses d\'incidents, ou red team' },
      ],
      softSkills: 'Soft Skills',
      softSkillsList: ['Curiosite technique', 'Resolution de problemes', 'Veille securite', 'Travail en equipe', 'Autonomie', 'Documentation', 'Adaptabilite', 'Communication'],
      about: 'A propos',
      aboutText1: 'Passionne par la cybersecurite depuis mes debuts en informatique, je me specialise dans le SOC (Security Operations Center) et le Pentest pour combiner analyse defensive et approche offensive.',
      aboutText2: 'J\'administre actuellement un serveur dedie en production pour une boutique de scripts FiveM/Minecraft, avec gestion de VMs pour les clients. J\'y ai deploye Wazuh et Suricata pour le monitoring SOC et la detection d\'intrusion.',
      aboutText3: 'Mon objectif : rejoindre une equipe SOC ou Red Team en alternance pour appliquer mes competences sur des cas reels, tout en preparant des certifications comme OSCP.',
      timeline: 'Mon parcours',
      current: 'En cours',
      footer: 'Etudiant Cybersecurite',
    },
    skills: {
      title: 'Competences Techniques',
      subtitle: 'Stack technique et outils maitrises',
      domains: {
        soc: 'SOC / Blue Team',
        pentest: 'Penetration Testing',
        forensics: 'Forensics / Reverse',
        infra: 'Infrastructure',
      },
      certifications: 'Certifications & Objectifs',
      certDesc: 'En preparation',
    },
    experience: {
      title: 'Parcours',
      subtitle: 'Formation et experiences',
      timeline: [
        { year: '2024-2027', title: 'Bachelor Cybersecurite - Ynov Campus Lille', desc: 'Formation en securite informatique, reseaux et systemes', current: true },
        { year: '2025', title: 'Admin Serveur Dedie', desc: 'Gestion VMs, deploiement Wazuh & Suricata en production', current: true },
        { year: '2024', title: 'Creation Lab SOC Personnel', desc: 'Infrastructure de monitoring avec stack ELK, Wazuh, Suricata' },
        { year: '2023', title: 'Debut en Cybersecurite', desc: 'Premiers CTF sur TryHackMe, apprentissage Linux et reseaux' },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Discutons de vos opportunites',
      availability: 'Disponibilite',
      availableText: 'Disponible pour stage / alternance',
      availableDesc: 'Je recherche activement une opportunite en cybersecurite.',
      location: 'Localisation',
      downloadCV: 'Telecharger mon CV',
      format: 'Format PDF',
    },
    visitor: {
      subtitle: 'Cybersecurity Student @ Ynov',
      intro: 'Etudiant B2 en cybersecurite. J\'administre un serveur dedie en production avec Wazuh et Suricata, et je developpe mes competences via CTF et projets concrets.',
      labTitle: 'Mon Lab SOC',
      labDesc: 'Infrastructure de securite sur serveur dedie',
      labComponents: 'Composants du Lab',
      security: 'Securisation',
      mitreTitle: 'Detections MITRE ATT&CK',
      infrastructure: 'Infrastructure',
      writeups: 'CTF Writeups',
      writeupsDesc: 'Challenges resolus et documentes',
      gitbookTitle: 'GitBook - Documentation complete',
      gitbookDesc: 'Tous mes writeups detailles sont disponibles sur mon GitBook',
      accessGitbook: 'Acceder au GitBook',
      preview: 'Preview',
      metrics: {
        alerts: 'Alertes/jour',
        blocked: 'IPs bloquees',
        rules: 'Regles IDS',
        vms: 'VMs actives',
      },
      running: 'Running',
      active: 'Active',
      footer: 'Cybersecurity Portfolio',
    },
    common: {
      yes: 'Oui',
      no: 'Non',
      close: 'Fermer',
      viewMore: 'Voir plus',
    },
  },
  en: {
    landing: {
      subtitle: 'Cybersecurity Student @ Ynov - SOC & Pentest',
      selectAccess: 'Select access level:',
      recruiter: 'Recruiter',
      recruiterDesc: 'Resume, technical skills, experience and education',
      visitor: 'Visitor',
      visitorDesc: 'Projects, CTF writeups, labs and TryHackMe stats',
      noCookies: 'No cookies, no tracking.',
    },
    nav: {
      back: 'back',
      profile: 'Profile',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
      home: 'Home',
      labSoc: 'SOC Lab',
      writeups: 'Writeups',
      downloadCV: 'Download CV',
      recruiterView: 'Recruiter',
      visitorView: 'Visitor',
    },
    recruiter: {
      title: 'Cybersecurity Student',
      location: 'Lille, France',
      target: 'SOC Analyst / Pentester',
      year: 'Year',
      yearValue: 'B2',
      yearSub: 'Ynov Cyber',
      orientation: 'Focus',
      orientationValue: 'SOC',
      orientationSub: '& Pentest',
      projects: 'Projects',
      projectsValue: '5+',
      projectsSub: 'GitHub',
      available: 'Available',
      availableValue: 'Yes',
      availableSub: 'Internship',
      lookingFor: 'What I\'m looking for',
      lookingForItems: [
        { title: 'Internship / Apprenticeship', desc: 'Available to join a SOC team or pentest team' },
        { title: 'Technical environment', desc: 'Company with modern security stack and stimulating challenges' },
        { title: 'Skill development', desc: 'Support for preparing certifications (SOC, OSCP...)' },
        { title: 'Concrete projects', desc: 'Participation in audits, incident analysis, or red team' },
      ],
      softSkills: 'Soft Skills',
      softSkillsList: ['Technical curiosity', 'Problem solving', 'Security watch', 'Teamwork', 'Autonomy', 'Documentation', 'Adaptability', 'Communication'],
      about: 'About',
      aboutText1: 'Passionate about cybersecurity since my beginnings in IT, I specialize in SOC (Security Operations Center) and Pentest to combine defensive analysis and offensive approach.',
      aboutText2: 'I currently manage a dedicated production server for a FiveM/Minecraft scripts shop, with VM management for clients. I deployed Wazuh and Suricata for SOC monitoring and intrusion detection.',
      aboutText3: 'My goal: join a SOC or Red Team in apprenticeship to apply my skills on real cases, while preparing certifications like OSCP.',
      timeline: 'My journey',
      current: 'Current',
      footer: 'Cybersecurity Student',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Tech stack and mastered tools',
      domains: {
        soc: 'SOC / Blue Team',
        pentest: 'Penetration Testing',
        forensics: 'Forensics / Reverse',
        infra: 'Infrastructure',
      },
      certifications: 'Certifications & Goals',
      certDesc: 'In preparation',
    },
    experience: {
      title: 'Experience',
      subtitle: 'Education and experiences',
      timeline: [
        { year: '2024-2027', title: 'Bachelor Cybersecurity - Ynov Campus Lille', desc: 'Training in IT security, networks and systems', current: true },
        { year: '2025', title: 'Dedicated Server Admin', desc: 'VM management, Wazuh & Suricata deployment in production', current: true },
        { year: '2024', title: 'Personal SOC Lab Creation', desc: 'Monitoring infrastructure with ELK stack, Wazuh, Suricata' },
        { year: '2023', title: 'Started in Cybersecurity', desc: 'First CTFs on TryHackMe, Linux and networking learning' },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s discuss opportunities',
      availability: 'Availability',
      availableText: 'Available for internship / apprenticeship',
      availableDesc: 'I am actively looking for an opportunity in cybersecurity.',
      location: 'Location',
      downloadCV: 'Download my CV',
      format: 'PDF Format',
    },
    visitor: {
      subtitle: 'Cybersecurity Student @ Ynov',
      intro: 'B2 cybersecurity student. I manage a dedicated production server with Wazuh and Suricata, and I develop my skills through CTF and concrete projects.',
      labTitle: 'My SOC Lab',
      labDesc: 'Security infrastructure on dedicated server',
      labComponents: 'Lab Components',
      security: 'Security Hardening',
      mitreTitle: 'MITRE ATT&CK Detections',
      infrastructure: 'Infrastructure',
      writeups: 'CTF Writeups',
      writeupsDesc: 'Solved and documented challenges',
      gitbookTitle: 'GitBook - Full Documentation',
      gitbookDesc: 'All my detailed writeups are available on my GitBook',
      accessGitbook: 'Access GitBook',
      preview: 'Preview',
      metrics: {
        alerts: 'Alerts/day',
        blocked: 'IPs blocked',
        rules: 'IDS rules',
        vms: 'Active VMs',
      },
      running: 'Running',
      active: 'Active',
      footer: 'Cybersecurity Portfolio',
    },
    common: {
      yes: 'Yes',
      no: 'No',
      close: 'Close',
      viewMore: 'View more',
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('lang')
    if (savedLang) {
      setLang(savedLang)
    } else if (navigator.language && !navigator.language.startsWith('fr')) {
      setLang('en')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang
      localStorage.setItem('lang', lang)
    }
  }, [lang, mounted])

  const toggleLang = () => setLang(prev => prev === 'fr' ? 'en' : 'fr')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
