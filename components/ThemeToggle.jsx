'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="h-10 px-3 flex items-center justify-center rounded-lg bg-theme-bg-secondary border border-theme-border hover:border-theme-accent-blue transition-colors"
        aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en Francais'}
      >
        <span className="text-sm font-mono font-semibold text-theme-text-secondary">
          {lang === 'fr' ? 'EN' : 'FR'}
        </span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="h-10 w-10 flex items-center justify-center rounded-lg bg-theme-bg-secondary border border-theme-border hover:border-theme-accent-blue transition-colors"
        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 text-theme-accent-blue" />
        )}
      </button>
    </div>
  )
}
