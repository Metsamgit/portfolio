'use client'

import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { Home, Wrench, Briefcase, Mail, ArrowLeft, Terminal, Download } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RecruiterLayout({ children }) {
  const { t } = useLanguage()

  const navItems = [
    { href: '/recruiter', icon: Home, label: t('nav.profile'), end: true },
    { href: '/recruiter/skills', icon: Wrench, label: t('nav.skills') },
    { href: '/recruiter/experience', icon: Briefcase, label: t('nav.experience') },
    { href: '/recruiter/contact', icon: Mail, label: t('nav.contact') },
  ]

  return (
    <div className="min-h-screen bg-theme-bg-secondary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-theme-card/90 backdrop-blur-md border-b border-theme-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-theme-text-secondary hover:text-theme-accent-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">{t('nav.back')}</span>
            </Link>
            <div className="h-4 w-px bg-theme-border" />
            <span className="font-mono text-theme-accent-blue font-semibold">Nathan Jupin</span>
            <span className="px-2 py-0.5 bg-theme-accent-blue/10 text-theme-accent-blue text-xs rounded font-mono">
              recruiter_view
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, icon: Icon, label, end }) => (
              <NavLink
                key={href}
                href={href}
                end={end}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all ${
                    isActive
                      ? 'text-theme-accent-blue'
                      : 'text-theme-text-secondary hover:text-theme-text'
                  } ${isActive ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-theme-accent-blue after:rounded-full' : ''}`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Switch + CTA + Theme */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            {/* Separator */}
            <div className="h-6 w-px bg-theme-border mx-1" />

            <Link
              href="/visitor"
              className="h-10 px-4 flex items-center gap-2 rounded-lg border border-theme-accent-green/30 bg-theme-accent-green/10 text-theme-accent-green text-sm font-medium hover:bg-theme-accent-green/20 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              {t('nav.visitorView')}
            </Link>
            <a
              href="/cv-nathan-jupin.pdf"
              download
              className="h-10 px-4 flex items-center gap-2 rounded-lg bg-theme-accent-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              {t('nav.downloadCV')}
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-theme-border">
          {navItems.map(({ href, icon: Icon, label, end }) => (
            <NavLink
              key={href}
              href={href}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-1 px-3 py-1 text-xs transition-all ${
                  isActive
                    ? 'text-theme-accent-blue'
                    : 'text-theme-text-muted hover:text-theme-text'
                } ${isActive ? 'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-theme-accent-blue after:rounded-full' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
          <Link
            href="/visitor"
            className="flex flex-col items-center gap-1 px-3 py-1 text-xs text-theme-accent-green"
          >
            <Terminal className="w-5 h-5" />
            {t('nav.visitorView')}
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-24 md:pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-theme-border py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-theme-text-muted text-sm font-mono">
            © 2025 Nathan Jupin • {t('recruiter.footer')}
          </p>
        </div>
      </footer>
    </div>
  )
}
