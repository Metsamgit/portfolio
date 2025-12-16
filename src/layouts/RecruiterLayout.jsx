import { Outlet, NavLink, Link } from 'react-router-dom'
import { Home, Wrench, Briefcase, Mail, ArrowLeft } from 'lucide-react'

const RecruiterLayout = () => {
  const navItems = [
    { to: '/recruiter', icon: Home, label: 'Profil', end: true },
    { to: '/recruiter/skills', icon: Wrench, label: 'Compétences' },
    { to: '/recruiter/experience', icon: Briefcase, label: 'Parcours' },
    { to: '/recruiter/contact', icon: Mail, label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">back</span>
            </Link>
            <div className="h-4 w-px bg-gray-700" />
            <span className="font-mono text-cyber-blue font-semibold">METSAM</span>
            <span className="px-2 py-0.5 bg-cyber-blue/10 text-cyber-blue text-xs rounded font-mono">
              recruiter_view
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-cyber-blue/10 text-cyber-blue'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="/cv-metsam.pdf"
            download
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyber-blue text-cyber-dark font-semibold text-sm rounded-lg hover:bg-cyber-blue/90 transition-colors"
          >
            Télécharger CV
          </a>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-gray-800">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'text-cyber-blue'
                    : 'text-gray-500 hover:text-white'
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
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-mono">
            © 2024 METSAM • Étudiant Cybersécurité
          </p>
          <div className="flex items-center gap-4">
            <Link to="/visitor" className="text-gray-500 hover:text-cyber-green text-sm transition-colors">
              → Vue visiteur
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RecruiterLayout
