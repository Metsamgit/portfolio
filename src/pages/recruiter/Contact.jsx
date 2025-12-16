import { Mail, Linkedin, Github, MapPin, FileDown } from 'lucide-react'

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'votre@email.com',
      href: 'mailto:votre@email.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/votre-profil',
      href: 'https://linkedin.com/in/votre-profil',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@Metsamgit',
      href: 'https://github.com/Metsamgit',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'France',
      href: null,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
        <p className="text-gray-400">Discutons de vos opportunités</p>
      </section>

      {/* Contact Info */}
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">Me contacter</h2>
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-cyber-blue/10 rounded-lg">
                  <item.icon className="w-5 h-5 text-cyber-blue" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyber-blue transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="bg-cyber-dark rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Disponibilité</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400">Disponible pour stage / alternance</span>
          </div>
          <p className="text-gray-400 text-sm">
            Je recherche activement une opportunité en cybersécurité,
            idéalement dans un environnement SOC ou une équipe de pentest.
          </p>
        </div>

        {/* Quick Download */}
        <a
          href="/cv-metsam.pdf"
          download
          className="block bg-cyber-blue/10 border border-cyber-blue/30 rounded-xl p-6 hover:bg-cyber-blue/20 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Télécharger mon CV</p>
              <p className="text-gray-400 text-sm">Format PDF</p>
            </div>
            <div className="p-2 bg-cyber-blue/20 rounded-lg">
              <FileDown className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Contact
