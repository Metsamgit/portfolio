'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-darker flex items-center justify-center px-4">
      <div className="text-center">
        {/* Terminal style error */}
        <div className="bg-cyber-dark rounded-xl p-8 border border-cyber-green/20 max-w-md mx-auto">
          <div className="font-mono mb-6">
            <p className="text-gray-500 text-sm mb-2">
              <span className="text-cyber-green">nathan@kali</span>:<span className="text-cyber-blue">~</span>$ cat /var/log/404
            </p>
            <div className="text-red-400 text-sm mb-4">
              Error: ENOENT: no such file or directory
            </div>
          </div>

          <h1 className="text-6xl font-bold text-cyber-green font-mono mb-4">404</h1>
          <p className="text-gray-400 mb-8">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyber-green text-cyber-dark font-semibold rounded-lg hover:bg-cyber-green/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Accueil
            </Link>
            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-cyber-green hover:text-cyber-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-xs font-mono mt-8">
          // Process exited with code 404
        </p>
      </div>
    </div>
  )
}
