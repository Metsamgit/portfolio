'use client'

import { MapPin, GraduationCap, Target, Download, Linkedin } from 'lucide-react'

const timelineItems = [
  {
    year: '2025',
    title: 'Admin serveur dédié en production',
    desc: 'Gestion de VMs, déploiement Wazuh & Suricata pour boutique de scripts',
    current: true
  },
  {
    year: '2024 - 2025',
    title: 'B2 Cybersécurité - Ynov Campus',
    desc: 'Spécialisation SOC & Pentest',
    current: true
  },
  {
    year: '2024',
    title: 'Création de mon lab SOC',
    desc: 'Stack Wazuh, Suricata pour monitoring et détection',
    current: false
  },
  {
    year: '2023',
    title: 'Début en cybersécurité',
    desc: 'Découverte via TryHackMe et premiers scripts',
    current: false
  },
]

export default function RecruiterHome() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyber-dark to-cyber-darker rounded-2xl p-8 border border-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src="/img/PP.jpg"
              alt="Nathan Jupin"
              className="w-32 h-32 rounded-full object-cover border-2 border-cyber-blue"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Nathan <span className="text-cyber-blue">Jupin</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Étudiant en Cybersécurité
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-cyber-blue" />
                B2 Ynov Campus
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-cyber-blue" />
                Lille
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-cyber-blue" />
                SOC Analyst / Pentester
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="/cv-nathan-jupin.pdf"
              download
              className="flex items-center justify-center gap-2 px-6 py-3 bg-cyber-blue text-cyber-dark font-semibold rounded-lg hover:bg-cyber-blue/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Télécharger CV
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-jupin-088a12326/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-cyber-blue hover:text-cyber-blue transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
        </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Année', value: 'B2', sub: 'Ynov Cyber' },
          { label: 'Orientation', value: 'SOC', sub: '& Pentest' },
          { label: 'Projets', value: '5+', sub: 'GitHub' },
          { label: 'Disponible', value: 'Oui', sub: 'Stage/Alternance' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-cyber-dark rounded-xl p-4 border border-gray-800 text-center opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-cyber-blue">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* What I'm looking for - PRIORITAIRE */}
      <section className="bg-cyber-dark rounded-2xl p-8 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-blue rounded-full" />
          Ce que je recherche
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'Stage / Alternance',
              desc: 'Disponible pour intégrer une équipe SOC ou une équipe de pentest',
            },
            {
              title: 'Environnement technique',
              desc: 'Entreprise avec une stack sécurité moderne et des défis stimulants',
            },
            {
              title: 'Montée en compétences',
              desc: 'Accompagnement pour préparer des certifications (SOC, OSCP...)',
            },
            {
              title: 'Projets concrets',
              desc: 'Participation à des audits, analyses d\'incidents, ou red team',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-cyber-darker p-4 rounded-xl border border-gray-700 opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="bg-cyber-dark rounded-2xl p-8 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-blue rounded-full" />
          Soft Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
            <span
              key={i}
              className="px-3 py-2 bg-cyber-darker rounded-lg border border-gray-700 text-gray-300 text-sm text-center opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-cyber-dark rounded-2xl p-8 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-blue rounded-full" />
          À propos
        </h2>
        <div className="text-gray-300 space-y-4">
          <p>
            Passionné par la <strong className="text-white">cybersécurité</strong> depuis mes débuts en informatique,
            je me spécialise dans le <strong className="text-cyber-blue">SOC (Security Operations Center)</strong> et
            le <strong className="text-cyber-blue">Pentest</strong> pour combiner analyse défensive et approche offensive.
          </p>
          <p>
            J&apos;administre actuellement un <strong className="text-white">serveur dédié en production</strong> pour une boutique
            de scripts FiveM/Minecraft, avec gestion de VMs pour les clients. J&apos;y ai déployé <strong className="text-cyber-blue">Wazuh</strong> et
            <strong className="text-cyber-blue"> Suricata</strong> pour le monitoring SOC et la détection d&apos;intrusion.
          </p>
          <p>
            Mon objectif : rejoindre une équipe SOC ou Red Team en alternance pour appliquer
            mes compétences sur des cas réels, tout en préparant des certifications comme OSCP.
          </p>
        </div>
      </section>

      {/* Timeline avec animation CSS */}
      <section className="bg-cyber-dark rounded-2xl p-8 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-blue rounded-full" />
            Mon parcours
          </h2>

          <div className="relative">
            {timelineItems.map((item, i, arr) => (
              <div
                key={i}
                className={`relative flex gap-6 items-start opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards] ${i < arr.length - 1 ? 'pb-6' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Ligne vers le point suivant - seulement si pas le dernier */}
                {i < arr.length - 1 && (
                  <div className="absolute left-[15px] top-8 h-full w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-blue/30" />
                )}

                {/* Point */}
                <div className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-cyber-blue border-cyber-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-cyber-blue font-mono text-sm">{item.year}</span>
                    {item.current && (
                      <span className="px-2 py-0.5 bg-cyber-blue/10 text-cyber-blue text-xs rounded-full">
                        En cours
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}
