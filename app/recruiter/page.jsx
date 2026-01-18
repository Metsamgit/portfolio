'use client'

import { MapPin, GraduationCap, Target, Download, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RecruiterHome() {
  const { t } = useLanguage()

  const timelineItems = [
    {
      year: '2025',
      title: 'Admin serveur dedie en production',
      desc: 'Gestion de VMs, deploiement Wazuh & Suricata pour boutique de scripts',
      current: true
    },
    {
      year: '2024 - 2025',
      title: 'B2 Cybersecurite - Ynov Campus',
      desc: 'Specialisation SOC & Pentest',
      current: true
    },
    {
      year: '2024',
      title: 'Creation de mon lab SOC',
      desc: 'Stack Wazuh, Suricata pour monitoring et detection',
      current: false
    },
    {
      year: '2023',
      title: 'Debut en cybersecurite',
      desc: 'Decouverte via TryHackMe et premiers scripts',
      current: false
    },
  ]

  const lookingForItems = t('recruiter.lookingForItems')

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-theme-card to-theme-bg-secondary rounded-2xl p-8 border border-theme-border">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src="/img/PP.jpg"
              alt="Nathan Jupin"
              className="w-32 h-32 rounded-full object-cover border-2 border-theme-accent-blue"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-theme-text mb-2">
              Nathan <span className="text-theme-accent-blue">Jupin</span>
            </h1>
            <p className="text-xl text-theme-text-secondary mb-4">
              {t('recruiter.title')}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-theme-text-muted">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-theme-accent-blue" />
                B2 Ynov Campus
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-theme-accent-blue" />
                {t('recruiter.location')}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-theme-accent-blue" />
                {t('recruiter.target')}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="/cv-nathan-jupin.pdf"
              download
              className="flex items-center justify-center gap-2 px-6 py-3 bg-theme-accent-blue text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('nav.downloadCV')}
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-jupin-088a12326/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-theme-border text-theme-text rounded-lg hover:border-theme-accent-blue hover:text-theme-accent-blue transition-colors"
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
          { label: t('recruiter.year'), value: t('recruiter.yearValue'), sub: t('recruiter.yearSub') },
          { label: t('recruiter.orientation'), value: t('recruiter.orientationValue'), sub: t('recruiter.orientationSub') },
          { label: t('recruiter.projects'), value: t('recruiter.projectsValue'), sub: t('recruiter.projectsSub') },
          { label: t('recruiter.available'), value: t('recruiter.availableValue'), sub: t('recruiter.availableSub') },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-theme-card rounded-xl p-4 border border-theme-border text-center opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-theme-text-muted text-xs mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-theme-accent-blue">{stat.value}</p>
            <p className="text-theme-text-secondary text-sm">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* What I'm looking for - PRIORITAIRE */}
      <section className="bg-theme-card rounded-2xl p-8 border border-theme-border">
        <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-theme-accent-blue rounded-full" />
          {t('recruiter.lookingFor')}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Array.isArray(lookingForItems) && lookingForItems.map((item, i) => (
            <div
              key={i}
              className="bg-theme-bg-secondary p-4 rounded-xl border border-theme-border opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-theme-text mb-1">{item.title}</h3>
              <p className="text-theme-text-secondary text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="bg-theme-card rounded-2xl p-8 border border-theme-border">
        <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-theme-accent-blue rounded-full" />
          {t('recruiter.softSkills')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {t('recruiter.softSkillsList').map((skill, i) => (
            <span
              key={i}
              className="px-3 py-2 bg-theme-bg-secondary rounded-lg border border-theme-border text-theme-text-secondary text-sm text-center opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-theme-card rounded-2xl p-8 border border-theme-border">
        <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-theme-accent-blue rounded-full" />
          {t('recruiter.about')}
        </h2>
        <div className="text-theme-text-secondary space-y-4">
          <p>
            {t('recruiter.aboutText1')}
          </p>
          <p>
            {t('recruiter.aboutText2')}
          </p>
          <p>
            {t('recruiter.aboutText3')}
          </p>
        </div>
      </section>

      {/* Timeline avec animation CSS */}
      <section className="bg-theme-card rounded-2xl p-8 border border-theme-border">
          <h2 className="text-xl font-semibold text-theme-text mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-theme-accent-blue rounded-full" />
            {t('recruiter.timeline')}
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
                  <div className="absolute left-[15px] top-8 h-full w-0.5 bg-gradient-to-b from-theme-accent-blue to-theme-accent-blue/30" />
                )}

                {/* Point */}
                <div className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-theme-accent-blue border-theme-accent-blue shadow-[0_0_15px_rgb(var(--color-accent-blue)/0.5)]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-theme-accent-blue font-mono text-sm">{item.year}</span>
                    {item.current && (
                      <span className="px-2 py-0.5 bg-theme-accent-blue/10 text-theme-accent-blue text-xs rounded-full">
                        {t('recruiter.current')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-theme-text font-semibold mb-1">{item.title}</h3>
                  <p className="text-theme-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}
