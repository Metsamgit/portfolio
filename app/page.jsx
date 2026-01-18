'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Terminal, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ThemeToggle from '@/components/ThemeToggle'

// Generate stars with seeded positions (deterministic)
const generateStars = (count, seed) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    const s = seed + i * 9301 + 49297
    const rand = () => ((s * (i + 1) * 49297 + 233280) % 233280) / 233280
    stars.push({
      left: (rand() * 100).toFixed(2),
      top: ((rand() * 7919) % 100).toFixed(2),
      duration: (2 + (rand() * 3)).toFixed(1),
      delay: (rand() * 3).toFixed(1),
      opacity: (0.4 + rand() * 0.4).toFixed(2),
    })
  }
  return stars
}

const smallStars = generateStars(100, 1)
const mediumStars = generateStars(40, 200)
const brightStars = generateStars(15, 500)

export default function Landing() {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const fullText = 'NATHAN JUPIN'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowOptions(true), 200)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Theme/Language toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Starry sky background - only visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark-only">
        {/* Small stars */}
        {smallStars.map((star, i) => (
          <div
            key={`star-s-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '1px',
              height: '1px',
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity
            }}
          />
        ))}
        {/* Medium stars */}
        {mediumStars.map((star, i) => (
          <div
            key={`star-m-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '2px',
              height: '2px',
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
              boxShadow: '0 0 3px rgba(255,255,255,0.3)'
            }}
          />
        ))}
        {/* Bright stars with glow */}
        {brightStars.map((star, i) => (
          <div
            key={`star-l-${i}`}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `twinkleBright ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              background: i % 3 === 0 ? 'rgb(var(--color-accent-green))' : i % 3 === 1 ? 'rgb(var(--color-accent-blue))' : 'white',
              boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgb(var(--color-accent-green) / 0.6)' : i % 3 === 1 ? 'rgb(var(--color-accent-blue) / 0.6)' : 'rgba(255,255,255,0.6)'}`
            }}
          />
        ))}
        {/* Shooting star */}
        <div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: '20%',
            left: '80%',
            animation: 'shootingStar 8s ease-in-out infinite',
            animationDelay: '3s',
            boxShadow: '0 0 6px white, -20px 0 15px rgba(255,255,255,0.3), -40px 0 10px rgba(255,255,255,0.1)'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Terminal header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-theme-card/80 px-4 py-2 rounded-t-lg border border-theme-accent-green/20 border-b-0">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-theme-accent-green/60 font-mono text-sm ml-2">~/portfolio</span>
          </div>
        </div>

        {/* Typed name */}
        <div className="bg-theme-card/60 backdrop-blur-sm border border-theme-accent-green/20 rounded-lg p-8 mb-12">
          <div className="font-mono text-sm text-theme-accent-green/60 mb-2">
            <span className="text-theme-accent-blue">const</span> identity <span className="text-theme-text">=</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-mono font-bold text-theme-accent-green text-glow-green">
            {typedText}
            <span className="animate-blink text-theme-accent-blue">|</span>
          </h1>
          <p className="text-theme-text-secondary mt-4 font-mono text-sm">
            <span className="text-theme-accent-purple">// </span>
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Choice cards */}
        <div className={`transition-all duration-700 ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-theme-text-muted font-mono text-sm mb-6">
            {">"} {t('landing.selectAccess')}
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Recruiter Card */}
            <Link
              href="/recruiter"
              className="group relative bg-theme-card/80 backdrop-blur-sm border-2 border-theme-border hover:border-theme-accent-blue rounded-xl p-6 w-full md:w-72 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(var(--color-accent-blue)/0.15)]"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-theme-accent-blue/5 rounded-bl-full" />
              <div className="flex items-start justify-between mb-4">
                <Shield className="w-10 h-10 text-theme-accent-blue group-hover:scale-110 transition-transform" />
                <ChevronRight
                  className="w-6 h-6 text-theme-accent-blue group-hover:translate-x-2 transition-transform duration-300"
                  style={{ animation: 'arrowPulse 2s ease-in-out infinite' }}
                />
              </div>
              <h2 className="text-xl font-semibold text-theme-text mb-1">
                {t('landing.recruiter')}
              </h2>
              <p className="text-theme-accent-blue text-sm mb-4 flex items-center gap-1">
                {t('landing.recruiterDesc')}
              </p>
              <div className="flex flex-wrap gap-2 text-theme-text-muted text-xs font-mono">
                <span>cv</span>
                <span>·</span>
                <span>skills</span>
                <span>·</span>
                <span>contact</span>
              </div>
            </Link>

            {/* Visitor Card */}
            <Link
              href="/visitor"
              className="group relative bg-theme-card/80 backdrop-blur-sm border-2 border-theme-border hover:border-theme-accent-green rounded-xl p-6 w-full md:w-72 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(var(--color-accent-green)/0.15)]"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-theme-accent-green/5 rounded-bl-full" />
              <div className="flex items-start justify-between mb-4">
                <Terminal className="w-10 h-10 text-theme-accent-green group-hover:scale-110 transition-transform" />
                <ChevronRight
                  className="w-6 h-6 text-theme-accent-green group-hover:translate-x-2 transition-transform duration-300"
                  style={{ animation: 'arrowPulse 2s ease-in-out infinite', animationDelay: '0.5s' }}
                />
              </div>
              <h2 className="text-xl font-semibold text-theme-text mb-1">
                {t('landing.visitor')}
              </h2>
              <p className="text-theme-accent-green text-sm mb-4 flex items-center gap-1">
                {t('landing.visitorDesc')}
              </p>
              <div className="flex flex-wrap gap-2 text-theme-text-muted text-xs font-mono">
                <span>writeups</span>
                <span>·</span>
                <span>lab</span>
                <span>·</span>
                <span>thm</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-theme-text-muted text-xs font-mono mt-12">
          {"// "} {t('landing.noCookies')}
        </p>
      </div>
    </div>
  )
}
