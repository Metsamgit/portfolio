import { useEffect } from 'react'
import { X, Clock, Target, Tag, Flag } from 'lucide-react'

const WriteupModal = ({ writeup, isOpen, onClose }) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !writeup) return null

  const getDifficultyColor = (diff) => {
    const colors = {
      Easy: 'text-green-400 bg-green-400/10 border-green-400/30',
      Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
      Hard: 'text-red-400 bg-red-400/10 border-red-400/30',
      Insane: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    }
    return colors[diff] || colors.Easy
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cyber-dark border border-cyber-green/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-cyber-green/10 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyber-green font-mono text-sm">{writeup.platform}</span>
              <span className={`px-2 py-0.5 text-xs rounded border ${getDifficultyColor(writeup.difficulty)}`}>
                {writeup.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{writeup.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-cyber-darker rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Target className="w-3 h-3" />
                Difficulté
              </div>
              <p className="text-white font-medium">{writeup.difficulty}</p>
            </div>
            <div className="bg-cyber-darker rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Flag className="w-3 h-3" />
                Platform
              </div>
              <p className="text-white font-medium">{writeup.platform}</p>
            </div>
            <div className="bg-cyber-darker rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Clock className="w-3 h-3" />
                Date
              </div>
              <p className="text-white font-medium">{writeup.date}</p>
            </div>
            <div className="bg-cyber-darker rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Tag className="w-3 h-3" />
                Catégorie
              </div>
              <p className="text-white font-medium">{writeup.category || 'CTF'}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {writeup.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-cyber-green/10 text-cyber-green text-sm rounded-full border border-cyber-green/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Full Writeup Content */}
          <div className="writeup-content space-y-6">
            {writeup.content ? (
              writeup.content.map((section, i) => (
                <div key={i}>
                  {section.type === 'heading' && (
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-cyber-green rounded-full" />
                      {section.text}
                    </h3>
                  )}
                  {section.type === 'text' && (
                    <p className="text-gray-400 leading-relaxed">{section.text}</p>
                  )}
                  {section.type === 'code' && (
                    <div className="bg-cyber-darker rounded-lg p-4 border border-gray-800 font-mono text-sm overflow-x-auto">
                      <pre className="text-cyber-green whitespace-pre-wrap">{section.text}</pre>
                    </div>
                  )}
                  {section.type === 'flag' && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 font-mono text-green-400">
                      🚩 {section.text}
                    </div>
                  )}
                  {section.type === 'image' && (
                    <div className="rounded-lg overflow-hidden border border-gray-800">
                      <img src={section.src} alt={section.alt || ''} className="w-full" />
                    </div>
                  )}
                  {section.type === 'list' && (
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-400">
                          <span className="text-cyber-green mt-1">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                {/* Fallback to old format */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-cyber-green rounded-full" />
                    Description
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{writeup.description}</p>
                </div>
                {writeup.summary && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-cyber-green rounded-full" />
                      Résumé
                    </h3>
                    <div className="bg-cyber-darker rounded-lg p-4 border border-gray-800 font-mono text-sm text-gray-300">
                      {writeup.summary}
                    </div>
                  </div>
                )}
                {writeup.skills && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-cyber-green rounded-full" />
                      Compétences travaillées
                    </h3>
                    <ul className="space-y-2">
                      {writeup.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-400">
                          <span className="text-cyber-green">→</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-800 bg-cyber-darker/50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-cyber-green text-cyber-dark font-semibold rounded-lg hover:bg-cyber-green/90 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out, zoom-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default WriteupModal
