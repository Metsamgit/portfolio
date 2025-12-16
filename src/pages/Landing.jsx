import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Terminal, ChevronRight } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()
  const [typedText, setTypedText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const fullText = 'METSAM'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowOptions(true), 500)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])

  const handleChoice = (path) => {
    // Petit effet avant navigation
    document.body.style.opacity = '0'
    setTimeout(() => {
      navigate(path)
      document.body.style.opacity = '1'
    }, 300)
  }

  return (
    <div className="min-h-screen bg-cyber-darker flex flex-col items-center justify-center relative overflow-hidden">
      {/* Starry sky background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Small stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-s-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.4 + Math.random() * 0.4
            }}
          />
        ))}
        {/* Medium stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`star-m-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '2px',
              height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.5 + Math.random() * 0.5,
              boxShadow: '0 0 3px rgba(255,255,255,0.3)'
            }}
          />
        ))}
        {/* Bright stars with glow */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-l-${i}`}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkleBright ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00d4ff' : 'white',
              boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgba(0,255,136,0.6)' : i % 3 === 1 ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.6)'}`
            }}
          />
        ))}
        {/* Shooting star (occasional) */}
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

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes twinkleBright {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes shootingStar {
          0%, 90%, 100% { opacity: 0; transform: translateX(0) translateY(0); }
          92% { opacity: 1; }
          95% { opacity: 1; transform: translateX(-200px) translateY(100px); }
          96% { opacity: 0; transform: translateX(-250px) translateY(125px); }
        }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Terminal header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-cyber-dark/80 px-4 py-2 rounded-t-lg border border-cyber-green/20 border-b-0">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-cyber-green/60 font-mono text-sm ml-2">~/portfolio</span>
          </div>
        </div>

        {/* Typed name */}
        <div className="bg-cyber-dark/60 backdrop-blur-sm border border-cyber-green/20 rounded-lg p-8 mb-12">
          <div className="font-mono text-sm text-cyber-green/60 mb-2">
            <span className="text-cyber-blue">const</span> identity <span className="text-white">=</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-mono font-bold text-cyber-green text-glow-green">
            {typedText}
            <span className="animate-blink text-cyber-blue">|</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono text-sm">
            <span className="text-cyber-purple">// </span>
            Cybersecurity Student @ Ynov • SOC & Pentest
          </p>
        </div>

        {/* Choice cards */}
        <div className={`transition-all duration-700 ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-500 font-mono text-sm mb-6">
            {">"} select_access_level:
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Recruiter Card */}
            <button
              onClick={() => handleChoice('/recruiter')}
              className="group relative bg-cyber-dark/80 backdrop-blur-sm border border-gray-700 hover:border-cyber-blue rounded-xl p-6 w-full md:w-72 text-left transition-all duration-300 hover:glow-blue"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-blue/5 rounded-bl-full" />
              <Shield className="w-10 h-10 text-cyber-blue mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                Recruteur
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                CV, compétences techniques, expériences et formations
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded font-mono">cv.pdf</span>
                <span className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded font-mono">skills</span>
                <span className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded font-mono">contact</span>
              </div>
            </button>

            {/* Visitor Card */}
            <button
              onClick={() => handleChoice('/visitor')}
              className="group relative bg-cyber-dark/80 backdrop-blur-sm border border-gray-700 hover:border-cyber-green rounded-xl p-6 w-full md:w-72 text-left transition-all duration-300 hover:glow-green"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-green/5 rounded-bl-full" />
              <Terminal className="w-10 h-10 text-cyber-green mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                Visiteur
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Projets GitHub, writeups CTF, labs et stats TryHackMe
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">projects</span>
                <span className="px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">writeups</span>
                <span className="px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">thm</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-gray-600 text-xs font-mono mt-12">
          {"// "} Pas de cookies, pas de tracking.
        </p>
      </div>
    </div>
  )
}

export default Landing
