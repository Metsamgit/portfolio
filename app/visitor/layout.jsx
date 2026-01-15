'use client'

import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { Home, FolderGit2, Server, ArrowLeft, Github, Shield } from 'lucide-react'

const navItems = [
  { href: '/visitor', icon: Home, label: 'Home', end: true },
  { href: '/visitor/projects', icon: FolderGit2, label: 'Projets' },
  { href: '/visitor/lab', icon: Server, label: 'Mon Lab' },
]

export default function VisitorLayout({ children }) {
  return (
    <div className="min-h-screen bg-cyber-darker">
      {/* Header - Style terminal */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/95 backdrop-blur-md border-b border-cyber-green/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-cyber-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">cd ..</span>
            </Link>
            <div className="h-4 w-px bg-cyber-green/30" />
            <div className="flex items-center gap-2">
              <span className="text-cyber-green font-mono">$</span>
              <span className="font-mono text-white font-semibold">Nathan Jupin</span>
              <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono border border-cyber-green/20">
                visitor
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, icon: Icon, label, end }) => (
              <NavLink
                key={href}
                href={href}
                end={end}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 font-mono text-sm transition-all ${
                    isActive
                      ? 'text-cyber-green'
                      : 'text-gray-400 hover:text-cyber-green'
                  } ${isActive ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-cyber-green after:rounded-full' : ''}`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Switch + GitHub */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/recruiter"
              className="flex items-center gap-2 px-3 py-1.5 text-cyber-blue border border-cyber-blue/30 rounded-lg text-sm hover:bg-cyber-blue/10 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Recruteur
            </Link>
            <a
              href="https://github.com/Metsamgit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-cyber-green/10 text-cyber-green font-mono text-sm rounded-lg border border-cyber-green/30 hover:bg-cyber-green/20 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-cyber-green/10">
          {navItems.map(({ href, icon: Icon, label, end }) => (
            <NavLink
              key={href}
              href={href}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-1 px-3 py-1 text-xs font-mono transition-all ${
                  isActive
                    ? 'text-cyber-green'
                    : 'text-gray-500 hover:text-cyber-green'
                } ${isActive ? 'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-cyber-green after:rounded-full' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
          <Link
            href="/recruiter"
            className="flex flex-col items-center gap-1 px-3 py-1 text-xs text-cyber-blue"
          >
            <Shield className="w-5 h-5" />
            Recruteur
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
      <footer className="border-t border-cyber-green/10 py-6 px-4 bg-cyber-dark/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-sm text-gray-500">
            <span className="text-cyber-green">$</span>
            <span>© 2025 Nathan Jupin • Cybersecurity Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
