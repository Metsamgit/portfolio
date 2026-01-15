'use client'

import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { Home, FolderGit2, Server, ArrowLeft, Github } from 'lucide-react'

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
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    isActive
                      ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/30'
                      : 'text-gray-400 hover:text-cyber-green hover:bg-cyber-green/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* GitHub link */}
          <a
            href="https://github.com/Metsamgit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyber-green/10 text-cyber-green font-mono text-sm rounded-lg border border-cyber-green/30 hover:bg-cyber-green/20 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-cyber-green/10">
          {navItems.map(({ href, icon: Icon, label, end }) => (
            <NavLink
              key={href}
              href={href}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'text-cyber-green'
                    : 'text-gray-500 hover:text-cyber-green'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-sm text-gray-500">
              <span className="text-cyber-green">$</span>
              <span>Nathan Jupin • Cybersecurity Portfolio</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://tryhackme.com/p/METSAM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyber-green text-sm font-mono transition-colors"
              >
                TryHackMe
              </a>
              <Link href="/recruiter" className="text-gray-500 hover:text-cyber-blue text-sm font-mono transition-colors">
                → recruiter_view
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
