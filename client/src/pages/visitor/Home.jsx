import { Link } from 'react-router-dom'
import { Github, FolderGit2, Server, ChevronRight } from 'lucide-react'
import THMStats from '../../components/THMStats'

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section - Clean with Bio */}
      <section className="bg-cyber-dark rounded-xl p-6 md:p-8 border border-cyber-green/20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-cyber-green font-mono text-lg">$</span>
              <h1 className="text-3xl font-bold text-white font-mono">Nathan Jupin</h1>
            </div>
            <p className="text-cyber-green/80 font-mono text-lg mb-4">
              Cybersecurity Student @ Ynov
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Étudiant B2 en cybersécurité, passionné par le SOC et le pentest.
              Je développe mes compétences via labs, CTF et projets open source.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue text-sm rounded font-mono border border-cyber-blue/20">
                SOC Analysis
              </span>
              <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green text-sm rounded font-mono border border-cyber-green/20">
                Penetration Testing
              </span>
            </div>
          </div>

          {/* THM Stats intégrées */}
          <div className="w-full md:w-auto">
            <THMStats />
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="grid md:grid-cols-3 gap-4">
        {/* Projets & Writeups */}
        <Link
          to="/visitor/projects"
          className="group bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-cyber-green/50 transition-all hover:shadow-lg hover:shadow-cyber-green/10"
        >
          <div className="flex items-center justify-between mb-4">
            <FolderGit2 className="w-8 h-8 text-cyber-green group-hover:scale-110 transition-transform" />
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyber-green transition-colors" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Projets & Writeups
          </h3>
          <p className="text-gray-400 text-sm font-mono">
            Repos GitHub et CTF documentés
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">
              Scripts
            </span>
            <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">
              Labs
            </span>
          </div>
        </Link>

        {/* Mon Lab */}
        <Link
          to="/visitor/lab"
          className="group bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-cyber-green/50 transition-all hover:shadow-lg hover:shadow-cyber-green/10"
        >
          <div className="flex items-center justify-between mb-4">
            <Server className="w-8 h-8 text-cyber-green group-hover:scale-110 transition-transform" />
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyber-green transition-colors" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Mon Lab
          </h3>
          <p className="text-gray-400 text-sm font-mono">
            Infrastructure SOC personnelle
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">
              Splunk
            </span>
            <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">
              pfSense
            </span>
          </div>
        </Link>

        {/* GitHub External */}
        <a
          href="https://github.com/Metsamgit"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-cyber-dark rounded-xl p-6 border border-gray-800 hover:border-cyber-green/50 transition-all hover:shadow-lg hover:shadow-cyber-green/10"
        >
          <div className="flex items-center justify-between mb-4">
            <Github className="w-8 h-8 text-cyber-green group-hover:scale-110 transition-transform" />
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyber-green transition-colors" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
            GitHub
          </h3>
          <p className="text-gray-400 text-sm font-mono">
            Tous mes projets open source
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs rounded font-mono">
              @Metsamgit
            </span>
          </div>
        </a>
      </section>
    </div>
  )
}

export default Home
