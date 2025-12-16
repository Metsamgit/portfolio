import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const [typedText, setTypedText] = useState('')
  const [showContent, setShowContent] = useState(false)
  const fullText = 'bash: page_not_found: command not found'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowContent(true), 300)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])

  const ascii404 = `
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═████╗██║  ██║
 ███████║██║██╔██║███████║
 ╚════██║████╔╝██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝
`

  return (
    <div className='min-h-screen bg-cyber-darker flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-2xl bg-cyber-dark rounded-xl border border-cyber-green/20 overflow-hidden shadow-2xl'>
        <div className='flex items-center gap-2 px-4 py-3 bg-cyber-darker border-b border-cyber-green/20'>
          <div className='flex gap-1.5'>
            <span className='w-3 h-3 rounded-full bg-red-500/80' />
            <span className='w-3 h-3 rounded-full bg-yellow-500/80' />
            <span className='w-3 h-3 rounded-full bg-green-500/80' />
          </div>
          <span className='text-cyber-green/60 font-mono text-sm ml-2'>metsam@kali:~</span>
        </div>

        <div className='p-6 font-mono'>
          <div className='mb-4'>
            <span className='text-cyber-green'>metsam@kali</span>
            <span className='text-white'>:</span>
            <span className='text-cyber-blue'>~</span>
            <span className='text-white'>$ </span>
            <span className='text-gray-300'>cd /page_inconnue</span>
          </div>

          <div className='text-red-400 mb-6'>
            {typedText}
            {!showContent && <span className='animate-blink text-cyber-green'>▋</span>}
          </div>

          <div className={`transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <pre className='text-cyber-green text-xs md:text-sm mb-6'>{ascii404}</pre>

            <div className='space-y-2 text-gray-400 mb-8'>
              <p><span className='text-cyber-green'>[ERROR]</span> La page demandée n'existe pas</p>
              <p><span className='text-cyber-green'>[INFO]</span> Vérifiez l'URL ou retournez à l'accueil</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                to='/'
                className='flex items-center justify-center gap-2 px-6 py-3 bg-cyber-green text-cyber-dark font-semibold rounded-lg hover:bg-cyber-green/90 transition-colors'
              >
                <Home className='w-4 h-4' />
                Retour à l'accueil
              </Link>
              <button
                onClick={() => window.history.back()}
                className='flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-cyber-green/50 text-cyber-green font-semibold rounded-lg hover:bg-cyber-green/10 transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                Page précédente
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className='text-gray-600 text-sm font-mono mt-8'>
        $ echo 'Perdu dans le système...'
      </p>
    </div>
  )
}

export default NotFound
