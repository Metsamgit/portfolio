'use client'

import Link from 'next/link'
import { Home, FolderGit2, Server, ArrowLeft, Github, Shield } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function VisitorLayout({ children }) {
  const { t } = useLanguage()

  const navItems = [
    { href: '#top', icon: Home, label: t('nav.home') },
    { href: '#lab', icon: Server, label: t('nav.labSoc') },
    { href: '#writeups', icon: FolderGit2, label: t('nav.writeups') },
  ]

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header - Style terminal */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-theme-card/95 backdrop-blur-md border-b border-theme-accent-green/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-theme-text-secondary hover:text-theme-accent-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">cd ..</span>
            </Link>
            <div className="h-4 w-px bg-theme-accent-green/30" />
            <div className="flex items-center gap-2">
              <span className="text-theme-accent-green font-mono">$</span>
              <span className="font-mono text-theme-text font-semibold">Nathan Jupin</span>
              <span className="px-2 py-0.5 bg-theme-accent-green/10 text-theme-accent-green text-xs rounded font-mono border border-theme-accent-green/20">
                visitor
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 font-mono text-sm text-theme-text-secondary hover:text-theme-accent-green transition-all"
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </nav>

          {/* Switch + GitHub + Theme */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            {/* Separator */}
            <div className="h-6 w-px bg-theme-border mx-1" />

            <Link
              href="/recruiter"
              className="h-10 px-4 flex items-center gap-2 rounded-lg border border-theme-accent-blue/30 bg-theme-accent-blue/10 text-theme-accent-blue text-sm font-medium hover:bg-theme-accent-blue/20 transition-colors"
            >
              <Shield className="w-4 h-4" />
              {t('nav.recruiterView')}
            </Link>
            <a
              href="https://github.com/Metsamgit"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 flex items-center gap-2 rounded-lg bg-theme-accent-green text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-theme-accent-green/10">
          {navItems.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-1 text-xs font-mono text-theme-text-muted hover:text-theme-accent-green transition-all"
            >
              <Icon className="w-5 h-5" />
              {label}
            </a>
          ))}
          <Link
            href="/recruiter"
            className="flex flex-col items-center gap-1 px-3 py-1 text-xs text-theme-accent-blue"
          >
            <Shield className="w-5 h-5" />
            {t('nav.recruiterView')}
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-24 md:pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer - Terminal style */}
      <footer className="border-t border-theme-accent-green/10 py-6 px-4 bg-theme-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-sm text-theme-text-muted">
            <span className="text-theme-accent-green">$</span>
            <span>© 2025 Nathan Jupin • {t('visitor.footer')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
