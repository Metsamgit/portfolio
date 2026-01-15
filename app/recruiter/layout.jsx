'use client'

import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { Home, Wrench, Briefcase, Mail, ArrowLeft, Terminal } from 'lucide-react'

const navItems = [
  { href: '/recruiter', icon: Home, label: 'Profil', end: true },
  { href: '/recruiter/skills', icon: Wrench, label: 'Compétences' },
  { href: '/recruiter/experience', icon: Briefcase, label: 'Parcours' },
  { href: '/recruiter/contact', icon: Mail, label: 'Contact' },
]

export default function RecruiterLayout({ children }) {
  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">back</span>
            </Link>
            <div className="h-4 w-px bg-gray-700" />
            <span className="font-mono text-cyber-blue font-semibold">Nathan Jupin</span>
            <span className="px-2 py-0.5 bg-cyber-blue/10 text-cyber-blue text-xs rounded font-mono">
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
                      ? 'text-cyber-blue'
                      : 'text-gray-400 hover:text-white'
                  } ${isActive ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-cyber-blue after:rounded-full' : ''}`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Switch + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/visitor"
              className="flex items-center gap-2 px-4 py-2 text-cyber-green border border-cyber-green/30 rounded-lg text-sm hover:bg-cyber-green/10 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              Visiteur
            </Link>
            <a
              href="/cv-nathan-jupin.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-cyber-blue text-cyber-dark font-semibold text-sm rounded-lg hover:bg-cyber-blue/90 transition-colors"
            >
              Télécharger CV
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-gray-800">
          {navItems.map(({ href, icon: Icon, label, end }) => (
            <NavLink
              key={href}
              href={href}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-1 px-3 py-1 text-xs transition-all ${
                  isActive
                    ? 'text-cyber-blue'
                    : 'text-gray-500 hover:text-white'
                } ${isActive ? 'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-cyber-blue after:rounded-full' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
          <Link
            href="/visitor"
            className="flex flex-col items-center gap-1 px-3 py-1 text-xs text-cyber-green"
          >
            <Terminal className="w-5 h-5" />
            Visiteur
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
      <footer className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-mono">
            © 2025 Nathan Jupin • Étudiant Cybersécurité
          </p>
        </div>
      </footer>
    </div>
  )
}
